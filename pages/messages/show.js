// pages/messages/index.js
const app = getApp()
var auth = require('../../utils/auth.js');
var timClient = require('../../tim/index.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        unReplyCounter: 0,
        user: {},
        toUser: {},
        ready: false,
        toUserId: '',
        messagesIsCompleted: false,
        nextReqMessageID: null,
        currentMessages: [],
        scrollIntoView: '',
        oldMessages: [],
        loadingMessages: true,
        pageSize: 10,
        height: 800,
    },

    mobileHandle: function () {
        // 发送联系卡片
        var _this = this
        app.request({
            url: '/api/v1/tim/mobile',
            data: { target_user_id: _this.data.toUserId },
            success: function (resp) {
                // done
            }
        })
    },

    gotoUser: function (e) {
        var _this = this
        if (!this.data.toUser.is_broker) {
            return false
        }
        var url = '/pkgBroker/pages/broker/profile?id=' + this.data.toUserId
        wx.navigateTo({
            url: url,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({
            height: app.globalData.system.windowHeight,
            toUserId: q.target_user_id,
            toPostId: q.target_post_id,
        })

        var _this = this
        auth.ensureUser(function (user) {
            _this.loadToUser(q.target_user_id)
            _this.setMessageRead()
            timClient.tim.on(TIM.EVENT.MESSAGE_RECEIVED, _this.messageReceivedHandle)
            timClient.tim.on(TIM.EVENT.MESSAGE_RECEIVED, _this.setMessageRead)
            timClient.login()
            setTimeout(_this.loadCurrentMessages, 500)
            if (user.id.toString() == q.target_user_id.toString()) {
                // 不能和自己聊天
                wx.showModal({
                    title: '操作提示',
                    content: '不能和自己发起聊天',
                    showCancel: false,
                    confirmText: '知道了',
                    success: (result) => {
                        wx.navigateBack({ delta: -1 })
                    },
                });
                return false
            } else {
                _this.setData({ user: user, })
            }
        })
        var _this = this
    },


    setMessageRead: function () {
        var _this = this
        let p = timClient.setMessageRead(this.data.toUserId)
        if (!p) {
            console.log('标记未读失败，10s后重试')
            setTimeout(_this.setMessageRead, 10000)
            return
        }
    },


    messageReceivedHandle: function (event) {
        console.log('有新消息', event)
        // 判断是不是当前对话的消息
        var _this = this
        var msgs = this.data.currentMessages
        event.data.forEach((msg, i) => {
            var cid = msg.conversationID
            var uid = cid.split('.')[1]
            if (uid.toString() == _this.data.toUserId.toString()) {
                console.log('新消息来自当前联系人', msg)
                msgs.push(msg)
            }
        })
        this.setData({ currentMessages: msgs, unReplyCounter: 0 })
        this.scrollBottom()
    },

    loadToUser: function (uid) {
        // 加载聊天对象的Id
        var _this = this
        var cacheKey = 'user.' + uid
        var user = wx.getStorageSync(cacheKey);
        if (user) {
            wx.setNavigationBarTitle({
                title: user.name || user.nickname,
            });
            this.setData({ toUser: user })
            return
        }

        // 重新加载
        app.request({
            url: '/api/v1/users/' + uid,
            hideLoading: true,
            success: function (resp) {
                var user = resp.data.data
                _this.setData({ toUser: user })
                // 缓存用户数据
                wx.setStorage({
                    key: cacheKey,
                    data: user,
                });

                wx.setNavigationBarTitle({
                    title: user.name || user.nickname,
                });


            }
        })
    },


    loadCurrentMessages: function () {
        var _this = this
        console.log('加载首屏聊天内容列表')
        let p = timClient.getMessageList(_this.data.toUserId, _this.data.pageSize)
        if (!p) {
            console.log('load current message 失败，10s后重试')
            setTimeout(_this.loadCurrentMessages, 10000)
            return false
        }
        p.then(function (resp) {
            console.log(resp)
            if (resp.code != 0) {
                console.log('get current message error', resp)
                return false
            }
            _this.setData({
                currentMessages: resp.data.messageList,
                loadingMessages: false,
                ready: true,
                nextReqMessageID: resp.data.nextReqMessageID,
            })
            _this.welcomHandle()
            _this.sendPostCard()
            _this.scrollBottom()
        })
    },

    scrollBottom: function () {
        // 滚动到页面底部
        var _this = this
        setTimeout(function () {
            _this.setData({
                scrollIntoView: 'bottom'
            })

        }, 500)
    },

    sendPostCard: function () {
        console.log('尝试发送房源卡片')
        var postId = this.data.toPostId
        if (!postId) {
            return false
        }
        // 是否发送欢迎卡片
        var _this = this
        var passIt = false
        // 检测最近的消息，如果有发送过post卡片，则不重复发送
        this.data.currentMessages.forEach((m, i) => {
            if (m.payload.data == postId) {
                passIt = true
            }
        })
        if (passIt) {
            console.log('最近消息中发送过post card，不重复发送')
            return false
        }
        console.log('发送房源卡片：', postId)
        timClient.sendPostCardMessage(_this.data.toUserId, _this.data.toPostId).then((msg) => {
            // 追加一条
            var msgs = _this.data.currentMessages
            msgs.push(msg)
            _this.setData({ currentMessages: msgs })
        })
    },


    loadMoreMessages: function () {
        // 加载历史记录
        var _this = this
        if (this.data.messagesIsCompleted) {
            console.log('历史消息已加载完成，不能重复加载')
            return false
        }
        this.setData({ loadingMore: true })
        setTimeout(() => {
            _this.setData({ loadingMore: false })
        }, 10000);

        timClient.getMessageList(this.data.toUserId, this.data.pageSize, this.data.nextReqMessageID).then(function (resp) {
            console.log('加载历史聊天记录', resp)
            // 历史消息要往数组的前部添加
            //1, 先将数组边长
            if (resp.code != 0) {
                wx.showToast({
                    title: '加载消息时出错',
                    icon: 'none',
                    image: '',
                });
                return false
            }
            var messages = resp.data.messageList
            var oldMessages = messages.concat(_this.data.oldMessages)

            var data = {
                loadingMore: false,
                oldMessages: oldMessages,
                messagesIsCompleted: resp.data.isCompleted == true,
                nextReqMessageID: resp.data.nextReqMessageID,
            }
            _this.setData(data)
        })

    },



    sendHandle: function (event) {
        // 刷新消息列表
        // 追加到最新消息
        var msg = event.detail
        var msgs = this.data.currentMessages
        //  对方有几次没有回复消息
        var c = this.data.unReplyCounter + 1
        console.log('msg is', msg)
        console.log('msgs is ', msgs)
        msgs.push(msg)
        this.setData({ currentMessages: msgs, unReplyCounter: c })
        // 滚动到最新消息
        this.checkAutoReply()
        this.scrollBottom()
    },

    wechatHandle: function () {
        // 发送微信联系卡片
        var _this = this
        app.request({
            url: '/api/v1/tim/wechat',
            data: { target_user_id: _this.data.toUserId },
            success: function (resp) {
                if (resp.data.status == 1) {
                    wx.showToast({
                        title: resp.data.data,
                        icon: 'none',
                    });

                }
                // done
            }
        })
    },

    welcomHandle: function () {
        // 首次进入，发送欢迎语
        var _this = this
        var c = this.data.currentMessages.length
        if (c > 1) {
            return false
        }
        console.log('触发自动欢迎语')
        app.request({
            url: '/api/v1/tim/welcome',
            data: { target_user_id: _this.data.toUserId },
            success: function (resp) {
                // done
            }
        })
    },

    checkAutoReply: function () {
        // 延迟回复
        // 根据计数器判断，是否需要自动回复
        var _this = this
        var max = 2
        var c = this.data.unReplyCounter || 0
        if (c < max) {
            return false
        }
        // 如果已经自动回复过，就不要重复自动回复
        console.log('触发自动回复')
        app.request({
            url: '/api/v1/tim/autoreply',
            hideLoading: true,
            data: { target_user_id: _this.data.toUserId },
            success: function (resp) {
                // done
                _this.setData({ unReplyCounter: 0 })
            }
        })
    },


    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

// pages/messages/index.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        senderId: null,
        targetUserInfo: null, // 对方信息
        messages: [],
        lastId: null,
        iidKey: 'messages.show.interval.id',
        firstId: null,
        newMessageId: 0,
        user: {},
        polling: false,
        sleepTime: 60 * 1000,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        this.setData({
            targetUserId: q.target_user_id
        })


        auth.ensureUser(function (user) {
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
                var pid = q.target_post_id || q.post_id
                _this.sendPostCard(pid)
                _this.setData({ user: user })
                _this.stopInterval()
                _this.startInterval()
            }
        })
    },

    sendPostCard: function(postId){
        if(!postId){
            return
        }

        var data = {receiver_id: this.data.targetUserId, id: postId}
        app.request({
          url: '/api/v2/posts/hello',
          hideLoading: true,
          data: data,
          success: function(resp){ },

        })

  
    },

    scrollToBottom: function () {
        // 滚动到页面底部
        wx.getSystemInfo({
            success(res) {
                wx.pageScrollTo({
                    scrollTop: res.windowHeight,
                })
            }
        })
    },

    startInterval: function () {
        // 开启定时器，并防止重复
        var _this = this
        var key = this.data.iidKey
        var t = 1000
        var iid = setInterval(_this.loadData, t)
        wx.setStorageSync(key, iid)
        console.log('开启定时器，刷新聊天内容', t)
    },

    stopInterval: function () {
        // 退出后要关闭定时器
        var iid = wx.getStorageSync(this.data.iidKey)
        if (iid) {
            clearInterval(iid)
            wx.setStorageSync(this.data.iidKey, null)
            console.log('已停止定时器')
        }
    },

    markMessageId: function (i) {
        // 处理消息ID的标记
        var lastId = this.data.lastId || 0
        var firstId = this.data.firstId || null
        if (i > lastId) {
            this.setData({ lastId: i })
            console.log('last id is ', this.data.lastId)
        }
        if (!firstId || i < firstId) {
            this.setData({ firstId: i })
            console.log('first id is ', this.data.firstId)
        }
    },

    saveMessage: function (message) {
        // 将每一条消息内容都缓存起来，只需维护一个消息内容的id列表即可
        wx.setStorageSync('message.' + message.id, message)
    },

    sendHandle: function (value) {
        //  记录最新消息ID
        this.setData({ newMessageId: value.detail.id })
        // 发送成功处理
        this.saveMessage(value.detail)
        // 刷新消息列表
        this.loadData()
    },

    loadOld: function () {
        // 加载旧的聊天列表
        var _this = this
        app.request({
            url: '/api/v1/messages',
            method: 'GET',
            data: {
                target_id: _this.data.targetUserId,
                first_id: _this.data.firstId,
                ranking: 'older',
            },
            success: function (resp) {
                if (resp.data.status != 0) {
                    return false
                }
                var messages = resp.data.data
                if (messages.length == 0) {
                    return
                }

                var items = _this.data.messages
                items.unshift(messages)
                _this.setData({ messages: items })
            },
        })
    },


    loadData: function () {
        var _this = this
        app.request({
            url: '/api/v1/messages',
            method: 'GET',
            hideLoading: true,
            data: {
                last_id: _this.data.lastId,
                target_id: _this.data.targetUserId,
                ranking: 'newer',
            },
            success: function (resp) {
                if (resp.data.status != 0) {
                    console.log('return false')
                    return false
                }

                var d = {}
                var items = resp.data.data
                
                items.forEach(function (message, i) {
                    _this.saveMessage(message)
                    _this.markMessageId(message.id)
                })
                var len = _this.data.messages.length
                var k = 'messages[' + len + ']'
                d[k] = items.reverse()
                d['sleepTime'] = resp.data.sleep
                d.targetUserInfo = resp.data.target_user_info
                _this.setData(d, () => {
                    _this.scrollToBottom()
                })
              
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({ polling: true })
        this.loadData()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.stopInterval()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.stopInterval()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.loadOld()
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

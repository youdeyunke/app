// pages/messages/index.js
const app = getApp()
var auth = require('../../utils/auth.js');
var timClient = require('../../tim/index.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        isLogin: false,
        sleepTime: 1000,
        showActions: false,
        currentChatIndex: null,
        iid: null,
        actions: [
            {
                name: '删除聊天',
                color: '#ff0000',
                key: 'delete',
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (query) {
        wx.setNavigationBarTitle({ title: '我的聊天列表' })
        // 当sdkready后，加载数据
        var _this = this
        timClient.tim.on(timClient.TIM.EVENT.CONVERSATION_LIST_UPDATED, _this.chatListUpdateHandle)
    },

    gotoDetail: function (e) {
        // 短按进入聊天对话窗口
        var i = e.currentTarget.dataset.index
        var item = this.data.items[i]
        var uid = item.conversationID.split('.')[1]
        var url = '/pages/messages/show?target_user_id=' + uid
        wx.navigateTo({ url: url, });
    },

    actionsHandle: function (e) {
        // 长按弹出操作菜单  
        console.log('e', e)
        var i = e.currentTarget.dataset.index
        this.setData({ showActions: true, currentChatIndex: i })
    },


    deleteHandle: function () {
        // 删除这个会话
        var item = this.data.items[this.data.currentChatIndex]
        var cid = item.conversationID

        wx.showModal({
            title: '操作提示',
            content: '你确定要删除这个聊天吗？删除后聊天记录不会被清空。',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定删除',
            confirmColor: '#ff0000',
            success: (result) => {
                if (!result.confirm) {
                    return false
                }
                wx.showLoading({
                    title: '删除中...',
                    mask: true,
                });


                timClient.deleteConversation(cid).then((res) => {
                    wx.hideLoading();
                    wx.showToast({
                        title: '已删除',
                    });
                })
            },
        });

    },

    chatListUpdateHandle: function (event) {
        console.log('tim sdk 对话列表更新', event)
        this.setData({ items: event.data })
    },

    loadChatList: function () {
        var _this = this
        // 只有当sdk处于ready状态才可以调用方法
        if (!timClient.readyStatus) {
            console.log('tim sdk not ready, load chat list 失败， 1s后重试')
            setTimeout(_this.loadChatList, 1000)
        }

        // 未读数
        var p = timClient.tim.getConversationList()
        if (!p) {
            return
        }

        p.then((resp) => {
            var count = 0
            console.log('load chat list', resp.data.conversationList)
            if (resp.code != 0) {
                return false
            }
            _this.setData({
                items: resp.data.conversationList
            })
            wx.stopPullDownRefresh()

        }).catch((error) => {
            console.log('load chat list error', error)
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
        var _this = this
        var userInfo = app.globalData.userInfo
        if (userInfo) {
            setTimeout(this.loadChatList, 500)
            // 进入到聊天列表页面，就清空小红点
        }
        this.setData({ userInfo: userInfo })

    },

    actionSelectHandle: function (e) {
        console.log('e', e)
        var act = e.detail.key
        var _this = this
        switch (act) {
            case 'delete':
                _this.deleteHandle()
        }
    },

    actionsCloseHandle: function () {
        this.setData({ showActions: false, currentChatIndex: null })
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
        this.loadChatList()
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

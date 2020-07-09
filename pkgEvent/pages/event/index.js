// pkgEvent/pages/event/index.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cats: [],
        currentCatIndex: 0,
        loading: true,
        postId: null,
        items: [],
        post: null,
        user: null,
        broker: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({ postId: q.id })
        this.loadData()
    },

    catClickHandle: function (e) {
        var i = e.currentTarget.dataset.index
        this.setData({
            currentCatIndex: i,
            items: [],
            loading: true,
        })
        this.loadData()
    },

    loadData: function () {
        this.setData({ loading: true })
        var _this = this
        var catId = ''
        if (this.data.currentCatIndex >= 1) {
            catId = this.data.cats[this.data.currentCatIndex].id
        }

        var query = {
            post_id: this.data.postId,
            cat_id: catId,
        }
        app.request({
            url: '/api/v1/events',
            data: query,
            success: function (resp) {
                var post = resp.data.data.post
                _this.setData({
                    loading: false,
                    items: resp.data.data.items,
                    post: post,
                    broker: resp.data.data.broker,
                    user: app.globalData.userInfo,
                    cats: resp.data.data.cats,
                })
                var title = post.title + '的楼盘动态'
                wx.setNavigationBarTitle({
                    title: title,
                });

            }
        })
    },

    callHandle: function () {
        var m = this.data.broker.mobile
        wx.makePhoneCall({
            phoneNumber: m,
        })
    },

    deleteHandle: function (e) {
        // 删除动kk
        if (!this.data.user) {
            console.log('no user')
            return false
        }

        if (this.data.user.id != this.data.broker.id) {
            return false
        }

        var _this = this
        var eid = e.currentTarget.dataset['id']
        app.request({
            url: '/api/v1/events/' + eid,
            method: 'DELETE',
            success: function (resp) {
                if (resp.data.status != 0) {
                    return false
                }
                _this.loadData()
                setTimeout(function () {
                    wx.showToast({
                        title: '已删除',
                        icon: 'none',
                    })

                }, 1500)

            }
        })
    },


    tipsHandle: function () {
        var content = "楼盘动态资讯内容，旨在满足广大用户的信息需求而采集提供，如有异议请及时与我们联系。页面所载内容不代表本网站之观点或意见，仅供用户参考与借鉴，最终以政府网站或开发商实际公示为准，用户在购房时需慎重查验开发商的证件信息。"
        wx.showModal({
            title: '免责声明',
            content: content,
            showCancel: false,
            confirmText: '知道了',
            confirmColor: '#1989FA',
        });

    },

    chatHandle: function () {
        var _this = this
        auth.ensureUser(function (user) {
            // 不能和自己聊天
            if (user.id == _this.data.broker.id) {
                wx.showToast({ icon: 'none', title: '不能和自己聊天' })
                return false
            }
            return _this._chatHandle()
        })
    },

    _chatHandle: function () {
        // 先调用打招呼接口
        wx.showLoading({ title: '正在打开', icon: 'none', mask: true })
        var pid = this.data.postId
        var brokerId = this.data.broker.id
        var _this = this
        app.request({
            url: '/api/v2/posts/hello?id=' + pid + '&receiver_id=' + brokerId,
            success: function (resp) {
                if (resp.data.status == 0) {
                    // 跳转到消息列表
                    wx.navigateTo({
                        url: '/pages/messages/show?target_user_id=' + brokerId,
                    })
                }
            },
            complete: function () {
                wx.hideLoading()
            },
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
        // 检查一些是否管理登陆了
        if (this.data.user) {
            return false
        }
        var user = app.globalData.userInfo
        this.setData({ user: user })
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
        var _this = this
        var title = this.data.post.title + '的动态更新啦，快点击查看'
        var image = this.data.post.cover
        return {
            title: title,
            path: 'pkgEvent/pages/event/index?id=' + _this.data.postId,
            imageUrl: image
        }

    }
})
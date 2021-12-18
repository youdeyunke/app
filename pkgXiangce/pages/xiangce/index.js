// pkgXiangce/pages/xiangce/index.js
var auth = require('../../../utils/auth.js');
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        cats: [],
        scrollIntoView: '',
        t0: null,
        postId: null,
    },

    tabChange: function (e) {
        // 点击顶部标签切换，滚动到指定未知
        var index = e.detail.index
        var cat = this.data.cats[index]
        wx.setNavigationBarTitle({
          title: cat.name,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var postId = q.id || q.post_id
        var _this = this
        this.setData({
            postId: postId,
            loading: true,
            cats: [],
            height: app.globalData.system.windowHeight,
        }, (res) => {
            _this.loadData()
            _this.loadPostInfo()
        })
    },


    loadData: function () {
        wx.showLoading({
            title: '加载中...',
            mask: true,
        });

        var query = { post_id: this.data.postId }
        var _this = this
        app.request({
            url: '/api/v1/media_cats',
            data: query,
            success: function (resp) {
                var cats = resp.data.data.filter((cat) => { 
                    if(cat.media_items.length == 0){
                        return false 
                    }
                    return true 
                }).map((cat) => { 
                    cat.name = cat.name + '(' + cat.media_items.length + ')'
                    return cat
                })
                _this.setData({
                    cats: cats, 
                })
                wx.hideLoading();
            }
        })

    },

    loadPostInfo: function(){
        var _this = this  
        app.request({
            url: '/api/v1/post_base_info/' + this.data.postId, 
            success: function(resp){ 
                var post = resp.data.data 
                var pageTitle = post.title + '的相册'
                _this.setData({post: post , pageTitle: pageTitle })
            }
        })
    },

    bookingHandle: function (e) {
        var _this = this
        auth.ensureUser(function (user) {


            // 去绑定用户手机号
            if (!user.mobile) {
                app.bindPhoneNumber(e, function (mobile) {
                    _this.selectComponent('#booking').openHandle()
                })
            } else {
                _this.selectComponent('#booking').openHandle()
            }
        })
    },


    callHandle: function () {
        var m = this.data.post.broker.mobile
        wx.makePhoneCall({
            phoneNumber: m,
        })
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
        var pid = this.data.post.id
        var brokerId = this.data.broker.id
        var _this = this
        app.request({
            url: '/api/v1/posts/hello?id=' + pid + '&receiver_id=' + brokerId,
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
        var t = new Date().getTime()
        this.setData({ t0: t, })
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
        var t1 = new Date().getTime()
        var t = t1 - this.data.t0
        app.markVisitorAction('浏览:' + this.data.pageTitle , null, t)
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

        // 下拉刷新
        this.setData({
            loading: true,
            cats: [],
            scrollIntoView: ''
        })

        this.loadData()

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    onShareTimeline: function () {
        return {
            title: this.data.pageTitle, 
            imageUrl: this.data.post.cover,
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var path = 'pkgXiangce/pages/xiangce/index?id=' + this.data.postId
        var title = this.data.pageTitle
        return {
            imageUrl: this.data.post.cover, 
            path: path, 
            title: title, 
        }

    }
})

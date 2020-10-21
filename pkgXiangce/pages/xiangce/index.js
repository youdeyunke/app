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
        postId: null,
    },

    tabChange: function (e) {
        console.log('e', e)
        // 点击顶部标签切换，滚动到指定未知
        var index = e.detail.index
        var cat = this.data.cats[index]
        var loc = 'loc-' + cat.id
        this.setData({
            scrollIntoView: loc
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
                _this.setData({ 
                    cats: resp.data.data,
                    post: resp.data.post,
                 })
                wx.hideLoading();
                wx.setNavigationBarTitle({
                  title:  resp.data.post.title + '的相册',
                })
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var path = 'pkgXiangce/pages/xiangce/index?id=' + this.data.postId
        var title = this.data.post.title + ' 的相册 -  房小牛'
        return {
            path: path, title: title
        }

    }
})

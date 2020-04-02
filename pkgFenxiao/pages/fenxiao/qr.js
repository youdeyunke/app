// pkgFenxiao/pages/fenxiao/qr.js
const app = getApp()
var auth = require('../../../utils/auth.js');
Page({

    /**
     * 页面的初始数据
     */

    data: {
        totalCount: null,
        loadingReferrers: true,
        loading: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        // 生成qr
        wx.setNavigationBarTitle({
            title: '我的专属邀请码',
            fail: () => { },
            complete: () => { }
        });
        this.loadReferrers()

    },

    gotoReferrers: function () {
        wx.navigateTo({
            url: '/pkgFenxiao/pages/fenxiao/referrers',
        });

    },

    showTips: function () {
        wx.showModal({
            title: '专属二维码怎么使用？',
            content: '通过您的专属二维码扫码注册的新用户，将自动绑定为您的下级团队(即您的一级下线)',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                if (result.confirm) {

                }
            },
            fail: () => { },
            complete: () => { }
        });

    },

    loadReferrers: function () {
        // 查询一共邀请了多少人注册
        var _this = this
        var query = { per_page: 99999, scope: 'level1' }
        app.request({
            url: '/api/v1/referrers/',
            data: query,
            success: function (resp) {
                _this.setData({
                    totalCount: resp.data.data.length,
                    loadingReferrers: false,
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
        var _this = this
        auth.ensureUser((user) => {
            _this.setData({ user: user, loading: true })
            wx.showLoading({
                title: '正在生成',
                mask: true,
            });
            var path = 'pages/myself/index?referrer_id=' + user.id
            app.genQr(path, function (data) {
                _this.setData({ qr: data.qr, loading: false })
                wx.hideLoading();
            })

        })
    },

    saveQr: function (e) {
        var url = this.data.qr
        app.downloadImage(url, function (res) {
            // done
        })
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
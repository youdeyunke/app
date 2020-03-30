// pkgFenxiao/pages/fenxiao/qr.js
const app = getApp()
var auth = require('../../../utils/auth.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        // 生成qr
        wx.setNavigationBarTitle({
            title: '我的邀请码',
            fail: () => { },
            complete: () => { }
        });

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
// pages/need/show.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageLoading: true,
        user: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var id = q.id
        this.setData({ id: q.id })
        this.loadData()

    },

    formidHandle: function (e) {
        app.uploadFormid(e)
    },

    _hold: function (name) {
        var _this = this
        var msg = ''
        switch (name) {
            case 'hold_on':
                msg = '抢单成功'
                break
            case 'hold_off':
                msg = '已取消'
                break
        }
        app.request({
            url: '/api/v1/needs/' + _this.data.id,
            method: 'PUT',
            data: { myaction: name },
            success: function (resp) {
                // success
                if (resp.data.status == 0) {
                    _this.loadData()
                    wx.showToast({
                        mask: true,
                        icon: 'none',
                        duration: 3000,
                        title: msg
                    })
                }
            },
        })
    },

    holdOn: function (e) {
        this._hold('hold_on')
    },

    holdOff: function (e) {
        this._hold('hold_off')
    },

    tipsHandle: function (e) {
        this.setData({ showTips: true })
    },

    tipsClose: function (e) {
        this.setData({ showTips: false })
    },

    callHandle: function (e) {
        var _this = this
        wx.makePhoneCall({
            phoneNumber: _this.data.need.contact_mobile
        })
    },

    loadData: function () {
        var _this = this
        app.request({
            url: '/api/v1/needs/' + _this.data.id,
            success: function (resp) {
                _this.setData({
                    need: resp.data.data,
                    pageLoading: false,
                })
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
        var _this = this
        auth.ensureUser(function (user) {
            _this.setData({ user: user })

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

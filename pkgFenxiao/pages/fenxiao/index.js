// pages/admin/index.js
const app = getApp()
var auth = require('../../../utils/auth.js');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        balanceInfo: { amount: 0, tixian: 0 },
        menuItems: [
            { name: '报备客户', icon: 'add-square', color: '#0ddb0c', url: '/pkgFenxiao/pages/fenxiao/report' },
            { name: '历史报备', icon: 'friends', color: '#4184AF', url: '/pkgFenxiao/pages/fenxiao/customers' },
            { name: '我的团队', icon: 'cluster', color: '#ff9501', url: '/pkgFenxiao/pages/fenxiao/referrers' },
            { name: '申请提现', icon: 'bill', color: '#acdb0c', url: '/pkgFenxiao/pages/fenxiao/withdraw' },
            { name: '邀请码', icon: 'qr', color: '#4184af', url: '/pkgFenxiao/pages/fenxiao/qr' },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
    },

    loadBalanceInfo: function () {
        var _this = this
        app.request({
            url: '/api/v1/balances/info',
            success: function (resp) {
                if (resp.data.status == 0) {
                    console.log('balance info resp', resp)
                    _this.setData({
                        balanceInfo: resp.data.data
                    })
                }
            }
        })
    },

    menuItemClickHandle: function (e) {
        var _this = this
        var index = e.currentTarget.dataset.index
        var item = this.data.menuItems[index]
        var user = this.data.userInfo
        var url = item.url
        wx.navigateTo({
            url: url,
        })
    },

    genQr: function () { },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    formidHandle: function (e) {
        app.uploadFormid(e)
    },

    checkFormids: function (e) {
        var _this = this
        app.request({
            url: '/api/v1/formid', success: function (resp) {
                if (resp.data.status == 1) {
                    return false;
                }
                var c = resp.data.data.count || 0
                console.log('enable form ids count', c)
            }
        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var ext = app.globalData.EXT
        var _this = this
        auth.ensureUser(function (user) {
            _this.setData({ userInfo: user })
            _this.loadBalanceInfo()
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
        this.loadBalanceInfo()
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
        return {
            title: '一键注册，分销赚佣金',
            desc: '',
            path: 'pages/myself/index?referrer_id=' + _this.data.userInfo.id,
            imageUrl: '',
        }
    },

})

// pkgWallet/pages/wallet/recharge.js
const app = getApp()
const walletApi = require('../../../api/balance.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        amount: 0,
        name: '',
        showButton: true,
        minAmount: 0.1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        if (q.amount) {
            this.setData({ amount: q.amount })
        }
    },

    amountInput: function (e) {
        var v = e.detail.value
        this.setData({ amount: v })
    },

    gotoPay: function (e) {
        var _this = this
        var amount = this.data.amount || 0
        if (amount < this.data.minAmount) {
            wx.showToast({
                title: '充值金额不得少于' + _this.data.minAmount + '元',
                icon: 'none',
            });

            return false
        }

        // 请求微信支付签名，自动唤起微信支付
        wx.showLoading()
        walletApi.createBalance(amount).then((resp) => {
            // pass
            if(resp.data.code == 0){
              // 回退
              wx.navigateBack();
            }
            wx.hideLoading();
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
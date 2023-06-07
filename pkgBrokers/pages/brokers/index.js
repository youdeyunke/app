// pkgBrokers/Pages/Brokers/index.js
const app = getApp()
const brokerApi = require("../../../api/broker")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ranking: ''
    },
    LoadHandle() {
        var _this = this
        // √
        brokerApi.getBrokerList({

        }).then((res) => {
            _this.setData({
                ranking: res.data.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.LoadHandle()
        wx.setNavigationBarTitle({
            title: '置业顾问排行榜'
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
        this.LoadHandle()
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
        return {
            title: '置业顾问排行榜',
        }
    }
})
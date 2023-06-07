// pkgBroker/pages/broker/selector.js

const app = getApp()
const brokerApi = require("../../../api/broker")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        kw: '',
        pid: ''
    },

    kwChange: function (e) {
        this.loadData()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var _this = this
        this.setData({
            pid: options.pid
        }, () => {
            _this.loadData()
        })
    },

    itemClick: function (e) {
        const {
            index
        } = e.currentTarget.dataset
        var broker = {
            id: this.data.brokers[index].user_id,
            name: this.data.brokers[index].name,
            mobile: this.data.brokers[index].mobile
        }
        var ch = this.getOpenerEventChannel()
        if (ch) {
            ch.emit("change", broker)
        }
        wx.navigateBack({
            delta: 1,
        })
    },

    loadData() {
        var _this = this
        var query = {
            post_ids: this.data.pid,
            kw: this.data.kw,
        }
        // √
        brokerApi.getBrokerList(query).then((resp) => {
            _this.setData({
                brokers: resp.data.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
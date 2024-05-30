/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// pages/qr/show.js
const app = getApp()
const qrApi = require("../../api/qr")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        qid: null,
        loading: true,
        error: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        wx.showLoading({
            title: '正在解析二维码，请稍后',
        })
        this.loadData(q.id)

    },

    goHome: function () {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },

    loadData: function (qid) {
        var _this = this
        qrApi.getQrDetail(qid).then((resp) => {
            if (resp.data.status != 0) {
                _this.setData({
                    loading: false,
                    error: true,
                })
                return
            }
            _this.setData({
                loading: false,
                error: false,
            })

            var qr = resp.data.data
            // 更多参数  qr.data
            if (qr && qr.data && qr.data.bindBrokerId) {
                var _id = wx.getStorageSync('bindBrokerId')
                if (!_id) {
                    console.log('通过二维码获取到了拓客参数，bindBrokerId', qr.data)
                    wx.setStorageSync('bindBrokerId', qr.data.bindBrokerId)
                }
            }
            wx.reLaunch({
                url: qr.path,
            })
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
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
// pages/cities/select.js
const app = getApp()
const cityApi = require("../../api/city")

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    loadData () {
        var _this = this
        //   √
        cityApi.getCityListV6(

        ).then((resp) => {
            _this.setData({
                cities: resp.data.data
            })
        })
    },

    citySelect (e) {
        console.log(e.currentTarget.dataset.adcode)
        var adcode = e.currentTarget.dataset.adcode
        wx.setStorageSync('cityCode', adcode)
        wx.reLaunch({
            url: '/pages/home/home',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadData()
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
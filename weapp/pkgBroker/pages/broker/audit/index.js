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
// pkgBroker/pages/broker/audit/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        state: 'ok',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    submitHandle: function () {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },
    onLoad: function (options) {
        var item = options
        this.setData({
            state: item.status
        })
        wx.setNavigationBarTitle({
            title: '置业顾问入驻',
        })
    },

    gotoHomepage: function () {
        var user = app.globalData.userInfo
        var url = '/pkgBroker/pages/broker/profile?id=' + user.id
        wx.redirectTo({
            url: url,
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
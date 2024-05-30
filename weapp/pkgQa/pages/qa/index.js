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
// pages/qa/index.js
const app = getApp()
const qaApi = require("../../../api/qa")

Page({
    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        per_page: 20,
        items: [],
        loading: true,
        user_id: '',
        pageTitle: '全部提问',
        primaryBtnColor: "#ff9600",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({
            target_id: q.target_id || '',
            target_type: q.target_type || '',
            user_id: q.user_id || '',
            primaryBtnColor:  app.globalData.myconfigs.color.primary_btn,
        })
        this.loadItems()

    },

    loadItems: function () {
        this.setData({
            loading: true
        })
        var _this = this
        var data = {
            target_id: _this.data.target_id,
            target_type: _this.data.target_type,
            user_id: _this.data.user_id,
            page: _this.data.page,
            per_page: _this.data.per_page,
        }
        qaApi.getAnswerList(data).then((res) => {
            var d = {
                loading: false
            }
            res.data.data.forEach(function (item, i) {
                var index = _this.data.items.length + i
                var k = "items[" + index + "]"
                d[k] = item
            })

            _this.setData(d)
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
        if (this.data.items.length == 0) {
            return false
        }

        // 下拉加载更多
        wx.showNavigationBarLoading()
        var _this = this
        _this.setData({
            items: [],
            page: 1,
            loading: true
        })
        _this.loadItems(function () {
            wx.hideLoading()
            wx.hideNavigationBarLoading()
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.items.length == 0) {
            return false
        }

        var _this = this
        this.setData({
            page: _this.data.page + 1
        })
        _this.loadItems()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
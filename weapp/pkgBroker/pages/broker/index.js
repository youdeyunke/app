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
// pages/broker/index.js
const app = getApp()
const brockerApi = require("../../../api/broker")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        kw: '',
        per_page: 50,
        items: [],
        loading: true,
        postId: null,
        // brokers:''
        primaryBtnColor: "#ff9600",

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({
            postId: q.post_id,
            primaryBtnColor: app.globalData.myconfigs.color.primary_btn,
        }, () => {
            this.loadData()
        })
        wx.setNavigationBarTitle({
            title: '置业顾问',
        })
    },

    searchTextInput: function (e) {
        this.setData({
            kw: e.detail
        })
    },

    doSearch: function (e) {
        var _this = this
        this.setData({
            loading: true,
            items: [],
            page: 1
        }, function () {
            _this.loadData()
        })
    },

    clearSearch: function (e) {
        this.setData({
            kw: '',
            loading: true,
            items: [],
            page: 1
        })
        this.loadData()
    },

    loadData: function () {
        this.setData({
            loading: true
        })
        var _this = this
        var query = {
            order: 'id desc',
            kw: _this.data.kw,
            page: _this.data.page,
            per_page: _this.data.per_page,
        }
        if (this.data.postId) {
            query.post_id = this.data.postId
        }
        // √
        brockerApi.getBrokerList(
            query
        ).then((resp) => {
            var i = query['page'] - 1
            var data = {
                loading: false
            }
            if (i > 0) {
                var key = 'items[' + i + ']'
                data[key] = resp.data.data.result
            } else {
                data['items'] = [resp.data.data.result]
            }
            _this.setData(data)
            console.log('data is', data, resp.data.data.result)
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
        var p = this.data.page + 1
        this.setData({
            page: p,
            loading: true
        })
        this.loadData()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
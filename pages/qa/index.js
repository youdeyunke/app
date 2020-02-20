// pages/qa/index.js
const app = getApp()
var util = require('../../utils/util.js');
var auth = require('../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        per_page: 20,
        items: [],
        loading: true,
        pageTitle: '问答咨询',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.loadItems()
        var _this = this
    },


    loadItems: function () {
        // 加载全部问答数据
        this.setData({ loading: true })
        var _this = this
        app.request({
            url: '/api/v1/questions/',
            data: {
                page: _this.data.page,
                per_page: _this.data.per_page,
            },
            success: function (res) {
                var d = { loading: false }
                res.data.data.forEach(function (item, i) {
                    var index = _this.data.items.length + i
                    var k = "items[" + index + "]"
                    item['created_at_pretty'] = util.prettyTime(item['created_at'])
                    item['updated_at_pretty'] = util.prettyTime(item['updated_at'])
                    d[k] = item
                })
                _this.setData(d)
            }
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
        _this.setData({ items: [], page: 1, loading: true })
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

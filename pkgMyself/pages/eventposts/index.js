// pages/myself/favposts.js
const app = getApp()
const eventApi = require("../../../api/event")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        posts: [],
        limit: 100000,
        hasMore: true,
        page: 1,
        per_page: 5,
    },

    loadData: function () {
        var _this = this
        this.setData({
            isEmpty: false, loading: true
        })

        if (this.data.isEnd) {
            return false
        }

        var query = {
            page: _this.data.page || 1,
            per_page: _this.data.per_page || 10,
        }
        // 有待检测
        // app.request({
        //     url: '/api/v1/event_followers/mine有待检测',
        //     data: query,
        //     hideLoading: true,
        //     success: function (resp) {
        //     }
        // })
        eventApi.getMineFollowPostList(query).then((resp)=>{
            var d = { loading: false }
            if (resp.data.data.length == 0) {
                d.hasMore = false
            } else {
                var i = _this.data.page - 1
                var k = "posts[" + i + "]"
                d[k] = resp.data.data
            }
            if (resp.data.data.length == 0) {
                d['isEnd'] = true
                if (_this.data.page == 1) {
                    d['isEmpty'] = true
                    d['isEnd'] = false
                }
            }
            _this.setData(d)
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '我的订阅',
        })
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
        var _this = this
        this.setData({
            page: _this.data.page + 1
        })
        this.loadData()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

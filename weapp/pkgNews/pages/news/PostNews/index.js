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
const app = getApp()
const newsApi = require("../../../../api/news")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        per_page: 8,
        active: 0,
        isEmpty: false,
        isEnd: false,
        loading: false,
        cats_key: 'news.cats',
        news: [],
        post_id: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        var postId = q.post_id || ''
        wx.setNavigationBarTitle({ title: '头条' })
        this.setData({
            post_id: postId
        }, () => {
            _this.loadNews()
        })

    },

    onShow: function () {
    },

    loadNews: function () {
        var _this = this
        this.setData({
            isEmpty: false
        })

        if (this.data.isEnd) {
            return false
        }

        this.setData({
            loading: true
        })
        var query = {
            post_id: _this.data.post_id,
            page: _this.data.page,
            per_page: _this.data.per_page
        }
        // √
        newsApi.getNewsList(query).then((resp) => {
            var index = _this.data.page - 1
            var key = 'news[' + index + ']'
            var data = {
                loading: false,
            }

            if (resp.data.data.length == 0) {
                data['isEnd'] = true
                if (_this.data.page == 1) {
                    data['isEmpty'] = true
                    data['isEnd'] = false
                }
            }

            data[key] = resp.data.data
            _this.setData(data)
            // console.log('set data', data)
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
        var _this = this
        this.setData({
            news: [],
            isEmpty: false,
            isEnd: false,
            page: 1,
        })
        this.loadNews()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var _this = this
        this.setData({
            page: _this.data.page + 1
        })
        this.loadNews()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

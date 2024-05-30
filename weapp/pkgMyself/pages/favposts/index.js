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
// pages/myself/favposts.js
const app = getApp()
const postApi = require("../../../api/post")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        posts: [],
        limit: 100000,
        hasMore: true,
        page: 1,
        per_page: 10,
        favType: 'post',
        primaryColor: null,
    },

    favTypeChange(e){
      var _this = this
      this.setData({
        favType: e.detail.name,
        page: 1,
        per_page: 10,
        posts: [],
      },()=>{
        _this.loadData()
      })
    },

    loadData: function () {
        var _this = this
        this.setData({
            isEmpty: false,
            loading: true
        })

        if (this.data.isEnd) {
            return false
        }

        var query = {
            page: _this.data.page || 1,
            per_page: _this.data.per_page || 10,
            target_type: _this.data.favType
        }
        //   √
        postApi.getFavPosts(query).then((resp) => {
            var d = {
                loading: false
            }
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
            title: '我的收藏',
        })
        this.loadData()
        var color  = app.globalData.color
        this.setData({
          primaryColor: color.primary || '#9e1d1d',
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
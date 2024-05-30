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
// pages/qa/mine.js
const app = getApp()
const myselfApi = require("../../../api/myself")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        scopes: [
            { label: '我的提问', count: 0, value: 'created_by_me' },
            { label: '我的关注', count: 0, value: 'followed_by_me' },
            { label: '我的回答', count: 0, value: 'answered_by_me' },
        ],
        items: [],
        loading: true,
        page: 1,
        per_page: 20,
        primaryColor: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '我的问答',
        })
        var color  = app.globalData.color
        this.setData({
          primaryColor: color.primary || '#9e1d1d',
      })
      var _this = this
      this.setData({ items: [], page: 1 },() => {
        _this.loadData()
      })
    //   this.loadData()
    },


    scopeChange: function (e) {
        var i = e.detail.name
        var scope = this.data.scopes[i]
        this.setData({
            scope: scope.value,
            items: [],
            loading: true,
            page: 1,
        })
        this.loadData()
    },


    loadData: function () {
        var _this = this
        var scope = _this.data.scope || 'created_by_me'
        var itemsLen = this.data.items.length || 0
        var data = {
            scope: scope,
            page: _this.data.page,
            per_page: _this.data.per_page
        }
        myselfApi.getMyselfQuestionList(data).then((resp) => {
            if (resp.data.status != 0) {
                _this.setData({ loading: false })
                return false
            }
            var data = {
                loading: false,
                scopes: resp.data.data.scopes,
            }
            resp.data.data.items.forEach((item, i) => {
                var index = itemsLen + i
                var key = 'items[' + index + ']'
                data[key] = item
            })
            _this.setData(data)
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh() //停止下拉刷新    
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
        console.log('onshow')

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
        wx.showLoading()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var page = this.data.page + 1
        this.setData({
            page: page,
            loading: true,
        })
        this.loadData()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

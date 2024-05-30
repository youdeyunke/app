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
// pkgXiangce/pages/xiangce/index.js
var auth = require('../../../utils/auth.js');
const app = getApp()
const postApi = require("../../../api/post")
const brokerApi = require("../../../api/broker")
const mediaApi = require("../../../api/media")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        cats: [],
        scrollIntoView: '',
        t0: null,
        postId: null,
        primaryColor: '#1989fa',
        primaryBtnColor: "#ff9600",
        secondaryBtnColor: "#3a67c0",
    },

    tabChange: function (e) {
        // 点击顶部标签切换，滚动到指定未知
        var index = e.detail.index
        var cat = this.data.cats[index]
        wx.setNavigationBarTitle({
            title: cat.name,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {

        var _this = this
        this.setData({
            targetType: q.target_type || 'post',
            targetId: q.target_id,
            postId: q.target_id,
            loading: true,
            cats: [],
            height: app.globalData.system.windowHeight,
            primaryColor: app.globalData.myconfigs.color.primary || '#1989fa',
            primaryBtnColor: app.globalData.myconfigs.color.primary_btn || '',
            secondaryBtnColor: app.globalData.myconfigs.color.secondary_btn || '',
        }, (res) => {
            _this.loadData()
            // this.loadPostBrokerInfo(q.target_id)
            //_this.loadPostInfo()
        })
    },

    loadPostBrokerInfo: function (pid) {
        var _this = this
        var query = {
            post_id: pid
        }
    },

    loadData: function () {
        wx.showLoading({
            title: '加载中...',
            mask: true,
        });

        var query = {
            target_type: this.data.targetType,
            target_id: this.data.targetId,
        }
        var _this = this
        mediaApi.getMediaCatList(query).then((resp) => {
            var cats = resp.data.data.filter((cat) => {
                if (cat.media_items.length == 0) {
                    return false
                }
                return true
            }).map((cat) => {
                cat.name = cat.name + '(' + cat.media_items.length + ')'
                return cat
            })
            _this.setData({
                cats: cats,
            })
            wx.hideLoading();
        })
    },

    loadPostInfo: function () {
        var _this = this
        // ？？  此处未调用
        postApi.getPostBaseInfo(
            this.data.postId
        ).then((resp) => {
            var post = resp.data.data
            var pageTitle = post.title + '的相册'
            _this.setData({
                post: post,
                pageTitle: pageTitle
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
        var t = new Date().getTime()
        this.setData({
            t0: t,
        })
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

        // 下拉刷新
        this.setData({
            loading: true,
            cats: [],
            scrollIntoView: ''
        })

        this.loadData()

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    onShareTimeline: function () {
        return {
            title: this.data.pageTitle,
            imageUrl: this.data.post.cover,
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var path = 'pkgXiangce/pages/xiangce/index?id=' + this.data.postId
        var title = this.data.pageTitle
        return {
            imageUrl: this.data.post.cover,
            path: path,
            title: title,
        }

    }
})
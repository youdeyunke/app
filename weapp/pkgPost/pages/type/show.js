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
// pkgType/pages/type/show.js
const app = getApp()
const postApi = require("../../../api/post")
const brokerApi = require("../../../api/broker")
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: null,
        post: null,
        broker: null,
        loading: true,
        tid: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({ tid: q.id })
        this.loadType(q.id)

    },

    loadPostInfo: function (pid) {
        var _this = this
        // √  
        postApi.getPostBaseInfo(
            pid
        ).then((res) => {
            var post = res.data.data
            var data = {
                post: post
            }
            var type = this.data.type
            var title = post.title + type.name + (type.sale_status_name || '')
            wx.setNavigationBarTitle({ title: title, });
            _this.setData(data)
        })
    },

    loadType: function (tid) {
        var _this = this
        postApi.getPostTypeDetail(tid).then((resp) => {
            if (resp.data.status != 0) {
                return false
            }
            var type = resp.data.data
            var tags = []
            if (type.tags) {
                tags = type.tags.split(',')
            }

            _this.setData({
                loading: false,
                tags: tags,
                type: resp.data.data,
            })
            _this.loadPostInfo(type.post_id)
        })
    },

    viewImage: function (e) {
        var urls = this.data.type.images_list
        var index = e.currentTarget.dataset.index
        var url = urls[index]
        wx.previewImage({
            current: url,
            urls: urls,
        })
    },

    callHandle: function () {
        var m = this.data.broker.mobile
        wx.makePhoneCall({
            phoneNumber: m,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var color = app.globalData.myconfigs.color
        this.setData({
            primaryBtnColor: color.primary_btn,
            secondaryBtnColor: color.secondary_btn,
        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({ t0: new Date().getTime(), })
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
        var _this = this
        var title = this.data.post.title + this.data.type.name
        var path = 'pkgPost/pages/type/show?id=' + this.data.tid
        var image = this.type.images_list[0]
        return {
            title: title,
            path: path,
            imageUrl: image
        }

    }
})
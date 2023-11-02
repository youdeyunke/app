/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pkgVr/pages/vr/index.js
const app = getApp()
const postApi = require("../../../api/post")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: null,
        vrItem: [],
        title: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({
            postId: q.id || q.post_id || q.pid
        }, () => {
            this.lodaData()
        })

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.lodaData()
    },
    lodaData () {
        var _this = this
        postApi.getPostVrList(_this.data.postId).then((res) => {
            _this.setData({
                vrItem: res.data.data,
                title: res.data.post.title + '的全景'
            })
            wx.setNavigationBarTitle({ title: _this.data.title, });
        })
    },
    onShareAppMessage () {
        return {
            title: this.data.title,
            path: '/pkgVr/pages/vr/index/post_id=' + this.data.postId
        }
    },
    onShareTimeline () {
        return {
            title: this.data.title,
            path: '/pkgVr/pages/vr/index/post_id=' + this.data.postId
        }
    }
})
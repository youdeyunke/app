/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pkgZhuli/pages/zhuli/index.js
const app = getApp()
const zhuliApi = require("../../../api/zhuli");
const tourApi = require("../../../api/tour")
const postApi = require("../../../api/post")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: {},
        pageCover: 'https://qiniucdn.udeve.net/fang/zhuli-cover.png'

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({
            hid: q.id,
        }, () => {
            this.loadData()
        })

    },

    loadPostInfo: function (postId) {
        postApi.getPostDetail(postId).then((res) => {
            console.log('load post data is ', res.data);
            if (res.data.code != 0) {
                return
            }
            var post = res.data.data
            this.setData({
                post: post,
            })
        })
    },

    loadData: function () {
        var _this = this
        // √
        tourApi.getTourDetail(this.data.hid).then((res) => {
            if (res.data.code != 0) {
                return
            }
            var tour = res.data.data
            // 已经有助力id了，那么说明是参加过助力活动，跳转进入我的助力活动页面
            var zhuliId = res.data.data.zhuli_id
            if (zhuliId && zhuliId > 0) {
                wx.redirectTo({
                    url: '/pkgZhuli/pages/zhuli/mine?id=' + zhuliId,
                })
                return
            }
            wx.setNavigationBarTitle({
                pageTitle: tour.title,
                pageCover: tour.cover,
                title: tour.title,
            })

            _this.setData({
                item: tour,
            })
            console.log(tour.post_id, "555555555555");
            _this.loadPostInfo(tour.post_id);
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    joinHandle: function () {
        var _this = this
        var hid = this.data.hid
        // 发起助力 
        // √
        zhuliApi.joinZhuli(hid).then((res) => {
            if (res.data.status != 0) {
                return
            }
            var myid = res.data.data
            var url = '/pkgZhuli/pages/zhuli/mine?id=' + myid
            wx.navigateTo({
                url: url
            })
        })
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

    },

    onShareTimeline: function () {
        return {
            title: this.data.pageTitle,
            imageUrl: this.data.pageCover,
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.data.pageTitle,
            imageUrl: this.data.pageCover,
        }

    }
})
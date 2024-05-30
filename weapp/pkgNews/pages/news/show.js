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
// pages/news/show.js
const app = getApp()
const newsApi = require("../../../api/news")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nid: null,
        homebtn: null,
        item: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        // console.log('q', q)
        this.setData({ nid: q.id, homebtn: q.homebtn || null })
        this.loadData()
    },

    loadData: function () {

        var _this = this
        // √
        newsApi.getNewsDetail(_this.data.nid).then((resp) => {
            _this.setData({
                item: resp.data.data,
            })
            wx.setNavigationBarTitle({
                title: resp.data.data.title,
            });
        })
    },

    endAction () {
        this.videoContext = wx.createVideoContext('video', this);
        this.videoContext.exitFullScreen()
    },
    startAciton () {
        var videoContext = wx.createVideoContext('myVideo', this);// 	创建 video 上下文 VideoContext 对象。
        videoContext.requestFullScreen({	// 设置全屏时视频的方向，不指定则根据宽高比自动判断。
            direction: 90						// 屏幕逆时针90度
        });
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

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.data.item.title,
            imageUrl: this.data.item.cover + "?imageView2/1/w/500/h/400",
            path: '/pkgNews/pages/news/show?id=' + this.data.nid
        }
    },
    onShareTimeline: function () {
        return {
            title: this.data.item.title,
            imageUrl: this.data.item.cover + "?imageView2/1/w/500/h/400",
            path: '/pkgNews/pages/news/show?id=' + this.data.nid
        }
    },
})

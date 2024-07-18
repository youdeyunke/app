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
// pkgPingce/pages/pingce/index.js
const app = getApp()
const postApi = require("../../../api/post")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: null,
        postData: {},
        pingceList: [],
        primaryColor: '',
        primaryBtnColor: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (options) {
        this.setData({
            postId: options.postid
        })
        this.loadPost()
        this.loadpingce()
        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                primaryColor: myconfigs.color.primary,
                primaryBtnColor: myconfigs.color.primary_btn
            })
        })
    },
    loadPost: function () {
        var pid = this.data.postId
        var _this = this
        postApi.getPostBaseInfo(pid).then((resp) => {
          _this.setData({
            postData: resp.data.data
        })
        })
    },
    loadpingce: function () {
        var _this = this
        var pid = this.data.postId
        postApi.getPostReviews(pid).then((resp) => {
          _this.setData({
                pingceList: resp.data.data,
            }, () => {
                _this.calculateAverage(resp.data.data)
            })
        })
    },
    calculateAverage (arr) {
        let sum = 0;
        let count = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += arr[i].score;
            count++;
        }
        const average = (sum / count).toFixed(1);
        this.setData({
            zongpingfen: average
        })
    },
    goBack: function () {
        var pages = getCurrentPages();
        if (pages.length > 1) {
            wx.navigateBack({
                delta: 1
            });
        } else {
            wx.reLaunch({
                url: '/pages/home/home'
            })
        }

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var postid = this.data.postId
        var title = this.data.postData.title
        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    title: title + '楼盘评测报告',
                    path: '/pkgPingce/pages/pingce/index?postid=' + postid,
                    imageUrl: "https://tcdn.udeve.net/fang2021/f52cbf31-f10c-42d9-bfee-21e60c15e217.jpg"
                })
            }, 2000)
        })
        return {
            promise
        }
    },
    onShareTimeline: function () {
        var postid = this.data.postId
        var title = this.data.postData.title
        return {
            title: title + '楼盘评测报告',
            query: 'postid=' + postid
        }
    }
})
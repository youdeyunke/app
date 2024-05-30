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
// pkgEvent/pages/event/index.js
const app = getApp()
const postApi = require("../../../api/post");
const eventApi = require("../../../api/event")
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cats: [],
        currentCatIndex: 0,
        loading: true,
        postId: null,
        items: [],
        post: null,
        user: null,
        broker: null,
        primaryColor: '#1989fa'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var pid = q.id || q.post_id
        var color = app.globalData.myconfigs.color
        this.setData({
            postId: pid,
            primaryColor: color.primary,
        }, () => {
            this.loadData()
            this.loadPost()

        })
    },

    loadPost: function () {
        var _this = this
        //  √
        postApi.getPostBaseInfo(this.data.postId).then((resp) => {
            _this.setData({
                post: resp.data.data
            })
            wx.setNavigationBarTitle({
                title: '楼盘动态：' + resp.data.data.title
            });
        })
    },
    catClickHandle: function (e) {
        var i = e.currentTarget.dataset.index
        this.setData({
            currentCatIndex: i,
            items: [],
            loading: true,
        })
        this.loadData()
    },

    loadData: function () {
        this.setData({
            loading: true
        })
        var _this = this
        var catId = ''
        if (this.data.currentCatIndex >= 1) {
            catId = this.data.cats[this.data.currentCatIndex].id
        }

        var query = {
            post_id: this.data.postId,
            cat_id: catId,
        }
        eventApi.getEventList(query).then((resp) => {
            _this.setData({
                loading: false,
                items: resp.data.data.items,
                broker: resp.data.data.broker,
                user: app.globalData.userInfo,
                cats: resp.data.data.cats,
            })
        })
    },

    tipsHandle: function () {
        var content = "楼盘动态资讯内容，旨在满足广大用户的信息需求而采集提供，如有异议请及时与我们联系。页面所载内容不代表本网站之观点或意见，仅供用户参考与借鉴，最终以政府网站或开发商实际公示为准，用户在购房时需慎重查验开发商的证件信息。"
        wx.showModal({
            title: '免责声明',
            content: content,
            showCancel: false,
            confirmText: '知道了',
            confirmColor: '#1989FA',
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
        // 检查一些是否管理登录了
        if (this.data.user) {
            return false
        }
        var user = app.globalData.userInfo
        this.setData({
            user: user
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
        var title = this.data.post.title + '的动态更新啦，快点击查看'
        var image = this.data.post.cover
        return {
            title: title,
            path: 'pkgEvent/pages/event/index?id=' + _this.data.postId,
            imageUrl: image
        }
    },
    onShareTimeline () {
        var _this = this
        var title = this.data.post.title + '的动态更新啦，快点击查看'
        var image = this.data.post.cover
        return {
            title: title,
            path: 'pkgEvent/pages/event/index?id=' + _this.data.postId,
            imageUrl: image
        }
    }
})
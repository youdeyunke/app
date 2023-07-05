// pkgZhuli/pages/zhuli/mine.js
const app = getApp()
const tourApi = require("../../../api/tour")
const zhuliApi = require("../../../api/zhuli")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mid: null,
        haoyouItems: [],
        sectionTitle: '帮TA助力',
        showProgress: false,
        showSuccess: false,
        huodong: null,
        coupon_config: null,
        pageCover: 'https://qiniucdn.udeve.net/zhuli-cover.png',
        zhuli: null,
        item: null, // 活动信息

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        this.setData({
            mid: q.id,
        }, () => {
            _this.loadData()
            _this.loadHaoyou()
        })

    },

    backHandle: function () {
        wx.navigateBack({
            delta: 1,
        })
    },

    homeHandle: function () {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },

    helpHandle: function () {
        // 帮他助力
        var _this = this
        var data = {
            zhuli_id: this.data.zhuli.id,
        }
        zhuliApi.createZhuliHaoyou(data).then((res) => {
            if (res.data.status != 0) {
                return
            }
            // show dialog 
            _this.selectComponent('.thanks').openDialog()
            _this.loadData()
            _this.loadHaoyou()
        })
    },



    loadData: function () {
        var _this = this
        var user = this.data.user
        zhuliApi.getZhuliDetail(_this.data.mid).then((res) => {
            var zhuli = res.data.data.zhuli
            var tour = res.data.data.tour
            var post = res.data.data.post
            var couponConfig = res.data.data.coupon_config

            var pageTitle = "帮我助力 " + tour.title
            var pageCover = tour.cover

            _this.setData({
                zhuli: zhuli,
                huodong: tour,
                post: post,
                couponConfig: couponConfig,
                pageTitle: pageTitle,
                pageCover: tour.cover
            }, () => {
                _this.refreshStatus()
            })
        })
    },

    refreshStatus: function () {
        // 切换页面显示状态
        var showFooter = false
        var showSuccess = false
        var showProgress = true
        var sectionTitle = '帮TA助力'
        var user = app.globalData.userInfo
        // 如果是我自己，并且已经成功 
        if (user && user.id == this.data.zhuli.user_id && this.data.zhuli.coupon_ready) {
            showSuccess = true
            showProgress = false
        }
        if (user && user.id === this.data.zhuli.user_id) {
            sectionTitle = '我的助力'
            showFooter = true
        }

        this.setData({
            showSuccess: showSuccess,
            sectionTitle: sectionTitle,
            showFooter: showFooter,
            showProgress: showProgress
        })

    },

    couponHandle: function (e) {
        // 领取助力优惠券

        var zhuli = this.data.zhuli
        if (zhuli.coupon_send) {
            var url = '/pkgMyself/pages/coupons/index'
            wx.navigateTo({
                url: url
            })
            return false
        }


        var _this = this
        var data = {
            id: zhuli.id,
        }
        zhuliApi.createZhuliSuccess(data).then((res)=>{
            if (res.data.status != 0) {
                return
            }
            wx.showToast({
                title: '领取成功',
            })
            _this.loadData()
        })
    },

    loadHuodong: function (hid) {
        var _this = this
        tourApi.getTourDetail(hid).then((res) => {
            if (res.data.status != 0) {
                return false
            }
            var cf = res.data.data.coupon_config

            _this.setData({
                huodong: res.data.data,
                pageTitle: res.data.data.title,
                pageCover: res.data.data.cover,
                coupon_config: cf,
            })
        })
    },

    loadHaoyou: function () {
        var _this = this
        var query = {
            zhuli_id: this.data.mid
        }
        zhuliApi.getZhuliHaoyouList(query).then((res) => {
            if (res.data.status != 0) {
                return false
            }

            _this.setData({
                haoyouItems: res.data.data,
                haoyouCount: res.data.data.length,
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
        if (this.data.zhuli && this.data.zhuli.id) {
            this.loadData()
        }
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
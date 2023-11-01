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
// pkgMyself/pages/coupons/index.js
const app = getApp()
const couponApi = require("../../../api/coupon")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [

        ],
        currentIndex: 0,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadData()
    },

    loadData: function () {
        var _this = this
        couponApi.getCouponList().then((res) => {
            if (res.data.status != 0) {
                return
            }
            _this.setData({ items: res.data.data })
        })
    },

    deteleyhq (e) {
        var _this = this
        var id = e.currentTarget.dataset.i
        wx.showModal({
            title: '删除确认',
            content: '确定要删除该卡券吗？删除后无法恢复',
            confirmText: '删除',
            success (resp) {
                if (resp.confirm) {
                    couponApi.deleteCoupon(id).then((res) => {
                        _this.loadData()
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    useHandle: function () {
        // todo 
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                primaryColor: myconfigs.color.primary,
                primaryBtnColor: myconfigs.color.primary_btn
            })
        })

        setTimeout(() => {
            if (!this.data.items) {
                this.loadData()
            }
        }, 1500)

        if (app.globalData.reloadCoupons) {
            this.loadData()
            app.reloadCoupons = false
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
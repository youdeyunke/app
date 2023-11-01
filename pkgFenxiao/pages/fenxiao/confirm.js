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
// pkgFenxiao/pages/fenxiao/confirm.js
const app = getApp()
const customerApi = require("../../../api/coupon")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        assignBroker: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (q) {
        this.setData({
            id: q.id,
        }, () => {
            this.loadData()
        })
    },

    confirmHandle: function () {
        // 确认带看 
        var _this = this
        var brokerId = this.data.assignBroker ? this.data.assignBroker.id : ''
        var data = {
            id: this.data.id,
            broker_id: brokerId
        }
        app.dingyueHandle()
        customerApi.confirmCustomer(data).then((resp) => {
            if (resp.data.status == 0) {
                _this.loadData()
                wx.showToast({
                    title: '已确认带看',
                })
            }
        })
    },

    loadData: function () {
        var _this = this
        customerApi.getCustomerDetail(_this.data.id).then((res) => {
            var logs = res.data.data.logs.map((log) => {
                var ds = log.created_at.split('T')
                var date = ds[0]
                var time = ds[1].split('.')[0]
                var dt = date + ' ' + time
                return {
                    text: log.content + ' 【' + log.operator + '】',
                    desc: dt,
                }
            })
            var posts = []
            var postIds = []
            res.data.data.posts.map((m) => {
                posts.push(m.title)
                postIds.push(m.id)
            })
            _this.setData({
                value: res.data.data,
                assignBroker: res.data.data.assign_broker,
                logs: logs,
                loading: false,
                posts: posts.toString(','),
                postIds: postIds.toString(',')
            })
        })
    },

    gotoBroker: function () {
        if (this.data.value.deal_status_item.value != 0) {
            return
        }
        var _this = this
        wx.navigateTo({
            url: `/pkgBroker/pages/broker/selector?pid=${this.data.postIds}`,
            events: {
                change: function (b) {
                    _this.setData({
                        assignBroker: b
                    })
                }
            }
        })
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
    onShareAppMessage () {

    }
})
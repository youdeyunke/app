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
// pkgAdmin/pages/clue/show.js
const app = getApp()
const clueApi = require("../../../api/clue")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        clue: {},
        follows: [],
        allStatus: [],
        clueId: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({ clueId: q.id })
        this.loadData()
    },


    callHandle: function () {
        wx.makePhoneCall({
            phoneNumber: this.data.clue.phone,
        })
    },


    dingyue: function () {
        app.dingyueHandle()
    },

    loadData: function () {
        var _this = this
        clueApi.getClueDetail(_this.data.clueId).then((resp) => {
            if (resp.data.status != 0) {
                return
            }
            var data = resp.data.data
            data.follows = data.follows.map((f, i) => {
                // var r = f.created_at.split('T')
                // var date = r[0]
                // var time = r[1].split('.')[0]
                // f.created_at = date + ' ' + time
                return f
            })
            _this.setData({
                clue: data.clue,
                follows: data.follows,
                statusItems: data.status_items,
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
        console.log('on show', app.globalData.backToReload)
        if (app.globalData.backToReload) {
            this.loadData()
            app.globalData.backToReload = false
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
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
// pages/qa/new.js
const app = getApp()
const qaApi = require("../../../api/qa.js")
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        target_id: '',
        target_type: '',
        content: '',
        minLength: 5,
        maxLength: 100,
        commonQs: [
            "是70年产权房吗？",
            "会不会有拆迁的可能？",
            "附近有幼儿园吗？",
            "步行到地铁口/公交车站多长时间？",
        ],
    },

    gohome: function (e) {
        wx.switchTab({
            url: '/pkgQa/pages/home/home',
        })
    },

    contentChange: function (e) {
        this.setData({ content: e.detail.value })
    },

    quickHandle: function (e) {
        var i = e.currentTarget.dataset.index
        var text = this.data.commonQs[i]
        this.setData({ content: text })
    },


    resetHandle: function () {
        wx.navigateBack({ delta: -1 })
    },

    submitHandle: function (e) {

        if (this.data.loading) {
            return false;
        }

        var _this = this
        var content = _this.data.content
        var qLen = typeof content == 'undefined' ? 0 : content.length
        var min = this.data.minLength
        var max = this.data.maxLnegth

        if (qLen > max) {
            wx.showToast({
                title: '内容太长',
                icon: 'none',
                duration: 2000
            })
            return false
        }

        if (qLen < min) {
            wx.showToast({
                title: '请至少填写' + min + '个字符',
                icon: 'none',
                duration: 2000
            })
            return false
        }
        // 进入数据提交状态，按钮禁止点击
        this.setData({ loading: true })
        auth.ensureUser(function (userInfo) {
            _this.doSubmit()
        })
    },

    backHandle: function () {
        wx.navigateBack({ delta: -1 })
    },

    doSubmit: function () {
        var _this = this
        var content = _this.data.content
        var data = {
            content: content,
            target_id: _this.data.target_id, target_type: _this.data.target_type
        }
        qaApi.createQuestion(data).then((resp) => {
            _this.setData({ loading: false })
            //  处理完成
            if (resp.data.status != 0) {
                return false;
            }
            var url = '/pkgQa/pages/qa/qa?id=' + resp.data.data.id
            wx.redirectTo({
                url: url
            });
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
      var color = app.globalData.myconfigs.color
        this.setData({ target_id: q.target_id, target_type: q.target_type ,primaryColor: color.primary,
          primaryBtnColor: color.primary_btn,})
        var _this = this
        auth.ensureUser(function (userInfo) {
            _this.setData({ userInfo: userInfo })
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
        this.setData({
            loading: false,
        })
        wx.hideLoading()

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

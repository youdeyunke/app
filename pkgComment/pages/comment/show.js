// pkgComment/pages/comment/show.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cid: null,
        item: {},
        showForm: false,
        reply_items: [],
        loading: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({ cid: q.id })
        this.loadData()
    },

    submitHandle: function () {
        auth.ensureUser((user) => {
        })
    },

    openFormHandle: function () {
        this.setData({ showForm: true })
    },
    replyClickHandle: function (e) {
        console.log('e', e)
        var user = e.detail.comment
        this.setData({
            placeholder: '回复' + user.name
        })
        this.openFormHandle()
    },

    closeFormHandle: function () {
        this.setData({ showForm: false })
    },

    loadData: function () {
        // 加载评论，以及回复
        var _this = this
        app.request({
            url: '/api/v1/mycomments/' + _this.data.cid,
            success: function (resp) {
                _this.setData({
                    loading: false,
                    item: resp.data.data.item,
                    reply_items: resp.data.data.reply_items
                })
            }
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
        this.setData({ loading: true })
        this.loadData()

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
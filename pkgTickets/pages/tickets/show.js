// pkgTickets/pages/tickets/show.js
const app = getApp()
const baseInFoApi = require("../../../api/post")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ticketId: '',
        post: {},
        ticket: {},
        summary: {},
        postId: '',
        title: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var ticketId = q.id
        var postId = q.post_id
        this.setData({
            ticketId: ticketId,
            postId: postId
        })
        this.loadData()
        wx.setNavigationBarTitle({
            title: '恭喜中签！',
        })

    },

    loadData() {

        var _this = this
        //获取个人信息接口
        app.request({
            url: '/api/v1/post_tickets/' + this.data.ticketId,
            success: function (res) {
                _this.setData({
                    ticket: res.data.data,

                })
                _this.loadPostInfo(res.data.data.post_id)
            }
        })
        //获取楼盘信息接口

    },

    loadPostInfo: function (postId) {
        var _this = this
        // 有待检验
        baseInFoApi.getPostBaseInfo(postId).then((res) => {
            var post = res.data.data
            _this.setData({
                post: post
            })
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.data.post.title + '摇号结果'
        }
    },
    onShareTimeline: function () {
        return {
            title: this.data.post.title + '摇号结果'
        }
    },
})
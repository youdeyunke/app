// pages/myself/posts.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        groups: [],
        groupIndex: 0,
        popShow: false,
        userInfo: null,
        searchText: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (q) {
        var _this = this
        var groups = app.globalData.myconfigs['post_groups'].map((g, i) => {
            g.value = g.key
            return g
        })
        groups = [{ name: '全部', value: '' }].concat(groups)
        this.setData({ groups: groups })

        auth.ensureUser((userInfo) => {
            _this.setData({ userInfo: userInfo })
            _this.loadPosts()
        })

    },

    popShowHandle: function () {
        this.setData({ popShow: true })
    },
    popCloseHandle: function () {
        this.setData({ popShow: false })
    },
    groupChange: function (e) {
        const { index } = e.detail
        this.setData({ groupIndex: index, popShow: false, posts: [] })
        this.loadPosts()
    },


    searchTextInput: function (e) {
        this.setData({ searchText: e.detail })
    },

    clearSearch: function (e) {
        this.setData({ searchText: '' })
        this.loadPosts()
    },


    loadPosts: function () {
        /* 拉取我的房源 */
        this.setData({ loading: true })
        var _this = this
        var g = this.data.groups[this.data.groupIndex].value
        app.request({
            url: '/api/v1/admin_posts/',
            data: {
                per_page: 999,
                text: _this.data.searchText,
                group_v2: g,
            },
            success: function (resp) {
                _this.setData({ loading: false })
                if (!resp.data.status == 0) {
                    return false
                }
                var posts = resp.data.data.map((p, i) => {
                    p.counter_1 = p.count_info[1].value
                    p.counter_2 = p.count_info[2].value
                    p.counter_3 = p.count_info[5].value
                    return p

                })
                _this.setData({
                    posts: resp.data.data,
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
        wx.setNavigationBarTitle({
            title: '我的房源',
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
        var _this = this
        this.setData({ post: [] }, () => {
            _this.loadPosts()
        })
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

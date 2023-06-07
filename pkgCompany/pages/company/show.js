// pkgCompany/pages/company/show.js
const app = getApp()
const brokerApi = require("../../../api/broker")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        company: {},
        items: [],
        staff: [],
        tab: 'posts',
        page: 1,
        loading: false,
        val: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var cid = q.id
        var filter = {
            company_id: cid,
            order: 'id desc',
            per_page: 10,
            page: 1,
            city_id: '',
            group_v2: 'new'
        }
        this.setData({
            filter: filter,
            cid: cid
        })
        this.loadCompany()
        this.loadStaff()

    },

    loadCompany: function () {
        var _this = this
        app.request({
            url: '/api/v1/companies/' + this.data.cid,
            success: function (resp) {
                var company = resp.data.data
                _this.setData({
                    company: company
                })
                wx.setNavigationBarTitle({
                    title: company.name + '的企业主页',
                });

            }
        })
    },
    loadStaff: function () {
        var _this = this
        // √
        brokerApi.getBrokerList({
            company_id: this.data.cid,
            per_page: 10,
            page: _this.data.page
        }).then((res) => {
            var staff = [..._this.data.staff, ...res.data.data]
            _this.setData({
                staff: staff
            })
        })
    },
    tabChange: function (e) {
        var tab = e.detail.name
        console.log(tab)
        if (tab == this.data.tab) {
            return false
        }
        var filter = this.data.filter
        filter.page = 1
        this.setData({
            tab: e.detail.name,
            page: 1,
            staff: [],
            filter: filter
        })
        this.loadStaff()
    },
    filterChange: function (e) {
        var filter = e.detail
        filter.page = 1
        this.setData({
            filter: filter
        })
    },
    loadPosts() {
        var filter = this.data.filter
        filter['kw'] = this.data.val
        this.setData({
            filter: filter
        })
    },
    searchTextInput(e) {
        this.setData({
            val: e.detail
        })
    },
    clearSearch() {
        var filter = this.data.filter
        filter['kw'] = ''
        this.setData({
            filter: filter
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var page = this.data.page + 1
        this.setData({
            page: page
        })
        this.loadStaff()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
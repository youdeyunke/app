// pkgCompany/pages/company/show.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        company: {},
        items: [],
        tab: 'posts',
        page: 1,
        loading: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var cid = q.id
        var filter = { company_id: cid, order: 'id desc', per_page: 10, page: 1 }
        this.setData({
            filter: filter,
            cid: cid,
        })
        this.loadCompany()

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

    tabChange: function (e) {
        var tab = e.detail.name
        if (tab == this.data.tab) {
            return false
        }
        this.setData({ tab: e.detail.name })
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
        this.setData({ page: page })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
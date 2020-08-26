// pkgAdmin/pages/admin/customers.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: null,
        items: [],
        loading: null,
        noResult: false,
        page: 1,
        statusItems: [
            { name: '待审核', value: 1 },
            { name: '有效', value: 2 },
            { name: '无效', value: 0 },
        ],
        statusIndex: 0

    },

    tabChange: function (e) {
        var index = e.detail.name
        var _this = this
        this.setData({ statusIndex: index, items: [], page: 1, loading: true }, () => {
            _this.loadData()
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        var si = this.data.statusItems.findIndex((item, i) => {
            return item.value == q.status
        })
        this.setData({ statusIndex: si, postId: q.post_id, loading: true }, () => {
            _this.loadData()
        })

    },

    loadData: function () {
        var _this = this
        var query = {
            page: 1,
            per_page: 99999,
            status: this.data.statusItems[this.data.statusIndex].value,
            post_id: this.data.postId
        }
        app.request({
            url: '/api/v1/admin_customers/',
            data: query,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return
                }

                var items = resp.data.data
                _this.setData({
                    loading: false,
                    noResult: resp.data.total_count === 0,
                    items: items
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
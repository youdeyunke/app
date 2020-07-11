// pkgWallet/pages/wallet/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: null,
        page: 1,
        items: [],
        per_page: 40,
        balancesInfo: {},
        total_items: 0,
        loading: true,
    },

    /**
     * 生命周期函数--监听页面加载 */
    onLoad: function (options) {
        this.loadData()

    },
    loadData: function () {
        this.setData({ loading: true })
        this.loadBalanceInfo()
        var _this = this
        var query = {
            page: _this.data.page,
            per_page: _this.data.per_page,
        }
        app.request({
            url: '/api/v1/balances/',
            data: query,
            success: function (resp) {
                var i = query['page'] - 1
                var data = { loading: false, total_items: resp.data.total_items }
                if (i > 0) {
                    var key = 'items[' + i + ']'
                    data[key] = resp.data.data
                } else {
                    data['items'] = [resp.data.data]
                }
                _this.setData(data)
                console.log('data is', data, resp.data.data)
            },
        })
    },

    loadBalanceInfo: function () {
        var _this = this
        app.request({
            url: '/api/v1/balances/info',
            success: function (resp) {
                if (resp.data.status == 0) {
                    console.log('balance info resp', resp)
                    _this.setData({
                        balanceInfo: resp.data.data
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this = this
        var user = app.globalData.userInfo
        var token = app.globalData.token
        this.setData({ user: user })
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
        this.setData({ page: 1 })
        this.loadData()

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var page = this.data.page
        this.setData({ page: page + 1 })
        this.loadData()

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
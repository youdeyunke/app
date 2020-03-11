// pkgCompany/pages/company/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        items: [],
        isEnd: false,
        isEmpty: false,
        total: 0,
        page: 1,
        per_page: 20,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '企业品牌馆',
        });
        this.setData({
            wechat: app.globalData.myconfigs['service_wechat']
        })
        this.loadData()
    },

    loadData: function () {
        var query = {
            page: this.data.page || 1,
            per_page: this.data.per_page || 20,
        }
        var _this = this
        app.request({
            url: '/api/v1/companies/',
            data: query,
            success: function (resp) {
                var index = _this.data.page - 1
                var key = 'items[' + index + ']'
                var data = {
                    loading: false,
                }

                if (resp.data.data.length == 0) {
                    data['isEnd'] = true
                    if (_this.data.page == 1) {
                        data['isEmpty'] = true
                        data['isEnd'] = false
                    }
                }
                data['total'] = resp.data.total
                data[key] = resp.data.data
                _this.setData(data)
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
        this.setData({
            page: 1,
            items: []
        })
        this.loadData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            page: this.data.page + 1
        })
        this.loadData()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
// pages/visitors/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: '',
        scopes: [
            { name: '今日', value: 'today_items' },
            { name: '昨日', value: 'yesterday_items' },
            { name: '本月', value: 'this_month_items' },
            { name: '全部', value: 'all' },
        ],
        noResult: false,
        scopeIndex: 0,
        items: [],
        page: 1,
        targetId: '',
        per_page: 20,
        loading: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        var scopeIndex = this.data.scopes.findIndex((item, index) => { return item.value === q.scope })
        scopeIndex = scopeIndex <= 0 ? 0 : scopeIndex

        this.setData({
            scopeIndex: scopeIndex || 0,
            targetId: q.targetId || '',
            targetType: q.targetType || 'post',
        }, function () {
            _this.loadData()
        })
    },

    tabChange: function (e) {
        var index = e.detail.name
        var _this = this
        this.setData({ scopeIndex: index, items: [], page: 1, loading: true }, () => {
            _this.loadData()
        })
    },

    loadData: function () {
        var _this = this
        var si = this.data.scopeIndex
        var query = {
            order: 'updated_at desc',
            page: this.data.page,
            scope: this.data.scopes[si].value,
            target_type: this.data.targetType || 'post',
            target_id: this.data.targetId || '',
        }
        app.request({
            url: '/api/v1/myvisitors/',
            data: query,
            success: function (resp) {
                var baseIndex = _this.data.items.length
                var data = { loading: false }
                resp.data.data.forEach((item, index) => {
                    var i = baseIndex + index
                    var key = 'items[' + i + ']'
                    data[key] = item
                })
                data.noResult = resp.data.meta.total_visitors === 0
                _this.setData(data)
            },
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
        var page = this.data.page || 1
        this.setData({
            page: page + 1,
            loading: true,
        })
        this.loadData()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

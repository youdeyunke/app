// pages/visitors/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: '',
        tabs: [
            { name: '房源访客', value: 'post' },
            { name: '主页访客', value: 'user' },
        ],
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
        this.setData({
            targetId: q.targetId || '',
            targetType: q.targetType || 'post',
        }, function () {
            _this.loadData()
        })
    },

    tabChange: function (e) {
        var i = e.detail.name
        var tab = this.data.tabs[i]
        var filter = this.data.filter
        this.setData({
            targetType: tab.value,
            page: 1,
            items: [],
            loading: true,
        })
        this.loadData()
    },

    loadData: function () {
        var _this = this
        var query = {
            order: 'updated_at desc',
            page: this.data.page,
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
                console.log(' set data', data)
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

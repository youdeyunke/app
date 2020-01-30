// pkgEvent/pages/event/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cats: [],
        currentCatIndex: 0,
        loading: true,
        postId: null,
        items: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({ postId: q.post_id })
        this.loadData()
    },

    catClickHandle: function (e) {
        var i = e.currentTarget.dataset.index
        this.setData({
            currentCatIndex: i,
            items: [],
            loading: true,
        })
        this.loadData()
    },

    loadData: function () {
        this.setData({ loading: true })
        var _this = this
        var catId = ''
        if (this.data.currentCatIndex >= 1) {
            catId = this.data.cats[this.data.currentCatIndex].id
        }

        var query = {
            post_id: this.data.postId,
            cat_id: catId,
        }
        app.request({
            url: '/api/v1/events',
            data: query,
            success: function (resp) {
                _this.setData({
                    loading: false,
                    items: resp.data.data.items,
                    cats: resp.data.data.cats,
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
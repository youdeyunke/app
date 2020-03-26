// pkgXiangce/pages/xiangce/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        cats: [],
        postId: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var postId = q.id
        this.setData({ postId: postId })
        this.loadData()
    },

    loadData: function () {
        var query = { post_id: this.data.postId }
        var _this = this
        app.request({
            url: '/api/v1/media_cats',
            data: query,
            success: function (resp) {
                _this.setData({ cats: resp.data.data })
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
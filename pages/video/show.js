// pages/video/show.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: '',
        sourceUrl: '',
        title: '视频',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var url = decodeURIComponent(q.url)
        console.log('q.url  is', q.url)
        console.log('url  is', url)
        this.setData({
            url: url,
            sourceUrl: q.url
        })
        this.setData({ title: q.title })
        wx.setNavigationBarTitle({
            title: '视频播放',
        });

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
        var _this = this
        var path = 'pages/viewo/show?url=' + this.data.sourceUrl
        return {
            title: _this.data.title || '分享视频',
            path: path
        }
    },

})
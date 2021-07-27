// pages/home/home.js
const app = getApp()
const rowWidthItem = ['60%', "100%", "30%", "40%", "100%"]

Page({
    /**
     * 页面的初始数据
     */

    data: {
        loading: true,
        rowWidth: rowWidthItem,
        system: {},
        configs: null,
        showInstallTips: 0,  // 1:正常显示，2：自动关闭，3：手动关闭
        city_id: null,
    },

    comming: function (e) {
        wx.showToast({
            title: '功能正在调试中',
            icon: 'none',
        })
    },


    onShareAppMessage: function () {
        return {
            title: '',
            desc: '',
            path: 'pages/index/index'
        }
    },


    /** 下拉刷新
     * 
    */
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        this.setData({ loading: true })
        var _this = this
        app.loadConfigs(function (configs) {
            _this.selectComponent('#pm').reload()
            _this.setData({ configs: configs })
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh() //停止下拉刷新    

        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({ system: app.globalData.system }, () => {
            this.checkInstallTips()
        })
        app.markVisitor('home', null)
    },

    checkInstallTips: function () {
        var _this = this
        var _v = wx.getStorageSync('closeInstallTips') || false
        // 没有手动关闭提示，就正常显示
        if (!_v) {
            setTimeout(function () { _this.setData({ showInstallTips: 1 }) }, 4000)
            // 延时自动关闭
            setTimeout(function () { _this.setData({ showInstallTips: 0 }) }, 8000)
        }
    },

    closeInstallTips: function (e) {
        // 点击关闭安装提示
        this.setData({ 'showInstallTips': 0 })
        wx.setStorageSync('closeInstallTips', true)
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    pageReadyHandle: function () {
        this.setData({ loading: false })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var title = app.globalData.myconfigs.xcx_name  
      wx.setNavigationBarTitle({
        title: title,
      })
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
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    onShareTimeline: function () {

    }
})

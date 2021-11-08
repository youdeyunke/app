// pages/home/home.js
const app = getApp()
const rowWidthItem = ['60%', "100%", "30%", "40%", "100%"]

Page({
    /**
     * 页面的初始数据
     */

    data: {
        loading: true,
        pageTitle: '', 
        shareTitle: '', 
        shareCover: '',
        titleBgColor: 'rgba(0,0,0, 0.15)', 
        titleFontColor: '#ffffff',
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




    /** 下拉刷新
     * 
    */
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        this.setData({ loading: true })
        var _this = this
        app.loadConfigs(function (configs) {
            _this.selectComponent('.pm').reload()
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

    pageReadyHandle: function (e) {
        var config = e.detail
        console.log('page ready config', config)
        // 页面加载完成
        var pageTitle = config.title.value || app.globalData.myconfig.xcx_name 
        var shareCover = config.shareCover  
        var shareTitle = config.shareTitle || pageTitle 
        var titleBgColor = config.title.bgColor  
        var titleFontColor = config.title.color 

        this.setData({
            shareCover: shareCover, 
            shareTitle: shareTitle,
            titleBgColor: titleBgColor, 
            titleFontColor: titleFontColor,
            pageTitle: pageTitle,
            loading: false
        })
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
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return { 
            title: this.data.shareTitle, 
            imageUrl: this.data.shareCover,
        }

    },
    onShareTimeline: function () {
        return {
            title: this.data.shareTitle, 
            imageUrl: this.data.shareCover,
        }
    }
})

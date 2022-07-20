// pages/home/home.js
const app = getApp()
import utils from '../../utils/util'
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
        showInstallTips: 0, // 1:正常显示，2：自动关闭，3：手动关闭
        city_id: null,
        city: '',
        bgOpacity:0
    },

    onPageScroll: function (e) {
        var scrollTop = e.scrollTop
        this.setOpacity(scrollTop,500)
    },
    setOpacity:function(scrollTop,maxTop){
        var opacity = 0
        if(scrollTop<=maxTop){
            opacity = scrollTop/maxTop
        }else{
            opacity = 1
        }
        this.setData({
            bgOpacity:opacity
        })
    },

    citySelect: function(){
        wx.navigateTo({
          url: '/pages/cities/select',
        })
    },

    loadSelectCity: function(){
        var adcode = wx.getStorageSync('cityCode')
        console.log('2323232',adcode)
        var _this = this
        var url = '/api/v1/cities/'
        app.request({
            url: url,
            success(resp){
                var cities = resp.data.data
     
                if (!adcode) {
           
                    _this.setData({
                        city: cities[0].name
                    })

                }else{
                    cities.forEach((item) => {
                        if(item.adcode == adcode){
                        
                            _this.setData({
                                city: item.name
                            })
                        }
                    })
                }
                if(_this.data.city == ''){
                    _this.setData({
                        city: cities[0].name
                    })
                }
            }
        })        
    },
    gotoSearch: function(){
        wx.navigateTo({
          url: '/pkgSearch/page/search/index',
        })
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
        this.setData({
            loading: true
        })
        var _this = this
        app.loadConfigs(function (configs) {
           
            _this.setData({
                configs: configs, 
                loading: false, 
            })
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh() //停止下拉刷新  
            setTimeout(() => {
                _this.selectComponent('.pm').reload()
            }, 800)  

        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            system: app.globalData.system
        }, () => {
            this.checkInstallTips()
        })
        this.loadSelectCity()
        setTimeout(() => {
            this.setData({loading: false })
        }, 500)
 
    },

    checkInstallTips: function () {
        var _this = this
        var _v = wx.getStorageSync('closeInstallTips') || false
        // 没有手动关闭提示，就正常显示
        if (!_v) {
            setTimeout(function () {
                _this.setData({
                    showInstallTips: 1
                })
            }, 4000)
            // 延时自动关闭
            setTimeout(function () {
                _this.setData({
                    showInstallTips: 0
                })
            }, 8000)
        }
    },

    closeInstallTips: function (e) {
        // 点击关闭安装提示
        this.setData({
            'showInstallTips': 0
        })
        wx.setStorageSync('closeInstallTips', true)
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    pageReadyHandle: function (e) {
        var config = e.detail
        console.log('page ready config', config)
        // 页面加载完成
        var pageTitle = config.title.value || app.globalData.myconfig.xcx_name
        var shareCover = config.shareCover
        var shareTitle = config.shareTitle || pageTitle
        var titleBgColor = config.title.bgColor
        var titleFontColor = config.title.color
        titleBgColor = utils.set16ToRgb(titleBgColor)
        
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
        var path = '/pages/home/home'
        if(app.globalData.userInfo){ 
            path = path + '?source_uid=' + app.globalData.userInfo.id 
        }
        this.setData({
            pagePath: path 
        })
        this.loadSelectCity()
    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

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
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var _this = this
        const promise = new Promise(resolve => {
            app.request({
                url: '/api/v1/scores/',
                method: 'POST',
                data: {
                    key: 'share_home'
                },
                success: function (res) {
                    if (res.data.status == 0 && res.data.data == 'ok') {
                        wx.showToast({
                            icon: 'none',
                            title: '积分已增加',
                        })
                    }
                    resolve( {
                        title: _this.data.shareTitle,
                        imageUrl: _this.data.shareCover,
                    })
                }
            })
        })
        return {
            title: _this.data.shareTitle,
            imageUrl: _this.data.shareCover,
            promise, 
        }
    },
    onShareTimeline: function () {
        const promise = new Promise(resolve => {
            app.request({
                url: '/api/v1/scores/',
                method: 'POST',
                data: {
                    key: 'share_home'
                },
                success: function (res) {
                    if (res.data.status == 0 && res.data.data == 'ok') {
                        wx.showToast({
                            icon: 'none',
                            title: '积分已增加',
                        })
                    }
                    resolve( {
                        title: _this.data.shareTitle,
                        imageUrl: _this.data.shareCover,
                    })
                }
            })
        })
        return {
            title: _this.data.shareTitle,
            imageUrl: _this.data.shareCover,
            promise, 
        }
    }
})
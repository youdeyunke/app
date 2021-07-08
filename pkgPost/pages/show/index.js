// pages/post/index.js
const app = getApp()
var auth = require('../../../utils/auth.js');
var util = require('../../../utils/util.js');
var wxCharts = require('../../../utils/wxcharts-min');
var radarChart = null;
Page({

    /**
     * 页面的初始 数据
     */
    data: {
        showNavBack: false, // 是否显示返回按钮
        blocks: [],
        points: [],
        pageTitle: '房源详情',
        pageCover: '',
        pageUrl: '/pkgPost/pages/show/index?post_id=',
        postInfo: null,
    
        brokerId: null,

        loading: true,
        visitorLogId: null,
        contactInfo: {},
        debug: false,
        user: {},
        showViewCount: false,
        showShareBox: false,
        title: '',
        imageUrl: ''
    },
    backHandle: function () {
        wx.navigateBack({
            delta: 1
        });
    },

    homeHandle: function () {
        wx.switchTab({
            url: '/pages/home/home',
            success: (result) => {

            },
        });
    },


    loadPostBlocks: function () {
        var _this = this
        var query = {}
        app.request({
            hideLoading: true,
            url: '/api/v5/posts/' + _this.data.postId,
            data: query,
            fail: function (resp) {
                wx.showToast({
                    title: '楼盘页面渲染错误',
                    icon: 'error',
                    image: '',
                    duration: 1500,
                    mask: true,
                    success: (result) => {
                    },
                    fail: () => { },
                    complete: () => { }
                });

            },
            success: function (resp) {
                wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh() //停止下拉刷新    
    
                var user = app.globalData.userInfo 
                var data = {}
                data.pageQuery = 'id=' + _this.data.postId 
                if(user.is_broker){
                    data.pageQuery  += '&broker_id=' + user.id
                }
                data.blocks = resp.data.data  
                data.navs = resp.data.navs 
                data.loading = false 
                _this._setPostInfo(resp.data.post)
                _this.setData(data, () => {
                    wx.showShareMenu({
                        withShareTicket: true,
                        menus: ['shareAppMessage', 'shareTimeline']
                    })
                })

            }
        })
    },

    checkViewsCount: function (c) {
        // 延时显示有多少人看过房源
        var _this = this
        if (c && c >= 5) {
            // 如果满足条件，就执行动画
            setTimeout(function () {
                _this.setData({ showViewCount: true })
                setTimeout(function () { _this.setData({ showViewCount: false }) }, 4000)
            }, 1000)
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this

        if (options.qrdata) {
            // 分享海报进入
            // 解析海报url中的数据
            // TODO 设置sceneName，sourceUid
            var qrdata = options.qrdata
            qrdata = decodeURIComponent(qrdata)
            qrdata = JSON.parse(qrdata)
            console.log('decode qrdata is', qrdata, typeof qrdata)
            options = qrdata
        }else{
            // 其他方式进入
            
        }
        var postId = options.id || options.post_id
        var brokerId = options.broker_id || ''
        this.globalData.sourceUid = brokerId
        this.globalData.sceneName = options.sceneName || 'default'

        _this.setData({ postId: postId, brokerId: brokerId  }, () => {
            _this.loadData()

        })
        app.markVisitor('post', postId)
        wx.hideShareMenu({
            menus: ['shareAppMessage', 'shareTimeline']
        })
    },


    markHistory: function(){
        // 记录访问历史
        var cacheKey = 'post.history'
        var cacheValue = wx.getStorageSync(cacheKey) || []
        var d = new Date() 
        var y = d.getFullYear() 
        var m  = d.getMonth() + 1 
        var day = d.getDate() 
        var today = y + '-' + m   + '-' + day

        if(cacheValue.length >= 1){
            for(let i = 0;i<cacheValue.length;i++){
                if(cacheValue[i].post.id == this.data.postId){
                    console.log("出现过了")
                    return
                }
            }
        }

        cacheValue.push( {
            date: today, 
            post: wx.getStorageSync('post_base_info.'+this.data.postId), 
        })
        wx.setStorage({
          data: cacheValue,
          key: cacheKey,
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 页面渲染完成后
        this.drawRadar()
        //获取经纬度
    },



    setInterval: function () {

        // 如果没有登录，直接退出
        if (!app.globalData.token) {
            console.log('未登录，不记录浏览时长')
            return false
        }

        var step = 2
        // 开始前，将旧的清楚，否则会导致跳转页面后也在执行
        this.clearInterval()
        var _this = this
        var iid = setInterval(_this.intervalHandle, 1000 * step);
        this.setData({ intervalId: iid })
        console.log('页面停留统计初始化设置', iid)
    },


    intervalHandle: function () {
        // 每秒钟执行
        var _this = this
        // 更新最后在线时间戳
        app.markVisitor(this.data.visitorLogId, this.data.postId, 'post')
    },

    clearInterval: function () {
        var iid = this.data.intervalId
        if (iid) {
            console.log('停止页停留时长统计, iid')
            clearInterval(iid)
        }
    },

    drawRadar() {
        let windowWidth = 320;
        try {
            let res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            // do something when get system info failed
        }
        radarChart = new wxCharts({
            canvasId: 'radarCanvas',
            type: 'radar',
            background: "#D1E8FF",
            categories: ['区域发展', '周边设施', '交通概况', '小区环境', '室内体验'],
            series: [{
                name: "综合评分",
                data: [90, 110, 125, 95, 87],
                color: "#1989fa"
            }],
            width: windowWidth,
            height: 200,
            extra: {
                radar: {
                    max: 150,
                    labelColor: '#333',

                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.checkForceLogin()
        var pages = getCurrentPages()
        console.log('pages', pages)
        var showNavBack = false
        if (pages.length > 1) {
            showNavBack = true
        }

        this.setData({ userInfo: app.globalData.userInfo, showNavBack: showNavBack })
        if (!this.data.loading) {
            this.loadData()

            setTimeout(() => {
                wx.hideLoading();
            }, 3000);
        }
    },

    loadData: function(){
        //this.loadPostInfo()
        this.loadPostBlocks()
        this.markHistory()
    },

    _setPostInfo: function(post, cb){
        var data = {}
        data.postInfo = post 
        data.pageTitle = post.title 
        data.pageCover = post.cover 
        console.log('set post info', post)
        wx.setNavigationBarTitle({
          title: post.title ,
        })
        this.setData(data, () => {
            typeof cb == 'function' && cb(post)
        })
    },

    loadPostInfo: function(cb){
        // 加载楼盘的基本信息
        // 优先从本地缓存中读取
        var _this = this  
        var pid = this.data.postId
        var key = 'post_base_info.' + pid
        wx.getStorage({
          key: key,
          success: function(cache){
            if(cache.data){
                _this._setPostInfo(cache.data, cb)
            }
           
          }
        })

        app.request({
            url: '/api/v1/post_base_info/' + pid, 
            hideLoading: true, 
            success: function(resp){
                var post = resp.data.data 
                if(!post){
                    // TODO 
                    return 
                }
                _this._setPostInfo(post, cb)
                wx.setStorage({
                  data: post,
                  key: key,
                })
   
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.clearInterval()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.clearInterval()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({ loading: true })
        this.loadData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },


    onShareAppMessage: function () {
        var _this = this
        return {
            title: _this.data.pageTitle,
            path: 'pages/post/post?' + _this.data.pageQuery + '&sceneName=wechat',
            imageUrl: _this.data.pageCover,
        }
    },

    onShareTimeline: function () {
        var _this = this
        return {
            title: _this.data.pageTitle,
            query:  _this.data.pageQuery + '&sceneName=timeline',
            imageUrl: _this.data.pageCover
        }
    }
})

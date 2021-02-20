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
        blocks: [],
        points: [],
        pageTitle: '房源详情',
        pageCover: '',
        pageUrl: '/pages/post/post?post_id=',
        postInfo: null,

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



    loadData: function () {
        var _this = this
        var query = {
            contact_name: this.data.contactInfo.name || '',
            contact_mobile: this.data.contactInfo.mobile || '',
        }

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

                _this.setData({
                    loading: false,
                    blocks: resp.data.data,
                }, () => {
                })
                //html = html.replace(/\<img/gi, '<img class="rich-text-img" ')
                //html = html.replace(/\<p/gi, '<p class="rich-text-p" ')

                wx.showShareMenu({
                    withShareTicket: true,
                    menus: ['shareAppMessage', 'shareTimeline']
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
        var system = wx.getSystemInfoSync()
        var h = system['windowHeight']
        this.setData({ windowHeight: h })
        this.setData({ EXT: app.globalData.EXT })
        app.checkForceLogin()
        var _this = this
        var mode = 1 // 房源信息的显示模式 1：正常显示，2，显示自定义联系人信息

        // 正常进入
        var postId = options.id
        if (options.contact) {
            // 分享海报进入，并设置成我自己的联系方式
            // 隐藏home
            var _contacts = options.contact.split('_')
            var postId = _contacts[0]
            this.setData({
                contactInfo: {
                    name: decodeURIComponent(_contacts[1]),
                    mobile: decodeURIComponent(_contacts[2]),
                    uid: decodeURIComponent(_contacts[3]),
                }
            })
        }

        _this.setData({ postId: postId }, () => {
            _this.loadData()
            _this.loadPostInfo()

        })
        app.markVisitor(null, postId, 'post', function (vid) {
            _this.setData({ 'visitorLogId': vid })
            _this.setInterval()
        })
        wx.hideShareMenu({
            menus: ['shareAppMessage', 'shareTimeline']
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


    loadPostInfo: function () {
        // 查询楼盘的基本信息，用于设置页面标题、分享文案等
        var _this = this
        app.request({
            url: '/api/v1/post_base_info/' + _this.data.postId,
            method: 'GET',
            success: function (resp) {
                var post = resp.data.data
                _this.setData({
                    pageTitle: post.title,
                    pageCover: post.cover,
                    postInfo: post
                })
                wx.setNavigationBarTitle({
                    title: post.title,
                });

            }

        })
    },

    setInterval: function () {
        // 如果是开发环境，不处理
        if (this.data.EXT['is_dev'] == true) {
            return false
        }

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
        this.setData({ userInfo: app.globalData.userInfo })
        if (!this.data.loading) {
            this.loadData()

            setTimeout(() => {
                wx.hideLoading();
            }, 3000);
        }
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
            path: 'pages/post/post?from_share=1&id=' + _this.data.postId,
            imageUrl: _this.data.pageCover,
        }
    },


    onShareTimeline: function () {
        var _this = this

        return {
            title: _this.data.pageTitle,
            query: 'id=' + _this.data.postId,
            imageUrl: _this.data.pageCover
        }
    }
})

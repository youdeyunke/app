// pages/post/index.js
const app = getApp()
var auth = require('../../utils/auth.js');
var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始 数据
     */
    data: {
        blocks: [],
        points: [],
        loading: true,
        visitorLogId: null,
        contactInfo: {},
        debug: false,
        user: {},
        showViewCount: false,
        showShareBox: false,
    },



    loadData: function () {
        var _this = this
        var query = {
            contact_name: this.data.contactInfo.name || '',
            contact_mobile: this.data.contactInfo.mobile || '',
        }
        var isDev = this.data.EXT['is_dev'] == true
        if (isDev) {
            query['dev'] = true
        }

        app.request({
            hideLoading: true,
            url: '/api/v5/posts/' + _this.data.postId,
            data: query,
            success: function (resp) {
                wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh() //停止下拉刷新    

                _this.setData({
                    loading: false,
                    blocks: resp.data.data,
                })
                //html = html.replace(/\<img/gi, '<img class="rich-text-img" ')
                //html = html.replace(/\<p/gi, '<p class="rich-text-p" ')
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

        _this.setData({ postId: postId })
        _this.loadData()
        app.markVisitor(null, postId, 'post', function (vid) {
            _this.setData({ 'visitorLogId': vid })
            _this.setInterval()
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 页面渲染完成后

    },

    queryTabsPosition: function () {
        // 查询tabs距离顶部的像素值
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


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({ userInfo: app.globalData.userInfo })
        this.loadData()
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

    formidHandle: function (e) {
        app.uploadFormId(e)
    },


    onShareAppMessage: function () {
        var _this = this
        return {
            title: _this.data.post['title'],
            path: 'pages/post/post?from_share=1&id=' + _this.data.post['id'],
            imageUrl: _this.data.post['cover']
        }
    },

})

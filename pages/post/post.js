// pages/post/index.js
const app = getApp()
var auth = require('../../utils/auth.js');
var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始 数据
     */
    data: {
        loading: true,
        visitorLogId: null,
        ntervalId: null,
        post: null,
        mode: 1,
        moreBrokersBtn: false,
        debug: false,
        user: {},
        brokers: [],
        showViewCount: false,
        contactInfo: {},
        posts: null,
        flowContent: '',
        flowId: '',
        showFlowForm: false,
        htmlContent: null,
        minicontent: true,
        showShareBox: false,
        currentTab: 'detail',
    },

    swiperChange: function (e) {
    },


    contentHandle: function (e) {
        this.setData({
            minicontent: !this.data.minicontent
        })
    },

    openWebview: function (e) {
        var url = this.data.post.more_url
        if (!url) {
            return
        }
        var _this = this
        wx.setStorageSync('webview', this.data.post.more_url)
        wx.navigateTo({
            url: '/pages/webview/webview?title=' + _this.data.post.title,
        })
    },

    readMore: function () {
        this.setData({ readmore: true })
    },

    readLess: function () {
        this.setData({ readmore: false })
    },

    loadQas: function () {
        var _this = this
        var postId = this.data.postId
        app.request({
            url: '/api/v1/questions/',
            hideLoading: true,
            data: { post_id: postId, limit: 999 },
            success: function (resp) {
                _this.setData({
                    qas: resp.data.data
                })
            }
        })
    },

    loadComments: function () {
        var _this = this
        var postId = this.data.postId
        app.request({
            hideLoading: true,
            url: '/api/v1/mycomments',
            hideLoading: true,
            data: { target_id: postId, target_type: 'post', limit: 999 },
            success: function (resp) {
                _this.setData({ comments: resp.data.data })
            },
        })
    },

    viewTypeImage: function (e) {
        var i = e.currentTarget.dataset.index
        var url = this.data.post.types[i].image.url
        wx.previewImage({ urls: [url] })
    },
    viewImage: function (e) {
        var urls = this.data.post.full_images_list
        var index = e.currentTarget.dataset.index
        var url = urls[index]
        wx.previewImage({
            current: url,
            urls: urls,
        })
    },

    call: function (e) {
        var mobile = e.currentTarget.dataset.value
        wx.makePhoneCall({
            phoneNumber: mobile //仅为示例，并非真实的电话号码
        })

    },

    callMe: function () {
        var m = this.data.post.staff_user.mobile
        wx.makePhoneCall({
            phoneNumber: m //仅为示例，并非真实的电话号码
        })
    },



    loadData: function () {
        var _this = this
        this.setData({ loading: true })
        var query = {
            contact_name:  this.data.contactInfo.name || '',
            contact_moile: this.data.contactInfo.mobile || '',
        }
        app.request({
            hideLoading: true,
            url: '/api/v5/posts/' + _this.data.postId,
            data: query,
            success: function (resp) {
                _this.setData({
                    loading: false,
                    blocks: resp.data.data
                })
                console.log('blocks', resp.data.data)
                //html = html.replace(/\<img/gi, '<img class="rich-text-img" ')
                //html = html.replace(/\<p/gi, '<p class="rich-text-p" ')
                wx.setNavigationBarTitle({ title: '房源详情' })
            }
        })
    },



createBookOrder: function (cb) {
    // 创建支付定金订单
    if (this.data.post.user_has_coupon) {
        return false;
    }

    var _this = this
    app.request({
        url: '/api/v1/book_orders',
        method: 'POST',
        data: { post_id: _this.data.postId },
        success: function (resp) {
            if (resp.data.status == 1) {
                return false;
            }

            console.log('支付成功后处理', resp.data)
            wx.showLoading({ title: '处理中...' })
            _this.loadPost(_this.data.postId)

            wx.showToast({
                icon: 'none',
                title: '已领取',
            })
            return true
        }
    })
},


gotoMetaUrl: function (e) {
    var url = e.currentTarget.dataset.url
    if (!url) {
        return false
    }

    var _this = this
    wx.navigateTo({
        url: url,
    })
},

showShareBoxHandle: function (e) {
    this.setData({
        showShareBox: true,
    })
},

closeShareBox: function (e) {
    this.setData({
        showShareBox: false
    })
},


saveImage: function (path, cb) {
    wx.saveImageToPhotosAlbum({
        filePath: path,
        complete: function (res) {
            if (res.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
                wx.navigateTo({
                    url: '/pages/myself/setting',
                    success: function () {
                        wx.showToast({
                            title: '请先在“权限设置”中打开相册权限',
                            icon: 'none',
                            duration: 3000,
                            success: function () { },
                        })
                    },
                })
            }
        },
        success: function (res) {
            wx.showToast({
                icon: 'none',
                title: '已保存，请前往手机相册查看',
            })
            return typeof cb == 'function' && cb()
        }
    })
},



isFromShare: function (scene) {
    var res = false;
    var s = parseInt(scene)
    // 需要显示回到首页按钮的场景列表
    var sList = [1007, 1008, 1011, 1012, 1013, 1014, 1047, 1048, 1049, 1058, 1067, 1069, 1073, 1074, 1081, 1084, 1091, 1096]
    for (var i = 0; i <= sList.length - 1; i++) {
        if (s == sList[i]) {
            res = true;
        }
    }
    return res;
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
    this.setData({ EXT: app.globalData.EXT })
    app.checkForceLogin()
    var _this = this
    var mode = 1 // 房源信息的显示模式 1：正常显示，2，显示自定义联系人信息

    // 正常进入
    var postId = options.id
    if(options.contact){
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

    //app.markVisitor(null, postId, 'post', function (vid) {
    //   _this.setData({ 'visitorLogId': vid })
    //    _this.setInterval()
    //})
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {

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
    console.log('统计停留时长, visitorlogid ', this.data.visitorLogId)
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


loadSub: function () {
    var sid = this.data.post.sub_district_id
    if (!sid) {
        return false;
    }
    var _this = this
    app.request({
        url: '/api/v1/sub_districts/' + sid,
        hideLoading: true,
        success: function (resp) {
            if (resp.data.status != 0) {
                return false
            }
            _this.setData({ sub: resp.data.data })
        }
    })
},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {
    this.setData({
        userInfo: app.globalData.userInfo
    })
},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {
    console.log('离开页面 onhide ')
    this.clearInterval()
},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {
    console.log('离开页面 onunload ')
    this.clearInterval()
},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {
    var pid = this.data.postId
    this.loadData(pid)
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

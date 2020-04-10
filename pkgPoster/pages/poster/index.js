// pages/poster/index.js
const app = getApp()
import Poster from '../../utils/poster/poster';
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tpls: [],
        tplIndex: 0,
        user: {},
        posterConfig: {},
        loading: true,
        posterUrl: '',
        coverUrl: '',
        showEditForm: false,
        qrUrl: '',
        label_1: '小区',
        label_2: '地址',
        label_3: '户型',
        label_4: '价格',
        label_5: '联系',
        text_1: '',
        text_2: '',
        text_3: '',
        text_4: '',
        text_5: '',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        // 先加载post数据，再自动生成海报
        var label_1 = '小区'
        var label_2 = '地址'
        var label_3 = '户型'
        var label_4 = '价格'
        var label_5 = '联系'
        var text_1 = ''
        var text_2 = ''
        var text_3 = ''
        var text_4 = ''
        var text_5 = ''
        var qrUrl = ''
        var coverUrl = ''

        wx.setNavigationBarTitle({ title: '制作房源海报' })
        var _this = this
        this.setData({ postId: q.id })
        this.loadPost(q.id, (post) => {
            // 根据房源信息生成对应的海报需要的字段
            coverUrl = post.cover || ''
            text_1 = post.sub_district.name
            text_2 = post.sub_district.address
            var _max = 18
            //  处理地址字符串超过19个情况
            if (text_2.length > _max) {
                text_2 = text_2.slice(0, _max) + '...'
            }

            text_3 = post.type_info.text
            text_3 = text_3.replace('0室', '待定')
            text_4 = post.price_info.text + post.price_info.px
            text_5 = post.broker_info.mobile + '(' + post.broker_info.name + ')'
            qrUrl = post.qr
            switch (post.group) {
                case 'new':
                    label_1 = '楼盘'
                    label_4 = '均价'
                    break
                case 'rental':
                    label_4 = '租金'
            }

            // 加载模板
            _this.loadTpls((tpls) => {
                var data = {
                    post: post,
                    qrUrl: qrUrl,
                    label_1: label_1,
                    label_2: label_2,
                    label_3: label_3,
                    label_4: label_4,
                    label_5: label_5,
                    text_1: text_1,
                    text_2: text_2,
                    text_3: text_3,
                    text_4: text_4,
                    text_5: text_5,
                    tplIndex: 0,
                    coverUrl: coverUrl,
                    tpls: tpls,
                }
                _this.setData(data, (res) => {
                    _this.genPoster()
                })
            })
        })
    },

    loadTpls: function (cb) {
        app.request({
            url: '/api/v1/poster_templates/',
            success: function (resp) {
                if (resp.data.status == 0) {
                    return typeof cb == 'function' && cb(resp.data.data)
                }
            }
        })
    },

    loadPost: function (postId, cb) {
        app.request({
            hideLoading: true,
            url: '/api/v2/posts/' + postId,
            success: function (resp) {
                var post = resp.data.data
                typeof cb == 'function' && cb(post)
            }
        })
    },

    onPosterFail: function (e) {
        console.log('生成海报失败', e)
    },

    onPosterSuccess: function (e) {
        const { detail } = e;
        this.setData({
            posterUrl: detail,
        })
    },

    onSavePoster: function (e) {
        var _this = this
        var path = this.data.posterUrl
        var _this = this
        app.saveImage(path, function (res) {
            _this.setData({ showPoster: false })
        })
    },


    genPostQrUrl: function (info, cb) {
        // 根据数据生成房源的二维码信息
        console.log('生成绑定唯一联系人的二维码', info)
        if (info.mobile) {
            wx.showLoading({
                title: '生成二维码',
                mask: true,
            });

            var path = 'pages/post/post?contact=' + this.data.post.id + '_' + info.name + '_' + info.mobile + '_' + this.data.user.id
            app.genQr(path, function (data) {
                var url = data.qr
                console.log('生成专属唯一二维码', url)
                setTimeout(cb(url), 4000)
            })
        }
    },

    editHandle: function (e) {
        // 保存修改后的联系人
        this.setData({ showEditForm: true })
    },

    cancleHandle: function (e) {
        this.setData({ showEditForm: false })
    },

    submitHandle: function (e) {
        /* 提交修改联系人信息 */
        var info = e.detail.value
        if (info.name.length < 2 || info.name.includes('_')) {
            wx.showToast({
                title: '请输入正确的联系人姓名',
                icon: 'none',
                duration: 2000
            })
            return false
        }

        if (info.mobile.length <= 10 || info.mobile.includes('_')) {
            wx.showToast({
                title: '请输入正确的联系号码',
                icon: 'none',
                duration: 2000
            })
            return false
        }

        var text_5 = info.mobile + ' (' + info.name + ')'
        // 生成唯一二维码
        var _this = this
        this.genPostQrUrl(info, (qrUrl) => {
            _this.setData({ text_5: text_5, loading: true, qrUrl: qrUrl })
            _this.genPoster()
        })
    },

    showTips: function () {
        wx.showModal({
            title: '房源海报有什么用途?',
            content: '可发布到朋友圈、微信聊天群等，好友长按识别即可打开房源页面',
            confirmText: '知道了',
            success(res) {
            }
        })

    },

    onCreatePoster: function () {
        // 根据配置生成海报图片
        Poster.create()
    },


    genPoster: function () {
        wx.showLoading({
            title: '制作海报',
            mask: true,
        });

        this.setData({
            showEditForm: false,
            loading: true,
        })
        var _this = this
        var qrUrl = this.data.qrUrl
        console.log('生成海报时，携带的二维码图片为', qrUrl)
        var post = this.data.post
        var tpl = this.data.tpls[this.data.tplIndex]
        var bgImage = tpl.bg
        var fontColor = tpl.font_color || '#ffffff'
        var config = {
            hideLoading: true,
            debug: false,
            backgroundColor: '#ffffff',
            width: 370,
            pixelRatio: 3,
            preload: false,
            height: 658,
            blocks: [
                {
                    width: 90,
                    height: 90,
                    x: 242,
                    y: 542,
                    borderRadius: 90,
                    backgroundColor: '#ffffff',
                    zIndex: 1,
                },
            ],
            images: [
                {
                    _desc: '背景底图',
                    width: 370,
                    height: 658,
                    x: 0,
                    y: 0,
                    borderRadius: 0,
                    url: bgImage,
                    zIndex: 0,
                },

                {
                    _desc: '封面图',
                    width: 340,
                    height: 232,
                    x: 15,
                    y: 19,
                    borderRadius: 0,
                    url: _this.data.coverUrl,
                    zIndex: 19,
                },

                {
                    width: 90,
                    height: 90,
                    x: 242,
                    y: 542,
                    borderRadius: 0,
                    zIndex: 100,
                    url: qrUrl,
                },

            ],
            texts: [
                {
                    x: 23.5,
                    y: 280,
                    baseLine: 'top',
                    text: _this.data.label_1,
                    fontSize: 20,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 23.5,
                    y: 316,
                    baseLine: 'top',
                    text: _this.data.label_2,
                    fontSize: 20,
                    color: fontColor,
                    zIndex: 100,
                },

                {
                    x: 23.5,
                    y: 353,
                    baseLine: 'top',
                    text: _this.data.label_3,
                    fontSize: 20,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 23.5,
                    y: 390,
                    baseLine: 'top',
                    text: _this.data.label_4,
                    fontSize: 20,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 23.5,
                    y: 427,
                    baseLine: 'top',
                    text: _this.data.label_5,
                    fontSize: 20,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 83,
                    y: 283,
                    baseLine: 'top',
                    text: _this.data.text_1,
                    fontSize: 14,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 83,
                    y: 320,
                    baseLine: 'top',
                    text: _this.data.text_2,
                    fontSize: 14,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 83,
                    y: 357,
                    baseLine: 'top',
                    text: _this.data.text_3,
                    fontSize: 14,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 83,
                    y: 395,
                    baseLine: 'top',
                    text: _this.data.text_4,
                    fontSize: 12,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 83,
                    y: 432,
                    baseLine: 'top',
                    text: _this.data.text_5,
                    fontSize: 12,
                    color: fontColor,
                    zIndex: 100,
                },

                {
                    x: 36,
                    y: 553,
                    baseLine: 'top',
                    text: "长按识别",
                    fontSize: 24,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 36,
                    y: 586,
                    baseLine: 'top',
                    text: "在线看房",
                    fontSize: 24,
                    color: fontColor,
                    zIndex: 100,
                },

            ],

        }

        var _this = this
        this.setData({ posterConfig: config, showEditForm: false }, () => {
            _this.setData({ loading: false })
            Poster.create(true)
        })
    },

    previewPoster: function () {
        wx.previewImage({ urls: [this.data.posterUrl] })
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
        var _this = this
        auth.ensureUser(function (user) {
            _this.setData({ user: user, showEditForm: false, loading: true })
            if (_this.data.post && _this.data.post.id) {
                _this.genPoster()
            }
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

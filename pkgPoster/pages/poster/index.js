// pages/poster/index.js
const app = getApp()
import Poster from '../../..//utils/wxa-plugin-canvas/poster/poster';
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: {},
        posterConfig: {},
        posterUrl: '',
        showEditForm: false,
        sub_district_label: '',
        type_info_value: '',
        contactInfo: {
            name: '',
            mobile: '',
        },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        // 先加载post数据，再自动生成海报
        wx.setNavigationBarTitle({ title: '制作房源海报' })
        var _this = this
        this.setData({ postId: q.id })
        this.loadPost(q.id, (post) => {
            // 根据房源信息生成对应的海报需要的字段
            var sub_district_label = '小区'
            var type_info_value = post.type_info['text']
            type_info_value = type_info_value.replace('0室', '待定')
            switch (post.group) {
                case 'new':
                    sub_district_label = '楼盘'
                    break
            }

            var data = { post: post, sub_district_label: sub_district_label, type_info_value: type_info_value }
            _this.setData(data, (res) => {
                _this.genPosterConfig()
            })
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


    genPostQrUrl: function (cb) {
        // 根据数据生成房源的二维码信息
        console.log('this.data.contactInfo', this.data.contactInfo.mobile)
        if (this.data.contactInfo.mobile) {
            var path = 'pages/post/post?contact=' + this.data.post.id + '_' + this.data.contactInfo.name + '_' + this.data.contactInfo.mobile + '_' + this.data.user.id
            app.genQr(path, function (data) {
                var url = data.qr
                console.log('生成专属唯一二维码', url)
                // 先touch一下，防止cdn没有同步到
                app.touchCdnFile(url)
                setTimeout(cb(url), 4000)
            })
        } else {
            return cb(this.data.post.qr)
        }
    },

    editHandle: function (e) {
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

        if (info.mobile.length != 11 || info.mobile.includes('_')) {
            wx.showToast({
                title: '请输入正确的联系人手机号码',
                icon: 'none',
                duration: 2000
            })
            return false
        }

        var _this = this
        this.setData({ contactInfo: info, loading: true, }, function () {
            _this.genPosterConfig()
        })
    },

    showTips: function () {
        wx.showModal({
            title: '房源海报有什么用途?',
            content: '1，可按A4格式打印后张贴，客户扫码看房 2，可发布到朋友圈，好友长按识别即可打开房源页面',
            confirmText: '知道了',
            success(res) {
            }
        })

    },

    onCreatePoster: function () {
        // 根据配置生成海报图片
        Poster.create()
    },


    genPosterConfig: function () {
        this.setData({ posterUrl: '', loading: true, showEditForm: false })
        var _this = this
        var post = this.data.post
        var mobileStr = post.broker_info.mobile + '(' + post.broker_info.name + ')'
        if (this.data.contactInfo.mobile) {
            var mobileStr = this.data.contactInfo.mobile + '(' + this.data.contactInfo.name + ')'
        }
        this.genPostQrUrl(function (qrUrl) {
            _this._genPosterConfig(mobileStr, qrUrl)
        })
    },


    _genPosterConfig: function (mobileStr, qrUrl) {
        console.log('生成海报时，携带的二维码图片为', qrUrl)
        var post = this.data.post
        var config = {
            hideLoading: true,
            debug: false,
            backgroundColor: '#ffffff',
            width: 1240,
            pixelRatio: 1,
            preload: false,
            height: 1754,
            blocks: [


            ],
            images: [
                {
                    width: 1081,
                    height: 590,
                    x: 80,
                    y: 56,
                    borderRadius: 0,
                    url: post.cover,
                    zIndex: 10,
                },

                {
                    width: 245,
                    height: 245,
                    x: 125,
                    y: 1460,
                    borderRadius: 0,
                    zIndex: 100,
                    url: qrUrl,
                },

            ],
            texts: [
                {
                    x: 125,
                    y: 718,
                    baseLine: 'top',
                    text: this.data.sub_district_label + "：" + post.sub_district_name,
                    fontSize: 60,
                    color: '#000000',
                    zIndex: 100,
                },
                {
                    x: 125,
                    y: 848,
                    baseLine: 'top',
                    text: post.sub_district.address,
                    fontSize: 40,
                    color: '#000000',
                    zIndex: 100,
                },
                {
                    x: 125,
                    y: 978,
                    baseLine: 'top',
                    text: "户型：" + this.data.type_info_value,
                    fontSize: 60,
                    color: '#000000',
                    zIndex: 100,
                },
                {
                    x: 125,
                    y: 1108,
                    baseLine: 'top',
                    text: "面积：" + post.area_info.text + post.area_info.px,
                    fontSize: 60,
                    color: '#000000',
                    zIndex: 100,
                },
                {
                    x: 125,
                    y: 1238,
                    baseLine: 'top',
                    text: post.price_info.label + "：" + post.price_info.text + post.price_info.px,
                    fontSize: 60,
                    color: '#000000',
                    zIndex: 100,
                },
                {
                    x: 125,
                    y: 1368,
                    baseLine: 'top',
                    text: "电话: " + mobileStr,
                    fontSize: 60,
                    color: '#000000',
                    zIndex: 100,
                },

                {
                    x: 404,
                    y: 1540,
                    baseLine: 'top',
                    text: "微信扫码，在线看房",
                    fontSize: 60,
                    color: '#666666',
                    zIndex: 100,
                },

            ],

        }

        var _this = this
        this.setData({ posterConfig: config, showEditForm: false }, () => {
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
                _this.genPosterConfig()
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

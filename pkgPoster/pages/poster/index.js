// pages/poster/index.js
const app = getApp()
import Poster from '../../utils/poster/poster';
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        tpls: [],
        tplIndex: 0,
        newTplIndex: 0,
        user: {},
        posterConfig: {},
        posterUrl: '',
        showTpls: false,
        qrUrl: '',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        // 先加载post数据，再自动生成海报
        var _this = this
        let pid = q.id || q.post_id
        var userInfo = app.globalData.userInfo 
        this.setData({ postId: pid })
        this.loadPost(pid, (post) => {
            // 加载模板
            _this.loadTpls((tpls) => {
                _this.genQr(userInfo, (url) => {
                    var qr = url || post.qr
                    var data = {
                        post: post,
                        qrUrl: qr,
                        tpls: tpls,
                    }
                    _this.setData(data, () => {
                        _this.genPoster()
                    })
                })
            })
        })
    },

    loadTpls: function (cb) {
        var _this = this
        var tpls = [
            {
                name: '祥云',
                bg: 'https://qiniucdn.udeve.cn/poster-templates/6.jpg',
                font_color: '#fff'
            }
        ]
        app.request({
            url: '/api/v1/poster_templates/',
            success: function (resp) {
                if (resp.data.status == 0) {
                    // 后端没有录入数据
                    if(resp.data.data && resp.data.data.length > 0){
                        tpls = resp.data.data
                    } 
                    return typeof cb == 'function' && cb(tpls)
                } else {
                    // 服务器版本不够，降级处理
                    return typeof cb == 'function' && cb(tpls)
                }
            }
        })
    },

    loadPost: function (postId, cb) {
        app.request({
            hideLoading: true,
            url: '/api/v1/post_base_info/' + postId,
            methods:'GET',
            success: function (resp) {
                var post = resp.data.data
                typeof cb == 'function' && cb(post)
            }
        })
    },

    onPosterFail: function (e) {
        console.log('生成海报失败', e)
        wx.hideLoading();
        this.setData({ loading: false })
    },

    onPosterSuccess: function (e) {
        console.log('on poster success', e)
        var _this = this
        const { detail } = e;
        this.setData({
            posterUrl: detail,
        })
        setTimeout(function () {
            wx.hideLoading();
            _this.setData({ loading: false })
            wx.showToast({
                title: '已生成',
                icon: 'success',
                image: '',
                duration: 1000,
                mask: false,
            });

        }, 1000)
    },

    onSavePoster: function (e) {
        var _this = this
        var path = this.data.posterUrl
        var _this = this
        app.saveImage(path, function (res) {
            _this.setData({ showPoster: false })
        })
    },

    tplHandle: function () {
        this.setData({ showTpls: true })
    },

    cancleTplHandle: function () {
        this.setData({ showTpls: false, tplIndex: 0, newTplIndex: 0 })
    },

    confirmTplHandle: function (e) {
        if (this.data.newTplIndex == this.data.tplIndex) {
            // tpl 没有变化，不重做
            this.setData({ showTpls: false })
            return false;
        }
        var tplIndex = this.data.newTplIndex
        this.setData({
            tplIndex: tplIndex,
            posterUrl: '',
            loading: true,
            showTpls: false,
        })
        this.genPoster()
    },

    tplChange: function (e) {
        var i = e.currentTarget.dataset.index
        var tpl = this.data.tpls[i]
        this.setData({ newTplIndex: i })
    },

    genQr: function (uinfo, cb) {
        // 根据数据生成房源的二维码信息
        // 如果是普通股用户，就直接返回默认二维码 
        if(!uinfo){
            return cb(null)
        }
        if(!uinfo.is_broker){
            return cb(null)
        }

        var path = '/pkgPost/pages/show/index?id=' + this.data.postId  
        // 二维码携带的额外参数
        var qrdata = {
            id: this.data.postId, 
            scene_key: 'poster',
            source_uid: uinfo.id,  
        }
        app.genQr(path, qrdata, function (data) {
            var url = data.url
            console.log('生成专属唯一二维码', url)
            cb(url)
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
        // 生成海报数据结构
        var post = this.data.post
        var address = post.street || post.address
        var max = 13
        //  处理地址字符串超过19个情况
        if (address.length > max) {
            address = address.slice(0, _max) + '...'
        }

        var qrUrl = this.data.qrUrl
        var post = this.data.post
        var tpl = this.data.tpls[this.data.tplIndex]
        var bgImage = tpl.bg
        var addressIcon = '../../image/icon//address.png'

        var userInfo = app.globalData.userInfo
        var fontColor = tpl.font_color || '#ffffff'
        var config = {
            debug: false,
            backgroundColor: '#ffffff',
            width: 370,
            pixelRatio: 2,
            preload: false,
            height: 658,
            blocks: [
                {
                    width: 100,
                    height: 100,
                    x: 250,
                    y: 592,
                    borderRadius: 100,
                    backgroundColor: '#ffffff',
                    zIndex: 1,
                },

                {
                    width: 340,
                    height: 413,
                    x: 15,
                    y: 145,
                    borderRadius: 0,
                    backgroundColor: '#ffffff',
                    zIndex: 1,
                },
                {
                    width: 32,
                    height: 17,
                    x: 317,
                    y: 350,
                    borderRadius: 5,
                    backgroundColor: 'white',
                    zIndex: 50,
                },
            ],
            images: [
                {
                    _desc: '背景底图',
                    width: 375,
                    height: 790,
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
                    y: 145,
                    borderRadius: 0,
                    url: post.cover,
                    zIndex: 19,
                },
                {
                    _desc: '用户头像',
                    width: 40,
                    height:40,
                    x: 34,
                    y: 596,
                    borderRadius: 40,
                    url: userInfo.avatar,
                    zIndex: 19,
                },
                {
                    width: 90,
                    height: 90,
                    x: 255,
                    y: 597,
                    borderRadius: 0,
                    zIndex: 90,
                    url: qrUrl,
                },
                {
                    _desc: '地址图标',
                    width: 15,
                    height: 15,
                    x: 34,
                    y: 464,
                    borderRadius: 0,
                    url: addressIcon,
                    zIndex: 19,
                },
            ],
            texts: [
                {
                    x: 17,
                    y: 49,
                    baseLine: 'top',
                    text: '楼盘海报',
                    fontSize: 30,
                    fontWeight:'bold',
                    color:'white',
                    zIndex: 100,
                },
                {
                    x: 17,
                    y: 92,
                    baseLine: 'top',
                    text: '足不出户在线看新房',
                    fontSize: 20,
                    color:'white',
                    zIndex: 100,
                },
                {
                    x:302 ,
                    y: 350,
                    baseLine: 'top',
                    text: 'sale status',
                    fontSize: 20,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 320,
                    y: 353,
                    baseLine: 'top',
                    text: "",
                    fontSize: 14,
                    fontWeight:'bold',
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 34,
                    y: 394,
                    baseLine: 'top',
                    text: post.title,
                    fontSize: 20,
                    fontWeight:'bold',
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 50,
                    y: 464,
                    baseLine: 'top',
                    text: '地址',
                    fontSize: 16,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 37,
                    y: 500,
                    baseLine: 'top',
                    text: '建面',
                    fontSize: 16,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 147,
                    y: 500,
                    baseLine: 'top',
                    text: '均价',
                    fontSize: 16,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 267,
                    y: 500,
                    baseLine: 'top',
                    text: '装修',
                    fontSize: 16,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 100,
                    y: 466,
                    baseLine: 'top',
                    text: address,
                    fontSize: 16,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 37,
                    y: 530,
                    baseLine: 'top',
                    text: post.area_info.text+post.area_info.px,
                    fontSize: 14,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 147,
                    y: 530,
                    baseLine: 'top',
                    text: post.average_price_info.text+post.average_price_info.px,
                    fontSize: 14,
                    color: '#E46C69',
                    zIndex: 100,
                },
                {
                    x: 90,
                    y: 610,
                    baseLine: 'top',
                    text: userInfo.name,
                    fontSize: 20,
                    color: 'white',
                    zIndex: 100,
                },
                {
                    x: 267,
                    y: 530,
                    baseLine: 'top',
                    text: post.fitment,
                    fontSize: 14,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 36,
                    y: 650,
                    baseLine: 'top',
                    text: "专业、优质服务",
                    fontSize: 16,
                    color: 'white',
                    zIndex: 100,
                },
                {
                    x: 36,
                    y: 680,
                    baseLine: 'top',
                    text: "长安识别小程序码查看详情",
                    fontSize: 16,
                    color: 'white',
                    zIndex: 100,
                },
            ],

        }

        // 计算标签
        let x=34
        let keys = 0
        let width = 0
        for(let key of post.tags.slice(0,3)){
            if(keys>5&&key.name.length>1){
                x=x+95
            }
            if(keys==5&&key.name.length>1){
                x=x+80
            }
            if(keys==4&&key.name.length>1)
            {
                x=x+68
            }
            if(keys==3&&key.name.length>1){
                x=x+55
            }
            if(keys==2&&key.name.length>1){
                x=x+38
            }
            keys=key.name.length
            var arr = {
                x:x,
                y: 433,
                baseLine: 'top',
                text: key.name,
                fontSize: 13,
                color: key.color,
                borderWidth:1,
                borderColor:'#A0A0A0',
                borderRadius:5,
                zIndex: 100,
            }
            if(key.name.length==2){
                width = 32 
            }
            if(key.name.length==3){
                width = 46
            }
            if(key.name.length==4){
                width = 60
            }
            if(key.name.length==5){
                width = 74
            }
            if(key.name.length==6){
                width = 88
            }
            var arrs={
                    width: width,
                    height: 24,
                    x: x-4,
                    y: 427,
                    borderWidth:1,
                    borderColor:key.color,
                    borderRadius: 3,
                    backgroundColor: '#ffffff',
                    zIndex: 99,
            }
            config.texts.push(arr)
            config.blocks.push(arrs)
        }
        this.setData({ posterConfig: config }, () => {
            console.log('config is', config)
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

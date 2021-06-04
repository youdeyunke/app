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
        coverUrl: '',
        showEditForm: false,
        showTpls: false,
        qrUrl: '',
        label_1: '',
        label_2: '',
        label_3: '',
        label_4: '',
        label_5: '',
        label_6: '',
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
        var label_1 = '楼盘海报'
        var label_2 = '足不出户在线看新房'
        var label_3 = ''
        var label_4 = '价格'
        var label_5 = '地址:'
        var label_6 = '建面'
        var label_7 = '均价'
        var label_8 = '装修'
        var text_1 = '未知'
        var text_2 = '未知'
        var text_3 = '未知'
        var text_4 = '未知'
        var text_5 = '未知'
        var text_6 = '未知'
        var qrUrl = ''
        var coverUrl = ''

        wx.setNavigationBarTitle({ title: '制作房源海报' })
        var _this = this
        this.setData({ postId: q.id || q.post_id })
        let pid = q.id || q.post_id
        this.loadPost(pid, (post) => {
            // 根据房源信息生成对应的海报需要的字段
            qrUrl = post.qr
            coverUrl = post.cover || ''
            text_1 = ''
            text_2 = post.street || post.address
            var _max = 18
            //  处理地址字符串超过19个情况
            if (text_2.length > _max) {
                text_2 = text_2.slice(0, _max) + '...'
            }

            // 有面积字段
            text_6 = post.area_info.text + ' 平'
            text_3 = '' // TODO 
          
            text_4 = post.average_price_info.text + post.average_price_info.px
            text_5 = post.phone + ' ' + post.phone_sub

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
                    label_6: label_6,
                    label_7: label_7,
                    label_8: label_8,
                    text_1: text_1,
                    text_2: text_2,
                    text_3: text_3,
                    text_4: text_4,
                    text_5: text_5,
                    text_6: text_6,
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
            url: '/api/v1/poster_info?id=' + postId,
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

    genPostQrUrl: function (info, cb) {
        // 根据数据生成房源的二维码信息
        console.log('生成绑定唯一联系人的二维码', info)
        var uid = this.data.user.id || '0'
        if (info.mobile) {
            wx.showLoading({
                title: '生成二维码',
                mask: true,
            });

            var path = 'pages/post/post?contact=' + this.data.post.id + '_' + info.name + '_' + info.mobile + '_' + uid
            app.genQr(path, function (data) {
                var url = data.qr
                console.log('生成专属唯一二维码', url)
                cb(url)
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


        if (info.mobile.length <= 8 || info.mobile.includes('_')) {
            wx.showToast({
                title: '请输入正确的联系号码',
                icon: 'none',
                duration: 2000
            })
            return false
        }

        this.setData({
            showEditForm: false,
        })

        var text_5 = info.mobile + ' (' + info.name + ')'
        // 生成唯一二维码
        var _this = this
        this.genPostQrUrl(info, (qrUrl) => {
            _this.setData({ text_5: text_5, loading: true, qrUrl: qrUrl, posterUrl: '' })
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
            title: '制作海报中...',
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
        var Image = '../../image/icon//address.png'
        console.log('tpl is',tpl)
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
                    url: _this.data.coverUrl,
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
                    url: Image,
                    zIndex: 19,
                },
            ],
            texts: [
                {
                    x: 17,
                    y: 49,
                    baseLine: 'top',
                    text: _this.data.label_1,
                    fontSize: 30,
                    fontWeight:'bold',
                    color:'white',
                    zIndex: 100,
                },
                {
                    x: 17,
                    y: 92,
                    baseLine: 'top',
                    text: _this.data.label_2,
                    fontSize: 20,
                    color:'white',
                    zIndex: 100,
                },
                {
                    x:302 ,
                    y: 350,
                    baseLine: 'top',
                    text: _this.data.label_3,
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
                    text: _this.data.label_5,
                    fontSize: 16,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 37,
                    y: 500,
                    baseLine: 'top',
                    text: _this.data.label_6,
                    fontSize: 16,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 147,
                    y: 500,
                    baseLine: 'top',
                    text: _this.data.label_7,
                    fontSize: 16,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 267,
                    y: 500,
                    baseLine: 'top',
                    text: _this.data.label_8,
                    fontSize: 16,
                    color: fontColor,
                    zIndex: 100,
                },
                {
                    x: 100,
                    y: 466,
                    baseLine: 'top',
                    text: _this.data.text_2,
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
                    text: _this.data.label_8,
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
        var _this = this
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

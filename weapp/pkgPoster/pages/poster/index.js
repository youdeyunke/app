/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// pages/poster/index.js
const app = getApp()
const postApi = require("../../../api/post")
const posterApi = require('../../../api/poster')

var title = {
    type: 'text',
    text: "楼盘海报",
    css: {
        width: '300rpx',
        height: '80rpx',
        fontSize: "60rpx",
        top: "97rpx",
        left: "30rpx",
        color: "#FFFFFF",
        fontWeight: "bold"
    }
}
var subTitle = {
    type: 'text',
    text: "足不出户在线看新房",
    css: {
        width: '300rpx',
        height: '40rpx',
        fontSize: "30rpx",
        top: "185rpx",
        left: "30rpx",
        color: "#FFFFFF"
    }
}
var postCover = {
    type: 'image',
    url: '',
    css: {
        width: '690rpx',
        height: '465rpx',
        top: '290rpx',
        left: '30rpx',
    },
}
var messageBg = {
    type: 'rect',
    css: {
        width: '690rpx',
        height: '361rpx',
        color: '#FFFFFF',
        top: '755rpx',
        left: '30rpx',
    },
}
var postTitle = {
    type: 'text',
    text: '',
    css: {
        width: '580rpx',
        height: '53rpx',
        fontSize: "40rpx",
        top: "788rpx",
        left: "68rpx",
        fontWeight: "bold",
        maxLines: 1
    }
}
var addressIcon = {
    type: 'image',
    url: '/assets/icons/haibao-address.png',
    css: {
        width: '20rpx',
        height: '24rpx',
        top: '937rpx',
        left: '70rpx',
    },
}
var address = {
    type: 'text',
    text: '',
    css: {
        width: '550rpx',
        height: '34rpx',
        fontSize: "26rpx",
        top: "932rpx",
        left: "110rpx",
        maxLines: 1
    }
}
var jianmian = {
    type: 'text',
    text: '建面',
    css: {
        width: '68rpx',
        height: '32rpx',
        fontSize: "24rpx",
        color: "#AFAFAF",
        top: "996rpx",
        left: "68rpx",
    }
}
var jianmianData = {
    type: 'text',
    text: '',
    css: {
        width: '220rpx',
        height: '40rpx',
        fontSize: "30rpx",
        fontWeight: "bold",
        top: "1037rpx",
        left: "68rpx",
    }
}
var junjia = {
    type: 'text',
    text: '均价',
    css: {
        width: '68rpx',
        height: '32rpx',
        fontSize: "24rpx",
        color: "#AFAFAF",
        top: "996rpx",
        left: "297rpx",
    }
}
var junjiaData = {
    type: 'text',
    text: '',
    css: {
        width: '220rpx',
        height: '40rpx',
        fontSize: "30rpx",
        fontWeight: "bold",
        color: "#E46C69",
        top: "1037rpx",
        left: "297rpx",
    }
}
var zhuangxiu = {
    type: 'text',
    text: '装修',
    css: {
        width: '68rpx',
        height: '32rpx',
        fontSize: "24rpx",
        color: "#AFAFAF",
        top: "996rpx",
        left: "556rpx",
    }
}
var zhuangxiuData = {
    type: 'text',
    text: '',
    css: {
        width: '220rpx',
        height: '40rpx',
        fontSize: "30rpx",
        fontWeight: "bold",
        top: "1037rpx",
        left: "556rpx",
    }
}
var qrBg = {
    type: 'rect',
    css: {
        width: '143rpx',
        height: '143rpx',
        color: '#FFFFFF',
        // borderRadius: '72rpx',
        top: '1176rpx',
        left: '552rpx',
    },
}
var qr = {
    type: 'image',
    url: '',
    css: {
        width: '127rpx',
        height: '127rpx',
        top: '1184rpx',
        left: '560rpx',
    },
}
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
        showTpls: false,
        qrUrl: '',
        imagePath: '',
        palette: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        // 先加载post数据，再自动生成海报
        var _this = this
        let pid = q.id || q.post_id
        var userInfo = app.globalData.userInfo
        this.setData({
            postId: pid
        })
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
        var tpls = [{
            name: '祥云',
            bg: 'https://tcdn.udeve.net/poster-templates/6.jpg',
            font_color: '#fff'
        }]
        posterApi.gettPosterList().then((resp) => {
            if (resp.data.status == 0) {
                // 后端没有录入数据
                if (resp.data.data && resp.data.data.length > 0) {
                    tpls = resp.data.data
                }
                return typeof cb == 'function' && cb(tpls)
            } else {
                // 服务器版本不够，降级处理
                return typeof cb == 'function' && cb(tpls)
            }
        })
    },

    loadPost: function (postId, cb) {
        // √
        postApi.getPostBaseInfo(postId).then((resp) => {
            var post = resp.data.data
            typeof cb == 'function' && cb(post)
        })
    },

    tplHandle: function () {
        this.setData({
            showTpls: true
        })
    },

    cancleTplHandle: function () {
        this.setData({
            showTpls: false,
            tplIndex: 0,
            newTplIndex: 0
        })
    },

    confirmTplHandle: function (e) {
        if (this.data.newTplIndex == this.data.tplIndex) {
            // tpl 没有变化，不重做
            this.setData({
                showTpls: false
            })
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
        this.setData({
            newTplIndex: i
        })
    },

    genQr: function (uinfo, cb) {
        // 根据数据生成房源的二维码信息
        // 如果是普通股用户，就直接返回默认二维码 
        if (!uinfo) {
            return cb(null)
        }
        if (!uinfo.is_broker) {
            return cb(null)
        }

        var path = '/pkgPost/pages/show/index?id=' + this.data.postId
        // 二维码携带的额外参数
        var qrdata = {
            id: this.data.postId,
            scene_key: 'poster',
            bindBrokerId: uinfo.id,
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
            success (res) { }
        })

    },

    genPoster: function () {
        // 生成海报数据结构
        var post = this.data.post

        var qrUrl = this.data.qrUrl
        var tpl = this.data.tpls[this.data.tplIndex]
        if (post.average_price) {
            var averagePrice = post.average_price
        }
        var bgImage = tpl.bg

        var userInfo = app.globalData.userInfo
        var fontColor = tpl.font_color || '#ffffff'
        if (post.cover) {
            postCover.url = post.cover
        }
        if (post.title) {
            postTitle.text = post.title
        }
        if (post.address) {
            address.text = '地址：' + post.address
        }
        if (post.fitment) {
            zhuangxiuData.text = post.fitment
        }
        if (post.area_info.text && post.area_info.px) {
            jianmianData.text = post.area_info.text + post.area_info.px
            junjiaData.text = averagePrice + post.average_price_info.px
        }
        qr.url = qrUrl

        var palette = {
            background: bgImage,
            width: '750rpx',
            height: '1550rpx',
            views: [title, subTitle, postCover, messageBg, postTitle, addressIcon, address, jianmian, jianmianData, junjia, junjiaData, zhuangxiu, zhuangxiuData, qrBg, qr],
        }

        var haibaoTags = this.genTags()
        if (haibaoTags) {
            haibaoTags.forEach((item) => {
                palette.views.push(item)
            })
        }

        // 如果是置业顾问，显示头像和姓名
        var broker = this.genBrokerName()
        broker.forEach((item) => {
            palette.views.push(item)
        })
        this.setData({
            palette: palette
        })
    },

    genBrokerName () {
        var userInfo = app.globalData.userInfo
        if (userInfo && userInfo.is_broker) {
            return [{
                type: 'image',
                url: userInfo.avatar,
                css: {
                    width: '47rpx',
                    height: '47rpx',
                    borderRadius: '23rpx',
                    top: '1187rpx',
                    left: '55rpx',
                },
            },
            {
                type: 'text',
                text: userInfo.name,
                css: {
                    width: '300rpx',
                    height: '48rpx',
                    fontSize: "36rpx",
                    top: "1187rpx",
                    left: "122rpx",
                    color: "#FFFFFF",
                }
            },
            {
                type: 'text',
                text: '专业、优质服务',
                css: {
                    width: '394rpx',
                    height: '32rpx',
                    fontSize: "24rpx",
                    top: "1245rpx",
                    left: "57rpx",
                    color: "#FFFFFF",
                }
            },
            {
                type: 'text',
                text: '长按识别小程序码查看详情',
                css: {
                    width: '394rpx',
                    height: '32rpx',
                    fontSize: "24rpx",
                    top: "1282rpx",
                    left: "57rpx",
                    color: "#FFFFFF",
                }
            }
            ]

        } else {
            return [{
                type: 'text',
                text: '长按识别小程序码查看详情',
                css: {
                    width: '394rpx',
                    height: '32rpx',
                    fontSize: "24rpx",
                    top: "1245rpx",
                    left: "57rpx",
                    color: "#FFFFFF",
                }
            }]
        }
    },

    genTags () {
        var post = this.data.post
        var haibaoTags = post.tags.filter((q, i) => i < 3).map((q, i) => {
            var tag = {
                type: 'text',
                id: 'tag' + (i + 1),
                text: ' ' + q.name + ' ',
                css: {
                    height: '36rpx',
                    lineHeight: '30rpx',
                    fontSize: "24rpx",
                    color: "#AFAFAF",
                    borderRadius: "5rpx",
                    borderWidth: "1rpx",
                    borderColor: "#AFAFAF",
                    top: "866rpx",
                    left: 'calc(tag' + i + '.right + 10rpx)',
                }
            }
            if (i == 0) {
                tag.css.left = "70rpx"
            }
            return tag
        })
        return haibaoTags
    },

    onImgOK (e) {
        var imagePath = e.detail.path;
        wx.showToast({
            title: '已生成',
            icon: 'success',
            image: '',
            duration: 1000,
            mask: false,
        });
        this.setData({
            imagePath: imagePath,
            loading: false,
        });
    },

    onImgErr (e) {
        wx.showToast({
            title: '生成海报失败',
            icon: "error",
            image: '',
            duration: 1000,
            mask: false,
        });
        this.setData({
            loading: false,
        });
    },

    previewPoster: function () {
        wx.previewImage({
            urls: [this.data.imagePath]
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () { },

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
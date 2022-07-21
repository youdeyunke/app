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

    onSavePoster: function (e) {
        var _this = this
        var path = this.data.imagePath
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
            success(res) {
            }
        })

    },

    genPoster: function () {
        // 生成海报数据结构
        var post = this.data.post

        var qrUrl = this.data.qrUrl
        var post = this.data.post
        var tpl = this.data.tpls[this.data.tplIndex]
        var averagePrice = this.data.post.average_price.split('~')[0]
        var bgImage = tpl.bg
        var addressIcon = '/assets/icons/haibao-address.png'

        var userInfo = app.globalData.userInfo
        var fontColor = tpl.font_color || '#ffffff'

        var palette = {
            background: bgImage,
            width: '750rpx',
            height: '1550rpx',
            views: [
            {
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
            },
            {
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
            },
            {
              type: 'image',
              url: post.cover,
              css: {
                width: '690rpx',
                height: '465rpx',
                top: '290rpx',
                left: '30rpx',
              },
            },
            {
                type: 'rect',
                css: {
                  width: '690rpx',
                  height: '361rpx',
                  color: '#FFFFFF',
                  top: '755rpx',
                  left: '30rpx',
                },
            },
            {
                type: 'text',
                text: post.title,
                css: {
                    width: '580rpx',
                    height: '53rpx',
                    fontSize: "40rpx",
                    top: "788rpx",
                    left: "68rpx",
                    fontWeight: "bold",
                    maxLines: 1
                }
            },
            {
                type: 'image',
                url: addressIcon,
                css: {
                  width: '20rpx',
                  height: '24rpx',
                  top: '937rpx',
                  left: '70rpx',
                },
            },
            {
                type: 'text',
                text: '地址：' + post.address,
                css: {
                    width: '550rpx',
                    height: '34rpx',
                    fontSize: "26rpx",
                    top: "932rpx",
                    left: "110rpx",
                    maxLines: 1
                }
            },
            {
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
            },
            {
                type: 'text',
                text: post.area_info.text + post.area_info.px,
                css: {
                    width: '220rpx',
                    height: '40rpx',
                    fontSize: "30rpx",
                    fontWeight: "bold",
                    top: "1037rpx",
                    left: "68rpx",
                }
            },
            {
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
            },
            {
                type: 'text',
                text: averagePrice + post.average_price_info.px,
                css: {
                    width: '220rpx',
                    height: '40rpx',
                    fontSize: "30rpx",
                    fontWeight: "bold",
                    color: "#E46C69",
                    top: "1037rpx",
                    left: "297rpx",
                }
            },
            {
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
            },
            {
                type: 'text',
                text: post.fitment,
                css: {
                    width: '220rpx',
                    height: '40rpx',
                    fontSize: "30rpx",
                    fontWeight: "bold",
                    top: "1037rpx",
                    left: "556rpx",
                }
            },
            {
                type: 'rect',
                css: {
                  width: '143rpx',
                  height: '143rpx',
                  color: '#FFFFFF',
                  borderRadius: '72rpx',
                  top: '1176rpx',
                  left: '552rpx',
                },
            },
            {
                type: 'image',
                url: qrUrl,
                css: {
                  width: '127rpx',
                  height: '127rpx',
                  top: '1184rpx',
                  left: '560rpx',
                },
            },
            ],
        }
        var haibaoTags =[
            {
                type: 'text',
                id: 'tag1',
                text: post.tags[0].name,
                css: {
                    height: '36rpx',
                    lineHeight: '30rpx',
                    padding: '10rpx',
                    // background: "#000000",
                    fontSize: "24rpx",
                    color: "#AFAFAF",
                    borderRadius: "5rpx",
                    borderWidth: "1rpx",
                    borderColor: "#AFAFAF",
                    top: "866rpx",
                    left: "70rpx",
                }
            }
        ]
        for (let i = 1 ; i < 3 ; i++){
            haibaoTags.push({
                type: 'text',
                id: 'tag' + (i + 1),
                text: post.tags[i].name,
                css: {
                    height: '36rpx',
                    lineHeight: '30rpx',
                    padding: '5rpx',
                    fontSize: "24rpx",
                    color: "#AFAFAF",
                    borderRadius: "5rpx",
                    borderWidth: "1rpx",
                    borderColor: "#AFAFAF",
                    top: "866rpx",
                    left: "70rpx",
                    left: 'calc(tag' + i + '.right + 10rpx)'
                }
            })
        }
        haibaoTags.forEach((item) => {
            palette.views.push(item)
        })

        // 如果是置业顾问，显示头像和姓名
        if(userInfo && userInfo.is_broker){
           palette.views.push(
            {
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
            },
           )
        }else{
            palette.views.push(
                {
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
                },
               )        
        }

        this.setData({ palette: palette})
    },

    onImgOK(e) {
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

    onImgErr(e) {
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
        wx.previewImage({ urls: [this.data.imagePath] })
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

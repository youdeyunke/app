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
const app = getApp()
const postApi = require("../../../api/post")
const brokerApi = require("../../../api/broker")

var haibaoBg = {
    type: 'image',
    url: 'https://qiniucdn.udeve.cn/fang2021/ef878289-5fda-4241-a117-2422d0609a96.png',
    css: {
        width: '750rpx',
        height: '280rpx',
        top: '0rpx',
        left: '0rpx',
    },
}
var userCard = {
    type: 'rect',
    css: {
        width: '690rpx',
        height: '386rpx',
        color: '#FFFFFF',
        top: '60rpx',
        left: '30rpx',
        borderRadius: '10rpx',
        shadow: "0rpx 0rpx 25rpx #202EBB14",
    },
}
var userAvatar = {
    type: 'image',
    url: '',
    css: {
        width: '330rpx',
        height: '386rpx',
        top: '60rpx',
        left: '30rpx',
        borderRadius: '10rpx'
    },
}
var userBg = {
    type: 'image',
    url: '/assets/images/broker-card-bg.png',
    css: {
        width: '180rpx',
        height: '386rpx',
        top: '60rpx',
        left: '212rpx',
        //   borderRadius: '10rpx'
    },
}
var userName = {
    type: 'text',
    text: "",
    css: {
        width: '290rpx',
        height: '64rpx',
        fontSize: "48rpx",
        top: "110rpx",
        left: "340rpx",
    }
}
var userLevel = {
    type: 'text',
    text: "",
    css: {
        width: '120rpx',
        // height: '40rpx',
        lineHeight: '25rpx',
        fontSize: "20rpx",
        top: "200rpx",
        left: "340rpx",
        textAlign: "center",
        color: "#FFFFFF",
        background: "blue",
        borderRadius: '20rpx'
    }
}
var userPhoneIcon = {
    type: 'image',
    url: '/assets/images/broker-card-phone.png',
    css: {
        width: '36rpx',
        height: '36rpx',
        top: '270rpx',
        left: '340rpx',
        //   borderRadius: '10rpx'
    },
}
var userweixinIcon = {
    type: 'image',
    url: '/assets/images/broker-card-weixin.png',
    css: {
        width: '36rpx',
        height: '36rpx',
        top: '320rpx',
        left: '340rpx',
        //   borderRadius: '10rpx'
    },
}
var userMobile = {
    type: 'text',
    text: "",
    css: {
        width: '290rpx',
        height: '40rpx',
        fontSize: "30rpx",
        top: "270rpx",
        left: "390rpx",
    }
}
var userWeixin = {
    type: 'text',
    text: "",
    css: {
        width: '290rpx',
        height: '40rpx',
        fontSize: "30rpx",
        top: "320rpx",
        left: "390rpx",
    }
}
var userGroupName = {
    type: 'text',
    text: "置业顾问",
    css: {
        width: '290rpx',
        height: '64rpx',
        fontSize: "28rpx",
        top: "130rpx",
        left: "550rpx",
    }
}

var xiangmu = {
    type: 'text',
    text: "项目",
    css: {
        fontSize: "28rpx",
        top: "490rpx",
        left: "30rpx",
        color: "#999999"
    }
}
var line1 = {
    type: 'rect',
    css: {
        width: "690rpx",
        top: "540rpx",
        left: "30rpx",
        height: "1rpx",
        color: "#999999"
    }
}
var line2 = {
    type: 'rect',
    css: {
        width: "690rpx",
        top: "610rpx",
        left: "30rpx",
        height: "1rpx",
        color: "#999999"
    }
}
var weixin = {
    type: 'text',
    text: "微信",
    css: {
        fontSize: "28rpx",
        top: "560rpx",
        left: "30rpx",
        color: "#999999"
    }
}
var userWeixinTwo = {
    type: 'text',
    text: "",
    css: {
        fontSize: "28rpx",
        top: "560rpx",
        left: "180rpx",
        maxLines: 1
    }
}

var jianjie = {
    type: 'text',
    text: "个人简介",
    css: {
        fontSize: "28rpx",
        top: "630rpx",
        left: "30rpx",
        color: "#999999"
    }
}
var userXiangmu = {
    type: 'text',
    text: "",
    css: {
        width: "500rpx",
        fontSize: "28rpx",
        top: "490rpx",
        left: "180rpx",
        maxLines: 1
    }
}
var userJianjie = {
    type: 'text',
    id: 'jianjie',
    text: "",
    css: {
        width: "600rpx",
        fontSize: "28rpx",
        lineHeight: "40rpx",
        top: "690rpx",
        left: "30rpx",
        maxLines: 3
    }
}

var xiangmuImg = {
    type: 'text',
    text: "销售项目精彩图",
    css: {
        fontSize: "28rpx",
        top: 'calc(jianjie.bottom + 100rpx)',
        left: "30rpx",
        color: "#999999"
    }
}
var userxiangmuImg = {
    type: 'image',
    url: '',
    css: {
        width: '690rpx',
        height: '386rpx',
        top: 'calc(jianjie.bottom + 170rpx)',
        left: '30rpx',
        borderRadius: '10rpx',
    },
}
var userQr = {
    type: 'image',
    url: '',
    css: {
        width: '203rpx',
        height: '203rpx',
        top: 'calc(jianjie.bottom + 620rpx)',
        left: '275rpx',
        borderRadius: '72rpx',
    },
}
var tip = {
    type: 'text',
    text: "长按识别二维码查看我的主页",
    css: {
        width: '196rpx',
        height: '74rpx',
        fontSize: "28rpx",
        top: 'calc(jianjie.bottom + 850rpx)',
        left: "277rpx",
        // color: "#3E290C",
        lineHeight: "34rpx",
        textAlign: "center"
    }
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        userInfo: {},

        posterUrl: "",
        palette: {}
    },

    genUserCard () {
        var userInfo = this.data.userInfo
        var palette = {
            background: '#FFFFFF',
            width: '750rpx',
            height: '1770rpx',
            views: [],
        }
        if (userInfo.avatar) {
            userAvatar.url = userInfo.avatar.replace('http://', 'https://')
        }
        if (userInfo.qr != null || userInfo.qr != undefined) {
            userQr.url = userInfo.qr
        }
        if (userInfo.level == 1) {
            userLevel.text = '金牌顾问'
        }
        if (userInfo.level == 2) {
            userLevel.text = '银牌顾问'
        }
        if (userInfo.level == 3) {
            userLevel.text = '铜牌顾问'
        }
        userName.text = userInfo.name
        userMobile.text = userInfo.mobile
        userWeixin.text = (userInfo.wechat == '' || userInfo.wechat == null || userInfo.wechat == undefined ? '该用户未填写微信' : userInfo.wechat)
        userWeixinTwo.text = (userInfo.wechat == '' || userInfo.wechat == null || userInfo.wechat == undefined ? '该用户未填写微信' : userInfo.wechat)
        userXiangmu.text = userInfo.post_title
        userxiangmuImg.url = this.data.post.cover

        userJianjie.text = (userInfo.desc == '' || userInfo.desc == null || userInfo.desc == undefined ? '该用户还没有填写简介' : userInfo.desc)

        if (userInfo.group_name != null || userInfo.group_name != '' || userInfo.group_name != undefined) {
            userGroupName.text = userInfo.group_name
        }
        var views = [haibaoBg, userCard, userAvatar, userBg, userName, userLevel, userPhoneIcon, userweixinIcon, userMobile, userJianjie, userWeixin, xiangmu, userXiangmu, userWeixinTwo, weixin, jianjie, xiangmuImg, userxiangmuImg, userQr, tip, userGroupName, line1, line2]
        palette.views = views
        var haibaoTags = this.genTags()
        if (haibaoTags.length) {
            haibaoTags.forEach((item) => {
                palette.views.push(item)
            })
        }
        this.setData({
            palette: palette
        })
    },

    genTags () {
        if (this.data.userInfo.tags == '' || this.data.userInfo.tags == null || this.data.userInfo.tags == undefined) {
            return []
        }
        var tags = this.data.userInfo.tags.split(',')
        var haibaoTags = tags.filter((q, i) => i < 3).map((q, i) => {
            var tag = {
                type: 'text',
                id: 'tag' + (i + 1),
                text: ' ' + q + ' ',
                css: {
                    height: '36rpx',
                    lineHeight: '30rpx',
                    fontSize: "24rpx",
                    color: "#AFAFAF",
                    borderRadius: "5rpx",
                    borderWidth: "1rpx",
                    borderColor: "#AFAFAF",
                    top: 'calc(jianjie.bottom + 30rpx)',
                    left: 'calc(tag' + i + '.right + 10rpx)',
                }
            }
            if (i == 0) {
                tag.css.left = "30rpx"
            }
            return tag
        })
        return haibaoTags
    },

    loadBrokerData() {
      var _this = this
      var userInfo = app.globalData.userInfo
      if (userInfo == null) {
          wx.showModal({
              content: '未登录，无法生成海报',
              showCancel: false,
              success (res) {
                  wx.navigateBack({
                      delta: 1
                  })
              }
          })
          return
      }
      brokerApi.getBrokerDetail(userInfo.user_id).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        _this.setData({
          userInfo: resp.data.data
        },( ) => {
          _this.loadData()
        })
      })
    },

    loadData () {
        var _this = this
        var userInfo = this.data.userInfo
        console.log('99999', userInfo)
        if (userInfo == null || userInfo.post_id == null || userInfo.post_id == '' || userInfo.post_id == undefined) {
            wx.showModal({
                content: '未绑定主营楼盘，无法生成海报',
                showCancel: false,
                success (res) {
                    wx.navigateBack({
                        delta: 1
                    })
                }
            })
            return
        }
        // √
        postApi.getPostBaseInfo(userInfo.post_id).then((resp) => {
            _this.setData({
                post: resp.data.data
            }, () => {
                wx.showLoading({
                  title: '生成中'
                })
                _this.genUserCard()
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.loadBrokerData()
        // this.genUserCard()
        var color = app.globalData.myconfigs.color
        this.setData({
          primaryBtnColor: color.primary_btn,
        })
        wx.showLoading({
            title: '加载中',
        })
        // setTimeout(function () {
        //     wx.hideLoading()
        // }, 800)
    },

    onImgOK (e) {
        this.imagePath = e.detail.path;
        this.setData({
            posterUrl: this.imagePath,
        },() => {
          wx.hideLoading()
        });
    },

    onShow: function () {
        if (this.data.userInfo && this.data.userInfo.id) {
            return
        }
        var userInfo = this.data.userInfo
        if (!userInfo) {
            return
        }

    },

    saveFile () {
        var _this = this
        wx.saveImageToPhotosAlbum({
            filePath: _this.data.posterUrl,
            success () {
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                });
            }
        })
    },
    userEdit () {
        wx.navigateTo({
            url: '/pkgMyself/pages/profile/index'
        })
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
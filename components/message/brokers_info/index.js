/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/message/brokers_info/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userinfo: {
            type: Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
      levelImgs:[]
    },

    ready(){
      var levelImgs = [
        app.globalData.ui.broker_medal_1,
        app.globalData.ui.broker_medal_2,
        app.globalData.ui.broker_medal_3,
      ]
      this.setData({
        levelImgs:levelImgs
      })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        callHandle () {
            var mobile = this.properties.userinfo.mobile
            wx.makePhoneCall({
                phoneNumber: mobile,
            })
        },
        copyHandle () {
            var wechat = this.properties.userinfo.wechat
            if (wechat == null) {
                wx.showToast({
                    title: '该经纪人还没有上传微信号',
                    icon: 'none'
                })
            }
            wx.setClipboardData({
                data: wechat,
                success () {
                    wx.showToast({
                        title: '微信号已复制',
                        icon: 'success',
                        duration: 1000
                    })
                }
            })
        }
    }
})

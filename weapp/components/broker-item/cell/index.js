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
// components/broker-item/index.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            value: null
        },
        postId: {
            type: Number,
            value: null
        },
    },


    observers: {
        'item.level': function (level) {
            var _this = this
            var levelName = this.data.levelName
            if (level == 1) {
                levelName = '金牌顾问'
            }
            if (level == 2) {
                levelName = '银牌顾问'
            }
            if (level == 3) {
                levelName = '铜牌顾问'
            }
            this.setData({
                levelName: levelName
            })
            var levelImgs = [
              '/assets/icons/broker/broker.level.1.png',
              '/assets/icons/broker/broker.level.2.png',
              '/assets/icons/broker/broker.level.3.png',
            ]
            // v = 1,2,3
            // https://qiniucdn.udeve.net/fang/medal.{{item.level}}.png
            this.setData({
                levelName: levelName,
                levelImg: levelImgs[level - 1]
            })
        }
    },

    ready: function () {
        var color = app.globalData.myconfigs.color
        this.setData({
            primaryBtnColor: color.primary_btn,
            bg: color.broker_cell_bg,
            secondaryBtnColor: color.secondary_btn,
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        avatarColors: ['#FFCB45', '#A9CDFF', '#FFC28C'],
        levelName: '',
        levelImg: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {

        gotoProfile: function () {

            // 经纪人主页
            var uid = this.data.item.user_id
            console.log('item', this.data.item)
            var path = '/pkgBroker/pages/broker/profile?user_id=' + uid
            wx.navigateTo({
                url: path,
            })

        },
        phoneHandle: function () {
            var _this = this
            wx.makePhoneCall({
                phoneNumber: _this.data.item.mobile,
                success: (result) => { },
            });
        },
    }
})

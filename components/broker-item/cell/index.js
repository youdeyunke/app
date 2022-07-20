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
        'item.level': function(level){
            var _this = this
            var item = this.data.item
            if (level == 1) {
                item.levelName = '金牌顾问'
            }
            if (level == 2) {
                item.levelName = '银牌顾问'
            }
            if (level == 3) {
                item.levelName = '铜牌顾问'
            }
            this.setData({
                brokerItem: item
            })
        }
    },

    ready: function(){
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
        avatarColors: ['#FFCB45','#A9CDFF','#FFC28C'],
        brokerItem: {}
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
        chatHandle: function () {
            // 如果没有登陆，则弹窗登陆窗口 
            if (!app.globalData.token) {
                this.selectComponent('.loginwindow').openWindow()
                return
            }

            var uid = this.data.item.user_id
            var pid = this.data.postId || ''
            var path = `/pages/messages/show?target_user_id=${uid}&post_id=${pid}`
            if (this.data.postId) {
                path += '&target_post_id=' + this.data.postId
            }
            wx.navigateTo({
                url: path,
            })

        },
        phoneHandle: function () {
            var _this = this
            wx.makePhoneCall({
                phoneNumber: _this.data.item.mobile,
                success: (result) => {},
            });
        },
    }
})

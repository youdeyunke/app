// pkgPost/components/default-contact/index.js
const auth = require("../../../utils/auth");
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        post: { type: Object, value: null },
    },

    /**
     * 组件的初始数据
     */
    data: {
        showShareBox: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bookingHandle: function (e) {
            var _this = this
            auth.ensureUser(function (user) {

                    _this.selectComponent('#booking').openHandle()
                
            })
        },

        bookingChange: function (e) {
            this.setData({ bookingStatus: 1 })
        },
        shareHandle: function () {
            console.log("niiiiiiiii",this.properties.post.id)
            this.setData({ showShareBox: true })
        },
        phoneHandle: function () {
            var phone = this.data.post.phone
            var sub = this.data.post.sub_phone
            if(sub){
                phone = phone + ',' + sub
            }
            // 弹出文本提示
            var n = app.globalData.myconfigs.xcx_name
            var t = '接通后请告知来自：【' + n + '小程序】'
            wx.showModal({
                confirmText: '拨打',
                cancelText: '取消',
                title: '提示', 
                content: t, 
                success:(res) => {
                    if(res.confirm){
                        wx.makePhoneCall({
                            phoneNumber: phone,
                            success: (result) => {
                            },
                        });          
                    }
                }

            })
        },
    }
})

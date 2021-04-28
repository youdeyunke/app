// pkgPost/components/default-contact/index.js
const auth = require("../../../utils/auth");
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
            this.setData({ showShareBox: true })
        },
        phoneHandle: function () {
            var phone = this.data.post.phone
            var sub = this.data.post.sub_phone
            if(sub){
                phone = phone + ',' + sub
            }
            wx.makePhoneCall({
                phoneNumber: phone,
                success: (result) => {
                },
            });
        },
    }
})

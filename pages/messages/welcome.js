// components/message/namecard.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userId: { type: Number },
    },

    /**
     * 组件的初始数据
     */
    data: {
        loading: true,
        userInfo: {},
    },

    observers: {
        "userId": function (uid) {
            if (!uid) {
                console.log('uid 不能为空', uid)
                return false
            }
            console.log('load user info userid', uid)
            this.loadData()
        },
    },


    ready: function () {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        callHandle: function () {
            wx.makePhoneCall({
                phoneNumber: this.data.userInfo.mobile,
                success: (result) => {
                },
                fail: () => { },
                complete: () => { }
            });

        },
        loadData: function () {
            var _this = this
            var key = 'user.' + this.data.userId
            app.request({
                url: '/api/v1/users/' + _this.data.userId,
                hideLoading: true,
                success: function (resp) {
                    if (resp.data.status != 0) {
                        return false
                    }
                    var user = resp.data.data
                    _this.setData({ userInfo: user, loading: false })
                    wx.setStorage({
                        key: key,
                        data: resp.data.data,
                    });

                }
            })

        },

    }
})

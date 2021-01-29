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
        copyHandle: function () {
            wx.setClipboardData({
                data: this.data.userInfo.mobile,
                success: (result) => {
                    wx.showToast({
                        title: '已复制到剪切板',
                        icon: 'none',
                        image: '',
                        duration: 1500,
                        mask: false,
                    });


                },
                fail: () => { },
                complete: () => { }
            });

        },
        loadData: function () {
            var _this = this
            var key = 'namecard.user.' + this.data.userId
            console.log('load user  data', this.data.userId)
            var user = wx.getStorageSync(key);
            if (user && user.id) {
                this.setData({ userInfo: user, loading: false })
                return
            }

            app.request({
                url: '/api/v1/users/' + _this.data.userId,
                hideLoading: true,
                success: function (resp) {
                    if (resp.data.status != 0) {
                        return false
                    }
                    _this.setData({ userInfo: resp.data.data, loading: false })
                    wx.setStorage({
                        key: key,
                        data: resp.data.data,
                    });

                }
            })

        },

    }
})

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


    ready: function () {
        this.loadData()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        copyHandle: function () {
            wx.setClipboardData({
                data: this.data.userInfo.wechat,
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
        viewHandle: function (e) {
            var url = this.data.userInfo.wechat_qr
            if (!url) {
                wx.showToast({
                    icon: 'none',
                    title: '对方没有上传微信二维码，无法查看'
                })
                return false
            }
            wx.previewImage({
                current: url,
                urls: [url],
            });

        },
        loadData: function () {
            var _this = this
            var key = 'namecard.user.' + this.data.userId
            var user = wx.getStorageSync(key);
            if (user && user.id) {
                this.setData({ userInfo: user, loading: false })
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

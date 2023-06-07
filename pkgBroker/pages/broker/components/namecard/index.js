// pkgBroker/pages/broker/components/namecard/index.js
const app = getApp()
const brokerApi = require("../../../../../api/broker")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        broker: {
            type: Object,
            value: null
        }
    },


    ready: function () {
        this.setData({
            bg: app.globalData.ui.broker_namecard_bg,
        })
    },

    observers: {
        "broker": function (broker) {
            if (!broker) {
                return
            }
            this.setData({
                likeNums: broker.like_nums,
                viewNums: broker.view_nums,
            })

        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        bg: '',
        showQr: false,
        likeNums: 0,
        viewNums: 0,

    },



    /**
     * 组件的方法列表
     */
    methods: {
        callMe: function (e) {
            var mobile = this.data.broker.mobile
            if (!mobile) {
                return false
            }

            wx.makePhoneCall({
                phoneNumber: mobile
            })
        },

        copyWeixin() {
            wx.setClipboardData({
                data: this.data.broker.wechat,
                success(res) {
                    wx.getClipboardData({
                        success(res) {
                            console.log(res.data) // data
                        }
                    })
                }
            })
        },

        saveNumber() {
            wx.addPhoneContact({
                firstName: this.data.broker.name,
                mobilePhoneNumber: this.data.broker.mobile
            })
        },

        avatarHandle: function () {
            var urls = [this.data.broker.avatar]
            wx.previewImage({
                urls: urls,
            })
        },
        likeHandle: function () {

            var id = this.data.broker.id
            var _this = this
            var d = new Date()
            var y = d.getFullYear()
            var m = d.getMonth() + 1
            var d = d.getDate()
            var today = y + '-' + m + '-' + d
            var key = 'broker_be_liked.' + today + '.' + id
            if (wx.getStorageSync(key) == true) {
                wx.showToast({
                    title: '你今天已经点过赞了，明天再来吧',
                    icon: 'none',
                })
            } else {
                //  √
                brokerApi.likeBroker({
                    broker_id: id
                }).then((res) => {
                    if (res.data.status != 0) {
                        return
                    }
                    wx.showToast({
                        icon: 'none',
                        title: "点赞+1",
                    })
                    _this.setData({
                        likeNums: res.data.data,
                    })
                    wx.setStorageSync(key, true)
                })
            }
        },
        copyHandle: function (e) {
            var wechat = this.data.broker.wechat
            wx.setClipboardData({
                data: wechat,
                success: (result) => {
                    wx.showToast({
                        title: '微信号已复制',
                        icon: 'success',
                        image: '',
                        duration: 1500,
                        mask: false,
                        success: (result) => {

                        },
                        fail: () => {},
                        complete: () => {}
                    });
                },
                fail: () => {},
                complete: () => {}
            });
        },
        qrHandle: function () {
            var qr = this.data.broker.wechat_qr
            if (!qr || qr.length <= 10) {
                wx.showToast({
                    icon: 'error',
                    title: '未上传微信二维码',
                })
                return false
            }
            this.setData({
                showQr: true,
            })
        },

        saveQrHandle: function () {
            var code = this.data.broker.wechat_qr
            var _this = this
            console.log("二维码路径:", code)
            if (code == null) {
                wx.showToast({
                    title: '对方还没有上传二维码',
                    icon: 'none'
                })
            } else {
                wx.downloadFile({
                    url: code,
                    success(res) {
                        wx.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success(res) {
                                wx.showToast({
                                    title: '保存二维码成功',
                                })
                            }
                        })
                    }
                })
            }
        },

        closeQrHandle: function () {
            this.setData({
                showQr: false,
            })
        },


    }
})
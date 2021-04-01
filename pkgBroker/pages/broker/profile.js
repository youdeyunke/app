// pages/user/user.js
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        brokerProfile: null,
        userId: null,
        likeNumber: '',
        browses: '',
        level: ''
    },
    likeHandle: function () {
        var id = this.data.userId
        var _this = this
        if (wx.getStorageSync('storage' + id) == true) {
            wx.showToast({
                title: '您已经点过赞了',
                icon: 'none',
            })
        } else {
            app.request({
                method: 'POST',
                data: {
                    broker_id: id
                },
                url: '/api/v1/brokers/like',
                success: function (res) {
                    if (res.data.status != 0) {
                        return
                    }
                    wx.showToast({
                        icon: 'none',
                        title: "点赞+1",
                    })
                    _this.setData({
                        likeNumber: res.data.data,
                    })
                    wx.setStorageSync('storage' + id, true)
                }
            })
        }
    },
    callMe: function (e) {
        var mobile = this.data.userInfo.mobile
        if (!mobile) {
            return false
        }

        wx.makePhoneCall({
            phoneNumber: mobile
        })
    },

    copyWechat: function (e) {
        var wechat = this.data.brokerProfile.wechat
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


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        _this.setData({
            userId: q.id,

        }, function () {
            _this.loadBrokerProfile()
        })

        app.markVisitor(null, q.id, 'user')
    },

    loadBrokerProfile: function () {
        var uid = this.data.userId
        var _this = this
        app.request({
            url: '/api/v1/brokers/' + uid,
            success: function (resp) {
                var u = resp.data.data
                _this.setData({
                    brokerProfile: u,
                    likeNumber: u.like_nums,
                    browses: u.view_nums,
                    level: u.level
                })
                // _this.viewHandle()
                var title = u.name + "的主页"
                wx.setNavigationBarTitle({
                    title: title
                })
                console.log("uuu", u)
            }
        })
    },
    qrHandle: function () {
        var code = this.data.brokerProfile.wechat_qr
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


    setPageTitle: function () {
        var _this = this
        wx.setNavigationBarTitle({
            title: ''
        })
    },
    loadPosts() {
        var filter = this.data.filter
        filter['kw'] = this.data.val
        this.setData({
            filter: filter
        })
    },
    searchTextInput(e) {
        this.setData({
            val: e.detail
        })
    },
    clearSearch() {
        var filter = this.data.filter
        filter['kw'] = ''
        this.setData({
            filter: filter
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var _this = this
        this.setData({
            page: _this.data.page + 1
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var _this = this
        return {
            title: _this.data.userInfo.name + '的名片',
            desc: '帮你找好房',
            path: 'pkgBroker/pages/broker/profile?id=' + _this.data.userId,
            imageUrl: _this.data.userInfo.avatar,
        }
    },
    onShareTimeline() {
        var _this = this
        return {
            title: _this.data.userInfo.name + '的名片',
            path: 'pkgBroker/pages/broker/profile?id=' + _this.data.userId,
            imageUrl: _this.data.userInfo.avatar
        }
    }
})
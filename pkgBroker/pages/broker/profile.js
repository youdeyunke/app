// pages/user/user.js
const app = getApp()
const brokerApi = require("../../../api/broker")

Page({
    /**
     * 页面的初始数据
     */
    data: {
        broker: null,
        bg: null,
        userId: null,
        tagList: [],
    },
    showPopup() {
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false
        });
    },
    chatHandle: function () {
        // 如果没有登陆，则弹窗登陆窗口 
        if (!app.globalData.token) {
            this.selectComponent('.loginwindow').openWindow()
            return
        }

        // 先调用打招呼接口
        wx.showLoading({
            title: '正在打开',
            icon: 'none',
            mask: true
        })
        var _this = this
        wx.navigateTo({
            url: '/pages/messages/show?target_user_id=' + _this.data.userId + '&post_id=' + _this.data.broker.post_id,
            success: function () {
                wx.hideLoading()
            }
        })
        return
    },



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


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.loadTours()
        var _this = this
        _this.setData({
            t0: new Date().getTime(),
            userId: q.id || q.user_id,
        }, function () {
            _this.loadbroker()
        })
        this.viewHandle()
        this.showLogin()
        //wx.setStorageSync('bindBrokerId', q.user_id || q.id)

    },

    showLogin: function () {
        // 弹出登录授权窗口
        if (app.globalData.token) {
            return
        }

        setTimeout(() => {
            this.selectComponent('.loginwindow').openWindow()
            return

        }, 3000)
    },

    loadTours: function () {
        var _this = this
        var query = {}
        query.cityCode = wx.getStorageSync('cityCode') || ''
        app.request({
            url: '/api/v1/tours',
            data: query,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return
                }
                _this.setData({
                    tours: resp.data.data,
                })
            }
        })
    },

    viewHandle: function () {
        var uid = this.data.userId
        var _this = this
        //  √ 
        brokerApi.updateBrokerViewsCount(
            uid
        ).then((res) => {
            if (res.data.status != 0) {
                return
            }
            _this.setData({
                viewNums: res.data.data
            })
        })
    },

    loadbroker: function () {
        var uid = this.data.userId
        var _this = this
        brokerApi.getBrokerShowDetail({
           user_id:uid
        }).then((resp) => {
            // 有可能没有开通个人主页
            if (resp.data.status != 0) {
                // TODO 显示未开通主页的情况
                return
            }
            var u = resp.data.data
            _this.setData({
                broker: u,
            })
            if (resp.data.data.tags) {
                var tagList = resp.data.data.tags.split(',')
                _this.setData({
                    tagList: tagList
                })
            }
            // _this.viewHandle()
            var title = u.name + "的电子名片"
            wx.setNavigationBarTitle({
                title: title
            })
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
        var _this = this
        setTimeout(() => {
            if (!this.data.broker) {
                this.loadbroker()
            }

        }, 1000)

        var color = app.globalData.myconfigs.color
        this.setData({
            bg: app.globalData.ui.broker_profile_bg,
            primaryBtnColor: color.primary_btn,
            secondaryBtnColor: color.secondary_btn,
        })


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
        var t = new Date().getTime() - this.data.t0
        var name = "访问：置业顾问" + this.data.broker.name + "的个人主页"
        app.markVisitorAction(name, t)

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var _this = this
        return {
            title: _this.data.broker.name + '的名片',
            desc: '帮你找好房',
            imageUrl: _this.data.broker.avatar,
        }
    },
    onShareTimeline() {
        var _this = this
        return {
            title: _this.data.broker.name + '的名片',
            imageUrl: _this.data.broker.avatar
        }
    },

})
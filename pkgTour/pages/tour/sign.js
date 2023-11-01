/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pkgTour/pages/tour/sign.js
const app = getApp()
const tourApi = require("../../../api/tour")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: null,
        tourId: null,
        name: '',
        mobile: '',
        mobile_lock: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (q) {
        this.setData({
            tourId: q.id,
        }, () => {
            this.loadData()
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady () {

    },

    loadData: function () {
        // 加载活动信息
        var _this = this
        tourApi.getTourDetail(this.data.tourId).then((resp) => {
            if (resp.data.status != 0) {
                return
            }
            _this.setData({
                tour: resp.data.data,
            })
            wx.setNavigationBarTitle({
                title: resp.data.data.tour.title,
            })
        })
    },

    loginSuccess: function (user) {
        this.setData({
            user: user,
            mobile: user.mobile,
            mobile_lock: true,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow () {
        var user = app.globalData.userInfo
        if (!user) {
            // TODO 
            this.selectComponent('.loginwindow').openWindow()
            return
        }
        this.setData({
            user: user,
            mobile: user.mobile,
            mobile_lock: true,
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide () {

    },

    signHandle: function () {
        var data = {
            tour_id: this.data.tourId,
            mobile: this.data.mobile,
            name: this.data.name,
        }

        if (!data.name) {
            wx.showToast({
                icon: 'none',
                title: '请填写姓名',
            })
            return false
        }

        if (!data.mobile) {
            wx.showToast({
                icon: 'none',
                title: '手机号错误，请先授权',
            })
            return false
        }

        var _this = this
        app.request({ //已经删除
            url: '/api/v1/tour_sign/',
            method: 'POST',
            data: data,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return
                }
                wx.showToast({
                    title: '签到成功',
                })
                setTimeout(() => {
                    wx.switchTab({
                        url: '/pages/home/home',
                    })
                }, 1500)
            }
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage () {

    }
})
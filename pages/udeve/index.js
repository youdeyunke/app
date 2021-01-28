// pages/udeve/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        steps: ["联系顾问", "安装调试", "发布上线"],
        isDone: false,
    },

    formidHandle: function (e) {
        app.uploadFormid(e)
    },

    gotoHome: function () {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        var user = wx.getStorageSync("userInfo")
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


    submitHandle: function (e) {
        app.uploadFormid(e)
        console.log(e)
        var data = e.detail.value
        if (!data.name) {
            wx.showToast({
                icon: 'none', title: '称呼不能为空',
            })
            return false
        }

        if (!data.mobile || data.mobile.length != 11) {
            wx.showToast({
                icon: 'none', title: '手机号码长度必须为11位',
            })
            return false
        }
        data['source'] = app.globalData.EXT['name'] || 'unknow'

        wx.showLoading({
            title: '处理中...',
            mask: true,
        })

        var _this = this
        wx.request({
            url: 'https://www.udeve.cn/api/v1/customers',
            method: 'POST',
            data: data,
            success: function (resp) {
                if (resp.data.status == 0) {
                    _this.setData({ isDone: true })
                }
            },
            complete: function () {
                wx.hideLoading()
            },
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// pkgAbout/pages/about/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        xcx_name: '',
        xcx_version: '',
        service_mobile: '',
        xcx_us: '',
        xcx_wechat_qr: '',
        xcx_statement: '',
        server_version: '',
    },
    callHandle () {
        wx.makePhoneCall({
            phoneNumber: this.data.service_mobile,
        })
    },
    showWechat () {
        this.setData({
            show: true
        })
    },
    closeHandle () {
        this.setData({
            show: false
        })
    },
    savaHandle () {
        var path = this.data.path
        wx.showActionSheet({
            itemList: ['保存二维码', '取消'],
            success: function (res) {
                if (res.tapIndex == 0) {
                    wx.getImageInfo({
                        src: path,
                        success: function (res) {
                            var newpath = res.path
                            wx.showLoading({
                                title: '保存中',
                                mask: true
                            })
                            wx.saveImageToPhotosAlbum({
                                filePath: newpath,
                                success: function (data) {
                                    console.log("data", data)
                                }
                            })
                            wx.hideLoading()
                        }
                    })
                }
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '关于我们',
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
        var conf = app.globalData.myconfigs
        console.log("conf", conf)
        var data = {
            xcx_name: conf.xcx_name,
            xcx_version: conf.xcx_version,
            service_mobile: conf.service_mobile,
            xcx_us: conf.about_us,
            xcx_wechat_qr: conf.service_wechat_qr,
            xcx_statement: conf.statement,
            server_version: conf.server_version,
        }
        this.setData(data)

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
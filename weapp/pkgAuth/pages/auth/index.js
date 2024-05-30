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
// pages/myself/myself.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ui: {},
        allowTerms: false,
        code: null,
        loading: false,
        show: true,
        is_wxwork: false,
    },

    goBack: function () {
        var pages = getCurrentPages()
        if (pages.length == 1) {
            wx.switchTab({
                url: '/pages/myself/index'
            })
        } else {
            wx.navigateBack({
                delta: 1
            })
        }
    },

    loginHandle: function (e) {
        if(!this.data.allowTerms){
            wx.showToast({
              title: '请同意用户协议',
              icon: 'none'
            })
            return
        }
        this.setData({
            loading: true
        })
        // 防止一直转圈 
        var _this = this
        setTimeout(() => {
            _this.setData({
                loading: false,
            })
        }, 5000)

        var code = this.data.code
        auth.loginHandle(code, e, (token) => {
            _this.goBack(); //回到上一页
        })
    },


    termsHandle: function () {
        this.setData({
            allowTerms: !this.data.allowTerms,
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 进入登录页面，先清空当前的用户缓存，并将登录标志置0
        wx.setStorageSync("userInfo", null);
        wx.setStorageSync("token", null);
        app.globalData.LOGIN_FLAG = 0;

        var _this = this
        wx.getSystemInfo({
            success (res) {
                console.log(res.environment)
                if(res.environment == 'wxwork'){
                    _this.setData({
                        is_wxwork: true
                    })
                }
            }
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
        this.setData({
            loading: false
        })
        app.ensureConfigs(function (configs) {
            var color = configs.color
            _this.setData({
                primaryBtnColor: color.primary_btn,
                primaryColor: color.primary,
            })
        })

        wx.login({
            success: function (res) {
                _this.setData({
                    code: res.code
                })
            },
            complete: function (res) {
                // 用户拒绝,跳转到设置界面
                if (res.errMsg == 'getUserInfo:fail auth deny') {
                    wx.openSetting({})
                }
            }
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

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { },

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
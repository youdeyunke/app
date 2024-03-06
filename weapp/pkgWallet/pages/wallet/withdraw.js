/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pages/fenxiao/withdraw.js
const app = getApp()
var auth = require('../../../utils/auth.js');
var AMOUNT_MIN = 100

Page({

    /**
     * 页面的初始数据
     */
    data: {
        balanceInfo: {},
        formData: {
            amount: 0,
            card_info: {}
        },
        loading: false,

    },

    /*
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this
        auth.ensureUser(function (user) {
            _this.loadBalanceInfo()
        })

    },

    loadBalanceInfo: function () {
        var _this = this
        app.request({ //待定
            url: '/api/v1/balances/info',
            success: function (resp) {
                if (resp.data.status == 0) {
                    console.log('balance info resp', resp)
                    _this.setData({ balanceInfo: resp.data.data })
                    if (resp.data.data.amount < 100) {
                        wx.showModal({
                            title: '余额不足',
                            content: '余额大于100元才可以申请提现',
                        })
                    }
                }
            }
        })
    },

    inputChange: function (e) {
        console.log('input change', e)
        var formData = this.data.formData
        var value = e.detail
        var { name } = e.currentTarget.dataset
        var res = name.split('.')
        if (res.length == 2) {
            name = res[1]
            formData['card_info'][name] = value
        } else {
            formData[name] = value
        }
        this.setData({ formData: formData })
        console.log('form data is', this.data.formData)

    },

    submitHandle: function (e) {
        var data = this.data.formData
        if (!data.amount) {
            wx.showToast({
                title: '金额不能为空',
                icon: 'none',
            });
            return false
        }
        if (!data.card_info.bank_name || !data.card_info.card_num || !data.card_info.name || !data.card_info.sub_bank_name) {
            wx.showToast({
                title: '银行卡信息不完整',
                icon: 'none',
            });
            return false
        }
        this._submit(data)
    },

    _submit: function (data) {
        var _this = this
        app.request({  //待定
            url: '/api/v1/balances',
            method: 'POST',
            data: data,
            success: function (resp) {
                if (resp.data.status == 0) {
                    wx.showModal({
                        title: '操作成功',
                        content: '我们已收到您的提现申请，管理员审核后将打款到银行卡',
                        success: function (res) {
                            wx.navigateTo({
                                url: '/pages/fenxiao/balance',
                            })
                        }
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

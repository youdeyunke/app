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
// pkgSearch/page/search/index.js
const app = getApp()
const searchApi = require("../../../api/search")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        searchRecord: [],
        inputvalue: '',
        delshow: false,
        resultshow: false,
    },
    historysearch: function () {
        this.setData({
            searchRecord: wx.getStorageSync('searchRecord') || []
        })
    },
    inputHandle: function (e) {
        console.log("e.detali", e.detail.value)
        this.setData({
            inputvalue: e.detail.value,
            delshow: true,
            resultshow: true
        })
        if (e.detail.value == '') {
            this.setData({
                delshow: false,
                resultshow: false
            })
        }
    },
    searchHandle: function () {
        var searchRecord = this.data.searchRecord
        var inputvalue = this.data.inputvalue
        if (inputvalue == '') {
            return
        }

        if (searchRecord.indexOf(inputvalue) === -1) {
            searchRecord.unshift(inputvalue)
            wx.setStorageSync('searchRecord', searchRecord)
            wx.navigateTo({
                url: '/pkgPost/pages/index/index?kw=' + inputvalue
            })
            return
        }

        wx.navigateTo({
            url: '/pkgPost/pages/index/index?kw=' + inputvalue
        })
    },

    searchNumPlus: function (pid) {
        searchApi.createHoutSearch(pid).then((res) => {

        })
    },
    valueHandle: function (e) {
        // 点击了搜索结果之后
        // 搜索次数加一
        this.searchNumPlus(e.detail.id)
        wx.navigateTo({
            url: '/pkgPost/pages/show/index?id=' + e.detail.id,
        })
        this.setData({
            inputvalue: e.detail.title,
            resultshow: false
        })
    },
    delvalue: function () {
        this.setData({
            inputvalue: '',
            resultshow: false,
            delshow: false
        })
    },
    clearHandle: function () {
        var _this = this
        wx.showModal({
            title: '您确定要删除记录吗？',
            success: function (res) {
                if (res.confirm) {
                    wx.clearStorageSync('searchRecord')
                    _this.setData({
                        searchRecord: []
                    })
                }
            }
        })

    },
    checkvalueHandle: function (e) {
        var searchRecord = this.data.searchRecord
        var index = e.currentTarget.dataset.index
        var myvalue = searchRecord[index]
        wx.navigateTo({
            url: '/pkgPost/pages/index/index?kw=' + myvalue
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '搜索',
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
        this.historysearch()
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
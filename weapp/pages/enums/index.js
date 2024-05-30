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
// pages/enums/index.js'
const enumApi = require("../../api/enum");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        cat: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (options) {
        this.setData({
            cat: options.cat
        }, function () {
            this.loadData();
        })

    },

    itemClick: function (e) {
        const {
            index
        } = e.currentTarget.dataset
        var post = this.data.items[index]
        var ch = this.getOpenerEventChannel()
        if (ch) {
            ch.emit("change", post)
        }
        wx.navigateBack({
            delta: 1,
        })
    },

    loadData: function () {
        enumApi.getEnumList(this.data.cat).then((res) => {
            this.setData({
                items: res.data.data
            });
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide () {

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
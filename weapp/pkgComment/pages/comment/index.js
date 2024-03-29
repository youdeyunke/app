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
// pages/comments/index.js
const app = getApp()
const mycommentApi = require("../../../api/mycomment")

Page({
    /**
     * 页面的初始数据
     */
    data: {
        comments: [],
        scopes: [],
        scope: 'all_items',
        target_id: '',
        target_type: '',

        loading: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData(q)
        this.loadData()
        var _this = this

    },


    scopeHandle: function (e) {
        var i = e.currentTarget.dataset.index
        var scope = this.data.scopes[i].scope
        if (scope == this.data.scope) {
            return false
        }
        this.setData({
            scope: scope,
            items: [],
            loading: true
        })
        this.loadData()
    },


    loadData: function () {
        var _this = this
        this.setData({ loading: true })
        var query = {
            target_id: _this.data.target_id,
            target_type: _this.data.target_type,
            scope: _this.data.scope,
        }
        mycommentApi.getAllCommentList(query).then((resp) => {
            _this.setData({
                items: resp.data.data.items,
                scopes: resp.data.data.scopes,
                loading: false,
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

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
// pkgComment/pages/comment/show.js
const app = getApp()
const mycommentApi = require("../../../api/mycomment")
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cid: null,
        likeNums: 0,
        liked: false,
        item: {},
        showForm: false,
        reply_items: [],
        content: null,
        maxLength: 300,
        minLength: 10,
        loading: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({ cid: q.id, target_id: q.id })
        this.loadData()
        var _this = this
        var key = 'liked_comment.' + q.id
        if (wx.getStorageSync(key)) {
            _this.setData({ liked: true })
        }
    },

    likeHandle: function (e) {
        var _this = this
        auth.ensureUser((user) => {
            _this._likeHandle(e)
        })
    },

    _likeHandle: function (e) {
        var cid = this.data.item.id
        var key = 'liked_comment.' + cid
        if (wx.getStorageSync(key)) {
            console.log('重复点击', key)
            return false
        }
        this.setData({
            likeNums: this.data.item.like_nums + 1,
            liked: true,
        })
        mycommentApi.likeComment(cid).then((res) => {
            wx.setStorage({
                key: key,
                data: true,
            })
            wx.showToast({
                title: '点赞+1',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
            });
        })
    },

    submitHandle: function (e) {
        auth.ensureUser((user) => {
            // 验证
            var data = {
                target_id: this.data.item.id,
                target_type: 'mycomment',
                at_user_id: this.data.at_user_id,
                content: this.data.content,
            }
            if (data.content.length <= 10) {
                wx.showToast({
                    title: '内容不能少于10个字',
                    icon: 'none',
                    duration: 1500,
                    mask: false,
                });
                return false
            }
            var _this = this
            mycommentApi.createComment(data).then((resp) => {
                if (resp.data.status == 0) {
                    _this.closeFormHandle()
                    wx.showToast({
                        title: '已回复',
                        icon: 'success',
                        image: '',
                        duration: 1500,
                        mask: false,
                        success: (result) => {
                        },
                    });
                    _this.loadData()
                }
            })
        })
    },

    openFormHandle: function () {
        this.setData({ showForm: true })
    },
    replyClickHandle: function (e) {
        var c = e.detail.comment
        this.setData({
            at_user_id: c.user.id,
            placeholder: '回复' + c.user.name,
        })
        this.openFormHandle()
    },

    contentChange: function (e) {
        this.setData({ content: e.detail })
    },

    closeFormHandle: function () {
        this.setData({ showForm: false, at_user_id: '', placeholder: '回复楼主' })
    },

    loadData: function () {
        // 加载评论，以及回复
        var _this = this
        mycommentApi.getCommentDetail(_this.data.cid).then((resp) => {
            var item = resp.data.data.item
            var reply_items = item.reply_items
            item.reply_items = []
            _this.setData({
                loading: false,
                item: item,
                likeNums: resp.data.data.item.like_nums,
                reply_items: reply_items
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
        this.setData({ loading: true })
        this.loadData()

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
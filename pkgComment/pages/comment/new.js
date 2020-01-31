// pages/comments/new.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_id: null,
        content: '',
        images: '',
        maxLength: 300,
        minLength: 10,
        score: 5,
    },

    observers: {
        "comment.content": function (val) {
            console.log('comment.content observer work')
        },

    },

    contentInput: function (e) {
        this.setData({ content: e.detail.value })
    },

    scoreChange: function (e) {
        this.setData({ score: e.detail })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({
            target_id: q.target_id,
            target_type: q.target_type || 'post'
        })
    },

    imagesHandle: function (e) { 
        console.log('images success handle', e)
        var images = e.detail.value
        this.setData({
            imagesStr: images.join(','),
            images: images
        })
    },

    submitHandle: function (e) {
        var comment = {
            content: this.data.content,
            images: this.data.imagesStr,
            score: this.data.score,
            target_id: this.data.target_id,
            target_type: this.data.target_type

        }
        if (!comment.score) {
            wx.showToast({
                title: '请选择评分',
            })
            return false
        }

        if (!comment.content) {
            wx.showToast({
                title: '请输入评论内容',
            })
            return false
        }

        if (comment.length <= 5) {
            wx.showToast({
                title: '评论内容太短了，请多些几个字吧',
            })
            return fasle
        }

        // do submit
        var _this = this
        app.request({
            url: '/api/v1/mycomments',
            method: 'POST',
            data: comment,
            success: function (resp) {
                // 页面卸载的收，会将this.data.comment写入globalData.newComment
                // 发布成功后，就清空
                _this.setData({ comment: null })
                wx.setStorageSync('eventBus', { key: 'reloadComments', value: comment.target_id })
                wx.showToast({ title: '提交评论成功', })
                setTimeout(function () {
                    wx.navigateBack({ delta: -1 })
                }, 1500)
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this = this
        auth.ensureUser((user) => {
            _this.setData({ user: user })
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () { },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        app.globalData.newComment = this.data.comment
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () { },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { }
})

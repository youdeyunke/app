// pkgEvent/pages/event/new.js
const app = getApp()
var qiniu = require('../../../utils/qiniu.js');
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        push: false,
        pid: null,
        currentCatIndex: 0,
        content: '',
        cats: [
        ],

    },

    pushHandle: function (e) {
        this.setData({
            push: !this.data.push
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        auth.ensureUser((user) => {
            // pass
        })

        this.setData({
            pid: q.pid
        })
        this.loadCats()
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

    catClickHandle: function (e) {
        var i = e.currentTarget.dataset.index
        this.setData({ currentCatIndex: i })
    },

    contentHandle: function (e) {
        var c = e.detail.value
        console.log('e', e)
        this.setData({ content: c })
    },

    submitHandle: function (e) {
        if (this.data.loading) {
            return false
        }
        var _this = this
        // 提交发布动态
        var catId = this.data.cats[this.data.currentCatIndex].id
        var data = {
            post_id: this.data.pid,
            content: this.data.content,
            cat_id: catId
        }
        // validate
        var len = data.content.length
        if (len < 10) {
            wx.showToast({
                icon: 'none',
                title: '内容长度不能少于10个字',
            })
            return false
        }
        this.setData({ loading: true })
        app.request({
            url: '/api/v1/events',
            data: data,
            method: 'POST',
            hideLoading: true,
            success: function (resp) {
                _this.setData({ loading: false })
                if (resp.data.status != 0) {
                    return flase
                }
                wx.showToast({
                    title: '发布成功',
                    icon: 'success',
                    mask: true,
                    duration: 1500,
                })
                setTimeout(function () {
                    wx.navigateBack({ delta: -1 })
                }, 1500)
            }
        })
    },

    loadCats: function () {
        var _this = this
        app.request({
            url: '/api/v1/event_cats',
            success: function (resp) {
                _this.setData({
                    cats: resp.data.data
                })
            }
        })
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
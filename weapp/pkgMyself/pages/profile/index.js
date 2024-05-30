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
// pages/myself/profile.js
const app = getApp()
const userApi = require("../../../api/user")
var auth = require('../../../utils/auth.js');
var upload = require('../../../utils/upload.js');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        userInfo: {},
        tagList: [
            { name: '标签1', value: 1, },
            { name: '标签2', value: 2, },
            { name: '标签3', value: 3, },
            { name: '标签4', value: 4 },
            { name: '标签5', value: 5 },
            { name: '标签6', value: 6 },
        ],
    },

    tagsHandle: function (e) {
        var i = e.currentTarget.dataset.index
        var userInfo = this.data.userInfo
        var ps = this.data.tagList
        var p = ps[i]
        var tags = []

        p.selected = !p.selected
        ps[i] = p
        this.data.tagList.forEach(function (item, i) {
            if (item.selected) {
                tags.push(item.name)
            }
        })
        userInfo.tags = tags.join(',')
        this.setData({
            tagList: ps,
            tags: tags.join(','),
            userInfo: userInfo
        })
    },

    loadTags () {
        if (!this.data.userInfo.tags) {
            return
        }
        var tags = this.data.userInfo.tags.split(',')
        var tagList = this.data.tagList
        tagList.forEach((item) => {
            tags.forEach((tag) => {
                if (item.name == tag) {
                    item.selected = true
                }
            })
        })
        this.setData({
            tagList: tagList
        })
        console.log('22234', tags)

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        wx.setNavigationBarTitle({ title: '修改个人信息' })
        this.loadUser()
    },


    goBack: function (e) {
        wx.navigateBack({ delta: -1 })
    },

    submitHandle: function (e) {
        var utype = this.data.userInfo.is_broker ? 'brokers' : 'users'
        this.updateProfile(utype)
    },

    updateProfile: function (utype) {
        var _this = this
        var data = this.data.userInfo
        userApi.updateUserProfile(data).then((resp) => {
            if (resp.data.status == 0) {
                wx.showToast({
                    icon: 'none', title: '个人资料修改成功'
                })
                auth.setUserInfo()
                setTimeout(() => {
                    wx.navigateBack({ delta: -1 })
                }, 1500)
            }
        })

    },


    chooseImage: function (e) {
        console.log('e', e)
        var key = e.currentTarget.dataset.key
        var u = this.data.userInfo
        var _this = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            success (res) {
                const path = res.tempFilePaths[0]
                upload.upload(path, (url) => {
                    u[key] = url
                    _this.setData({ userInfo: u })
                })
            }
        })
    },

    switchChange: function (e) {
        console.log('switch change', e)
    },

    textChange: function (e) {
        var k = e.currentTarget.dataset.name
        var v = e.detail
        var data = this.data.userInfo
        data[k] = v
        this.setData({ userInfo: data })
    },

    loadUser: function () {
        this.setData({ loading: true })
        var _this = this
        auth.setUserInfo(function (user) {
            _this.setData({ userInfo: user, loading: false })
            _this.loadTags()
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
        this.loadUser()
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

// pages/myself/profile.js
const app = getApp()
var auth = require('../../../utils/auth.js');
var qiniu = require('../../../utils/qiniu.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        userInfo: {},
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

    updateProfile: function(utype){
        var _this = this
        var data = this.data.userInfo
        app.request({
            url: '/api/v1/' + utype + '/0' ,
            method: 'PUT',
            data: { profile: data },
            success: function (resp) {
                if (resp.data.status == 0) {
                    wx.showToast({
                        icon: 'none', title: '个人资料修改成功'
                    })
                    setTimeout(() => {
                        wx.navigateBack({ delta: -1 })
                    }, 1500)
                }
            }
        })        

    },


    chooseImage: function (e) {
        console.log('e', e)
        var key = e.currentTarget.dataset.key 
        var u  = this.data.userInfo 
        var _this = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            success(res) {
                const path = res.tempFilePaths[0]
                qiniu.upload(path, (url) => {
                    u[key] = url
                    _this.setData({userInfo: u})
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
        auth.getRemoteUserInfo(function (user) {

            _this.setData({ userInfo: user, loading: false })
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

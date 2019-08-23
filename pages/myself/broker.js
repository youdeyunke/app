// pages/myself/broker.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        state: '',
        steps: [
            '提交资料',
            '开通会员',
            '发布房源',
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this
        auth.ensureUser(function (userInfo) {
            auth.getRemoteUserInfo(function (user) {
                app.loadConfigs(function (conf) {
                    _this.setData({
                        userInfo: user,
                        joinType: conf['broker_join_type'],
                        broker: user.broker_profile
                    })
                    _this.updateState(user)
                })
            })
        })
    },

    gotoEdit: function (e) {
        this.setData({
            state: 'new'
        })
    },

    gotoBuy: function (e) {
        wx.redirectTo({
            url: '/pages/broker/membership'
        })
    },

    updateState: function (user) {
        /* 根据身份信息改变页面状态 */
        var broker = user.broker_profile
        if (!broker.enable) {

            // 没有填写个人信息
            if (!broker.mobile && !broker.company) {
                this.setData({ state: 'new' })
                return false;
            } 

            /* 如果是免费入驻，就显示资料审核中 */
            this.setData({ state: 'pending' })

            /* 如果是付费入驻，就跳转到选择套餐 */
            if(this.data.joinType != 'free'){
              wx.redirectTo({ url: '/pages/broker/membership' })
            } 
            return false
        }
        if (broker.remain_days > 7) {
            // 老用户，还未到期 
            this.setData({
                state: 'normal'
            })
            return
        }
        this.setData({
            state: 'soon'
        })

    },

    validate: function (data, cb) {
        if (!data.name) {
            wx.showToast({
                icon: 'none',
                title: '姓名不能为空',
            })
            return false
        }
        if (!data.mobile && !data.wechat) {
            wx.showToast({
                title: '手机号和微信号至少填写一个',
            })
            return false
        }

        return cb(data)
    },

    doPost: function (data) {
        var _this = this
        var joinType = this.data.joinType

        app.request({
            url: '/api/v2/users/myself',
            data: {
                broker_profile: data
            },
            method: "PUT",
            success: function (resp) {
                if (resp.data.status == 0) {
                    var info = resp.data.data
                    /* 资料提交成功，
                    如果是付费入驻，进入套餐选择界
                    */
                    if (joinType == 'free') {
                        wx.showToast({
                            icon: 'success',
                            title: '资料提交成功，请等待管理审核'
                        })
                        _this.setData({
                            state: 'pending'
                        })
                        return false
                    }
                    wx.navigateTo({
                        url: '/pages/broker/membership'
                    })
                }
            },
        })
    },

    submitHandle: function (e) {
        var _this = this
        var data = e.detail.value
        _this.validate(data, (vdata) => {
            _this.doPost(vdata)
        })
    },

  mobileBind: function(e){
    console.log('用户授权获取手机号成功', e.detail)
    var mobile = e.detail
    if(!mobile){
      wx.showToast({
        title: '手机号授权失败，请重试',
        icon: 'error',
      })
      return false
    }

    var broker  = this.data.broker || {}
    broker['mobile']  = mobile
    this.setData({broker: broker })
  },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

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

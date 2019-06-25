// pages/myself/myself.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        cells: [
            {
                icon: "chat-o",
                name: '提问',
                url: '/pages/myself/qa',
            },
            {
                icon: "comment-o",
                name: '评论',
                url: '/pages/comments/index?myself=true&limit=10000"',
            },
            {
                icon: "eye-o",
                name: '关注',
                url: '/pages/myself/favposts'
            },
            //{ icon:"pause-circle-o",  name: '退出登录',  bindtap:"logoutHandle", loginRequired: true},
            //{ icon:"service-o", name: '联系客服',  url: '/pages/about/index'},
        ],
    },

  doUpdate: function (userInfo) {
    var url = userInfo.avatarUrl
    app.request({
      url: '/api/v1/users/update_avatar',
      data: { avatar: url },
      method: 'POST',
      success: function (resp) {
        if (resp.data.status == 0) {
          wx.showToast({
            icon: 'none',
            title: '微信头像同步成功',
            duration: 2000,
          })
        }
      }
    })
  },

  syncAvatar: function (e) {
    var _this = this
    wx.showModal({
      title: '提示',
      cancelText: "取消",
      confirmText: "同步",
      content: '确认要同步微信头像吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          _this._syncAvatar(e)

        }
      }
    })
  },

  _syncAvatar: function (e) {
    var _this = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              _this.doUpdate(res.userInfo)
            }
          })
        } else {
          wx.showToast({
            title: '请先允许授权',
            duration: 2000,
            icon: 'none',
            mask: true,
            success: function () {
              wx.openSetting()
            },
          })
        }
      }
    })
  },    

    getPhoneNumber: function (e) {

        if (!e.detail.iv) {
            this.setData({
                mobile: ' '
            })
            return false
        }

        if (this.data.mobile) {
            return false
        }

        wx.showLoading({
            title: '处理中',
            mask: true
        })
        var token = wx.getStorageSync('token')
        var that = this
        app.request({
            method: 'POST',
            url: '/api/v1/users/bind_xcx_mobile',
            data: {
                'iv': e.detail.iv,
                'encryptedData': e.detail.encryptedData
            },

            success: function (res) {
                if (res.data.status != 0) {
                    wx.showModal({
                        content: '服务器出现错误，请稍后再试',
                        showCancle: false
                    })
                } else {
                    // 绑定手机号成功
                    that.setData({
                        userInfo: res.data.data
                    })
                    wx.setStorageSync('userInfo', res.data.data)
                    console.log(that.data.mobile)
                    wx.showToast({
                        title: '绑定手机号成功',
                    })
                    app.loginBack()
                }
            }
        })
    },

    gotoSetting: function(e){
      wx.navigateTo({url: '/pages/myself/setting'})
    },

    gotoTerms: function (e) {
        wx.navigateTo({
            url: '/pages/static/terms'
        })
    },

    gotoMembership: function(e){
        // 开通经纪人身份
        // 如果是免费入驻，就去个人资料页面
        // 如果是付费入驻，就去套餐页面
        app.loadConfigs(function(conf){
          if(conf['broker_join_type'] == 'free'){
            var url =  '/pages/myself/broker'
          }else{
            var url = '/pages/broker/membership'
          }
          wx.navigateTo({url: url})
        })
    },


    loginHandle: function (e) {
        var _this  = this
        auth.loginHandle(this, e, function(u){
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this
        // 未登录时候标题栏为灰色，登录后为白色
        wx.setNavigationBarTitle({title: '我的'})
        if(this.data.userInfo.id){
            this.getRemoteUserInfo()
        }
    },

    getRemoteUserInfo: function () {
        var _this = this
        auth.getRemoteUserInfo(function (user) {
            _this.setData({
                userInfo: user
            })
            wx.setStorage({
                key: 'userInfo',
                data: user
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    setNavColor: function(isUser){
        // dark
        var frontColor = '#000000'
        var bgColor = '#f3f5f7'
        var duration =  0
        if(isUser){
            bgColor = '#ffffff'
            duration = 500
        }

        wx.setNavigationBarColor({
          frontColor: frontColor,
          backgroundColor: bgColor,
          animation: {
            duration: duration,
            timingFunc: 'easeIn'
          }
        })        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var _this = this
      auth.ensureUser(function(user){
        _this.setData({userInfo: user})
      
      })
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
        this.getRemoteUserInfo()
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

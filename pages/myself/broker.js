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
        this.setData({loading: true})
        auth.ensureUser(function (userInfo) {
            app.loadConfigs(function (conf) {
                _this.setData({ joinType:  conf['broker_join_type'], })
                _this.loadUserInfo()
            })
        })
    },

  chooseImage: function(e){
      var _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        success (res) {
          const path = res.tempFilePaths[0]
          qiniu.upload(path, (url) => {
              _this.updateAvatar(url)
          })
        }
    })
  },

  updateAvatar: function(url){
      var _this = this
      // 设置avatar
      app.request({
        url: '/api/v1/users/update_avatar', 
        data: {avatar: url},
        method: 'POST',
        success: function(resp){
          if(resp.data.status == 0){
            _this.loadUserInfo()
            wx.showToast({
              icon: 'none',
              title: '头像上传成功！',
              duration: 2000,
            })
          }
        }
      })
  },



    loadUserInfo: function(){
        // 从服务器加载最新的用户数据
        var _this = this
        this.setData({loading: true})
        auth.getRemoteUserInfo(function (user) {
            _this.setData({ userInfo: user, loading: false })
        })
    },

    gotoEdit: function (e) {
        this.setData({
            state: 'new'
        })
    },


    validate: function (data, cb) {
        if (!this.data.userInfo.avatar) {
            wx.showToast({
                icon: 'none',
                title: '请先上传头像',
            })
            return false
        }

        if (!data.name) {
            wx.showToast({
                icon: 'none',
                title: '姓名不能为空',
            })
            return false
        }




        if (data.length <=1 || data.length >= 5) {
            wx.showToast({
                icon: 'none',
                title: '姓名长度错误',
            })
            return false
        }

        if (!data.company) {
            wx.showToast({
                icon: 'none',
                title: '公司名不能为空',
            })
            return false
        }

        if (!data.mobile && data.mobile.length != 11) {
            wx.showToast({
                title: '请填写正确的手机号',
                icon: 'none',
            })
            return false
        }

        return cb(data)
    },

    fixHandle: function(e){
      var user = this.data.userInfo
      user['apply_status'] = 0
      this.setData({userInfo: user})
    },

    doPost: function (data) {
        var _this = this
        var joinType =  this.data.joinType
        app.request({
            url: '/api/v1/brokers/',
            data: { profile: data },
            method: "POST",
            success: function (resp) {
                if (resp.data.status == 0) {
                    var user = resp.data.data
                    app.globalData.userInfo = user
                    _this.setData({userInfo: user})

                    /* 资料提交成功，
                    如果是付费入驻，进入套餐选择界
                    */
                    if (joinType == 'free') {
                        wx.showToast({
                            icon: 'success',
                            title: '提交成功，请等待管理审核'
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
    onShow: function () {
        this.setData({
            userInfo: app.globalData.userInfo
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
        this.loadUserInfo()
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

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
// components/pagemaker/myselflogin/index.js
const app = getApp()
const userApi =  require("../../../api/user")
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  ready() {
    var user = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: user
    })
    var _this = this
    app.ensureConfigs(function (configs) {
      _this.setData({
        primaryColor: configs.color.primary,
      })
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoLoginPage: function (e) {
      wx.navigateTo({
        url: '/pkgAuth/pages/auth/index',
      })
    },
    onShow() {
      if(app.globalData.LOGIN_FLAG != 1){
        return
      }
      var _this = this
      userApi.getMyselfInfo().then((resp) => {
        if (resp.data.code != 0) {
          console.log("拉取当前登录用户信息时候出错，请检查loadUserInfo方法")
          return false;
        }
        var user = resp.data.data
        // 存入本地
        wx.setStorageSync('userInfo', user);
        app.globalData.userInfo = user;
        _this.setData({
          userInfo: user
        })
      })
    }
  }
})
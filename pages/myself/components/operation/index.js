// pages/myself/images/components/user/index.js
const app = getApp()


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myuser:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    logoutHandle: function (e) {
      var _this = this
      wx.showModal({
        title: '退出登录',
        content: '确定需要退出当前登录的账号吗？',
        confirmText: '退出',
        confirmColor: '#00ae66',
        showCancel: true,
        success(res) {
          if (res.confirm) {
            _this._logoutHandle()
          }
        }
      })
    },
    openApply:function(){
      wx.navigateTo({
        url: '/pkgBroker/pages/broker/join',
      })
    },
    _logoutHandle: function () {
      wx.setStorageSync('userInfo', null)
      wx.setStorageSync('token', null)
      this.setData({
        userInfo: null
      })
      this.setData({
        userInfo: null
      })  
      app.globalData.userInfo = null
      app.globalData.token = null



      this.triggerEvent('quitHandle',{userInfo:null})



    },
    openAuthSetting: function (e) {
      wx.openSetting({
        success(res) {
          console.log(res.authSetting)
        }
      })
    },
    clearCache: function (e) {
      var _this = this
      wx.showModal({
        title: '操作提示',
        content: '确定要清除缓存吗，清除缓存后，小程序将会自动重启',
        success(res) {
          if (res.confirm) {
            _this._clearCache(e)
          } else if (res.cancel) {}
        }
      })
    },
    _clearCache: function (e) {
      var _this = this
      var _keys = ['userInfo', 'token', 'myconfigs', 'location']
      var keys = this.data.cache.keys
      var cache = this.data.cache
      keys.forEach(function (key, i) {
        var remove = true
        _keys.forEach(function (_key, j) {
          if (_key == key) {
            remove = false
          }
        })
        if (remove) {
          wx.removeStorage({
            key: key
          })
          console.log('remove', key, remove)
        }
      })
      wx.showToast({
        title: '缓存已清除',
        icon: 'none',
        duration: 2000,
        success: function () {
          wx.reLaunch({
            url: '/pages/home/home'
          })
        },
      })
    },
    loadCacheInfo: function () {
      var _this = this
      wx.getStorageInfo({
          success(res) {
              _this.setData({ cache: res })
          }
      })
  },















  },
  ready:function(q){
        this.loadCacheInfo()
  }

})
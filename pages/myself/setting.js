// pages/myself/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    configs :wx.getStorageSync('myconfigs'),
    cache: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var configs = wx.getStorageSync('myconfigs')
    this.setData({configs: configs})
    this.loadCacheInfo()

  },

  loadCacheInfo: function(){
    var _this = this
		wx.getStorageInfo({
			success(res) {
				console.log(res.keys)
				console.log(res.currentSize)
				console.log(res.limitSize)
        _this.setData({cache: res})
			}
		})
  },

  openAuthSetting: function(e){
		wx.openSetting({
			success(res) {
				console.log(res.authSetting)
				// res.authSetting = {
				//   "scope.userInfo": true,
				//   "scope.userLocation": true
				// }
			}
		})
  },

  clearCache: function(e){
    var _this = this
		wx.showModal({
			title: '操作提示',
			content: '确定要清除缓存吗',
			success(res) {
				if (res.confirm) {
					_this._clearCache(e)
				} else if (res.cancel) {
				}
			}
		})
  },

  _clearCache: function(e){
    var _this = this
    var _keys = ['userInfo', 'token', 'myconfigs', 'location']
    var keys = this.data.cache.keys
    var cache = this.data.cache
    keys.forEach(function(key, i){
      var remove = true
      _keys.forEach(function(_key, j){
        if(_key == key){
          remove = false
        }
      })
      if(remove){
          wx.removeStorage({key: key})
          console.log('remove', key, remove)
      }
    })
		wx.showToast({
			title: '缓存已清除',
			icon: 'none',
			duration: 2000,
      success: function(){
        _this.loadCacheInfo()
      },
		})
			

  },

  logoutHandle: function (e) {
    wx.setStorageSync('userInfo', null)
    wx.setStorageSync('token', null)
    this.setData({userInfo: null })
    this.setData({userInfo: null })
    wx.switchTab({url:'/pages/myself/index'})
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

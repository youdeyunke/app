// components/avatar-sync.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    doUpdate: function(userInfo){
      var url = userInfo.avatarUrl
      app.request({
        url: '/api/v1/users/update_avatar', 
        data: {avatar: url},
        method: 'POST',
        success: function(resp){
          if(resp.data.status == 0){
            wx.showToast({
              title: '微信头像同步成功',
            })
          }
        }
      })
    },

    syncAvatar: function(e){
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

					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
    },

    _syncAvatar: function(e){
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
          }else{
            wx.showModal({
              title: '同步失败',
              content: '请先授权',
            })
          }
        }
      })      
    },

  }
})

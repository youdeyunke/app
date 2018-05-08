// components/fav.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    post: {type: Object, value: null}
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
    clickHandle: function(e){
      var pid = this.data.post.id
      var _this = this
      var userInfo = wx.getStorageSync('userInfo')

      app.request({
        url: '/api/v1/favs/',
        method: 'POST',
        data: {user_id: userInfo.id, post_id: pid},
        success: function(resp){
          console.log('resp', resp.data)
          _this.data.post.favs_count = resp.data.data
          _this.setData({post: _this.data.post})
        }
      })
    }

  }

})

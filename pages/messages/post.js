// components/message/post.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      postId: {type: Number}
  },

  ready: function(){
      this.getPost()
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
      getPost: function(){
          // 拉取post
          //
          var pid = this.data.postId
          var _this = this
          var key = 'post.data.' + pid
          var post = wx.getStorageSync(key)
          if(post && post.id){
            this.setData({post: post})
            return 
          }
          app.request({
              url: '/api/v2/posts/' + pid,
              hideLoading: true,
              success: function(resp){
                  var post = resp.data.data
                  wx.setStorageSync(key, post)
                  _this.setData({post: post})
              }
          })
      },

  }
})

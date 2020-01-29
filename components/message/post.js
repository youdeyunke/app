// components/message/post.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    position: {type: String, value: ''},
    message: {
      type: Object, value: null,
    },

    currentUserId: {
      type: Number, value: null,
    },

  },

  ready: function(){
    var key = 'post.data.' + this.data.message.content
    var post = wx.getStorageSync(key)
    this.setData({post: post})
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

  }
})

// components/post.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String, value: 'normal',
    },
    border: {
      type: Boolean, value: true,
    },
    shadow: {
      type: Boolean, value: true,
    },
    item: {
      type: Object, value: {},
    }
  },

  ready: function(){
    var user = wx.getStorageSync('userInfo')
    if(user.is_broker){
      this.setData({is_broker: true})
    }
    console.log('user info 2', user)
  },

  /**
   * 组件的初始数据
   */
  data: {
    is_broker: false

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

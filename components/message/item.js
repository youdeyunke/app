// components/message/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mid: {type: Number, value: 0, observer: '_midChange'},
    currentUserId: {
      type: Number, value: null,
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
  },


  ready: function(){
    console.log('current user id is', this.data.currentUserId)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _midChange: function(newVal, oldVal){
      var _this = this
      var key = 'message.' + newVal
      var message = wx.getStorageSync(key)
      _this.setData({message: message})
    },

  }
})

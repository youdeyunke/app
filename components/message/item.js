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
      position: '',
  },

  observers: {
    "mid": function(mid){
      if(!mid){
        return
      }
      var _this = this
      var key = 'message.' + mid
      wx.getStorage({key: key, success: function(val){
        var message = val.data
        var position = _this.data.currentUserId == message.sender_id ? 'right' : 'left'

        _this.setData({message: message, position: position})
        console.log('current user id', _this.data.currentUserId, 'sender id',  message.sender_id, 'position', position, message)
      }})
    }
  },


  ready: function(){


  },

  /**
   * 组件的方法列表
   */
  methods: {
    _midChange: function(newVal, oldVal){
    },

  }
})

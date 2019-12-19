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


  ready: function(){
    console.log('ready for message ', this.data.mid)
      var _this = this
      var key = 'message.' + this.data.mid
      wx.getStorage({key: key, success: function(val){
        var message = val.data
        var position = _this.data.currentUserId == message.sender_id ? 'right' : 'left'

        _this.setData({message: message, position: position})
        console.log('current user id', _this.data.currentUserId, 'sender id',  message.sender_id, 'position', position, message)
      }})
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _midChange: function(newVal, oldVal){
    },

  }
})

// components/message/input.js
const app = getApp()


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    receiverId: {
      type: Number, value: null,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: '',
    pending: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    inputHandle: function(e){
      this.setData({
        content: e.detail.value
      })
    },

    sentHandle: function( e){
      console.log('confirm ', e)
      var _this = this
      if(_this.data.pending || _this.data.content.length == 0){
        return false
      }

      var content = this.data.content
      _this.setData({ content: '', lastContent: content, pending: true })
      app.request({
        url: '/api/v1/messages',
        hideLoading: true,
        method: 'POST',
        data: {content: content, content_type: 'text', receiver_id: _this.data.receiverId},
        success: function(resp){
          if(resp.data.status == 0){
            _this.triggerEvent('success', resp.data.data)
          }else{
            console.error('error')
          }
        },
        complete: function(){
          _this.setData({pending: false})
        },

      })
      
    },

  }
})

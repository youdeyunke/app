// components/message/text.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    position: {type: String, value: ''},
    message: { type: Object, value: null, },

    currentUserId: {
      type: Number, value: null,
    },
  },

  ready: function(){

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
    gotoDetail: function(){
      var url = this.data.message.content_url  
      if(!url){ 
        return 
      }
      wx.navigateTo({
        url: url,
      })
    },

  }
})

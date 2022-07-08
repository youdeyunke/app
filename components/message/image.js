// components/message/image.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
        type: Object,
    }
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

    previewHandle: function(e){
        var url = this.data.message.content 
        wx.previewImage({
          urls: [url],
            current: url,
        })
    },

  }
})

// components/copyright.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  ready: function(){

  },

  /**
   * 组件的初始数据
   */
  data: {
    mode: 0,
    values: ['技术支持：房苏州', '由 udeve.cn 提供技术支持'],
  },

  /**
   * 组件的方法列表
   */
  methods: {

    sayHello: function(){
      if(this.data.mode == 1){
        wx.showModal({
          title: '小程序开发',
          content: '需要解小程序开发相关信息可添加微信：udeve_cn',
          confirmText: '复制微信',
          success(res) {
            if (res.confirm) {
              wx.setClipboardData({
                data: 'udeve_cn',
              })

            } 
          }          
        })    
      }
    }
  }
})

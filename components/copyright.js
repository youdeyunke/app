// components/copyright.js

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  ready: function(){
      this.setData({mode: 1, text: app.globalData.EXT['cr'] || 'UDEVE.CN'  })

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

    sayHello: function(){
      if(this.data.text ){
        wx.showModal({
          title: '技术支持',
          content: '由"优得（西安）信息科技有限公司"提供技术支持，微信：udeve_cn',
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

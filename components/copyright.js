// components/copyright.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  ready: function(){
    var user = wx.getStorageSync('userInfo')
    if(user.id >= 0){
      this.setData({mode: 1})
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    mode: 0,
    values: ['', '技术支持:udeve.cn'],
  },

  /**
   * 组件的方法列表
   */
  methods: {

    sayHello: function(){
      if(this.data.mode == 1){
        wx.showModal({
          title: '小程序开发',
          content: '咨询微信：udeve_cn',
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

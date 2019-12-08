// components/ad-link.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      width: { type:Number, value: '750'}, 
      mini: { type:Boolean, value: false}, 
  },

  /**
   * 组件的初始数据
   */
  data: {
      show: false,
  },


  ready: function(){
      this.setData({
          show: app.globalData.myconfigs['adv_link']
      })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

// components/copyright.js

const app = getApp()

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
    text: "优得UDEVE提供技术支持"
  },

  /**
   * 组件的方法列表
   */
  methods: {

    sayHello: function(){
      wx.showToast({
        icon: 'none',
        title: '优得:www.udeve.net',
      })
    }
  }
})

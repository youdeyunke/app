// components/pagemaker/banners/index.js
const link = require("../link")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {
      type: Object,
      default: null
    }

  },



  observers: {


    "config.height": function (v) {
      // 的高度值
      if (!v || !v.value) {
        return false
      }

      if (v.value == 'auto') {
        return false
      }

      var value = v.value 
      this.setData({
        heightValue: value + 'rpx'
      })
      return
    },
  },


  /**
   * 组件的初始数据
   */
  data: {
    heightValue: '150rpx',
  },

  /**
   * 组件的方法列表
   */
  methods: {

    linkHandle: function (e) {
      link.clickHandle(this.data.config.data.link)
    }

  }
})

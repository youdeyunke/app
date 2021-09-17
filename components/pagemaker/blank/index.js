// components/pagemaker/blank/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {type: Object, default: {}},
  },

  observers: {
    "config.height": function(v){
      // 图片的高度值
      if(!v || !v.value){
          return false
      }
    
    var  value = v.value * 2
    this.setData({heightValue: value + 'rpx'})
    return
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    heightValue: null,

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

// components/post-cover/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {type: Object, value: {}},
    width: {type: Number, value: 215},
    height: { type: Number, value: 156},

  },

  observers: {
    "item.views": function(views){
      // 处理浏览量单位 
      if(views >= 10000){
        var n = views / 10000
        n = n.toFixed(1)  + 'w'
      }else if(views >= 1000){ 
        var n = views / 1000  
        n = n.toFixed(1)  + 'k'
      }else{
        n = views
      }
      this.setData({views:n})
      
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    views: 0,

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

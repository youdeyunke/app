// pkgYfyj/pages/yfyj/room-detail/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    post: {
      type: Object, value: null, 
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false, 
    item: null, 
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onClose: function(){
      this.setData({show: false })
    },

    onShow: function(item){
      // TODO  计算价格差异  
      console.log('item', item)
      // 处理价格单位等 
      
      item.hasDelta = false
      var ap = this.data.post.average_price
      if(ap && item.average_price){
        // 计算涨幅
        var d = item.average_price - ap  
        var r = 100*d / ap
        var r = r.toFixed(2) 
        item.delta = r
        item.hasDelta = true
      }
  
      this.setData({item: item, show: true})
    },

  }
})

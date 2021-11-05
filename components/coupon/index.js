// components/coupon/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {type: Object, value: null },

  },

  observers: {
    "item.expired_at": function(v){
      if(!v){
        return 
      }
      var r = v.split('T')
      var expiredAt  = r[0]  + ' ' +  r[1].split('.')[0]
      this.setData({expiredAt: expiredAt})
    },
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

  }
})

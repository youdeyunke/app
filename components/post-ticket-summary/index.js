// components/post-ticket-summary/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {type: Number, default: 710},
    summary: {type: Object, default: null},

  },

  observers: {
    "summary": function(v){
      if(!v){
        return
      }
      var s =   v
      s.total = s.youfang_total + s.wufang_total + s.rencai_total   
      if(s.total == 0){
        return 
      }
      s.total_hit = s.youfang_hit + s.wufang_hit + s.rencai_hit 
      s.total_rate = 100  * s.total_hit / s.total 
      s.total_rate = s.total_rate.toFixed(2)

      s.rencai_rate = 100 * s.rencai_hit / s.rencai_total  
      s.rencai_rate = s.rencai_hit.toFixed(2)

      s.wufang_rate = 100 * s.wufang_hit / s.wufangi_total  
      s.wufang_rate = s.wufang_hit.toFixed(2)

      s.youfang_rate = 100 * s.youfufang_hit / s.youfufangi_total  
      s.wyouffang_rate = s.youfang_hit.toFixed(2)
      this.setData({res: s})
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    res: null,

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

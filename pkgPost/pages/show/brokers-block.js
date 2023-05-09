// pages/post/brokers-block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      value: {type: Object, default:{} },
      color: { type: String, value: '#3A6BDD'},
      theme: { type: String }
  },

  observers: {
    "value.brokers": function(vals){
      if(!vals){ 
        return 
      }
      var brokers = vals.filter((v) => {  
        return v.level == 1
      }).filter((v,i) => { 
        return i <= 2
      })
      this.setData({ brokers: brokers})
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
      maxLength: 3,
      moreBrokersBtn: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    moreBrokersHandle: function () {
        // 显示更多经纪人
        var _this = this
        this.setData({
            moreBrokersBtn: false,
            maxLength: _this.data.value.brokers.length
        })
    },

  }
})

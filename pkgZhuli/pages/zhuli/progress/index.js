// pkgZhuli/pages/zhuli/progress/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    total: {
      type: Number,
      value: 0
    },
    value: {
      type: Number,
      value: 0
    },
  },


  observers: {
    "value": function (value) {
      // 计算百分比 
      if (!this.data.total) {
        return
      }
      var r = 100 * value / this.data.total
      this.setData({
        rate: r
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    rate: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
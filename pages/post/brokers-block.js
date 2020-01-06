// pages/post/brokers-block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      block: {type: Object, default:{} },
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
            maxLength: _this.data.block.brokers.length
        })
    },

  }
})

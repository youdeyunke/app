// components/order.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean, value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    orderItems: [
      {name: '最新发布', value: ['id', 'desc']},
      {name: '价格(从低到高)', value: ['rent_price', 'asc'] },
      {name: '价格(从高到低)', value: ['rent_price', 'desc']},
      {name: '面积(从大到小)', value: ['area', 'desc']},
      {name: '面积(从小到大)', value: ['area', 'asc'] },      
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancle: function (e) {
      this.setData({
        currentIndex: 0,
      })
    },

    onConfirm: function (e) {
      var i = this.data.currentIndex
      var o = this.data.orderItems[i]
      this.triggerEvent('change', { order: o })
    },

    onSelect: function (e) {
      var i = e.currentTarget.dataset.index
      if (i != this.data.currentIndex) {
        this.setData({ currentIndex: i })
      }
    },
  }
})

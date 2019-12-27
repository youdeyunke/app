// components/broker/hot-brokers.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      brokers: {type: Array, value: []},
      max: { type: Number, default: 10},
  },

  observers: {
      "brokers.**": function(val){
          this.initBrokers()
      },
  },

  /**
   * 组件的初始数据
   */
  data: {
      items: [],
  },

  ready: function(){
  },

  /**
   * 组件的方法列表
   */
  methods: {
      shuffle: function(arr) {
        　　var i = arr.length, t, j
        　　while (i) { 
            　　j = Math.floor(Math.random() * i--)
            　　t = arr[i]
            　　arr[i] = arr[j]
            　　arr[j] = t
        　　}
        },

      initBrokers: function(){
          var _this = this
          var items = this.data.brokers
          _this.shuffle(items)
          _this.setData({items: items.slice(0, _this.data.max)})
      },

  }
})

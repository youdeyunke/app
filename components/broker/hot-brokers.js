// components/broker/hot-brokers.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      max: { type: Number, default: 10},
  },

  /**
   * 组件的初始数据
   */
  data: {
      items: [],
  },

  ready: function(){
      this.loadBrokers()
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

      loadBrokers: function(){
          var _this = this
          app.request({
              url: '/api/v1/brokers/',
              data: { limit: _this.data.max},
              hideLoading: true,
              success: function(resp){
                  var items = resp.data.data
                  _this.shuffle(items)
                  _this.setData({items: items})
              },
          })
      },

  }
})

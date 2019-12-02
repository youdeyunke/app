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
      cacheKey: 'home_page_hot_brokers',
      items: [],
  },

  ready: function(){
      var key = this.data.cacheKey
      var items = wx.getStorageSync(key) || []
      this.setData({items: items.slice(0, this.data.max)})
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
          var key = this.data.cacheKeys
          app.request({
              url: '/api/v1/brokers/',
              data: { limit: _this.data.max},
              hideLoading: true,
              success: function(resp){
                  var items = resp.data.data
                  _this.shuffle(items)
                  _this.setData({items: items.slice(0, _this.data.max)})
                  wx.setStorageSync(key, items)
              },
          })
      },

  }
})

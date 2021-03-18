// components/broker/hot-brokers.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      config: {type: Object, value: null },
  },

  observers: {
    //  "config.ids": function(ids){
     //     this.initBrokers()
     // },
  },

  /**
   * 组件的初始数据
   */
  data: {
      loading: false,
      items: [],
  },

  ready: function(){
      this.initBrokers()
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
          // TODO 根据id查询
          var _this = this
          var query = {}
          //var ids = this.data.config.ids 
          //if(ids){
          //    query.ids = ids.join(',')
          //}
          var _this = this
          this.setData({loading: true})
          app.request({
              url: '/api/v1/brokers', 
              data: query, 
              hideLoading: true,
              success: function(resp){
                  _this.setData({
                      loading: false, 
                      items: resp.data.data,
                  })
              }
          })
      },

  }
})

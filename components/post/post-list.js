// components/school-region/school-list.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    perPage: {
      type: Number, value: 5
    },
    query: {
      type: Object, value: {kw: '', page: 1}, observer: 'loadData'
    }
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
    loadData: function(){
      var _this = this
      var query = this.data.query
      query.per_page = _this.data.perPage
      app.request({
        url: '/api/v2/posts/',
        data: query,
        success: function(resp){
          var meta = resp.data.meta
          var p = _this.data.query.page || 1
          var i = p - 1
          var data = {meta: meta}
          var key = 'items[' + i + ']'
          data[key] = resp.data.data
          _this.setData(data)       
        }
      })
    }
  }
})

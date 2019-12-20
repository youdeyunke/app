// components/sub-district/items.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filter: {
      type: Object, value: {}, observer: "loadData"
    },
    page: {
      type: Number, value: 1, observer: "loadData"
    },
    kw: {
      type: String, value: '', observer: "loadData"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    query: {},
    loading: false,
  },

  ready: function(){

  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadData: function () {
      var _this = this
      var query = this.data.filter
      query['kw'] = this.data.kw
      query['page'] = this.data.page

      _this.setData({ loading: true })
      app.request({
        url: '/api/v1/sub_districts/',
        data: query,
        complete: function (r) {
        },
        success: function (resp) {
          var meta = resp.data.meta
          var p = query['page']
          var i = p - 1
          var data = { meta: meta, loading: false }
          if (p > 1) {
            var key = 'items[' + i + ']'
            data[key] = resp.data.data
          } else {
            data['items'] = [resp.data.data]
          }

          _this.setData(data)
          for(var i=0;i<=resp.data.data.length-1;i++){
            var post = resp.data.data[i]
            wx.setStorage({
              key: 'sub_district.' + post.id,
              data: post,
            })
          }
        }
      })
    }
  }
})

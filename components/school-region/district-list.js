// components/school-region/district-list.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    page: {
      type: Number, value: 1, observer: 'loadData'
    },
    kw: {
      type: String, value: '', observer: 'loadData'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [],
  },

  ready: function(){
    this.loadData()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadData: function () {
      var _this = this
      var query = {
        kw: _this.data.kw,
        page: _this.data.page,
      }
      app.request({
        url: '/api/v1/sub_districts',
        data: query,
        success: function (resp) {
          var i = _this.data.page - 1
          var data = {}
          var key = 'items[' + i + ']'
          data[key] = resp.data.data
          _this.setData(data)

        }
      })
    }
  }
})

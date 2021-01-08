// pkgBroker/pages/broker/items.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filter: {
      type: Object, value: {}, observer: "filterChange"
  },
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [],
    query:{},
    loading:false
  },
  ready: function () {
},
  /**
   * 组件的方法列表
   */
  methods: {
    filterChange: function () {
      //console.log('filter change')
      var query = this.data.filter || {}
      if (Object.keys(query).length == 0) {
          return false;
      }

      query.page = 1
      this.setData({ query: query })
      this.loadData()
  },
  loadData: function () {
    var _this = this
    var query = this.data.query
    console.log('load data with query', query)

    if (!query) {
        return false
    }

    _this.setData({ loading: true })
    var query = this.data.query
    app.request({
        url: '/api/v2/posts/',
        hideLoading: true,
        data: query,
        complete: function (r) {
            _this.setData({ loading: false })
        },
        success: function (resp) {
            _this.setData({items:resp.data.data})
            console.log(_this.data.items);
        }
    })
}
  }
})

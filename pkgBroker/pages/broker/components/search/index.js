// pkgBroker/pages/broker/search/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    serachresule: []
  },
  observers: {
    'value': function (v) {
      var myvalue = v
      var _this = this
      console.log("子组件value", myvalue)
      app.request({
        url: '/api/v2/posts/quicksearch',
        method: 'GET',
        data: {
          kw: myvalue
        },
        success: function (res) {
          _this.setData({
            serachresule: res.data.data
          })
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkedHandle: function (e) {
      var mytitle = e.currentTarget.dataset.title
      this.triggerEvent("checkedtitle", {
        mytitle
      })
    }
  }
})
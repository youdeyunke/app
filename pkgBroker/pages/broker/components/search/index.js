// pkgBroker/pages/broker/search/index.js
const app = getApp()
const postApi = require("../../../../../api/post")

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
// ？？  未找到引用
      postApi.quickSearch(myvalue).then((res)=>{
          console.log("1212");
        _this.setData({
            serachresule: res.data.data
          })
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkedHandle: function (e) {
      console.log("eeeeeeeeeeee",e)
      var mypost = e.currentTarget.dataset.mypost
      this.triggerEvent("checkedtitle", {
        mypost
      })
    }
  }
})
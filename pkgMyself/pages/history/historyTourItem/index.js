// pkgMyself/pages/history/historyTourItem/index.js
const tourApi = require("../../../../api/tour")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tourId: { type: Number, default: null }
  },

  observers: {
    "tourId": function (value) {
      var _this = this
      if(value){
        tourApi.getTourDetail(value).then((resp)=>{
          if (resp.data.status != 0) {
            return
          }
          _this.setData({
            tour: resp.data.data
          })
        })
      }
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    tour: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

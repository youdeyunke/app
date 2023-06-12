// components/visitors/index.js
const app = getApp()
const visitorApi = require("../../api/visitor")

Component({
  /**
   * 组件的属性列表
   */
  properties: {

    targetId:{
      type: Number, value: 0,
    },

    limit: {
      type:Number, value: 5,
    },

    targetType: {
      type: String, value: 'post',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready: function(){
    this.loadVisitors()
  },

  /**
   * 组件的方法列表
   */
  methods: {


    loadVisitors: function () {
      var _this = this
      var query={
        target_id: _this.data.targetId,
        target_type: _this.data.targetType,
        per_page: _this.data.limit,
      }
    //   有待检测
    //   app.request({
    //     url: '/api/v1/visitors/有待检测',
    //     data: {
    //       target_id: _this.data.targetId,
    //       target_type: _this.data.targetType,
    //       per_page: _this.data.limit,
    //     },
    //     success: function (resp) {
    //     }
    //   })
      visitorApi.getVisitorList(query).then((resp)=>{
        _this.setData({
            visitors: resp.data.data,
            visitorsMeta: resp.data.meta
          })
      })
    },    

  }
})

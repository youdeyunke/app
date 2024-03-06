/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pkgCustomer/components/follow/index.js
const followApi = require("../../../api/follow")
const app =getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    target_id: {type:Number},
    target_type: {type:String}
  },

  /**
   * 组件的初始数据
   */
  data: {
    followList:[],
    primaryBtnColor: "#ff9600",
  },

  observers:{
    "target_id": function (val) {
      if (!val) {
        return
      }
      this.loadFollow()
    }
  },

  ready: function () {
    var color = app.globalData.myconfigs.color
    this.setData({
        primaryBtnColor: color.primary_btn,
    })
},

  /**
   * 组件的方法列表
   */
  methods: {
    createFollow(){
      var _this = this
      var id = this.data.target_id
      var type = this.data.target_type
      console.log(this.data);
      var url = "/pkgCustomer/pages/createFollow/index?target_type=" + type + "&target_id=" + id
      wx.navigateTo({
        url: url,
        events:{
          change: function(){
            _this.loadFollow(id)
          }
        }
      })
    },
    loadFollow(threadid){
      var _this = this
      var data = {
        target_id: _this.data.target_id,
        target_type: _this.data.target_type
      }
      followApi.getCustomerFollows(data).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        this.setData({
          followList: resp.data.data
        })
        this.triggerEvent("followCount", resp.data.data.length)
      })
    },
  }
})

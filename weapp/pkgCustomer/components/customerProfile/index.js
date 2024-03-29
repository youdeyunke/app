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
// pkgCustomer/components/customerProfile/index.js
const customerProfileApi = require("../../../api/customer_profile")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    customerId: {type:Number},
  },

  observers: {
    "customerId": function (val) {
      if(!val){
        return
      }
      this.loadData(val)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    profile: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadData(id){
      var _this = this
      var data = {
        customer_id: id
      }
      customerProfileApi.getCustomerProfile(data).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        this.setData({
          profile: resp.data.data
        })
      })
    },
    gotoEdit(e){
      var _this =this
      var type = e.currentTarget.dataset.type
      var id = this.data.customerId
      var url = "/pkgCustomer/pages/customerProfileEdit/index?type=" + type + "&customerId=" + id
      wx.navigateTo({
        url: url,
        events:{
          change: function(){
            _this.loadData(id)
          }
        }
      })
    },
  }
})

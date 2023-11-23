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
// pkgCustomer/components/customerContact/index.js
const customerContactApi = require("../../../api/customer_contact")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    customerId: {type:Number},
  },

  /**
   * 组件的初始数据
   */
  data: {
    contacts: []
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
   * 组件的方法列表
   */
  methods: {
    loadData(id){
      var _this = this
      var data = {
        customer_id: id
      }
      customerContactApi.getCustomerContacts(data).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        this.setData({
          contacts: resp.data.data
        })
      })
    },
    createFollow(){
      wx.navigateTo({
        url: '/pkgCustomer/pages/customerContactEdit/index?customerId=' + this.data.customerId,
      })
    }
  }
})

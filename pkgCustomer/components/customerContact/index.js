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
const app =getApp()
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
    contacts: [],
    primaryBtnColor: "#ff9600",
  },

  ready: function () {
    var color = app.globalData.myconfigs.color
    this.setData({
        primaryBtnColor: color.primary_btn,
    })
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
        this.triggerEvent("contactCount", resp.data.data.length)
      })
    },
    createContact(){
      var _this = this
      var id = this.data.customerId
      wx.navigateTo({
        url: '/pkgCustomer/pages/customerContactEdit/index?customerId=' + this.data.customerId,
        events:{
          change: function(){
            console.log("xjainanana");
            _this.loadData(id)
          }
        }
      })
    },
    updateContact(e){
      var _this = this
      var id = e.currentTarget.dataset.id
      var customerId = this.data.customerId
      var url = "/pkgCustomer/pages/customerContactEdit/index?id=" + id + "&customerId="+ customerId
      wx.navigateTo({
        url: url,
        events:{
          change: function(){
            console.log("gxnsihixhuah");
            _this.loadData(_this.data.customerId)
          }
        }
      })
    }
  }
})

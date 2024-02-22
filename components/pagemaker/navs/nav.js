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
const link = require("../link")
const app = getApp()
const navsApi = require("../../../api/navs")


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      default: {}
    },
    styleName: {
      type: Number,
      value: 5
    }
  },

  observers: {
    "item.dynamic_inner_text": function (isDongtai) {
      if (!isDongtai) {
        return false
      }
      var _this = this
      var item = this.data.item
      // 根据position id 查询导航按钮  

      navsApi.getDynamicNavs(item.id).then((resp) => {
        if (resp.data.status != 0) {
          return
        }
        _this.setData({
          inner_text: resp.data.data.inner_text
        })
      })
      // app.request({
      //     url: '/api/v2/dynamic_navs?id=' + item.id + '&name=' + item.name, 
      //     hideLoading: true, 
      //     success: function(res){

      //         // console.log(res,"9999999")
      //     }
      // })


    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    inner_text: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    clickHandle: function (e) {
      // console.log(4444444,this.data.item)
      // const { index } = e.currentTarget.dataset
      var item = this.data.item
      var obj = {}
      try {
        obj = JSON.parse(item.link)
      } catch (error) {
        console.log(error)
      }
      link.clickHandle(obj)

    }

  }
})
/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
const link = require("../../link")
const app = getApp()


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
      value: 4
    },
    pageKey: {
      type: String,
      value: 'home'
    }
  },

  observers: {
    "item.dynamicInnerText": function (isDongtai) {
      if (!isDongtai) {
        return false
      }
      var _this = this
      var item = this.data.item
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    innerText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    clickHandle: function (e) {
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
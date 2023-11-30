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
// pkgCustomer/components/subThreads/index.js
const threadApi = require("../../../api/thread")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    parentId: {type:Number}
  },

  observers: {
    "parentId": function (val) {
      if(!val){
        return
      }
      this.loadSubThread(val)
      this.loadParentThread(val)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    subThreads:[],
    parentThread: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadParentThread(parentid){
      var _this = this
      threadApi.getThreads(parentid).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        this.setData({
          parentThread: resp.data.data
        })
      })
    },
    loadSubThread(parentid){
      var _this = this
      threadApi.getSubThreads(parentid).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        this.setData({
          subThreads: resp.data.data
        })
        this.triggerEvent("threadCount", resp.data.data.length + 1)
      })
    },
  }
})

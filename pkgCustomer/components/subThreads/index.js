// pkgCustomer/components/subThreads/index.js
const threadApi = require("../../../api/thread")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    parentId: {type:Number, value: null}
  },

  observers: {
    "parentId": function (val) {
      if(!val){
        return
      }
      this.loadSubThread(val)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    subThreads:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadSubThread(parentid){
      var _this = this
      threadApi.getSubThreads(parentid).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        this.setData({
          subThreads: resp.data.data
        })
      })
    },
  }
})

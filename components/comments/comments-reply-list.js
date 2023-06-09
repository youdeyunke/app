// components/comments/comments-reply-list.js
const app = getApp()
const mycommentApi = require("../../api/mycomment")

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mycommentId: {
      type: Number, value: 0, observer: "loadData"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadData: function(){
      var _this = this
    //   有待检测
    //   app.request({
    //     url: '/api/v1/mycomments有待检测',
    //     data: {
    //       mycomment_id: 
    //     },
    //     success: function(resp){
       
    //     }
    //   })
      mycommentApi.getAllCommentList(_this.data.mycommentId).then((resp)=>{
        var items = resp.data.data
        if(items.length == 0){
          return false
        }
        _this.setData({
          items: items
        })
      })
    },

  }
})

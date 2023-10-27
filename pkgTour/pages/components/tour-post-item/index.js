// pkgTour/pages/components/tour-post-item/index.js
const postApi = require("../../../../api/post")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    postId: {
      type: Number,
      default: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    post:{}
  },

  observers: {
    "postId": function (val) {
      if (!val) {
        return
      }
      var _this = this
      postApi.getPostBaseInfo(val).then((res) => {
        if (res.data.code != 0) {
          return
        }
        var post = res.data.data
        _this.setData({
          post: post,
        })
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
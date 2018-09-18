// components/recom-posts.js
//
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number, value: 5,
    },
    pid: {
      type: Number, value: null,
    },
  },


  ready: function(){
    this.loadRecoms()
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
  loadRecoms: function(){
    var _this = this
    app.request({
      hideLoading: true,
      url: '/api/v1/posts/',
      data: {pid: _this.data.pid || '', type:'recoms', limit: _this.data.count },
      success: function(resp){
        _this.setData({posts: resp.data.data})
      },
    })
  },

  }
})

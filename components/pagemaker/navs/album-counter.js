// components/pagemaker/navs/album-counter.js
const app = getApp() 

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    albumId: {type: Number, default: null},

  },

  observers: {
    "albumId": function(val){
      console.log(' album id is', val)
      if(!val){
        return
      }
      this.loadData(val)
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,

  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadData: function(albumId){
      var _this = this  
      app.request({
        url: '/api/v1/albums/' + albumId, 
        success: function(resp){
          if(resp.data.status != 0){
            return 
          }
          _this.setData({
            count: resp.data.data.post_count,
          })
        }
      })
    },

  }
})

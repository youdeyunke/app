// pkgAdmin/pages/admin/xiangce.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Isshow:0,
    media_cat_id:null,
    images:[],
    watcher:0
  },
  onLoad:function(q){
    this.setData({
      media_cat_id:q.media_cat_id
    })
    this.loadData()
  },
  Isshow:function(e){
    console.log(e);
    // this.setData({
    //   Isshow:e.detail.data
    // })
  },
  loadData:function(){
    var _this = this
    var media_cat_id = {media_cat_id:this.data.media_cat_id}
    app.request({
      url:'/api/v1/media_items',
      data:media_cat_id,
      success: function(res) {
        //console.log(res.data);
        _this.setData({
          images:res.data.data
        })
      }
    })
  },
})
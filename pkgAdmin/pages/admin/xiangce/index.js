// pkgAdmin/pages/admin/xiangce.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Isshow:0,
    media_cat_id:null,
    images:[]
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
        console.log(res.data);
        _this.setData({
          images:res.data.data
        })
      }
    })
  },
  imagesChanged: function (e) {
    //this.clearError()
    console.log('images change', e)
    var keys = Object.keys(e.detail)
    if (keys.includes('images')) {
        this.updatePostField('images', e.detail.images)
    }
    if (keys.includes('cover_index')) {
        this.updatePostField('cover_index', e.detail.cover_index)
    }
    if (keys.includes('video')) {
        this.updatePostField('video', e.detail.video)
    }
    if (keys.includes('overlook_image')) {
        console.log('set overlook image')
        this.updatePostField('overlook_image', e.detail.overlook_image)
    }

},
updatePostField: function (key, value) {
  var d = {}
  var key = 'post.' + key
  d[key] = value
  this.setData(d)
},
})
// pkgAdmin/pages/admin/xiangce.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Isshow:0,
    media_cat_id:null,
    postId:null,
    images:[],
    watcher:0,
    cats:[],
    columns: [],
    show:false
  },
  onLoad:function(q){
    this.setData({
      media_cat_id:q.media_cat_id,
      postId:q.post_id
    })
    //console.log(this.data.media_cat_id);
    this.loadData(this.data.media_cat_id)
    this.getXiangce()
  },
  Isshow:function(e){
    console.log(e);
    // this.setData({
    //   Isshow:e.detail.data
    // })
  },
  loadData:function(){
    var _this = this
    var id = this.data.media_cat_id
    app.request({
      url:'/api/v1/media_cats/'+id,
      success: function(res) {
        console.log(res.data);
        _this.setData({
          images:res.data.data.media_items
        })
        wx.setNavigationBarTitle({title: res.data.data.name,});
      }
    })
  },
  getXiangce(){
    var _this = this
    var post_id = this.data.postId
    app.request({
      url:'/api/v1/media_cats?post_id='+post_id,
      success:function(res){
        _this.setData({
          cats:res.data.data,
        })
      }
    })
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onConfirm(v){
    var cats = this.data.cats
    this.setData({
      media_cat_id:cats[v.detail.index].id
    })
    this.loadData()
    this.setData({ show: false });
  }
})
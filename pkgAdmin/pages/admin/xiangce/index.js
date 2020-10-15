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
    posts:[],
    columns: [],
    show:false
  },
  onLoad:function(q){
    this.setData({
      media_cat_id:q.media_cat_id,
      postId:q.post_id
    })
    this.loadData(this.data.media_cat_id)
    this.getXiangce()
  },
  Isshow:function(e){
    console.log(e);
    // this.setData({
    //   Isshow:e.detail.data
    // })
  },
  loadData:function(id){
    var _this = this
    app.request({
      url:'/api/v1/media_cats/'+id,
      success: function(res) {
        //console.log(res.data);
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
        //console.log(res.data.data);
        var columns = _this.data.columns
        res.data.data.forEach(v=>{
          columns.push(v.name)
        })
        _this.setData({
          posts:res.data.data,
          columns:columns
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
    //console.log(v.detail.index)
    var posts = this.data.posts
    //console.log(posts[v.detail.index].id);
    this.loadData(posts[v.detail.index].id)
    this.setData({ show: false });
  }
})
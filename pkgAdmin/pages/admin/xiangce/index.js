// pkgAdmin/pages/admin/xiangce.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mediaCatId:null,
    postId:null,
    images:[],
    cats:[],
    show:false,
    //控制相册修改的弹出层
    albumShow:false,
    //控制相册修改的为新建还是修改
    albumType:'',
    //相册数组下标
    albumIndex:0,
    albumVal:''
  },
  onLoad:function(q){
    this.setData({
      mediaCatId:q.media_cat_id,
      postId:q.post_id
    })
    this.loadData()
    this.getXiangce()
  },
  loadData:function(){
    var _this = this
    var id = this.data.mediaCatId
    app.request({
      url:'/api/v1/media_cats/'+id,
      success: function(res) {
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
      mediaCatId:cats[v.detail.index].id,
      albumIndex:v.detail.index
    })
    this.loadData()
    this.setData({ show: false });
  },
  createAlbum(){
    this.setData({
      albumShow:true,
      albumType:'create'
    })
  },
  updateAlbum(){
    this.setData({
      albumShow:true,
      albumType:'update',
      albumVal:this.data.cats[this.data.albumIndex].name
    })
  },
  changeAlbum(e){
    this.getXiangce()
    wx.setNavigationBarTitle({title: e.detail,});
  }
})
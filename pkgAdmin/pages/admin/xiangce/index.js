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
    //相册数组下标
    albumIndex:0,
    albumVal:{}
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
      albumVal:{post_id:this.data.postId}
    })
  },
  updateAlbum(){
    this.setData({
      albumShow:true,
      albumVal:this.data.cats[this.data.albumIndex]
      
    })
  },
  deleteAlbum(){
    var _this = this
    wx.showModal({
      title: '提示',
      content:'是否确认删除',
      success: (result) => {
        if(result.confirm){
          if(this.data.cats[this.data.albumIndex].is_system == true){
            wx.showToast({title: '系统默认相册无法删除',icon:'none'})
          }else if(this.data.cats.length<2){
            wx.showToast({title: '相册数量必须大于2',icon:'none'})
          }else{
            app.request({
              url:'/api/v1/media_cats/'+this.data.cats[this.data.albumIndex].id,
              method:'DELETE',
              success:function(){
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  success:function(){
                    _this.setData({
                      albumIndex:0,
                      mediaCatId:_this.data.cats[0].id
                    })
                    _this.getXiangce()
                    _this.loadData()
                  }
                })
              }
            })
          }
        }
      },
    });
  }
})
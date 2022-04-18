// pkgAdmin/pages/admin/xiangce.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mediaCatId: 0,
    postId:null,
    images:[],
    cats:[],
    show:false,
    //控制相册修改的弹出层
    albumShow:false,
    //相册数组下标
    albumIndex:0,
    albumVal:{},
  },
  onLoad:function(q){
    this.setData({
      postId:q.target_id
    })
    this.loadData()
  },
  loadData(){
    var _this = this
    var post_id = this.data.postId
    app.request({
      url:'/api/v1/media_cats?post_id='+post_id,
      success:function(res){
        if(res.data.data.length == 0){
          wx.showModal({
            title: '该楼盘已被删除', 
            showCancel: false
          })
          wx.navigateBack({
            delta: 1,
          })
        }
        _this.setData({
          cats:res.data.data,
          mediaCatId: res.data.data[0].id,
          images: res.data.data[0].media_items,
          title: res.data.data[0].name,
          albumIndex:0,
        })
      }
    })
  },

  onChange(event) {
    var cats = this.data.cats
    var i = event.detail.index
    this.setData({
      mediaCatId:cats[i].id,
      albumIndex:event.detail.index,
      images: cats[i].media_items,
      title: cats[i].name,
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
                    _this.loadData()
                  }
                })
              }
            })
          }
        }
      },
    });
  },
  onShareAppMessage(){
    return {
      title:this.data.title,
      path:'/pkgAdmin/pages/admin/xiangce/index/media_cat_id='+this.data.mediaCatId+'&post_id='+this.data.postId
    }
  },
  onShareTimeline(){
    return{
      title:this.data.title,
      path:'/pkgAdmin/pages/admin/xiangce/index/media_cat_id='+this.data.mediaCatId+'&post_id='+this.data.postId
    }
  }
})
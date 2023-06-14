// pkgDoc/pages/doc/index.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId:111,
    docItem:[],
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData()
  },
  loadData(){
    var _this= this
    app.request({  //已删除该功能
      url:'/api/v1/post_docs?post_id='+this.data.postId,
      success:function(res){
        _this.setData({
          docItem:res.data.data,
          title:res.data.post.title+'的楼盘资料'
        })
        wx.setNavigationBarTitle({title: _this.data.title,});
      }
    })
  },
  onShareAppMessage(){
    return {
      title:this.data.title,
      path:'pkgDoc/pages/doc/indexpost_id='+this.data.postId
  }
  },
  onShareTimeline(){
    return {
      title:this.data.title,
      path:'pkgDoc/pages/doc/indexpost_id='+this.data.postId
  }
  }
})
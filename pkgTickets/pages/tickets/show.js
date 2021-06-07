// pkgTickets/pages/tickets/show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticketId:'',
    post:[],
    ticket:{},
    postId:'',
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var ticketId = q.id
    var postId = q.post_id
    this.setData({
      ticketId:ticketId,
      postId:postId
    })
    this.loadData()
   
  },

  loadData(){
    // var _this = this
    // app.request({
    //   url:'/api/v1/post_tickets/'+_this.data.ticketId,
    //   success: function(res) {
    //     var allD = parseInt(res.data.post.meta_yaohao_d1) +  parseInt(res.data.post.meta_yaohao_d2)
    //     var allP = parseInt(res.data.post.meta_yaohao_d3) + parseInt(res.data.post.meta_yaohao_d4)
    //     res.data.post.meta_yaohao_allD = allD
    //     res.data.post.meta_yaohao_allP = allP
    //     var allGai = allD/allP*100
    //     res.data.post.meta_yaohao_allGai = allGai.toFixed(1)+'%'
    //     console.log(res.data.post)
    //     _this.setData({
    //       post:res.data.post,
    //       ticket:res.data.data
    //     })
    //   }
    // })
    var _this = this
    //获取个人信息接口
    app.request({
      url:'/api/v1/post_tickets/'+this.data.ticketId,
      success:function(res){
        var date = res.data.data.created_at
        date = date.split('T')[0]
        _this.setData({
          post:res.data.data,
          date:date
        })
      }
    })
    //获取楼盘信息接口
    app.request({
      url:'/api/v1/post_base_info/'+_this.data.postId,
      success:function(res){
        _this.setData({
          title:res.data.data.title
        })
        wx.setNavigationBarTitle({
          title: _this.data.post.name+'的摇号结果',
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title:this.data.post.name+'摇号结果'
    }
  },
  onShareTimeline:function(){
    return{
        title:this.data.post.name+'摇号结果'
    }
  },
})
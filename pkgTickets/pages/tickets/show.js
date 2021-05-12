// pkgTickets/pages/tickets/show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticketId:'',
    post:{},
    ticket:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    const{id} = q
    this.setData({
      ticketId:id
    })
    this.loadData()
  },

  loadData(){
    var _this = this
    app.request({
      url:'/api/v1/post_tickets/'+_this.data.ticketId,
      success: function(res) {
        var allD = parseInt(res.data.post.meta_yaohao_d1) +  parseInt(res.data.post.meta_yaohao_d2)
        var allP = parseInt(res.data.post.meta_yaohao_d3) + parseInt(res.data.post.meta_yaohao_d4)
        res.data.post.meta_yaohao_allD = allD
        res.data.post.meta_yaohao_allP = allP
        var allGai = allD/allP*100
        res.data.post.meta_yaohao_allGai = allGai.toFixed(1)+'%'
        console.log(res.data.post)
        _this.setData({
          post:res.data.post,
          ticket:res.data.data
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

  }
})
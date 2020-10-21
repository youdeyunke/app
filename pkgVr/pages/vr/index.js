// pkgVr/pages/vr/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId:111,
    vrItem:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lodaData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.lodaData()
  },
  lodaData(){
    var _this = this
    app.request({
      url:'/api/v1/post_vrs?post_id='+_this.data.postId,
      success: function(res) {
        _this.setData({
          vrItem:res.data.data
        })
      }
    })
  }
})
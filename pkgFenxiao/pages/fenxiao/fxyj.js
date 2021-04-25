// pkgFenxiao/pages/fenxiao/fxyj.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId:'',
    title:'',
    time:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('我是options'+options.pid)
    this.setData({
      pid:options.pid
    })
    this.loadPost()
  },
  loadPost:function(){
    var _this=this
    app.request({
      url:'/api/v1/brokage_info/'+this.data.pid,
      success:function(res){
        console.log(res)
        _this.setData({ 
          value: res.data.data,
          title:res.data.data.title,
          postId:res.data.data.postId,
          content:res.data.data.content,
          time:res.data.data.cashin
        })
        console.log(_this.data.value)
      }
    })
  },
  click(){
    console.log(this.data.value.title)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
// pkgAbout/pages/about/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    path: '../../image/6.png'
  },
  callHandle() {
    wx.makePhoneCall({
      phoneNumber: '17602193376',
    })
  },
  showWechat() {
    this.setData({
      show: true
    })
  },
  closeHandle() {
    this.setData({
      show: false
    })
  },
  savaHandle() {
    var path = this.data.path
    wx.showActionSheet({
      itemList: ['保存二维码', '取消'],
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.getImageInfo({
            src: path,
            success:function(res){
              var newpath  = res.path
              wx.showLoading({
                title: '保存中',
                mask:true
              })
              wx.saveImageToPhotosAlbum({
                filePath:newpath,
                success:function(data){
                  console.log("data",data)
                }
              })
              wx.hideLoading()
            }
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
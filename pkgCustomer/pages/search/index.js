// pkgCustomer/pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    type: 'myThread'
  },

  onChange(e){
    this.setData({
      type: e.detail,
    });
  },

  onClick(e){
    const { name } = e.currentTarget.dataset;
    this.setData({
      type: name,
    });
  },

  gotoList(){
    var kw = this.data.kw
    if (!kw) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }
    var url = ''
    if (this.data.type == 'myThread') {
      url = '/pkgCustomer/pages/threadList/index?type=private&kw=' + kw
    }
    if (this.data.type == 'publicThread') {
      url = '/pkgCustomer/pages/threadList/index?type=public&kw=' + kw
    }
    if (this.data.type == 'myCustomer') {
      url = '/pkgCustomer/pages/customerList/index?type=private&kw=' + kw
    }
    if (this.data.type == 'publicCustomer') {
      url = '/pkgCustomer/pages/customerList/index?type=public&kw=' + kw
    }

    wx.navigateTo({
      url: url,
    })
  },

  kwChange(e){
    this.setData({
      kw: e.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
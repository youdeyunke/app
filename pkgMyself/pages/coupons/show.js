// pkgMyself/pages/coupons/show.js
const app = getApp() 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showForm: false, 
    password: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(q) {
    this.setData({
      cid: q.id,
    }, () => {
      this.loadData()
    })
    app.globalData.reloadCoupons = true

  },

  qrPreview: function(){
    var url = this.data.coupon.qr  
    wx.previewImage({
      urls: [url],
      current: url,
    })
  },

  callHandle: function(){
    wx.makePhoneCall({
      phoneNumber: this.data.coupon.shop_phone,
    })
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
    this.setData({ 
      showForm:false, 
      loading: false, 
    })
    setTimeout(() => {
      if(!this.data.coupon){
        this.loadData()
      }
    }, 1500)

 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  loadData: function(){
    var _this = this  
    app.request({  
      hideLoading: true, 
      url: '/api/v1/coupons/' + this.data.cid, 
      success: function(resp){ 
        if(resp.data.status != 0){
          return 
        }
        var c = resp.data.data  
        _this.setData({  
          coupon: c
        })
        wx.setNavigationBarTitle({
          title:  c.name,
        })
        if(c.used == false ){        
          setTimeout(() => { 
            _this.loadData()
          }, 2000)
        }
      }
    })
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
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

  callHandle: function(){
    wx.makePhoneCall({
      phoneNumber: this.data.coupon.shop_phone,
    })
  },

  useHandle: function() {
    if(this.data.coupon.cat != 'coupon'){
      return 
    }
    this.setData({ 
      showForm: true, 
    })
  },

  formClose: function(){
    this.setData({ 
      showForm: false,
      loading: false, 
      password: '',
    })
  },

  submitHandle: function(){
    // 提交密码核销
    var _this = this  
    if(this.data.password.length != 4){
      wx.showToast({
        icon: 'none',
        title: '请输入4位核销口令',
      })
      return false 
    }
    var data = {
      password: this.data.password, 
    }
    app.request({ 
      url: '/api/v1/coupons/' + this.data.cid, 
      method: 'PUT', 
      data: data, 
      success: function(resp){
        _this.formClose()

        if(resp.data.status != 0){
          return 
        }
        // success 
        wx.showToast({
          title: '已核销',
        })
        setTimeout(() => { 
          _this.loadData()
        }, 1500)
       }
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
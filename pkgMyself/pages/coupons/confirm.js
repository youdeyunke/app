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
      var cid = q.cid || q.id
      this.setData({ 
        cid: cid, 
      }, () => {
        this.loadData(cid)
      })
  },


  submitHandle: function(cid){
    // 扫码核销
    var data = { }
    app.request({ 
      url: '/api/v1/coupons/' + this.data.cid, 
      method: 'PUT', 
      data: data, 
      success: function(resp){
        _this.formClose()
        if(resp.data.status != 0){
          return 
        }
        wx.showToast({ title: '已核销', })
        _this.setData({ 
          message: '已核销!',
        })
        setTimeout(() => { 
            wx.navigateBack({dleta:1})
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
    setTimeout(() => {
      if(!this.data.coupon){
        this.loadData(this.data.cid)
      }
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  saomaHandle: function(){

  },

  goHome: function(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  loadData: function(cid){
    var _this = this  
    this.setData({ 
      message: '', 
      error: '', 
      
    })
    app.request({  
      url: '/api/v1/coupons/' + cid, 
      success: function(resp){ 
        if(resp.data.status != 0){
          return 
        }
        var coupon = resp.data.data  
        _this.setData({  coupon: coupon })
        wx.setNavigationBarTitle({ title:  "正在核销：" + coupon.name, })
        // 检查当前用户是否可以核销
        var mobile = app.globalData.userInfo.mobile
        if(mobile.toString() != coupon.confirm_mobile.toString()){
            var error = '当前账号' + mobile + '无核销权限'
            wx.showToast({ icon: 'none', title: error, })
            _this.setData({error: error})
            setTimeout(() => { 
                wx.navigateBack({dleta:1})
            }, 1500)
            return
        }
        // 进入核销流程
        this.submitHandle(coupon.id)
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

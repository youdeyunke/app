// pkgCustomer/pages/edit.js
const app = getApp() 

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  loadData: function(){
    // 加载数据表结构
    var _this = this  
    app.request({
      url: '/api/v1/user_profiles/'  + this.data.upId,
      success: function(resp){ 
        if(resp.data.status != 0){
          return 
        }
        _this.setData({  
          customer: resp.data.data.customer,  
          eavAttributes: resp.data.data.eav_attributes,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(q) {
    this.setData({ 
       upId: q.id, 
    }, () => { 
      this.loadData()
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
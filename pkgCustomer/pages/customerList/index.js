/**
 * +----------------------------------------------------------------------
 * | 友得云客  - 开启房产营销新纪元
 * +----------------------------------------------------------------------
 * | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
 * +----------------------------------------------------------------------
 * | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
 * +----------------------------------------------------------------------
 * | Author: UDEVE Team <tech@udeve.cn>
 * +----------------------------------------------------------------------
 */
// pkgCustomer/pages/customerList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    type: 'private',
  },

  kwSearch(e){
    this.setData({
      kw: e.detail
    })
  },

  kwClear(){
    this.setData({
      kw: ''
    })
  },

  linquCustomer(){
    wx.showModal({
      title: '是否领取该客户',
      content: '',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    var _this = this
    console.log(e);
    this.setData(
      e
    ,() => {
      if(_this.data.type == "private"){
        wx.setNavigationBarTitle({
          title: '我的客户',
        })
      }
      if(_this.data.type == "public"){
        wx.setNavigationBarTitle({
          title: '公海客户',
        })
      }
      if(_this.data.type == "recycle"){
        wx.setNavigationBarTitle({
          title: '将回收客户',
        })
      }
      if(_this.data.type == "follow-up"){
        wx.setNavigationBarTitle({
          title: '待跟进客户',
        })
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
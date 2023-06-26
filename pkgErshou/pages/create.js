// pkgErshou/pages/create.js
const houseApi = require("../../api/house");

Page({

  /**
   * 页面的初始数据
   */
  data: {

    type_name: "几室几厅",
    business: "出售",
    sub_district_name: "点击搜索小区",
    district_name: "点击选择区域",
    content: "房源详细情况介绍：",
    position: "朝南",
    fitment:"精装",
    images:"",
    type_image: "",


    // 以下是隐藏字段
    address: "",
    district_id: null,
    latitude: null,
    longitude: null,
    city_id: null,

  },
  chooseFitment: function (e) {
    // 跳转到选择枚举值的页面  
    // 在选择页面点击后，修改此页面的 fitment字段
    wx.navigateTo({
      url: '/pages/enums/index?cat=house_fitment',
    })
  },


  chooseFitment: function (e) {
    // 跳转到选择枚举值的页面  
    // 在选择页面点击后，修改此页面的 position字段
    wx.navigateTo({
      url: '/pages/enums/index?cat=house_position',
    })
  },

  chooseLocation: function (e) {
    console.log('e', e);
    var _this = this
    wx.chooseLocation({
      success: function (poi) {
        _this.updatePoi(poi, false)
      }
    })
  },
  chooseDistrict: function (e) {
    // TODO 
    // 在二级页面点击后，修改此页面的district_id、city_id、district_name 3个字段
    wx.navigateTo({
      url: '/pages/districts/select',
    })
  },


  updatePoi: function (poi) {
    console.log('街道地址更新', poi)
    this.updatePostField('address', poi.name)
    this.updatePostField('sub_district_name', poi.name)
    this.updatePostField('latitude', poi.latitude)
    this.updatePostField('longitude', poi.longitude)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.business) {
      this.setData({
        business: options
      })
    }

  },


  // 提交表单
  submitHandle: function () {
    var data = this.data;
    houseApi.createHouse(data).then((res) => {
      // todo 
      console.log(res);
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
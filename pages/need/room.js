// pages/need/index.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    needs: [],
    page: 1,
    per_page: 10
  },

  loadData: function(){
    var _this = this

    this.setData({
      isEmpty: false, loading: true
    })
    
    if (this.data.isEnd) {
      return false
    }  

    var query = {
      page: _this.data.page || 1,
      per_page: _this.data.per_page || 10,
      group: _this.data.group,
      rent_type: _this.data.rent_type, 
      order: _this.data.order,
    }
    var filter = this.data.filter
    // merge query and filter
    Object.assign(query, filter)

    var _this = this
    app.request({
      url: '/api/v1/needs',
      data: query,
      hideLoading: true,
      success: function(resp){
        var items = resp.data.data
        var meta = resp.data.meta
        var d = {}
        var i = _this.data.page - 1
        if(i == 0){
          d = {needs: [items]}
        }else{
          var k = "needs[" + i + "]"
          d[k] = items
        }
        console.log('d', d)
        _this.setData(d)
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
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
    var _this = this
    auth.ensureUser(function(user){
      _this.setData({userInfo: user})
    })
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
    var _this = this
    this.setData({
      page: _this.data.page + 1
    })
    this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

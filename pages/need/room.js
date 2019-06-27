// pages/need/index.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    needs: [],
    activeTabIndex: 0,
    hideBtn: false,
    cats: [
      { label: '求购客源', value: 'buy'  },
      { label: '求租客源', value: 'rent' },
      { label: '我的客源', value: 'myself'},
    ],    
    page: 1,
    per_page: 10
  },

  catChange: function (e) {
    var _this = this
    var i = e.detail.index
    var cat = this.data.cats[i]
    this.updateCat(cat.value)
  },  

  updateCat: function(cat){
    var _this = this
    this.setData({cat: cat, needs: [], page: 1})
    for (var i = 0; i <= this.data.cats.length - 1; i++) {
      if (_this.data.cat == _this.data.cats[i]['value']) {
        _this.setData({ activeTabIndex: i })
        wx.setNavigationBarTitle({
          title: _this.data.cats[i]['label'],
        })
      }
    }     
    this.loadData()  
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
      cat: _this.data.cat,
      broker_id: _this.data.broker_id || '',
      order: 'id desc',
    }

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
  onLoad: function (q) {
    this.updateCat(q.cat  || 'buy')
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
    this.setData({
      page:1,
      needs: []
    })
    this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this
    this.setData({page: _this.data.page + 1})
    this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

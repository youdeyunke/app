// pages/qa/index.js
const app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasMore: true,
    catId: 0,
    cats: [
      {name: '全部', id: 'all'}, 
      {name: '已回复', id: 'replied'}, 
      {name: '未回复', id: 'unreplied'}],
    items: [],
    questionContent: wx.getStorageSync('question_content') || ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.setData({
      postId: q.post_id || '',
      catId: q.cat_id || 'all',
    })
    this.loadItems()
  },

  itemHandle: function(e){
    var qid = e.currentTarget.dataset['qid']
    wx.navigateTo({ url: '/pages/qa/qa?id=' + qid })
  },


  catHandle: function(e){
    console.log('cid:', e.target.dataset['cid'])
    this.setData({
      catId: e.target.dataset['cid'],
      items: [],
    })
    this.loadItems()
  },

  loadItems: function(cb){
    var pageSize = 10
    var _this = this
    app.request({
      url: '/api/v1/questions/',
      data: {
        cat: _this.data.catId, 
        post_id: _this.data.postId,
        offset: _this.data.items.length,
        limit: pageSize,
      },
      success: function(res){
        var d = {hasMore: true}
        if(res.data.data.length < pageSize){
          d['hasMore'] = false
        }

        res.data.data.forEach(function(item, i){
          var index = _this.data.items.length + i
          var k = "items[" + index + "]"
          item['created_at_pretty'] = util.prettyTime(item['created_at'])
          item['updated_at_pretty'] = util.prettyTime(item['updated_at'])
          d[k] = item
          wx.setStorageSync('question.' + item.id, item)
        }) 
       
        _this.setData(d)
        


        if(typeof cb == 'function'){
          return cb()
        }
        
      }
    })
  },

  gotoNew: function(e){
    console.log('submit', e)
    app.uploadFormId(e)
    wx.navigateTo({
      url: '/pages/qa/new'
    })
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
    // 下拉加载更多
    wx.showNavigationBarLoading()
    var _this = this
    _this.setData({items: []})
    _this.loadItems(function(){
      wx.hideLoading()
      wx.hideNavigationBarLoading()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('load more')
    var _this = this
    _this.loadItems()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

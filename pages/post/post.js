// pages/post/index.js
const app = getApp()
var WxParse = require('../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始 数据
   */
  data: {
    post: null,
    posts: null,
    htmlContent: null,
    minicontent: true,
  },

  
  contentHandle: function(e){
    this.setData({
      minicontent: ! this.data.minicontent 
    })
  },

  openWebview: function(e){
    var url = this.data.post.more_url
    if(!url){
      return
    }
    var _this = this
    wx.setStorageSync('webview', this.data.post.more_url)
    wx.navigateTo({
      url: '/pages/webview/webview?title='+ _this.data.post.title,
    })
  },

  readMore: function(){
    this.setData({ readmore: true })
  },

  readLess: function () {
    this.setData({ readmore: false })
  },  

  loadQas: function(postId){
    var _this = this
    console.log('load qas')
    app.request({
      url: '/api/v1/questions/',
      hideLoading: true,
      data: {post_id: postId, limit: 5},
      success: function(resp){
        _this.setData({
          qas: resp.data.data
        })
      }
    })
  },

  loadComments: function(postId){
    var _this = this
    app.request({
      hideLoading: true,
      url: '/api/v1/mycomments',
      data: { target_id: postId, target_type: 'post', limit: 5 },
      success: function (resp) {
        _this.setData({ comments: resp.data.data })
      },
    })    
  },

  loadRecoms: function(postId){
    var _this = this
    app.request({
      hideLoading: true,
      url: '/api/v1/posts/',
      data: {pid: postId, type:'recoms'},
      success: function(resp){
        _this.setData({posts: resp.data.data})
      },
    })
  },

  viewImage: function(e){
    var urls = this.data.post.full_images_list
    wx.previewImage({
      urls: urls,
    })
  },

  callMe: function(){
    var m = app.globalData.serverMobile
    wx.makePhoneCall({
        phoneNumber: m //仅为示例，并非真实的电话号码
    })
  },


  parseHtml: function(){
    var _this = this
    var key1 = "htlm_content." + _this.data.postId
    var html1 = wx.getStorageSync(key1)
    if(html1 ){
      //_this.setData({htmlContent: html1})
      //return
    }
    WxParse.wxParse('htmlContent', 'html', _this.data.post.content ,  _this, 5);
    wx.setStorageSync(key1, _this.data.htmlContent)
  },

  loadPost: function(postId){
    var _this = this

    app.request({
      hideLoading: true,
      url: '/api/v1/posts/' + postId,
      success: function(resp){
        _this.setData({post: resp.data.data})
        wx.setStorage({key: 'post.data.' + postId, data: resp.data.data})
        _this.parseHtml()
        wx.setStorageSync('last_view_post', resp.data.data)
        wx.setNavigationBarTitle({
          title: resp.data.data['title']
        })        

      },

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id
    var post = wx.getStorageSync('post.data.' + postId)
    this.setData({ postId: postId, post: post})
    this.loadPost(postId)
    this.loadRecoms(postId)
    this.loadComments(postId)
    this.loadQas(postId)    
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
    var eb = wx.getStorageSync('eventBus')
    if(!eb){
      return
    }

  
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

  },

  couponHandle: function(){
    var pid = this.data.postId
    var _this = this
    if(_this.data.post.user_has_coupon){
      return false
    }
    app.request({
      url: '/api/v1/users/mark_coupon',
      method: 'POST',
      data: { post_id: pid },
      success: function (resp) {
        console.log('resp', resp)   
        wx.showToast({
          title: '领取优惠券成功',
          icon: 'success',
        })
        _this.loadPost(pid)
      }
    })    
  },

  bookingHandle: function () {
    var pid = this.data.postId
    var _this = this
    if (_this.data.post.user_has_booking) {
      return false
    }
    app.request({
      url: '/api/v1/users/mark_book',
      method: 'POST',
      data: { post_id: pid },
      success: function (resp) {
        console.log('resp', resp)
        wx.showModal({
          title: '预约成功！',
          content: '经济人稍后会来电与您确认具体看房时间，请留意',
        })
        _this.loadPost(pid)
      }
    })
  },  
  
  onShareAppMessage: function () {
    var _this = this
    return {
      title: _this.data.post['title'],
      desc: '好房评测',
      path: 'pages/post/post?id=' + _this.data.post['id'],
      imageUrl: _this.data.post['cover'] ? _this.data.post['cover']['url'] : null
    }
  },

})

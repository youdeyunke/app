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

  commentlikeHandle: function(e){

    var i = e.currentTarget.dataset.index
    var cid = this.data.comments[i].id
    var key = 'liked_comment.' + cid
    if(wx.getStorageSync(key)){
      console.log('重复点击', key)
      return false
    }
    this.data.comments[i].like_nums +=1 
    this.setData({comments: this.data.comments})

    app.request({
      url: '/api/v1/mycomments/like',
      method: 'POST',
      data: {id: cid},
      success: function(resp){
        console.log('resp')
        wx.setStorage({
          key: key,
          data: true,
        })        
      }
    })
  },

  loadQas: function(postId){
    var _this = this
    console.log('load qas')
    app.request({
      url: '/api/v1/questions/',
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
      url: '/api/v1/posts/',
      data: {pid: postId, type:'recoms'},
      success: function(resp){
        _this.setData({posts: resp.data.data})
      },
    })
  },

  imageView: function(e){
    var t = e.currentTarget.dataset.target
    var url = ''
    if(t == 'a'){
      url = this.data.post.housetype_poster_a.url
    }else{
      url = this.data.post.housetype_poster_b.url
    }

    wx.previewImage({
      urls: [url],
    })


  },

  callMe: function(){
    var m = app.globalData.serverMobile
    wx.makePhoneCall({
        phoneNumber: m //仅为示例，并非真实的电话号码
    })
  },

  booking: function(){
    wx.navigateTo({
      url: '/pages/post/booking?post_id=' + this.data.postId
    })
  },

  parseHtml: function(){
    var _this = this
    var key1 = "htlm_content." + _this.data.postId
    var key2 = "htlm_content_simple." + _this.data.postId
    var html1 = wx.getStorageSync(key1)
    var html2 = wx.getStorageSync(key2)
    if(html1 && html2 ){
      _this.setData({htmlContent: html1, htmlContentSimple: html2})
      return
    }
    WxParse.wxParse('htmlContent', 'html', _this.data.post.content ,  _this, 5);
    WxParse.wxParse('htmlContentSimple', 'html', _this.data.post.content_simple, _this, 5);
    wx.setStorageSync(key1, _this.data.htmlContent)
    wx.setStorageSync(key2, _this.data.htmlContentSimple)
  },

  loadPost: function(postId){
    var _this = this

    app.request({
      url: '/api/v1/posts/' + postId,
      success: function(resp){
        _this.setData({post: resp.data.data})
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
    this.setData({ postId: postId})
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
        wx.showToast({
          title: '预约成功，客服稍后会与您联系',
          icon: 'success',
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

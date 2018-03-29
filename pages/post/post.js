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
    readmore: false,
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

  loadComments: function(postId){
    var _this = this
    app.request({
      url: '/api/v1/mycomments',
      data: { target_id: postId, target_type: 'post' },
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

  callMe: function(){
    var m = app.globalData.serverMobile
    wx.makePhoneCall({
        phoneNumber: m //仅为示例，并非真实的电话号码
    })
  },

  loadPost: function(postId){
    var _this = this

    app.request({
      url: '/api/v1/posts/' + postId,
      success: function(resp){
        _this.setData({post: resp.data.data})
        wx.setStorageSync('last_view_post', resp.data.data)
        WxParse.wxParse('htmlContent', 'html', resp.data.data.content ,  _this, 5);
        WxParse.wxParse('htmlContentSimple', 'html', resp.data.data.content_simple, _this, 5);

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
    this.loadPost(postId)
    this.loadRecoms(postId)
    this.loadComments(postId)
    
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
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

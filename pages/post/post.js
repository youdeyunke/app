// pages/post/index.js
const app = getApp()
var WxParse = require('../../utils/wxParse/wxParse.js');
var auth = require('../../utils/auth.js');
import Poster from '../../wxa-plugin-canvas/poster/poster';

Page({

  /**
   * 页面的初始 数据
   */
  data: {
    post: null,
    debug: false,
    posts: null,
    htmlContent: null,
    minicontent: true,
    posterConfig: {},
    showShareBox: false,
    currentTab: 'detail',
  },

  
  contentHandle: function(e){
    this.setData({
      minicontent: ! this.data.minicontent 
    })
  },

  gotoVr: function(){
    var vr = this.data.post.proxy_vr_url
    if(!vr){
      return false
    }
    wx.setStorageSync('webview', vr)
    wx.navigateTo({
      url: '/pages/webview/webview',
    })
  },

  tabHandle: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.tab
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
      data: { target_id: postId, target_type: 'post', limit: 1 },
      success: function (resp) {
        _this.setData({ comments: resp.data.data })
      },
    })    
  },

 viewTypeImage: function(e){
   console.log('e', e)
   var i = e.currentTarget.dataset.index
   var url = this.data.post.types[i].image.url
   wx.previewImage({urls: [url] })
 },


  viewImage: function(e){
    var urls = this.data.post.full_images_list
    wx.previewImage({
      urls: urls,
    })
  },

  callMe: function(){
    var m = this.data.post.staff_user.mobile
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

    if(_this.data.post.group != 'new'){
      return false
    }

    WxParse.wxParse('htmlContent', 'html', _this.data.post.content ,  _this, 5);
    wx.setStorageSync(key1, _this.data.htmlContent)
  },

  loadPost: function(postId){
    var _this = this

    app.request({
      hideLoading: true,
      url: '/api/v2/posts/' + postId,
      success: function(resp){
        _this.setData({post: resp.data.data})
        _this.loadComments(postId)
        _this.genPosterConfig()
        wx.setStorage({key: 'post.data.' + postId, data: resp.data.data})
        _this.parseHtml()
        wx.setStorageSync('last_view_post', resp.data.data)
        wx.setNavigationBarTitle({
          title: resp.data.data['title']
        })        

      },

    })

  },

  onPosterSuccess(e) {
    const { detail } = e;
    this.setData({
      showPoster: true,
      showShareBox: false,
      posterUrl: detail,
    })
  },

  closePoster: function(e){
    this.setData({
      showPoster: false,
    })
  },

  showShareBoxHandle: function(e){
    this.setData({
      showShareBox: true,
    })
  },

  closeShareBox: function(e){
    this.setData({
      showShareBox: false
    })
  },

  onCreatePoster: function(){
    Poster.create()
  },

  onSavePoster: function(e){
    var _this = this
    var path = this.data.posterUrl
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success(res) { 
        _this.setData({
          showPoster: false,
        })
        wx.showToast({
          icon: 'none',
          title: '已保存，请前往手机相册查看',
        })
      }
    })    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id
    var post = wx.getStorageSync('post.data.' + postId)
    this.loadQas(postId)    
    this.setData({ postId: postId, post: post})
    this.loadPost(postId)
  },

  genPosterConfig: function(){
    var post = this.data.post
  
    var config = {
      debug: false,
        backgroundColor: '#fff',
          width: 750,
            height: 1200,
              images: [
                {
                  width: 750,
                  height: 480,
                  x: 0,
                  y: 0,
                  borderRadius: 0,
                  url: post.cover,
                },

                {
                  width: 260,
                  height: 260,
                  x: 245,
                  y: 925,
                  borderRadius: 0,
                  url: post.qr,
                },

              ],
                texts: [
                  {
                    x: 30,
                    y: 554,
                    baseLine: 'middle',
                    text: post.title,
                    fontSize: 38,
                    color: '#000',
                  },  
                  {
                    x: 30,
                    y: 627,
                    baseLine: 'middle',
                    text:post.address + ' ' +  post.tags_list.join(' '),
                    fontSize: 24,
                    color: '#000',
                  },                    

                  {
                    x: 80 - 10*post.price_info.text.length*0.5,
                    y: 735,
                    baseLine: 'middle',
                    text: post.price_info.text,
                    fontSize: 38,
                    color: '#ff911b',
                  },                  
                  {
                    x: 106,
                    y: 788,
                    baseLine: 'middle',
                    text: post.price_info.label,
                    fontSize: 24,
                    color: '#8d8d8d',
                  },

                  {
                    x: 325 - 12 * post.type_info.text.length * 0.5,
                    y: 735,
                    baseLine: 'middle',
                    text: post.type_info.text,
                    fontSize: 38,
                    color: '#ff911b',
                  },
                  {
                    x: 345,
                    y: 788,
                    baseLine: 'middle',
                    text: '户型',
                    fontSize: 24,
                    color: '#8d8d8d',
                  },   


                  {
                    x: 560 - 11 * post.area_info.text.length * 0.5,
                    y: 735,
                    baseLine: 'middle',
                    text: post.area_info.text,
                    fontSize: 38,
                    color: '#ff911b',
                  },
                  {
                    x: 580,
                    y: 788,
                    baseLine: 'middle',
                    text:post.area_info.label,
                    fontSize: 24,
                    color: '#8d8d8d',
                  },    

                  {
                    x: 290,
                    y: 880,
                    baseLine: 'middle',
                    text: "长按识别二维码",
                    fontSize: 24,
                    color: '#cecece',
                  },                                        
                ],

      lines: [
        {
          startY: 683,
          startX: 30,
          endX: 720,
          endY: 683,
          width: 2,
          color: '#cecece',
        },
        {
          startY: 826,
          startX: 30,
          endX: 720,
          endY: 826,
          width: 2,
          color: '#cecece',
        },        
        {
          startY: 705,
          startX: 260,
          endX: 260,
          endY: 805,
          width: 2,
          color: '#cecece',
        },  
        {
          startY: 705,
          startX: 491,
          endX: 491,
          endY: 805,
          width: 2,
          color: '#cecece',
        },                
      ]                
    }
    this.setData({posterConfig: config})
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
    var _this = this
    auth.ensureMobile(function(userInfo){
      _this._couponHandle()
    })
  },

  _couponHandle: function(){
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


  
  onShareAppMessage: function () {
    var _this = this
    return {
      title: _this.data.post['title'],
      desc: _this.data.post['desc'],
      path: 'pages/post/post?id=' + _this.data.post['id'],
      imageUrl: _this.data.post['cover']
    }
  },

})

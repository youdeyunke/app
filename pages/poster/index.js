// pages/poster/index.js
const app = getApp()
import Poster from '../..//utils/wxa-plugin-canvas/poster/poster';
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posterConfig: {},
    posterUrl: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
     // 先加载post数据，再自动生成海报
    wx.setNavigationBarTitle({ title: '制作房源海报' })        
    var _this = this
    var post = _this.loadPost(q.id, function(post){
          _this.setData({post: post})
      })

  },

  loadPost: function(postId, cb){
    app.request({
      hideLoading: true,
      url: '/api/v2/posts/' + postId,
      success: function(resp){
        var post = resp.data.data
        typeof cb == 'function' &&  cb(post)
      }
    })
  },

  onPosterFail: function(e){
      console.log('生成海报失败', e)
  },

  onPosterSuccess: function(e) {
    const { detail } = e;
    this.setData({
      posterUrl: detail,
    })
  },

  onSavePoster: function(e){
    var _this = this
    var path = this.data.posterUrl
    var _this = this
    app.saveImage(path, function(res){
      _this.setData({showPoster: false})
    })
  },

  editHandle: function(e){
      var path = 'pages/post/post?contact=' + this.data.post.id + '_张三_15100000000_' + this.data.user.id
      app.genQr(path, function(data){
          console.log('gen qr resp data', data)
      })
      wx.showToast({
          title: '功能正在调试中，即将发布，敬请期待',
          icon: 'none',
      })
  },

  showTips: function(){
    wx.showModal({
      title: '房源海报有什么用途?',
      content: '1，可按A4格式打印后张贴，客户扫码看房 2，可发布到朋友圈，好友长按识别即可打开房源页面',
      confirmText: '知道了',
      success (res) {
      }
    })

  },

  onCreatePoster: function(){
    // 根据配置生成海报图片
    Poster.create()
  },


  genPosterConfig: function(){
    var post = this.data.post

    var config = {
              hideLoading: true,
              debug: false,
              backgroundColor: '#FFA61C',
              width: 1240,
              pixelRatio: 2,
              preload: false,
              height: 1754,
              blocks: [
                {
                  desc: '内容区域背景',
                  width: 991,
                  height:747,
                  zIndex: 10,
                  x: 125,
                  y: 646,
                  backgroundColor:'#FCE4BE',
                },                

                {
                  desc: '底部二维码区域背景',
                  width: 1240,
                  height: 303,
                  zIndex: 10,
                  x: 0,
                  y: 1451,
                  backgroundColor:'#ffffff',
                },                


              ],
              images: [
                {
                  width: 991,
                  height: 590,
                  x: 125,
                  y: 56,
                  borderRadius: 0,
                  url: post.cover,
                  zIndex: 10,
                },

                {
                  width: 245,
                  height: 245,
                  x: 125,
                  y: 1480,
                  borderRadius: 0,
                  zIndex: 100,
                  url: post.qr,
                },

              ],
                texts: [
                  {
                    x: 248,
                    y: 718,
                    baseLine: 'top',
                    text: "物业：" + post.sub_district_name,
                    fontSize: 60,
                    color: '#000000',
                    zIndex: 100,
                  },  
                  {
                    x: 248,
                    y: 848,
                    baseLine: 'top',
                    text:"户型：" + post.type_info.text + post.type_info.px,
                    fontSize: 60,
                    color: '#000000',
                    zIndex: 100,
                  },                    
                  {
                    x: 248,
                    y: 978,
                    baseLine: 'top',
                    text:"面积：" + post.area_info.text + post.area_info.px,
                    fontSize: 60,
                    color: '#000000',
                    zIndex: 100,
                  },                    
                  {
                    x: 248,
                    y: 1108,
                    baseLine: 'top',
                    text: post.price_info.label + "：" + post.price_info.text + post.price_info.px,
                    fontSize: 60,
                    color: '#000000',
                    zIndex: 100,
                  },                    
                  {
                    x: 248,
                    y: 1238 ,
                    baseLine: 'top',
                    text: "电话: "  + post.broker_info.mobile + '(' + post.broker_info.name  + ')',
                    fontSize: 60,
                    color: '#000000',
                    zIndex: 100,
                  },                    

                  {
                    x: 454,
                    y: 1563,
                    baseLine: 'top',
                    text: "微信扫码，在线看房",
                    fontSize: 80,
                    color: '#666666',
                    zIndex: 100,
                  },                    
           
                ],

    }

    var _this = this
    this.setData({posterConfig: config},  () => {
        Poster.create()
    })
    console.log('poster config', config)
  },

  previewPoster: function(){
      wx.previewImage({urls: [this.data.posterUrl] })
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
    auth.ensureUser( function(user){
      _this.setData({user: user})
      _this.genPosterConfig()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

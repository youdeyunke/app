// pages/poster/index.js
const app = getApp()
import Poster from '../../wxa-plugin-canvas/poster/poster';

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
    var _this = this
    var post = this.loadPost(q.id, function(post){
          _this.setData({post: post})
          _this.genPosterConfig()
          _this.onCreatePoster()
    })
    wx.setNavigationBarTitle({ title: '制作房源海报' })        
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
      debug: false,
              backgroundColor: '#FF7900',
              width: 592,
              height: 842,
              blocks: [
                {
                  width: 190,
                  height: 190,
                  x: 348,
                  y: 313,
                  zIndex: 99,

                  backgroundColor:'#ffffff',
                  borderColor:'#f4f4f4',
                  borderWidth:4,
                  borderRadius: 190,
                },                

                {
                  width: 519,
                  height: 380,
                  zIndex: 10,
                  x: 38,
                  y: 408,
                  backgroundColor:'#ffffff',
                },                
              ],
              images: [
                {
                  width: 519,
                  height: 349,
                  x: 38,
                  y: 59,
                  borderRadius: 0,
                  url: post.cover,
                  zIndex: 10,
                },

                {
                  width: 160,
                  height: 160,
                  x: 363,
                  y: 328,
                  borderRadius: 0,
                  zIndex: 100,
                  url: post.qr,
                },

              ],
                texts: [
                  {
                    x: 95,
                    y: 471,
                    baseLine: 'middle',
                    text: "物业：" + post.sub_district_name,
                    fontSize: 24,
                    color: '#000',
                    zIndex: 100,
                  },  
                  {
                    x: 95,
                    y: 527,
                    baseLine: 'middle',
                    text:"户型：" + post.type_info.text + post.type_info.px,
                    fontSize: 24,
                    color: '#000',
                    zIndex: 100,
                  },                    
                  {
                    x: 95,
                    y: 583,
                    baseLine: 'middle',
                    text:"面积：" + post.area_info.text + post.area_info.px,
                    fontSize: 24,
                    color: '#000',
                    zIndex: 100,
                  },                    
                  {
                    x: 95,
                    y: 639,
                    baseLine: 'middle',
                    text: post.price_info.label + "：" + post.price_info.text + post.price_info.px,
                    fontSize: 24,
                    color: '#000',
                    zIndex: 100,
                  },                    
                  {
                    x: 95,
                    y: 695,
                    baseLine: 'middle',
                    text: "电话: "  + post.broker_info.mobile + '(' + post.broker_info.name  + ')',
                    fontSize: 24,
                    color: '#000',
                    zIndex: 100,
                  },                    

                  {
                    x: 403,
                    y: 520,
                    baseLine: 'middle',
                    text: "扫码看更多",
                    fontSize: 16,
                    color: '#cecece',
                    zIndex: 100,
                  },                    
           
                ],

    }
    this.setData({posterConfig: config})
    console.log('poster config', config)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

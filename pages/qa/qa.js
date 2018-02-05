// pages/qa/qa.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: null,
    qas: null,
  
  },

  moreHandle: function(e){
    console.log('more handle')
    wx.switchTab({

      url: '/pages/qa/index',
    })
  },

  newHandle: function(e){
    wx.switchTab({
      url: '/pages/qa/index',
    })
  },

  randomQas: function(len=2){
    var qas = []
    var QAS = wx.getStorageSync('questions')
    var _this = this
    console.log('QAS,', QAS)

    for(var i=0;i<QAS.length;i++){
      if(qas.length == len){
        break
      }

      var qa = QAS[i]
      if(qa['id'] != this.data.item['id']){
        qas.push(qa)
      } 
    }

    _this.setData({qas: qas})
    console.log('qas,', qas)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qid = options.id
    this.setData({item: wx.getStorageSync('question_' + qid)})
    this.randomQas(2)
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
      desc: _this.data.item['content'],
      title: '真有好房',
      path: 'pages/qa/qa?id=' + _this.data.item['id']
    }
  },


})

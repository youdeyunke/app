// pages/qa/index.js
const app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    catId: 0,
    cats: [{name: '全部', id: 0}],
    items: [],
    questionContent: wx.getStorageSync('question_content') || ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCats()
    this.loadItems()
  },

  itemHandle: function(e){
    console.log(e)
    var index = e.currentTarget.dataset['index']
    var item =  this.data.items[index]
    wx.navigateTo({ url: '/pages/qa/qa?id=' + item.id })
  },

  inputHandle :function(e){
    var v = e.detail.value
    this.setData({ questionContent: v })
  },


  submitHandle: function(e){
    app.saveFormId(e)
    
    var _this = this
    app.ensureMobile('/pages/qa/index', function(userInfo){
      _this.doSubmit()
    })
  },

  doSubmit: function(){
    var _this = this
    var content = _this.data.questionContent
    var qLen = typeof content == 'undefined' ? 0 : content.length
    var qMinLength = 10

    if (qLen >= 200) {
      wx.showToast({
        title: '文本太长',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (qLen <= qMinLength) {
      wx.showToast({
        title: '请至少填写' + qMinLength + '个字符',
        icon: 'none',
        duration: 2000
      })
      return false
    }


    // 保存到本地，用户跳转到登录后，文本不丢失
    wx.setStorageSync('question_content', content)

    app.request({
      method: 'POST',
      url: '/api/v1/questions/',
      data: { content: content, cid:  this.data.catId },
      success: function(resp){
        // clear cache
        _this.setData({questionContent : ''})
        wx.setStorageSync('question_content', '')
        wx.showToast({
          title: '问题提交成功，我们会尽快回复您',
          icon: 'success',
          duration: 4000
        })
      }
    })
  },

  catHandle: function(e){
    console.log('cid:', e.target.dataset['cid'])
    this.setData({
      catId: e.target.dataset['cid'],
      items: [],
    })
    this.loadItems()
  },

  loadCats: function(){
    var _this = this
    app.request({
      url: '/api/v1/question_cats/',
      success: function(res){
        _this.setData({
          cats: _this.data.cats.concat(res.data.data)
        })
      }
    })
  },

  loadItems: function(){
    var _this = this
    app.request({
      url: '/api/v1/questions/',
      data: {
        cat_id: _this.data.catId, 
        offset: _this.data.items.length,
        limit: 10,
      },
      success: function(res){
        var d = {}
        res.data.data.forEach(function(item, i){
          
          var index = _this.data.items.length + i
          var k = "items[" + index + "]"
          

          item['created_at_pretty'] = util.prettyTime(item['created_at'])
          item['updated_at_pretty'] = util.prettyTime(item['updated_at'])
          d[k] = item
          wx.setStorageSync('question.' + item.id, item)
        }) 
        _this.setData(d)
        wx.setStorageSync('questions', res.data.data)
      }
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
    var _this = this
    _this.setData({items: []})
    _this.loadItems()
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

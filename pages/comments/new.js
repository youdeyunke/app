// pages/comments/new.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cats: [
      {name: '考虑看房', id: 1},
      {name: '看过该房', id: 2},
      {name: '我是业主', id: 3},
    ],

    posts: [{}],

    comment: {
      user_id: app.globalData.userInfo.id,
      score: 1,
      cat_id: 0,
      content: '',
      target_type: 'post',
      target_id: '',
    }
  },

  contentHandle: function(e){
    console.log('e', e)
    this.data.comment.content = e.detail.value
    this.setData({ comment: this.data.comment })
  },

  catHandle: function(e){
    console.log('e', e)
    var i =  e.currentTarget.dataset.index
    var cat = this.data.cats[i]
    
    this.data.comment.cat_id = cat.id
    this.data.comment.cat_name = cat.name
    this.setData({comment: this.data.comment})
  },

  scoreHandle: function(e){
    console.log('e', e)
    this.data.comment.score = e.detail.score
    this.setData({comment: this.data.comment})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    wx.setStorageSync('login_back_page', '/pages/comments/new?target_id=' + q.target_id + '&target_type=' + q.target_type)

    this.data.comment.target_id = q.target_id
    this.data.comment.target_type = q.target_type || 'post'
    this.loadTarget()
  },

  loadTarget: function(){
    var ids = this.data.comment.target_id
    var _this = this
    app.loadPosts({ids: ids}, function(res){
      _this.setData({posts: res.data})
    })
  },

  submitHandle: function(e){
    var comment = this.data.comment
    if(!comment.score){
      wx.showToast({
        title: '请选择评分',
      })
      return false
    }

    if(!comment.cat_id){
      wx.showToast({
        title: '请选身份',
      })
      return false
    }

    if(!comment.content){
      wx.showToast({
        title: '请输入评论内容',
      })
      return false
    }

    if(comment.length <= 5){
      wx.showToast({
        title: '评论内容太短了，请多些几个字吧',
      })
      return fasle
    }

    // do submit
    app.request({
      url: '/api/v1/mycomments',
      method: 'POST',
      data: comment,
      success: function(resp){
        wx.navigateTo({
          url: '/pages/post/post?id=' + comment.target_id,
        })
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
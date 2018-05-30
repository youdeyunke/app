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
    comment: {},
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
    this.setData({
      target_id: q.target_id, 
      target_type: q.target_type || 'post'
    })
    app.ensureUser({
    })

    app.getUserInfo(function (userInfo) {
      if (userInfo && userInfo.mobile) {
        // success
        console.log('userinfo.mobile, ', userInfo.mobile)
      } else {

        wx.setStorageSync('login_back_page', '/pages/comments/new?target_id=' + q.target_id + '&target_type=' + q.target_type)
        app.gotoAccount("请先登录", "请先登录")
      }
    })  

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

    // 防止从缓存中取出commment账号target没有更新
    comment.target_id = this.data.target_id
    comment.target_type = this.data.target_type

    // do submit
    var _this = this
    app.request({
      url: '/api/v1/mycomments',
      method: 'POST',
      data: comment,
      success: function(resp){
        // 页面卸载的收，会将this.data.comment写入globalData.newComment
        // 发布成功后，就清空
        _this.setData({comment: null})

        wx.setStorageSync('eventBus', {key: 'reloadComments', value: comment.target_id})
        
        wx.showToast({title: '提交评论成功', })
        setTimeout(function(){
          wx.navigateBack({ delta: 1 })
        }, 1500)
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
    var newComment = app.globalData.newComment
    if(newComment){
      this.setData({comment: newComment})
    }else{
      var userInfo = wx.getStorageSync(
        'userInfo'
      )
      this.setData({comment: {
        user_id: userInfo.id,
        score: 1,
        cat_id: 0,
        content: '',
        target_type: this.data.target_type,
        target_id: this.data.target_id,
      }})      
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
    app.globalData.newComment = this.data.comment
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

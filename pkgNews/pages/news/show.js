// pages/news/show.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nid: null,
    homebtn: null,
    item: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    app.checkForceLogin()
    console.log('q', q)
    this.setData({nid: q.id, homebtn: q.homebtn || null})
    this.loadData()
  },

  loadData: function(){
    
    var _this = this
    app.request({
      url: '/api/v1/news/' + _this.data.nid,
      success: function(resp){
        var url = resp.data.data.url
        if (url) {
            app.gotoWebview(url, '文章')
            return false
        }
        var html = resp.data.data['content'] || ''
        if(html){
          html = html.replace(/\<img/gi, '<img class="rich-text-img" ')
          html = html.replace(/\<p/gi, '<p class="rich-text-p" ')
        }
        _this.setData({
          item: resp.data.data,
          html: html,
        })
        wx.setNavigationBarTitle({
            title: resp.data.data.title,
        });
          
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
    return {
      title: this.data.item.title,
      imageUrl: this.data.item.cover_v2 + "?imageView2/1/w/500/h/400",
      path: '/pkgNews/pages/news/show?id=' + this.data.nid
    }
  },
  onShareTimeline(){
    return {
      title: this.data.item.title,
      imageUrl: this.data.item.cover_v2 + "?imageView2/1/w/500/h/400",
      path: '/pkgNews/pages/news/show?id=' + this.data.nid
    }
  }
})

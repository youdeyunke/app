// pkgZhuli/pages/zhuli/mine.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid: null, 
    haoyouItems: [],
    item: null, // 活动信息

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this  = this 
    this.setData({ 
      mid: q.id, 
    }, () => {
      _this.loadData() 
    })
   
  },

  helpHandle: function(){
    // 帮他助力
    var _this = this  
    var data = {
      zhuli_id: this.data.zhuli.id, 
    }
    app.request({ 
      url: '/api/v1/zhuli_haoyou/', 
      method: 'POST', 
      data: data  , 
      success: function(res){ 
        if(res.data.status != 0){ 
          return 
        }
        // show dialog 
        _this.selectComponent('thanks').openDialog()
      }
    })
  },


  loadData: function(){
    var _this = this  
    app.request({ 
      url: '/api/v1/zhuli/' + _this.data.mid,
      success: function(res){ 
        var pageTitle = "帮我助力 " + res.data.data.huodong.title 
        var pageCover = res.data.data.huodong.cover  
        _this.setData({ 
          zhuli: res.data.data, 
          huodong: res.data.data.huodong, 
          owner: res.data.data.user,
          pageTitle: pageTitle, 
          pageCover: pageCover, 
        })


 
      }
    })
  },

  loadHuodong: function(hid){ 

    var _this = this  
    app.request({
      url: '/api/v1/huodong/' + hid, 
      success: function(res){ 
        if(res.data.status != 0){
          return 
        }
        var item = res.data.data 
        // TODO 设置title 
        wx.setNavigationBarTitle({
          title: item.title,
        })
        _this.setData({
          item: item, 
          pageTitle: item.title, 
          pageCover: item.cover, 
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

  onShareTimeline: function(){
    return {
      title: this.data.pageTitle, 
      imageUrl: this.data.pageCover,
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.pageTitle, 
      imageUrl: this.data.pageCover,
    }

  }
})
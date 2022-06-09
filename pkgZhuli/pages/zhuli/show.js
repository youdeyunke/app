// pkgZhuli/pages/zhuli/index.js
const app = getApp() 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    pageCover: 'https://qiniucdn.udeve.net/fang/zhuli-cover.png'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.setData({
      hid: q.id,  
    }, () => {
      this.loadData() 
    })

  },

  loadData: function(){
    var _this = this  
    app.request({
      url: '/api/v1/tours/' + this.data.hid, 
      success: function(res){ 
        if(res.data.status != 0){
          return 
        }
        var tour = res.data.data.tour 
        var post = res.data.data.post 
        var zhuliId = res.data.data.zhuli_id 
        if(zhuliId && zhuliId > 0){
          wx.redirectTo({ 
            url: '/pkgZhuli/pages/zhuli/mine?id=' + zhuliId, 
          })
          return 
        }
        wx.setNavigationBarTitle({
          title: tour.title,
        })

        _this.setData({
          item: tour,
          post: post,  
          pageTitle: tour.title, 
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  joinHandle: function(){
    var _this  = this  
    var hid = this.data.hid 
    // 发起助力 
    app.request({
      url: '/api/v1/zhuli/join', 
      method: 'POST', 
      data: {id: hid}, 
      success: function(res){ 
        if(res.data.status != 0){
          return 
        }
        var myid = res.data.data  
        var url = '/pkgZhuli/pages/zhuli/mine?id=' + myid  
        wx.navigateTo({
          url: url
        })
      }
    })
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

  onShareTimeline: function () {
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
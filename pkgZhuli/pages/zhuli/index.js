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
      url: '/api/v1/huodong/' + this.data.hid, 
      success: function(res){ 
        if(res.data.status != 0){
          return 
        }
        var item = res.data.data 
        wx.setNavigationBarTitle({
          title: item.title,
        })

        _this.setData({
          item: item, 
          pageTitle: item.title, 
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
      url: '/api/v1/huodong', 
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
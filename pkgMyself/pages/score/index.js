// pkgMyself/pages/score/index.js
const app = getApp() 
const api = require("../../../api/score")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0, 
    items: [],
    page:1, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.loadData()
  },

  loadData: function(){
    var _this = this   
    var data = { 
      page: this.data.page,  
    }
    // app.request({ 
    //   url: '/api/v1/scores',  
    //   data: data, 
    //   success: function(res){ 
    //     if(res.data.status != 0){ 
    //       return false 
    //     }
    //     var items = _this.data.items.concat(res.data.data)
    //     _this.setData({ items: items, score: res.data.amount })
    //   }
    // })
      // 有待检验  √
      api.getScoreList({
        page: this.data.page
    }).then((res) => {
        if(res.data.status != 0){ 
            return false 
          }
          var items = _this.data.items.concat(res.data.data)
          _this.setData({ items: items, score: res.data.amount })
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
   //this.setData({score: app.globalData.userInfo.score })

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
    this.setData({
      page:1, 
      items: []
    }, () => { 
      this.loadData() 
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({ 
      page: this.data.page + 1,  
    }, () => { 
      this.loadData() 
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
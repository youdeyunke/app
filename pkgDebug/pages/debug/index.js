// pkgDebug/pages/db/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain:'',
    host :''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    this.setData({
      host:app.globalData.apiHost
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  change:function(){
    if(!this.data.domain){
      wx.showToast({
        title: '域名不能为空',
        icon: 'none'
      })
      return
    }
    var app =  getApp();
    var val = 'https://'+ this.data.domain
    app.globalData.apiHost= val
    wx.showToast({title: '域名修改成功',})
    this.setData({
      domain:'',
      host:app.globalData.apiHost
    })
  }
})
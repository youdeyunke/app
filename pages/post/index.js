// pages/sub-districts/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    kwInput: '',
    filter: {},
    page: 1,
    filterConfigs: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */                                                                                                 
  onLoad: function (q) {
    app.checkForceLogin()

    var data = {}
    var filter = q || {}
    this.configFilter(q)
    data['filter'] = filter
    if(q.kw || q.text){
      data['kw'] = q.kw || q.text
    }
    this.setData(data)
  },

  configFilter: function(q){
    var items = [{ name: '位置', type: 'citypicker', }, 
        app.globalData.filterAreaItem,
        app.globalData.filterRentPriceItem,
        app.globalData.filterOrderItem,
    ]
    var g = q.group || q.group_v2

    if(g == 'rental'){
      items = [{ name: '位置', type: 'citypicker', }, 
        app.globalData.filterTypeItem,
        app.globalData.filterRentPriceItem,
        app.globalData.filterAreaItem,
        app.globalData.filterOrderItem,
      ]
    }

    if(g == 'shop'){
      items = [{ name: '位置', type: 'citypicker', }, 
        app.globalData.filterAreaItem,
        app.globalData.filterRenttypeItem,
      ]
    }

    if(g == 'old'){
      items = [{ name: '位置', type: 'citypicker', }, 
        app.globalData.filterTypeItem,
        app.globalData.filterTotalPriceItem,
        app.globalData.filterAreaItem,
        app.globalData.filterOrderItem,
      ]
    }

    if(g == 'new'){
      items[2] = app.globalData.filterTotalPriceItem
    }
    this.setData({filterConfigs: items})


  },

  kwChange: function (e) {
    this.setData({ kwInput: e.detail })
  },  

  onSearch: function(e){
      var kwInput = this.data.kwInput
      if(kwInput && kwInput.length >= 2){
          this.setData({kw: kwInput, page: 1})
      }else{
          wx.showToast({
              title: '关键词不能少于2个字符',
              icon: 'none',
          });
      }
  },

  kwClear: function(e){
    this.setData({kw: '', page: 1})
  },


  filterChange: function(e){
    this.setData({filter: e.detail})
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
    var page = this.data.page || 1
    this.setData({
      page : page + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})

// pages/sub-districts/index.js

const orderItem = {
  type: "picker",
  name: "排序",
  key: "order",
  options: [
    {
      label: "默认",
      value: "id desc"
    },
    {
      label: "均价（从大到小)",
      value: "average_price desc"
    },
    {
      label: "均价（从小到大)",
      value: "average_price asc"
    }
  ]
} 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    kwInput: '',
    filter: {
        order: 'id desc',
        per_page: 10,
    },
    page: 1,
    filterConfigs: [
      { name: '位置', type: 'citypicker', },
      orderItem,
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({title: '小区列表'})
  },

  onSearchClear: function(e){
      this.setData({
          page:1,
          kw: '',
      })
  },

  kwChange: function(e){
      this.setData({kwInput: e.detail})
  },
  

  onSearch: function(e){
      var kwInput = this.data.kwInput
      if(kwInput && kwInput.length >= 2){
          this.setData({kw: kwInput, page: 1})
      }else{
          wx.showToast({
              title: '关键词不能少于2个字符',
              icon: 'none',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {
                  
              },
              fail: () => {},
              complete: () => {}
          });
            
      }

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
      console.log('on reach bottom')
      var page = this.data.page
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

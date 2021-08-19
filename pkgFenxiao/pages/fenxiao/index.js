// pages/fenxiao/customers.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      page: 1,
      per_page: 50,
      dealStatus: [],
      items: [],
      loading: true,
      currentTabIndex: 0,
      tabs: [
          {name: '有效', value:2, count:0},
          {name: '待审核', value:1, count:0},
          {name: '无效', value:0, count:0},
      ],

  },

  tabChange: function(e){
     var i = e.detail.name
     this.setData({
         page:1,
         currentTabIndex: i,
         items: [],
     })
     this.loadData()
  },

  loadData: function(){
      this.setData({loading: true})
      var _this  = this
      var status = this.data.tabs[this.data.currentTabIndex].value
      var query = {
          order: 'id desc',
          status: status,
          page: _this.data.page,
          per_page: _this.data.per_page,
      }
      app.request({
          url: '/api/v1/customers/',
          data: query,
          success: function(resp){
              var i = query['page']  - 1
              var data = { loading: false }
              if (i > 0) {
                var key = 'items[' + i + ']'
                data[key] = resp.data.data
              } else {
                data['items'] = [resp.data.data]
              }
              _this.setData(data)
          },
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      app.ensureConfigs((configs) => {
        this.setData({
          dealStatus: configs['deal_status_items']
        })
      })
      this.loadData()
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
      this.setData({page: 1})
      this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      var page = this.data.page
      this.setData({page: page + 1})
      this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

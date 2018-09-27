// pages/post/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    page : 1,
    per_page: 8,
    isEmpty: false,
    isEnd: false,
    loading: false,
    posts: [],
  },

  toggleHandle: function() {
    var v = !this.data.show
    this.setData({show: v})
  },


  onLoad: function (query) {
    var _this = this
    this.loadData()
  },

  /** 过滤器改变，重新加载数据 **/
  filterHandle: function(){
    this.setData({
      posts: [],
      isEmpty: false,
      isEnd: false,
      loading: true,
      page: 1,
    })  
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  loadData: function(){
    var _this = this

    this.setData({
      isEmpty: false, loading: true
    })
    
    if (this.data.isEnd) {
      return false
    }  

    var query = {
      //city_id: _this.data.city_id || '',
      page: _this.data.page || 1,
      per_page: _this.data.per_page || 10,
      group: 'old',
    }

    var _this = this
    app.request({
      url: '/api/v1/posts',
      data: query,
      hideLoading: true,
      success: function(resp){
        var d = {loading: false}
        if(resp.data.data.length == 0 ){
          d.hasMore = false
        }else{
          var i = _this.data.page - 1
          var k = "posts[" + i + "]"
          d[k] = resp.data.data
        }
        if(resp.data.data.length == 0){
          d['isEnd'] = true
          if(_this.data.page == 1){
            d['isEmpty'] = true
            d['isEnd'] = false
          }
        }
        console.log('d is ', d)
        _this.setData(d)

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
    var _this = this
    this.setData({
      posts: [],
      isEmpty: false,
      isEnd: false,
      page: 1,
    })  
    this.loadData()
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this
    this.setData({
      page: _this.data.page + 1
    })
    this.loadData()
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

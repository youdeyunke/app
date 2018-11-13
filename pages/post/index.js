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
    order: 'id,desc',
    posts: [],
    filter: {},
  },

  toggleHandle: function() {
    var v = !this.data.show
    this.setData({show: v})
  },


  onLoad: function (query) {
    var _this = this
    var group = query.group || 'xinfang'
    this.setData({ 
      group: group, 
      rent_type: query.rent_type || '',
      text: query.text || ''
    })
    this.setPageTitle(group, query.rent_type)
    this.loadData()
  },

  filterChange: function(e){
    // 过滤器改变，从第1也开始加载
    console.log('index page , change ', e.detail)
    this.setData({
      filter: e.detail.filter,
      order: e.detail.order,
      page: 1,
    })
    this.loadData()
  },

  setPageTitle: function(group, rent_type){
    var title = '房源'
    switch(group){
      case  'xinfang':
        title = '新房'
        break
      case 'ershoufang':
        title = '二手房'
        break
      case 'zufang':
        title = '合租'
        if(rent_type == 'zhengzu'){
          title = '整租'
        }
    }

    wx.setNavigationBarTitle({ title: title })
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

  clearHandle: function(e){
    this.setData({
      text: '',
      page: 1,
    })
    this.loadData()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  loadData: function(){
    console.log('load data start')
    var _this = this

    this.setData({
      isEmpty: false, loading: true
    })
    
    if (this.data.isEnd) {
      return false
    }  

    var query = {
      page: _this.data.page || 1,
      per_page: _this.data.per_page || 10,
      group: _this.data.group,
      text: _this.data.text || '',
      rent_type: _this.data.rent_type, 
      order: _this.data.order,
    }
    var filter = this.data.filter
    // merge query and filter
    Object.assign(query, filter)
    console.log('query', query, 'filter',filter)

    var _this = this
    app.request({
      url: '/api/v2/posts',
      data: query,
      hideLoading: true,
      success: function(resp){
        if(query.text){
          var c = resp.data.meta.total_entries
          var msg =  c > 0 ? '搜索到' + c + '条结果' : '什么都没搜到，换个词试试？'
          wx.showToast({
            icon: 'none',
            title: msg,
          })
        }

        var items = resp.data.data
        var meta = resp.data.meta
        var d = {}
        var i = _this.data.page - 1
        if(i == 0){
          d = {posts: [items]}
        }else{
          var k = "posts[" + i + "]"
          d[k] = items
        }
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

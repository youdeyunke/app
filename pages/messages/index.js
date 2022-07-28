// pages/messages/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: null,
    isLogin: false,
    userInfo: {},
    sleepTime: 1000,
    iid: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({title: '消息'})
  },

  readAll: function(){
    var _this = this  
    app.request({
      url: '/api/v1/chat_lists/readall', 
      method: 'POST', 
      success: function(){
        wx.showToast({
          title: '已将全部消息标记为已读',
        })
      },
    })
  },

  stopInterval: function(){
    // 退出后要关闭定时器
    var iid = this.data.iid
    if(iid){
      clearInterval(iid)
      this.setData({iid: null})
      console.log('已停止定时器')
    }
  },

  startInterval: function(){
    // 开启定时器，并防止重复
    var _this = this
    var t =  5 * 1000
    var iid = setInterval(_this.loadData, t)
    this.setData({iid: iid})
    console.log('开启定时器，刷新聊天列表', t)
  },

  deleteHandle: function(e) {
      const {index} = e.currentTarget.dataset  
      var item = this.data.items[index]
      if(item.sender_id == 0){
        return 
      }
      var _this = this 
      wx.showModal({
        title: '删除对话',
        content: "确定要删除和" + item.sender_info.name + '的对话吗？聊天记录不会被删除。',
        success: function(res){ 
          if(!res.confirm){
            return 
          }
          _this.deleteChat(item.id)
        }
      })
  },

  deleteChat: function(chatId){
    var _this = this  
    app.request({ 
      url: '/api/v1/chat_lists/' + chatId, 
      method: 'DELETE',
      success: function(resp) {
        if(resp.data.status == 0){
          wx.showToast({
            icon: 'none',
            title: '已删除',
          })
          setTimeout(_this.loadData, 1000)
        }
      }
    })
  },

  loadData: function(){
    var _this = this
    app.request({
      url: '/api/v1/chat_lists/',
      hideLoading: true,
      success: function (res) {
        if (res.data.status == 0) {
          // 如果列表没有变化就不更新 
          var old = _this.data.items  
          var n = res.data.data  
          if(JSON.stringify(n) == JSON.stringify(old)){
            return
          }
          var items = res.data.data.map((item) => { 
            if(item.last_content_type == 'post'){
              item.last_content = '[楼盘]'
            }
            if(item.last_content_type == 'namecard'){
                item.last_content = '[名片]'
            }
            if(item.last_content_type == 'image'){
                item.last_content == '[图片]'
            }
            if(item.last_content_type == 'location'){
                item.last_content = '[定位]'
            }
            return item
          })
          _this.setData({ 
            items: items, 
            sleepTime: res.data.sleep, 
            count: res.data.count || 0,
          })
        }
      },
      complete: function(res){
      },
    })    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

   dingyue: function(){
    app.dingyueHandle()
   },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


    var userInfo = app.globalData.userInfo
    if(userInfo){
      this.loadData()
      this.stopInterval()
      this.startInterval()
    }else{
      // 未登陆
      this.selectComponent('.loginwindow').openWindow()
    }
    this.setData({userInfo: userInfo})
    console.log('message on show')
    wx.removeTabBarBadge({
      index: 2,
      fail: function(res){
        console.log('清空未读数失败',res)
      }
    })  
  },

  loginSuccess: function(data){

    this.setData({userInfo: data.detail})
    this.loadData()
    this.stopInterval()
    this.startInterval()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.stopInterval()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.stopInterval()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

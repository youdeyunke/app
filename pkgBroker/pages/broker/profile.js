// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    filter: {user_id: '', order: 'id desc', group_v2: 'old', per_page: 5},
    userId: null,
    currentTabIndex: 0,
    page: 1,
    icons: [
      {id: 'mobile', bindtap:"callMe"},
      {id: 'wechat', bindtap: 'copyWechat'},
    ],
    tabs: [ ],
  },


  submit: function(e){
    app.uploadFormId(e)
  },

  callMe: function(e){
    var mobile = this.data.userInfo.mobile
    if (!mobile) {
      return false
    }

    wx.makePhoneCall({
      phoneNumber: mobile
    })    
  },

  copyWechat: function(e){
    var wechat = this.data.userInfo.wechat
    if (!wechat) {
      return false
    }

    wx.setClipboardData({
      data: wechat,
      success: function (res) {
        wx.showTosta({
          title: '微信号已复制',
          icon: 'none',
        })
      }
    })
  },

  tabChange: function(e){
     var i = e.detail.name
     var tab = this.data.tabs[i]
     var filter = this.data.filter
     filter['group_v2'] = tab.value
     this.setData({
         page: 1,
         filter:  filter
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    var filter = this.data.filter
    app.ensureConfigs((configs) => {
        var tabs =  configs['post_groups']
        filter['user_id'] = q.id
        filter['group_v2'] = tabs[0].value
        _this.setData({
          tabs: tabs,
          userId: q.id,
          filter: filter,
        }, function(){
          _this.loadUserInfo()
        })
        app.markVisitor(null, q.id, 'user')
    })
  },

  loadUserInfo: function(){
    var uid = this.data.userId
    var _this = this
    app.request({
      url: '/api/v1/users/' + uid,
      success: function(resp){
        var u = resp.data.data
        _this.setData({userInfo: u})
        var title =  u.name +  "的名片"
        wx.setNavigationBarTitle({
          title: title
        })        
      }
    })
  },


  setPageTitle: function(){
    var _this = this
    wx.setNavigationBarTitle({
      title:''
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
    var _this = this
    this.setData({
      page: _this.data.page + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var _this = this
    return {
      title:  _this.data.userInfo.name + '的名片',
      desc: '帮你找好房',
      path: 'pkgBroker/pages/broker/profile?id=' + _this.data.userId,
      imageUrl: _this.data.userInfo.avatar,
    }
  },

})

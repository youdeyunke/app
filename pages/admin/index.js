// pages/admin/index.js
const app = getApp()
var auth = require('../../utils/auth.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixFormid: false,
    menuItems: [
      { name: '发布二手房', icon: 'add-square', color: '#0ddb0c', url: '/pages/post/form?group=old'},
      { name: '发布租房', icon: 'add-square', color: '#ff9501', url: '/pages/post/form?group=rental&rent_type=zhengzu' },
      { name: '发布商铺', icon: 'add-square', color: '#ff9501', url: '/pages/post/form?group=shop' },

      { name: '房源管理', icon: 'column', color: '#59B8EB', url: '/pages/myself/posts' },  
      { name: '预约看房', icon: 'underway', color: '#59B8EB', url: '/pages/admin/booking' },  
      { name: '访客足迹', icon: 'eye', color: '#59B8EB', url: '/pages/visitors/index' },  

      { name: '求购客源', icon: 'friends', color: '#4184AF', url: '/pages/need/room?cat=buy' },  
      { name: '求租客源', icon: 'friends', color: '#E15C32', url: '/pages/need/room?cat=rent' },  
      { name: '我的客源', icon: 'manager', color: '#5857CE', url: '/pages/need/room?cat=myself' },  
      { name: '我的档案', icon: 'bars', color: '#', url: '/pages/myself/broker' },                                    
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
  },

  formidHandle: function(e){
    var _this = this
    app.uploadFormId(e, function(data){
        var c = data.data.can_use_count
        if(c  >= 30){
          _this.setData({fixFormid:false})
        }else{

            wx.showToast({
                title: '可接收：' + c  + '条，请继续点击按钮',
                icon: 'none', image: '',
                duration: 1000,
                mask: false,
            });
        }
        console.log('可推送消息数：', c)
    })
  },

  subMessageHandle: function(e){
    console.log('e', e)
    var ids = app.globalData.myconfigs['tpl_ids'] || []
    if(!ids || ids.length == 0){
      console.log('tpl  ids empty')
      return false
    }
    wx.requestSubscribeMessage({
      tmplIds: ids,
      success (res) {
        console.log('定义通知成功', res)
       },
       fail(res){
         console.log('fail', res)
       }
    })    
  },

  menuItemClickHandle: function(e){
    var user = this.data.userInfo
    if(!user.is_broker){
        wx.showToast({
            title: '没有权限',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: true,
        });
        return false;
    }
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  checkFormids: function(e){
    var _this = this
    app.request({url: '/api/v1/formid', success: function(resp){
        if(resp.data.status == 1){
          return false;
        }
        var c = resp.data.data.count || 0
        if(c <= 20){
            // 开启修复按钮
            _this.setData({fixFormid: true})
        }
        console.log('enable form ids count', c)
    }})

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var ext = app.globalData.EXT
    var _this = this
    auth.getRemoteUserInfo(function (user) {
          _this.setData({ userInfo: user })
          if(!user.is_broker){
            wx.showModal({
              title: '没有权限',
              content: '你不是经纪人，没有权限进入工作台界面',
              confirmText: '申请入驻',
              confirmColor: '#00ae66',
            
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/myself/broker',
                  })
                }
              }          
            })
          }
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
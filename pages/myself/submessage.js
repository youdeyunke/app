// pages/myself/submessage.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {name: '房源被收藏通知', key: 'favpost_tpl_id'},
      {name: '预约看房通知', key: 'booking_tpl_id'},
      {name: '新访客通知', key: 'visitor_tpl_id'},
      {name: '新访客通知', key: 'visitor_tpl_id'},
      {name: '邀请好友成功通知', key: 'referrers_tpl_id'},
      {name: '经纪人身份权限变化通知', key: 'broker_profile_tpl_id'},
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  subMessageHandle: function(e){
    console.log('e', e)
    var i = e.currentTarget.dataset.index
    var item = this.data.items[i]
    var key = item['key']
    var tplid = app.globalData.myconfigs[key]
    if(!tplid){
      console.log('模板id', key, '不存在')
      return false
    }
    console.log('tplid', tplid)
    wx.requestSubscribeMessage({
      tmplIds: [tplid],
      success (res) {
        console.log('定义通知成功', res)
       },
       fail(res){
         console.log('fail', res)
         wx.showToast({ title: res.errMsg, icon:'none' })
       }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

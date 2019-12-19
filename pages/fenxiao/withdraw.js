// pages/fenxiao/withdraw.js
const app = getApp()
var auth = require('../../utils/auth.js');
var AMOUNT_MIN = 100

Page({

  /**
   * 页面的初始数据
   */
  data: {
      balanceInfo: {},
      loading: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    auth.ensureUser(function(user){
        _this.loadBalanceInfo()
    })

  },


  loadBalanceInfo: function(){
      var _this = this
      app.request({
          url: '/api/v1/balances/info',
          success: function(resp) {
              if(resp.data.status == 0 ){
                  console.log('balance info resp', resp)
                  _this.setData({ balanceInfo: resp.data.data })
                  if(resp.data.data.amount < 100 ){
                    wx.showModal({
                      title: '余额不足',
                      content: '余额大于100元才可以申请提现',
                      })
                  }
              }
          }
      })
  },

  submit: function(e){
    app.uploadFormid(e)
    var _fdata = e.detail.value
    // 重新组装提交的数据结构
    console.log('form data is', _fdata)
    var fdata = { }
    var card_info = {}
    Object.keys(_fdata).forEach((k, i)  => {
        var v = _fdata[k]
        if(k.startsWith('card_info')){
            var bk = k.split('.')[1]
            card_info[bk] = v
        }else{
            fdata[k] = v
        }
    })
    fdata['card_info'] = card_info

    this._submit(fdata)
  },

  _submit: function(data){
    var _this = this
    app.request({
        url: '/api/v1/balances',
        method: 'POST',
        data: data,
        success: function(resp) {
            if(resp.data.status == 0){
                wx.showModal({
                  title: '操作成功',
                  content: '我们已收到您的提现申请，管理员审核后将打款到银行卡',
                  success: function(res){
                    wx.navigateTo({
                      url: '/pages/fenxiao/balance',
                    })
                  }
                })
            }
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

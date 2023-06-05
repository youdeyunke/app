// pages/wxpay/demo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  wxzhif(){
    var _this = this
    wx.request({
      url: 'https://wxpay.udeve.net/ServerCommand/微信支付统一下单',
      method: 'POST',
      data: {
        //   data: {
            OrderId: '2023051715290298413053403',
            OpenId: 'o-65p5KNNe4xp5UDctxMHY2Y68vc',
            Body: 'asas',
            Attach: 'dadad'
        //   }
      },
      success(resp){
          console.log(resp.data);
          _this.dywxzf(resp.data)
      }
    })
},

dywxzf(data){
    wx.requestPayment({
        timeStamp:data.timeStamp,
        nonceStr:data.nonceStr,
        package:data.package,
        signType: data.signType,
        paySign: data.paySign,
        success(res){
            console.log('jieguo',res);
        },
        fail(res){}
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  getSign: function(e){
    app.request({
      url: '/api/v1/wxpay',
      method: 'get',
      success: function(resp){
        var data = resp.data
        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign,
          success: function(res){
            console.log('res', res)
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            })
          },
          fail: function(res){
            wx.showToast({
              icon: 'none',
              title: '支付失败',
            })
            console.log('fail ', res)
          }
        })
        console.log('get sign from server :', data)
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
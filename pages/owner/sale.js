// pages/owner/sale.js

const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    setpsText: ["填写信息", "电话核实", "房源上架"],
    group: 'old',
    groupIndex: 0,
    mobile: '',
    sub: {name: '请选择小区'},
    groupItems: [
      {name: '业主卖房', value: 'old'},
      {name: '业主出租', value: 'rental'},
    ]
  },


  groupChange: function (e) {
    var i = e.detail.name
    var items = this.data.groupItems
    this.setData({
      group: items[i].value,
      groupIndex: i,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    if(q.group){
      console.log('q.group', q.group)
      this.data.groupItems.forEach((g,i) => {
        console.log('g is', g)
        if(g.value == q.group){
          console.log('set data', g.value, i)
          _this.setData({group: g.value, groupIndex: i})
        }
      })

    }
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
    wx.setNavigationBarTitle({
      title: '免费发布房源',
    })
    var _this = this
    auth.loadUserInfo(function (user) {
      if(user.mobile && user.mobile.length == 11){
        _this.setData({ mobile: user.mobile })
      }
    })    
  },


  mobileBind: function(e){
    console.log('用户授权获取手机号成功', e.detail)
    var mobile = e.detail
    if(!mobile){
      wx.showToast({
        title: '手机号授权失败，请重试',
        icon: 'error',
      })
      return false
    }
    this.setData({mobile: mobile })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  chooseLocation: function (e) {
    var _this = this
    app.chooseLocation(function (sub) {
      _this.setData({sub: sub})
    })
  },

  validateFormData: function(fdata){
    if(!fdata['sub_district_id']){
      wx.showToast({
        title: '请选择小区',
        icon: 'none',
      })
      return false;
    }

    if(this.data.group == 'old' &&  !fdata['total_price']){
      wx.showToast({
        title: '请填写期望售价',
        icon: 'none'
      })
      return false;
    }

    if(this.data.group == 'rental' && !fdata['rental_price']){
      wx.showToast({
        title: '请填写期望月租金',
        icon: 'none'
      })
      return false;
    }

    if(!fdata['name']){
      wx.showToast({
        title: '请填写称呼',
        icon: 'none'
      })
      return false;
    }

    if(!fdata['mobile']){
      wx.showToast({
        title: '请授权手机号',
        icon: 'none'
      })
      return false;
    }

    return true
  },

  submit: function(e){
    app.uploadFormid(e)
    var fdata = e.detail.value
    fdata['sub_district_id'] = this.data.sub.id
    fdata['price'] = fdata['total_price'] || fdata['rental_price']
    fdata['group'] = this.data.group,
    console.log('form data', fdata)
    var isok = this.validateFormData(fdata)
    if(!isok){
      return false;
    }

    app.request({
      url: '/api/v1/owner_sales',
      method: 'POST',
      data: fdata,
      success: function(resp){
        if(resp.data.status != 0){
          return false;
        }
        wx.showModal({
          title: '发布成功！',
          content: '我们已经收到您发布的信息，我们的经纪人会在2个工作日内与您联系核实房源信息',
          success: function(res){
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
        })
      }
    })
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

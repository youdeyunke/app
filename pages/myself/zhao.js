// pages/myself/zhao.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    budget: '100万-500万',
    purpose: '',
    position: '',
    contact: '',

    purposeList: [
      { name: '刚需'},
      { name: '结婚'},
      {name: '投资'},
      {name: '给父母住'},
      {name: '孩子上学'},
      {name: '改善条件'},
      {name: '其他'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this  = this
    app.getUserInfo(function(userInfo){
      _this.setData({contact: userInfo.mobile || ''})
    })
  },

  getFormData: function(){
    var data = {}
  },

  validate: function(cb){
    if(!this.data.purpose){
      wx.showToast({
        title: '请选择买房目的',
        icon: 'none'
      })
      return
    }
    if(!this.data.position){
      wx.showToast({
        title: '请填写关注的地区',
        icon: 'none'
      })
      return
    }

    if(!this.data.contact){
      wx.showToast({
        title: '请填写联系方式',
        icon:'none'
      })
      return false
    }

    var data = {
      budget: this.data.budget,
      purpose: this.data.purpose,
      position: this.data.position,
      contact: this.data.contact,
    }
    return cb(data)
  },

  submitHandle: function(e){
    app.saveFormId(e)
    var _this = this
    app.getUserInfo(function(userInfo){
      _this.validate(function (data) {
        app.request({
          url: '/api/v1/needs',
          data: data,
          method: 'POST',
          success: function(resp){
            if(resp.data.status != 0){
              wx.showToast({
                title: '服务器出现错误，请稍后再试',
                icon: 'fail',
              })
              return false
            }
            wx.showToast({
              title: '提交成功',
            })

            wx.navigateBack({
              delta: -1
            })
          }
        })
      })
    })

  },

  positionHandle: function(e){
    this.setData({ position:    e.detail.value})
  },

  contactHandle: function(e){
    this.setData({ contact: e.detail.value })    
  },

  purposeHandle: function(e){
    var i = e.currentTarget.dataset.index
    var ps = this.data.purposeList
    var p = ps[i]
    var purpose = []

    p.selected = !p.selected
    ps[i] = p
    this.data.purposeList.forEach(function(item, i){
      console.log('item', item)
      if(item.selected){
        purpose.push(item.name)
      }
    })


    this.setData({ purposeList:ps, purpose: purpose.join(',') })
  },


  rangeChange: function(e){
    this.setData({budget: e.detail.text})
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
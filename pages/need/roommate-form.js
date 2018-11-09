// pages/need/roommate-form.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesMin: 0,
    imagesMax: 10,
    sexLimitOptions: [
      {value: '-1', label: '不限'},
      {value:'0', label: '限女生'},
      {value: '1', label: '限男生'},
    ],
    need: {
      title: '',
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    auth.ensureUser(function(userInfo){
      // doto
    })
  },

  sexLimitChange: function(e){
    var value = e.currentTarget.dataset.name
    this.updateNeedField('sex_limit', value)
    console.log('need', this.data.need)
  },

  imagesChanged: function(e){
    //this.clearError()
    var keys = Object.keys(e.detail)
    if(keys.includes('images')){
      var key 
      this.updateNeedField('images', e.detail.images)
    }
    if(keys.includes('cover_index')){
      this.updateNeedField('cover_index', e.detail.cover_index)
    }
  },

  updateNeedField: function(key, value){
    var _key = 'need.' + key
    var d = {}
    d[_key] = value
    this.setData(d)
  },

  inputChange: function(e){
    var key = e.target.dataset.name
    var value = e.detail
    this.updateNeedField(key, value)
  },

  showError: function(key, msg){
    wx.showToast({title: msg, icon: 'none'})
    var error = {key: msg}
    this.setData({error: error})
  },

  validate: function(cb){
    var need = this.data.need
    if(!need.title){
      this.showError('title', '标题不能为空')
      return
    }
    if(need.title.length >= 20 || need.title.length <= 5){
      this.showError('title', '标题长度为5~20个字')
      return
    }
    if(!need.district_id){
      this.showError('district_id', '请选择所在区域')
      return
    }
    
    if(!need.contact_name){
      this.showError('contact_name', '联系人不能为空')
      return
    }

    if(!need.contact_mobile && !need.contact_wechat){
      this.showError('contact_name', '微信和手机号至少填写一项')
      return
    }

    return cb(need)

  },

  showCityPicker: function(){
    this.setData({
      cityPickerShow: true
    })
  },

  cityChanged: function(e){
     this.updateNeedField('city', e.detail.city)
     this.updateNeedField('city_id', e.detail.city.id)
     this.updateNeedField('district_id', e.detail.district.id)
     this.updateNeedField('district', e.detail.district)
     this.setData({ cityPickerShow: false })    
  },

  submitHandle: function(e){
    var _this = this
    this.validate(function(data){
      app.request({
        url: '/api/v2/roommates/',
        data: {data: data},
        method: 'POST',
        success: function(res){
              wx.showModal({
                title: '提交成功！',
                content: '请等待管理员审核',
                success: function(res) {
                    wx.navigateBack({ delta: -1 })
                }
              })
        }
      })
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

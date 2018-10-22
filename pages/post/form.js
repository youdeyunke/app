// pages/post/new.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: {},
    step: 1,
    cities: [],
    districts: [],
    post: {
      city: {},
      district: {},
      images: [],
      imagesMin: 3,
      imagesMax: 15,
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    auth.ensureUser(function(userInfo){
      _this.updatePostField('group', q.group || 'rental' )
      _this.updatePostField('rent_type', q.rent_type || 0 )
      _this.loadMyselfInfo()
    })
  },


  loadMyselfInfo: function(){
    var _this = this
    app.request({
      url: '/api/v1/users/myself',
      data: {},
      method: 'GET',
      success: function(resp){
        _this.setData({myself: resp.data.data})
        console.log('myself', _this.data.myself)
      },
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

  submit:function(e){
    var fdata = e.detail.value
    var keys = Object.keys(fdata)
    var post = this.data.post
    var _this = this
    // 将form中的字段合并到post
    keys.forEach(function(key, i){
      post[key] = fdata[key]
      if(i == keys.length - 1){
        _this.setData({post: post})
      }
    })

    var name = e.detail.target.dataset.name
    switch(name){
      case 'step1':
        _this.validateStep1(function(post){
          _this.setData({post: post})
          _this.nextStep()
        })
        break
      case 'step2':
        _this.validateStep2(function(post){
          _this.doSubmit(post)
        })
        break
    }
  },

  showError: function(key, msg, alert){
    console.log('show error ', key, msg)
    var error = this.data.error
    error[key] = true
    this.setData({error: error})
    if(alert){
      wx.showToast({title: msg, icon: 'none'})
    }
  },



  validateStep1: function(cb){
    this.setData({error: {}})
    var post = this.data.post
    var _this = this
    var isok= true

    if(!post.title){
      _this.showError('title', '请填写标题') 
    }
    
    if(!post.district_id  || !post.city_id){
      _this.showError('district_id', '城市、行政区不能为空')
      isok = false
    }

    if(!post.area_name){
      _this.showError('area_name', '请填写小区名称')
      isok = false
    }

    if(!post.area_year){
      _this.showError('area_year', '请填写小区年代')
      isok = false
    }

    if(!post.street){
      _this.showError('street', '请填写详细街道信息')
      isok = false
    }

    if(post.group == 'rental' && !post.area){
      _this.showError('area', '请填写房间面积')
      isok = false
    }

    if(post.group == 'old' && !post.construction_area){
      _this.showError('construction_area', '请填写建筑面积')
      isok = false
    }


    if(post.group == 'rental' && !post.rent_price){
      _this.showError('rent_price', '请填写租金')
      isok = false
    }

    if(post.group == 'old' && !post.total_price){
      _this.showError('total_price', '请填写详售价')
      isok = false
    }

    if(!post.s && !post.t && !post.w){
      _this.showError('type', '请填写户型信息')
      isok = false
    }

    if(!post.position){
      _this.showError('type', '请完善户型信息')
      isok = false
    }


    if(!post.fitment_id){
      _this.showError('fitment_id', '请填写装修信息')
      isok = false
    }

    if(!post.current_floor || !post.total_floor){
      _this.showError('floor', '请填写楼层信息')
      isok = false
    }


    if(post.group == 'rental' && !post.payment_cycle){
      _this.showError('payment_cycle', '请填写租金支付方式')
      isok = false
    }


    if(post.images.length < _this.data.imagesMin || post.images.length > _this.data.imagesMax){
      _this.showError('images', '请上传' + _this.data.imagesMin + '~' + _this.data.imagesMax  + '张房源照片', true)
      isok = false
    }

    console.log('数据验证成功：', post)
    if(isok && typeof cb == 'function'){
      return cb(post)
    }
  },

  validateStep2: function(cb){
    var post = this.data.post
    if(typeof cb == 'function'){
      return cb(post)
    }
  },

  submitCallback: function(data){
    if(data.status != 0){
      // 失败
      wx.showToast({title: '服务器错误，请稍后重试', icon: 'none'})
    }else{
      wx.showToast({title: '保存成功'})
      var pid = data.data.id
      console.log('success data', data)
      wx.redirectTo({
        url: '/pages/post/post?id=' + pid
      })
    }
  },

  doSubmit: function(post){
    // update or create post 
    var _this = this
    var data = this.data.post
    data['images'] = data['images'].join(',')
    app.request({
      url: '/api/v1/posts/',
      method: 'POST',
      data: {post: data},
      success: function(resp){
        return _this.submitCallback(resp.data)
      },
    })

  },

  nextStep: function(e){
    this.setData({step: 2})
  },

  previousStep: function(e){
    this.setData({step: 1})
  },

  clearError: function(){
    this.setData({error: {}})
  },
  
  inputChange: function(e){
    this.clearError()
  },

  showTypePicker: function(){
    this.selectComponent('#typepicker').onShow()
  },

  showPayment: function(){
    this.selectComponent('#payment').onShow()
  },

  showFitmentPicker: function(){
    this.selectComponent('#fitmentpicker').onShow()
  },

  paymentChanged: function(e){
    this.clearError()
    this.updatePostField('payment_cycle', e.detail.payment_cycle)
  },

  fitmentChanged: function(e){
    this.clearError()
    this.updatePostField('fitment', e.detail.fitment)
    this.updatePostField('fitment_id', e.detail.fitment.id)
  },

  typeChanged: function(e){
    this.clearError()
    console.log('aaa')
    var post = this.data.post
    post.s = e.detail.s
    post.t = e.detail.t
    post.w = e.detail.w
    post.position = e.detail.position
    this.setData({post : post })
  },

  floorChanged: function(e){
    this.clearError()
    this.updatePostField('current_floor', e.detail.current_floor)
    this.updatePostField('total_floor', e.detail.total_floor)
  },

  showFloorPicker: function(){
    this.selectComponent('#floorpicker').onShow()
  },

  showCityPicker: function(){
    this.selectComponent('#citypicker').onShow()
  },

  cityChanged: function(e){
    this.clearError()
    this.updatePostField('city', e.detail.city)
    this.updatePostField('city_id', e.detail.city.id)
    this.updatePostField('district_id', e.detail.district.id)
    this.updatePostField('district', e.detail.district)
  },

  imagesChanged: function(e){
    this.clearError()
    console.log('images change', e)
    var keys = Object.keys(e.detail)
    if(keys.includes('images')){
      this.updatePostField('images', e.detail.images)
    }
    if(keys.includes('cover_index')){
      this.updatePostField('cover_index', e.detail.cover_index)
    }
  },


  updatePostField: function(key, value){
    var post = this.data.post
    post[key] = value
    this.setData({post : post })
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

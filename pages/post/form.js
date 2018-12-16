// pages/post/new.js
const app = getApp()
var auth = require('../../utils/auth.js');
var minRentMonthItems = []
for(var i=1;i<=12;i++){
  minRentMonthItems.push({label: i+'个月', value: i})
}
minRentMonthItems.push({label: 24+'个月', value: 24})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: {},
    step: 1,
    cities: [],
    districts: [],
    imagesMin: 3,
    imagesMax: 15,
    minRentMonthItems: minRentMonthItems,
    post: {
      id: null,
      title: '',
    },
    draftCacheKey: null,

  },

  clearDraft: function(){
    // 这里将post设置为null，是为了在unload的时候，自动清理草稿箱
    this.setData({post: null})
  },

  genDraftCacheKey: function(q){
    var qStr = "post.draft." 
    qStr += q.group
    qStr += '.'
    qStr += q.rent_type
    qStr += '.is_sublet.'
    qStr += q.is_sublet
    this.setData({draftCacheKey: qStr})
    return qStr
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    var draftCacheKey = this.genDraftCacheKey(q)
    console.log('on load get cache', draftCacheKey)
    var post = wx.getStorageSync(draftCacheKey) || {id: null, title: ''}
    
    auth.ensureUser(function(user){
      _this.setData({user: user})
      if(q.id){
        // 如果是编辑房源，不需要取出草稿
        _this.loadPost(q.id)
      }else{
        // 如果是新建房源，需要取出草稿中
        _this.initBrokerInfo()
        _this.setData({post: post})
        _this.updatePostField('group', q.group || 'rental' )
        _this.updatePostField('rent_type', q.rent_type || 'zhengzu' )
        _this.updatePostField('is_sublet', q.is_sublet || false )
      }
    })
  },

  loadPost: function(pid){
    var _this = this
    app.request({
      url: '/api/v2/posts/' + pid,
      success: function(resp){
        var post = resp.data.data
        if(post.user_id != _this.data.user.id){
          console.log('error')
        }else{
          // 将有些字段进行装换
          post.images = post.images.split(',')
          _this.setData({post: post})
        }
      }
    })
  },

  initBrokerInfo: function(){
    var _this = this
    var keys = ['name', 'wechat', 'mobile']
    var value = ''
    keys.forEach(function(key, i) {
      key = 'broker_' + key
      value = wx.getStorageSync(key) || ''
      _this.updatePostField(key, value)
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onUnload: function () {
    var _this = this
    var key = this.data.draftCacheKey
    wx.setStorageSync(key, _this.data.post)
    console.log('on hide, set cache, key', key)
  },


  submit:function(e){
    var fdata = e.detail.value
    var post = this.data.post
    var _this = this

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

  showError: function(key, msg){
    console.log('show error ', key, msg)
    var error = this.data.error
    error[key] = true
    this.setData({error: error})
    wx.showToast({title: msg, icon: 'none'})
  },


  validateStep1: function(cb){
    this.setData({error: {}})
    var post = this.data.post
    var _this = this
    var isok= true

    if(!post.title){
      _this.showError('title', '请填写标题') 
      isok = false
    }

    if(post.images.length < _this.data.imagesMin || post.images.length > _this.data.imagesMax){
      _this.showError('images', '请上传' + _this.data.imagesMin + '~' + _this.data.imagesMax + '张房源照片')
      return
    }
    
    if(!post.district_id  || !post.city_id){
      _this.showError('district_id', '城市、行政区不能为空')
      return
    }

    if(!post.area_name){
      _this.showError('area_name', '请填写小区名称')
      return
    }

    if(!post.street){
      _this.showError('street', '请填写详细街道信息')
      return
    }

    if(post.group == 'rental' && !post.area){
      _this.showError('area', '请填写房间面积')
      return
    }

    if(post.group == 'old' && !post.construction_area){
      _this.showError('construction_area', '请填写建筑面积')
      return
    }


    if(post.group == 'rental' && !post.rent_price){
      _this.showError('rent_price', '请填写租金')
      return
    }


    if(post.service_charge_enable == true && !post.service_charge){
      _this.showError('service_charge', '服务费不能为空')
      return
    }

    if(post.group == 'old' && !post.total_price){
      _this.showError('total_price', '请填写详售价')
      return
    }

    if(!post.s && !post.t && !post.w){
      _this.showError('type', '请填写户型信息')
      return
    }

    if(!post.position){
      _this.showError('type', '请完善户型信息')
      return
    }

    if(!post.fitment_id){
      _this.showError('fitment_id', '请填写装修信息')
      return
    }

    if(!post.current_floor || !post.total_floor){
      _this.showError('floor', '请填写楼层信息')
      return
    }


    if(post.group == 'rental' && !post.payment_cycle){
      _this.showError('payment_cycle', '请填写租金支付方式')
      return
    }


    console.log('数据验证成功：', post)
    if(typeof cb == 'function'){
      return cb(post)
    }
  },

  validateStep2: function(cb){
    var _this = this
    var post = this.data.post
    if(!post.broker_name || post.broker_name.length <= 1 || post.broker_name.length > 5){
      _this.showError('broker_name', '姓名长度错误(2~5个字符)')
      return 
    }

    if(!post.broker_wechat && !post.broker_mobile){
      _this.showError('broker_mobile', '微信号和手机号必须填写一个')
      return
    }

    if(post.broker_mobile && post.broker_mobile.length != 11){
      _this.showError('broker_mobile', '手机号长度错误')
      return
    }

    if(post.broker_wechat && post.broker_wechat.length <= 3){
      _this.showError('broker_wechat', '微信号长度错误')
      return
    }


    if(typeof cb == 'function'){
      return cb(post)
    }
  },

  submitCallback: function(data){
    var _this = this
    if(data.status != 0){
      // 失败
      wx.showToast({title: '服务器错误，请稍后重试', icon: 'none'})
    }else{
      // 这里讲post设置成null,是为了unload的时候，清理草稿箱
      var isNew = !this.data.post.id
      var msg = data.data.message || '保存成功'
      wx.showModal({
        title: '操作成功',
        content: msg,
        confirmText: '预览',
        cancelText: '管理房源',
        success(res) {
          _this.clearDraft()
          if (res.confirm) {
            var pid = data.data.id
            wx.redirectTo({
              url: '/pages/post/post?id=' + pid
            })            
          } else if (res.cancel) {
            wx.redirectTo({
              url: '/pages/myself/posts',
            })
          }
        }
      })
    }
  },

  doSubmit: function(post){
    // update or create post 
    var _this = this
    var data = this.data.post
    var url = '/api/v2/posts/'
    var method = 'POST'
    if(_this.data.post.id){
      url = url + _this.data.post.id
      method = 'PUT'
    }
    console.log('url', url)

    app.request({
      url: url,
      method: method,
      data: {post: data},
      success: function(resp){
        // set 
        wx.setStorage({key: 'broker_name', data: data.broker_name})
        wx.setStorage({key: 'broker_mobile', data: data.broker_mobile})
        wx.setStorage({key: 'broker_wechat', data: data.broker_wechat})
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

  rentTypeClick: function(e){
    var v = e.currentTarget.dataset.name
    this.updatePostField('rent_type', v)
  },

  serviceChargeEnableChange: function(e){
    this.updatePostField('service_charge_enable', e.detail)
  },

  minRentMonthChange: function(e){
    var i = e.detail.value
    var item = this.data.minRentMonthItems[i]
    this.updatePostField('min_rent_month', item.value)
  },
  
  inputChange: function(e){
    var key = e.target.dataset.name
    var value = e.detail
    this.updatePostField(key, value)
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
    console.log('type changed', e)
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
    this.updatePostField('has_lift', e.detail.has_lift)
  },

  showFloorPicker: function(){
    this.selectComponent('#floorpicker').onShow()
  },

  showCityPicker: function(){
    this.setData({
      cityPickerShow: true
    })
  },

  cityChanged: function(e){
  
    this.clearError()
    this.updatePostField('city', e.detail.city)
    this.updatePostField('city_id', e.detail.city.id)
    this.updatePostField('district_id', e.detail.district.id)
    this.updatePostField('district', e.detail.district)
    this.setData({
      cityPickerShow: false
    })    
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
    if(keys.includes('video')){
      this.updatePostField('video', e.detail.video)
    }
    if(keys.includes('overlook_image')){
      console.log('set overlook image')
      this.updatePostField('overlook_image', e.detail.overlook_image)
    }

  },


  updatePostField: function(key, value){
    var d = {}
    var key = 'post.' + key
    d[key] = value
    this.setData(d)
  },



  /**
   * 生命周期函数--监听页面卸载
   */

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

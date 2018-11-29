// pages/myself/zhao.js
const app = getApp()
var auth = require('../../utils/auth.js');

var purposeList1 = [
      {name: '合租' },
      {name: '整租' },
      {name: '有电梯'},
      {name: '可做饭'},
      {name: '可养宠物'},
      {name: '繁华地段'},
      {name: '配套成熟'},
      {name: '交通便利'},
      {name: '品牌公寓'},
]

var purposeList2 = [
      {name: '学区房' },
      {name: '投资'},
      {name: '刚需'},
      {name: '自住'},
      {name: '父母住'},
      {name: '繁华地段'},
      {name: '配套成熟'},
      {name: '交通便利'},
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    
    contact_name: '',
    contact_mobile: '',
    contact_wechat: '',
    budget_min: 0,
    budget_max: 10000,
    purpose: '',
    position: '',
    contact: '',

    purposeList: [
      {name: '合租' },
      {name: '整租' },
      {name: '有电梯'},
      {name: '可做饭'},
      {name: '可养宠物'},
      {name: '繁华地段'},
      {name: '配套成熟'},
      {name: '交通便利'},
      {name: '品牌公寓'},

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var title = ''
    if(q.cat == 'rent'){
      title = '求租登记'
      this.setData({
        purposeList: purposeList1,
        budget_min: 500,
        budget_max: 10000,
        budget_min_value: 1000,
        budget_max_value: 1500,
        step: 100,
        priceUnit: '元',
        cat: 'rent',
      })
    }
    if(q.cat == 'buy'){
      title = '求购登记'
      this.setData({
        purposeList: purposeList2,
        budget_min: 10,
        budget_max: 1000,
        budget_min_value: 100,
        budget_max_value: 150,
        priceUnit: '万元',
        step: 5,
        cat: 'buy',
      })
    }
    wx.setNavigationBarTitle({ title: title })

    var _this  = this
    var eb = {
        key: 'switch',
        value: '/pages/myself/zhao',
    }
    app.setLoginBack()
    auth.ensureUser(function(userInfo){
      _this.setData({contact: userInfo.mobile || ''})
    })
  },

  getFormData: function(){
    var data = {}
  },

  budgetChange: function(e){
    var r = e.detail.range
    console.log('budget', r)
    this.setData({budget_min_value: r[0], budget_max_value: r[1]})
  },

  validate: function(cb){
    if(!this.data.purpose){
      wx.showToast({
        title: '请选择标签',
        icon: 'none'
      })
      return
    }

    if(!this.data.position){
      wx.showToast({
        title: '请填写区域',
        icon: 'none'
      })
      return
    }

    if(!this.data.contact_name){
      wx.showToast({
        title: '请填写联系信息',
        icon: 'none'
      })
      return
    }

    if(!this.data.contact_mobile && !this.data.contact_wechat){
      wx.showToast({
        title: '手机号和微信号至少填写一项',
        icon: 'none'
      })
      return
    }

    var data = {
      cat: this.data.cat,
      budget: this.data.budget,
      position: this.data.position,
      content: this.data.content,
      purpose: this.data.purpose,
      budget_min: this.data.budget_min,
      budget_max: this.data.budget_max,
      contact_name: this.data.contact_name,
      contact_mobile: this.data.contact_mobile,
      contact_wechat: this.data.contact_wechat,
    }
    return cb(data)
  },

  submitHandle: function(e){
    var _this = this
    app.uploadFormId(e)
    auth.ensureUser(function(userInfo){
        _this.validate(function(data) {
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
      })
  },

  inputChange: function(e){
    var key = e.target.dataset.name
    var value = e.detail
    var d = {}
    d[key] = value
    this.setData(d)
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

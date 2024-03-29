/**
 * +----------------------------------------------------------------------
 * | 友得云客  - 开启房产营销新纪元
 * +----------------------------------------------------------------------
 * | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
 * +----------------------------------------------------------------------
 * | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
 * +----------------------------------------------------------------------
 * | Author: UDEVE Team <tech@udeve.cn>
 * +----------------------------------------------------------------------
 */
// pkgBooking/pages/booking/index.js
const app = getApp()
const bookingApi = require("../../../api/booking")
const postApi = require("../../../api/post")
const smsApi = require("../../../api/sms")
var auth = require('../../../utils/auth.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    loading: false,
    currentDateIndex: 0,
    currentTimeIndex: 0,

    name: '',
    date: '',
    time: '',
    remark: '',
    mobile: '', // 如果当前用户已经登录，自动填充手机号， 并且不能被修改

    dates: [],
    postId: null,
    booked: false,
    post: null,
    smsCode: null,
    mobileLock: false,
    primaryBtnColor: "#ff9600",
    primaryColor: "#ff9600",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var user = app.globalData.userInfo
    var color = app.globalData.myconfigs.color
    this.setData({
      user: user,
      mobile: user ? user.mobile : '',
        primaryBtnColor: color.primary_btn,
        primaryColor: color.primary,
        postId: options.pid,
    })
    this.initDate()
    this.loadPostData(options.pid)
  },

  closeHandle: function () {
    this.setData({
      show: false
    })
    wx.navigateBack()
    this.triggerEvent('close', {})
  },

  initDate: function () {
    // 计算往后n天时间
    var days = 7 - 1
    var today = new Date()
    var todayTimes = this.initTime(today) // 当日的时间段
    var otherTimes = [] // 出今日以外，其他的可选时间段

    var hour = today.getHours()
    var startTime = today.getTime()
    var dates = []
    var weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    var labelHead = ["今天", "明天"]
    for (var i = 0; i <= days; i++) {
      var newTime = i * 24 * 60 * 60 * 1000 + startTime
      var day = new Date(newTime)
      var y = day.getFullYear()
      var m = day.getMonth() + 1
      var d = day.getDate()
      var w = day.getDay()
      if (m < 10) m = '0' + m;
      if (d < 10) d = '0' + d;
      var dateStr = y + '-' + m + '-' + d
      var label = m + '.' + d
      if (labelHead[i]) {
        label = label + '(' + labelHead[i] + ')'
      } else {
        label = label + '(' + weeks[w] + ')'
      }

      var times = []

      if (i == 0) {
        times = todayTimes
      } else {
        otherTimes = otherTimes.length > 1 ? otherTimes : this.initTime(day)
        times = otherTimes
      }

      // 如果今天时间已经超过了20点，就不显示今天
      if (i >= 1 || hour < 20) {
        dates.push({
          i: i,
          label: label,
          value: dateStr,
          times: times,
        })
      }

    }
    // console.log('dates', dates)
    this.setData({
      dates: dates
    })
  },

  initTime: function (d) {
    var _this = this
    var today = new Date()
    var hour = d.getHours()
    var times = []
    for (var h = 9; h <= 20; h++) {
      var label = h + ':00'
      var disabled = false

      // 如果是生成今天的时间段, 要判断是否可选时间段
      if (today.getDate() == d.getDate()) {
        disabled = h < hour
      }

      var item = {
        label: label,
        value: label,
        disabled: disabled,
      }

      times.push(item)
    }
    return times
  },


  dateClick: function (e) {
    var i = e.currentTarget.dataset['index']
    this.setData({
      currentDateIndex: i,
      currentTimeIndex: null
    })
  },

  timeClick: function (e) {
    var i = e.currentTarget.dataset['index']
    this.setData({
      currentTimeIndex: i
    })
  },

  validate: function (log) {},

  submitHandle: function () {
    var _this = this
    this.setData({
      loading: true
    })
    _this._submitHandle()
  },

  shoLoginWindow(){
    this.selectComponent('.loginwindow').openWindow()
  },

  loginsuccess(e){
    // console.log(e);
    var _this = this
    setTimeout(() => {
      var u = app.globalData.userInfo
      if (u && u.id) {
          _this.setData({
              mobile: u.mobile,
              mobileLock: true,
          })
      }
    },1000)

  },

  _submitHandle: function () {
    if (this.data.currentTimeIndex == null || this.data.currentDateIndex == null) {
      wx.showToast({
        title: '请选择预约时间',
        icon: 'none',
      })
      this.setData({
        loading: false
      })
      return false;
    }
    if (this.data.name == '') {
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'none'
      })
      this.setData({
        loading: false
      })
      return false
    }
    if (this.data.mobile == '') {
      wx.showToast({
        title: '请输入您的联系方式',
        icon: 'none'
      })
      this.setData({
        loading: false
      })
      return false
    }
    // console.log("this.data.mobile", this.data.mobile.length)
    if (this.data.mobile.length < '11') {
      wx.showToast({
        title: '号码格式错误，请重新输入',
        icon: 'none'
      })
      this.setData({
        loading: false
      })
      return false
    }


    var _this = this
    var log = {
      post_id: this.properties.postId,
      name: this.data.name,
      remark: this.data.remark,
      mobile: this.data.mobile,
      status: 0,
    }
    // console.log("log", log)
    var d = this.data.dates[this.data.currentDateIndex]
    var t = d.times[this.data.currentTimeIndex]
    log['time'] = t.value
    log['date'] = d.value

    app.bindPostCustomer(log.post_id, '点击了预约看房')
    this.setData({
      loging: true
    })
    //   √
    bookingApi.createBooking(
      log
    ).then((resp) => {
      _this.setData({
        loading: false
      })
      if (resp.data.status == 0) {
        // _this.triggerEvent('change', {
        //   value: true
        // })
        wx.showToast({
          title: '预约成功',
        })
        setTimeout(()=>{
          wx.navigateBack()
        },2000)
      }
    })
  },

  nameChange: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  mobileChange: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  wordChange: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },


  loadData: function () {
    var _this = this
    var user = app.globalData['userInfo']
    // 查询预约状态
    var query = {
      user_id: user.id,
      user_group: 'user',
      post_id: this.data.postId
    }
    bookingApi.getBookingList(query).then((res) => {

    })
  },

  loadPostData(pid){
    var _this = this
    postApi.getPostBaseInfo(pid).then((resp) => {
      if(resp.data.code != 0) { 
        return
      }
      var post = resp.data.data
      wx.setNavigationBarTitle({
        title: resp.data.data.title + '预约看房',
      })
      _this.setData({
          post: post
      })
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var u = app.globalData.userInfo
    if (u && u.id) {
        this.setData({
            mobile: u.mobile,
            mobileLock: true,
        })
    }

    var _this = this
    app.ensureConfigs((myconfigs) => {
        _this.setData({
            color: myconfigs.color.primary,
            btnColor: myconfigs.color.primary_btn
        })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    var _this = this
    return {
      title: _this.data.post.title + "预约看房",
      path: '/pkgBooking/pages/booking/index?pid=' + _this.data.postId
    }
  },
  onShareTimeline(){
    var _this = this
    return {
      title: _this.data.post.title + "预约看房",
      query: 'pid=' + _this.data.postId
    }
  }
})
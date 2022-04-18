// pages/news/show.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tourId: null,
    homebtn: null,
    joined: false,
    showForm: false,
    user: null,

    name: '',
    numbers: '',
    remark: '',

    html: '',
    item: null,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    app.checkForceLogin()
    this.setData({
      tourId: q.id
    })
    this.loadData()
  },

  formClose: function () {
    this.setData({
      showForm: false
    })
  },

  cancleJoin: function () {
    // 取消报名
    var data = {
      tour_id: this.data.item.id,
    }
    var _this = this
    app.request({
      url: '/api/v1/tour_members/0',
      method: 'DELETE',
      data: data,
      success: function (resp) {
        if (resp.data.status == 0) {
          wx.showToast({
            icon: 'none',
            title: '已取消报名',
          })
          _this.setData({
            joined: false,
            joinLoading: false
          })
        }
      }
    })
  },

  formSubmit: function () {
    if(this.data.loading){
      return 
    }
    // 提交报名
    var data = {
      tour_id: this.data.item.id,
      name: this.data.name,
      mobile: this.data.mobile, 
      numbers: this.data.numbers,
      remark: this.data.remark,
    }
    if(!data.name){
      wx.showToast({
        icon: 'none',
        title: '请填写联系人',
      })
      return false 
    }
    if(!data.numbers){
      wx.showToast({
        icon: 'none',
        title: '请填写人数',
      })
      return 
    }

    var _this = this
    this.setData({loading: true})
    this.formClose()
    app.request({
      url: '/api/v1/tour_members/',
      method: 'POST',
      data: data,
      success: function (resp) {
        _this.setData({loading: false})
        if (resp.data.status == 0) {
            wx.showModal({
              title: '报名成功',
              content: '您已成功报名此次活动。',
              showCancel: false,
              confirmText: '知道了',
              confirmColor: '#EC0101',
              success: (result) => {
                if (result.confirm) {
                  _this.loadData()
                }
              },
              fail: () => {},
              complete: () => {}
            });

        }
      }
    })
  },

  joinHandle: function (e) {
    console.log('join handle')
    this.setData({
      showForm: true,
      loading: false,
    })
  },

  loadData: function (cb) {
    var _this = this
    app.request({
      url: '/api/v1/tours/' + _this.data.tourId,
      success: function (resp) {
        var tour = resp.data.data.tour
        var joined = resp.data.data.joined
        var html = tour['content'] || ''
        var post = resp.data.data.post
        console.log('tour', tour, 'join', joined)
        if (html) {
          html = html.replace(/\<img/gi, '<img class="rich-text-img" ')
          html = html.replace(/\<p/gi, '<p class="rich-text-p" ')
        }
        _this.setData({
          item: tour,
          html: html,
          loading: false,
          post: post,
          joined: joined
        })
        wx.setNavigationBarTitle({
          title: tour.title + ' ' + tour.status.name,
        });

        return typeof cb == 'function' && cb(resp.data.data)
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  callHandle: function () {
    var m = this.data.item.server_mobile
    wx.makePhoneCall({
      phoneNumber: m,
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    var user =  app.globalData.userInfo
    var mobile = null 
    if(user && user.mobile){
      mobile = user.mobile
    }
    this.setData({
      user:user, 
      mobile: mobile, 
    })
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

  
  onShareTimeline(){

    var _this = this
    var title =  this.data.video.title
  
    var image = this.data.item.cover
    return {
        title: title,
        imageUrl: image
    }
 
},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.item.title,
      imageUrl: this.data.item.cover + "?imageView2/1/w/500/h/400",
      path: '/pkgTour/pages/tour/show?id=' + this.data.tourId
    }
  }
})
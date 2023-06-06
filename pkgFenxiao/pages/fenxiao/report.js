// pages/owner/sale.js

const app = getApp()
const api = require("../../../api/post")
var auth = require('../../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: null,
    posts: [],
    postIds: '',
    sex: 1,
    name: '',
    receiver_mobile: '',
    receiver_name: '',
    post_type: '',
    sexOptions: [{
        label: '先生',
        value: 1
      },
      {
        label: '女士',
        value: 0
      }
    ],
    houses: [{
        id: 1,
        selected: false,
        value: "不限"
      },
      {
        id: 2,
        selected: false,
        value: "一室"
      },
      {
        id: 3,
        selected: false,
        value: "两室"
      },
      {
        id: 4,
        selected: false,
        value: "三室"
      },
      {
        id: 5,
        selected: false,
        value: "四室"
      },
      {
        id: 6,
        selected: false,
        value: "五室及以上"
      }
    ],
    post: null,
    postValue: '',
    tabs: [
      {
        label: '全号',
        value: 'full'
      },
      {
        label: '隐号',
        value: 'protected'
      },
    ],
    name: '',
    mobile: '',
    remark: '',
    mobileType: 'full',
    setpsText: ["报备客户", "核实成交", "发放佣金"],
    popupShow: false,
    chooseShow: true,
    tags: [],
    broker: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    this.setData({
      pid: q.pid || ''
    })
    this.loadPost(q.pid)
  },
  sexChange: function (e) {
    var value = e.detail.item.value
    var sex = this.data.sex
    if (value === 0) {
      sex = 0
    } else {
      sex = 1
    }
    this.setData({
      sex: sex
    })
  },

  changeMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  checkboxChange(e) {
    let string = "houses[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.houses[e.target.dataset.index].selected
    })
    let detailValue = this.data.houses.filter(it => it.selected).map(it => it.value)
    this.setData({
      post_type: detailValue.join(',')
    })
  },
  
  gotoPost: function(){
      var _this = this 
      wx.navigateTo({ 
          url: '/pkgPost/pages/selector/index',  
          events: {
              change: function(post){ 
                  // TODO 选中了一个楼盘
                  _this.postAdd(post)
              }
          },
      })
  },

  gotoBroker: function() {
    var _this = this
    if(this.data.postIds == ''){
        wx.showToast({
          title: '请选择意向楼盘',
          icon: 'none'
        })
        return
    }
    wx.navigateTo({
      url: `/pkgBroker/pages/broker/selector?pid=${this.data.postIds}`,
      events: {
        change: function(b){ 
            _this.setData({
                broker: b
            })
        }
      }
    })
  },

  pidChange(e) {
    var p = e.detail
    this.setData({
      pid: p.id,
      popupShow: false
    })
    this.loadPost(p.id)
  },

  loadPostIds(){
    var posts = this.data.posts
    var postIdList = []
    posts.forEach((item) => {
        postIdList.push(item.id)
    })
    console.log(postIdList.toString(','))
    this.setData({
        postIds: postIdList.toString(',')
    })
  },

  postAdd(post) {
      var posts = this.data.posts
      var res = posts.filter((p) => p.id == post.id)
      if (res.length != 0) {
        return
      }
      posts.push(post)
      this.setData({
        posts: posts,
      })
      this.loadPostIds()
  },
  onClose(e) {
      var i = e.currentTarget.dataset.i
      var posts = this.data.posts
      posts.splice(i,1)
      this.setData({
        posts: posts,
      })
      this.loadPostIds()
  },


  loadPost: function (pid) {
    if (!pid) {
      return false;
    }
    var _this = this
    // app.request({
    //   url: '/api/v1/post_base_info/' + pid,
    //   success: function (resp) {
    //     var p = resp.data.data
    //     var post_name = p.title + p.address
    //     _this.setData({
    //       post: p,
    //       post_name: post_name,
    //     })
    //   }
    // })
    // 有待检验
    api.getPostBaseInfo(pid
    ).then((resp)=>{
        var p = resp.data.data
        var post_name = p.title + p.address
        _this.setData({
          post: p,
          post_name: post_name,
        })
    })
  },
  chooseHandle(e) {
    var value = e.detail.item.value
    var mobileType = this.data.mobileType
    var chooseShow = this.data.chooseShow
    if (value === 'protected') {
      mobileType = 'protected'
      chooseShow = true
    }
    if (value === 'full') {
      mobileType = 'full'
      chooseShow = false
    }
    this.setData({
      mobileType: mobileType,
      chooseShow: chooseShow
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  backHandle: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    app.ensureConfigs((myconfigs) =>{
        _this.setData({
            color: myconfigs.color.primary,
            btnColor: myconfigs.color.primary_btn
        })
    })
    wx.setNavigationBarTitle({
      title: '报备客户',
    })
    this.loadPost(this.data.pid)
    // 如果登陆了
    var user = app.globalData.userInfo
    if (user) {
      if (!this.data.introducer_mobile) {
        this.setData({
          introducer_mobile: user.mobile,
          introducer_name: user.name,
        })
      }
    }
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


  validateFormData: function (fdata) {
    if (!fdata['name']) {
      wx.showToast({
        title: '请填写客户姓名',
        icon: 'none'
      })
      return false;
    }

    if (!fdata['mobile'] || fdata['mobile'].length != 11) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
      return false;
    }

    if (!fdata['post_ids']) {
      wx.showToast({
        title: '请选择楼盘',
        icon: 'none'
      })
      return false;
    }

    return true
  },
  submitHandle: function (e) {
    var _this = this
    var fdata = {
      mobile: _this.data.mobile,
      name: _this.data.name,
      post_name: _this.data.post_name,
      sex: _this.data.sex,
      post_ids: _this.data.postIds,
      user_remark: _this.data.remark,
      id_number: _this.data.id_number,
      post_type: _this.data.post_type,
      post_area: _this.data.post_area,
      receiver_mobile: _this.data.receiver_mobile,
      broker_id: _this.data.broker.id,
      receiver_name: _this.data.receiver_name
    }
    var isok = this.validateFormData(fdata)
    if (!isok) {
      return false;
    }
    app.dingyueHandle()

    app.request({
      url: '/api/v1/customers',
      method: 'POST',
      data: {
        customer: fdata
      },
      success: function (resp) {
        if (resp.data.status != 0) {
          return false;
        }
        wx.showModal({
          title: '报备成功',
          content: '系统已经记录下该客户信息，一旦签约，你将获得相应的佣金',
          success: function (res) {
            // /pkgFenxiao/pages/fenxiao/customer-detail?id=id
            _this.setData({
              value: resp.data.data.id
            })
            wx.navigateTo({
              url: '/pkgFenxiao/pages/fenxiao/show?id=' + _this.data.value,
            })

          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},


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
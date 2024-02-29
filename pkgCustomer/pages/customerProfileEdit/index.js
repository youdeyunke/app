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
// pkgCustomer/pages/customerProfileEdit/index.js
const customerProfileApi = require("../../../api/customer_profile")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    type: '',
    customerId: null,
    profile: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(q) {
    var customerId = q.customerId
    var type = q.type
    this.setData({
      type: type,
      customerId: customerId,
    })
    this.loadOption(type)
    this.loadData(customerId)
  },

  onChange(event) {
    var profile = this.data.profile
    var type = this.data.type
    profile[type] = event.detail
    this.setData({
      profile: profile,
    });
  },
  nameChange(event) {
    // event.detail 为当前输入的值
    var profile = this.data.profile
    profile.name = event.detail
    this.setData({
      profile: profile,
    });
  },

  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    var profile = this.data.profile
    var type = this.data.type
    profile[type] = name
    this.setData({
      profile: profile,
    });
  },

  updateData() {
    var data = this.data.profile
    customerProfileApi.updateCustomerProfile(data.id, data).then((resp) => {
      if (resp.data.code != 0) {
        return
      }
      wx.showToast({
        title: '更新成功',
        icon: 'none',
      })
      setTimeout(() => {
        wx.navigateBack()
        this.getOpenerEventChannel().emit("change", data)
      }, 1500)
    })
  },

  loadData(id) {
    var _this = this
    var data = {
      customer_id: id
    }
    customerProfileApi.getCustomerProfile(data).then((resp) => {
      if (resp.data.code != 0) {
        return
      }
      this.setData({
        profile: resp.data.data
      })
    })
  },

  loadOption(type) {
    // 年龄
    var age = ["18-25", "25-30", "30-35"];

    // 性别
    var sex = ["男性", "女性", "其他"];

    // 意向等级
    var purchasing_urgency = ["紧急", "一般", "可观望"];

    // 意向面积
    var intend_area = ["50-80平米", "80-120平米", "120-150平米"];

    // 意向户型
    var intend_room_type = ["一室一厅", "两室一厅", "三室两厅"];

    // 意向总价
    var intend_total = ["200-300万", "300-500万", "500-800万"];

    // 意向单价
    var intend_single = ["1-2万/平米", "2-3万/平米", "3-4万/平米"];

    // 购房用途
    var purpose = ["自住", "投资", "商业"];

    if (type == "age") {
      this.setData({
        items: age
      })
    }
    if (type == "sex") {
      this.setData({
        items: sex
      })
    }
    if (type == "purchasing_urgency") {
      this.setData({
        items: purchasing_urgency
      })
    }
    if (type == "intend_area") {
      this.setData({
        items: intend_area
      })
    }
    if (type == "intend_room_type") {
      this.setData({
        items: intend_room_type
      })
    }
    if (type == "intend_total") {
      this.setData({
        items: intend_total
      })
    }
    if (type == "intend_single") {
      this.setData({
        items: intend_single
      })
    }
    if (type == "purpose") {
      this.setData({
        items: purpose
      })
    }
  },

  cancleHandle: function () {
    wx.navigateBack({
      delta: 1,
    })
    this.getOpenerEventChannel().emit("change")
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

  }
})
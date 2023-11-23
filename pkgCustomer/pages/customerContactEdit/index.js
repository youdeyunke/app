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
// pkgCustomer/pages/customerContactEdit/index.js
const customerContactApi = require("../../../api/customer_contact")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactId: null,
    customerId: null,
    name:'',
    value: '',
    cat: '',

  },

  loadContact(id){
    var _this = this
    customerContactApi.getCustomerContact(id).then((resp) => {
      if (resp.data.code != 0) {
        return
      }
      this.setData({
        name: resp.data.data.name,
        mobile: resp.data.data.mobile,
        cat: resp.data.data.cat
      })
    })
  },

  updateFollow(){
    var id = this.data.contactId
    var data = {
      name: this.data.name,
      mobile: this.data.mobile,
      cat: this.data.cat,
      customer_id: this.data.customerId
    }
    if (id) {
      customerContactApi.updateCustomerContact(id,data).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        wx.showToast({
          title: '更新成功',
          icon: 'none',
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1500)
      })
    } else {
      customerContactApi.createCustomerContact(data).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        wx.showToast({
          title: '新建成功',
          icon: 'none',
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1500)
      })
    }
  },

  deleteFollow(){
    var id = this.data.contactId
    customerContactApi.deleteCustomerContact(id).then((resp) => {
      if (resp.data.code != 0) {
        return
      }
      wx.showToast({
        title: '删除成功',
        icon: 'none',
      })
      setTimeout(()=>{
        wx.navigateBack()
      },1500)
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(q) {
    var contactId = q.id
    var customerId = q.customerId
    if(q.id){
      this.setData({
        contactId: contactId,
      })
      this.loadContact(contactId)
    }
    this.setData({
      customerId: customerId
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
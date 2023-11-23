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
// pkgCustomer/pages/createCustomer/index.js
const clueApi = require("../../../api/clue")
const customerApi = require("../../../api/customer")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusItems: [],
    statusId: null,
    name: '',
    mobile: '',
    sex: '',
    remark: '',
  },

  createCustomer(){
    var data = {
      name: this.data.name,
      mobile: this.data.mobile,
      status_id: this.data.statusId,
      sex: this.data.sex,
      remark: this.data.remark
    }
    console.log(data);
    customerApi.createCustomer(data).then((resp) => {
      if (resp.data.status != 0) {
        return
      }
      wx.showToast({
        title: '创建成功',
      })
      setTimeout(()=>{
        wx.navigateBack()
      },1500)
    })
  },

  loadData: function () {
    var _this = this
    clueApi.getClueStatusList().then((resp) => {
      if (resp.data.status != 0) {
        return
      }
      _this.setData({
        statusItems: resp.data.data,
      })
    })
  },

  itemClick: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    var item = this.data.statusItems[index]
    console.log('index', index, 'item', item)
    this.setData({
      statusId: item.id
    })

  },

  onChange(e){
    this.setData({
      sex: e.detail,
    });
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      sex: name,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData()
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
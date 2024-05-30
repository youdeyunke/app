/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// pkgShare/pages/index.js
const shareApi = require("../../api/share");
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(q) {
    var shareid = q.id
    var _this= this
    if (!shareid) {
      wx.showToast({
        title: '分享错误',
        icon: 'none'
      })
      // setTimeout(() => {
      //   wx.redirectTo({
      //     url: '/pages/home/home',
      //   })
      // },1000)
    }

    this.setData({
      shareId: shareid
    }, () => {
      wx.showLoading({
        title: '',
      })
      _this.loadData(shareid)
    })


  },

  loadData(id){
    var _this = this
    shareApi.getShareLog(id).then((resp) => {
      if (resp.data.code != 0) {
        return
      }
      var sharelog = resp.data.data
      var key = 'visitorUid'
      var vid = wx.getStorageSync(key);
      if (vid) {
        _this.addShareVisitors(vid)
      }
      wx.redirectTo({
        url: sharelog.target,
        success: function(res) {
          // 跳转成功
        },
        fail: function() {
          // 跳转失败
          wx.switchTab({
            url: sharelog.target,
          });
        }
      });
    })
  },

  addShareVisitors(uid){
    console.log(uid);
    var _this = this
    var sharelocalkey = 'share_id_' + this.data.shareId
    var isShare = wx.getStorageSync(sharelocalkey);
    if(isShare) { return }
    var shareid = this.data.shareId
    var data = {
      uid: uid,
      share_id: shareid
    }
    shareApi.addShareVisitors(data).then((resp) => {
      if (resp.data.code != 0) {
        return
      }
      wx.setStorageSync(sharelocalkey , true)
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
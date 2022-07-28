// pkgAdmin/pages/clue/form.js
import Notify from '../../../vant/notify/notify';
const app = getApp() 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: null,
    content: '',
    statusItems: [
     
    ],

    clueId: null,
    statusId: null, 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    if(q.status_id){
      var sid = parseInt(q.status_id)
    }
    this.setData({clueId: q.id, statusId: sid,})
    this.loadData()
  },
  

  submitHandle: function(e){
    if(this.data.loading){
      return
    }

    // validate
    var content = this.data.content  
    if(!content || content.length < 5){
      Notify({message: '请填写跟进日志详细内容，不少于5个字', type:'danger'})
      return false
    }
    
    if(!this.data.statusId ){
      Notify({message: '请选择一个状态', type:'danger'})
      return false
    }
    var data = { content: content, status_id:  this.data.statusId , clue_id: this.data.clueId }
    this.setData({loading: true })
    app.dingyueHandle()
    var _this = this 
    app.request({
      url: '/api/v1/clue_follows/', 
      method: 'POST', 
      data: { follow: data }, 
      success: function(resp){
        if(resp.data.status != 0){
          return false
        }
        _this.setData({loading: false})
        app.globalData.backToReload = true
    
        wx.showToast({
          title: '日志已提交成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: -1,
          })
        }, 1000)
      }
    })
    
    wx.showLoading({
      title: '提交中',
    })



  } ,

  loadData: function(){
    var _this = this 

    app.request({
      url: '/api/v1/clue_status', 
      success: function(resp){
        if(resp.data.status != 0){
          return
        }
        _this.setData({ 
          statusItems: resp.data.data, 
        })
      }
    })
  },


  contentHandle: function(e){
    var c = e.detail.value  
    this.setData({content: c})
  },

  itemClick: function(e){
    console.log('e',e)
    let index = e.currentTarget.dataset.index  
    var item = this.data.statusItems[index]
     console.log('index', index, 'item', item)
    this.setData({statusId: item.id })

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
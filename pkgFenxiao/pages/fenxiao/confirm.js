// pkgFenxiao/pages/fenxiao/confirm.js
const app = getApp() 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    assignBroker: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(q) {
    this.setData({ 
      id: q.id, 
    }, () => { 
      this.loadData()
    })
  },

  confirmHandle: function(){
    // 确认带看 
    var _this = this  
    var brokerId = this.data.assignBroker ? this.data.assignBroker.id : ''
    var data = {
      id: this.data.id ,
      broker_id: brokerId
    }
    app.request({ 
      url: '/api/v1/customers/confirm', 
      data: data, 
      method: 'POST', 
      success: function(resp){
        if(resp.data.status == 0){
          _this.loadData()
          wx.showToast({
            title: '已确认带看',
          })
        }
      }
    })
  },
  
  loadData:function(){
    var _this=this
    app.request({
      url:'/api/v1/customers/'+_this.data.id,
      methods:"GET",
      success:function(res){
        var logs = res.data.data.logs.map((log) => {
          var ds = log.created_at.split('T')
          var date = ds[0]
          var time = ds[1].split('.')[0]
          var dt = date + ' ' + time
          return {
            text: log.content + ' 【' + log.operator + '】', 
            desc:  dt, 
          }
        })
        var posts = []
        var postIds = []
        res.data.data.posts.map((m) => {
            posts.push(m.title)
            postIds.push(m.id)
        })
        _this.setData({
          value:res.data.data, 
          assignBroker: res.data.data.assign_broker,
          logs: logs ,
          loading: false, 
          posts: posts.toString(','),
          postIds: postIds.toString(',')
        })
      }
    })
  },

  gotoBroker: function() {
    var _this = this
    wx.navigateTo({
      url: `/pkgBroker/pages/broker/selector?pid=${this.data.postIds}`,
      events: {
        change: function(b){ 
            _this.setData({
                assignBroker: b
            })
        }
      }
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
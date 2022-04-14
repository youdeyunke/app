// pkgFenxiao/pages/fenxiao/customer-detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true, 
    is_admin: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    },()=>{
      this.loadData()
    })

  },

  onShow: function(){
    this.setData({user: app.globalData.userInfo })
    if(app.globalData.reloadCustomer){
      this.loadData()
      app.globalData.reloadCustomer = true
    }
  },

  loadData:function(){
    var _this=this
    console.log('xxyyzz',app.globalData.userInfo.is_admin)
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
        _this.setData({
          value:res.data.data, 
          logs: logs ,
          loading: false, 
          is_admin: app.globalData.userInfo.is_admin,
        })
      }
    })
  },
})
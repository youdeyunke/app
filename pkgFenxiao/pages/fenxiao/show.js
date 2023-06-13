// pkgFenxiao/pages/fenxiao/customer-detail.js
const app = getApp()
const customerApi = require("../../../api/customer")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true, 
    is_admin: false,
    palette:{
        background: '#f4f4f4',
        width: '600rpx',
        height: '600rpx',
        views: [
            {
            type: 'qrcode',
            content: '',
            css: {
                width: '600rpx',
                height: '600rpx',
            },
            }
        ],
    }
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
    // 有待检测
    // app.request({
    //   url:'/api/v1/customers/有待检测'+_this.data.id,
    //   methods:"GET",
    //   success:function(res){
       
    //   }
    // })
    customerApi.getCustomerDetail(_this.data.id).then((res)=>{
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
          res.data.data.posts.map((m) => {
              posts.push(m.title)
          })
          var palette = _this.data.palette
          palette.views[0].content = '/pkgFenxiao/pages/fenxiao/confirm?id='+res.data.data.id
          _this.setData({
            value:res.data.data, 
            logs: logs ,
            loading: false, 
            is_admin: app.globalData.userInfo.is_admin,
            palette: palette,
            posts: posts.toString(',')
          })
    })
  },
  onImgOK: function(e){
    var localQr = e.detail.path;
    this.setData({
        localQr: localQr
    })
  },
})
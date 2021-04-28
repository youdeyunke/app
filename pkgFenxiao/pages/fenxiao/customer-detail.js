// pkgFenxiao/pages/fenxiao/customer-detail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id 
    },()=>{
      this.loadPost()
    })

  },
  loadPost:function(){
    var _this=this
    app.request({
      url:'/api/v1/customers/'+_this.data.id,
      methods:"GET",
      success:function(res){
        console.log(res)
        _this.setData({
          value:res.data.data
        })
        console.log(_this.data.value)
        if(_this.data.value.sex===0){
          _this.setData({
            sex:'girl'
          })
        }
        else{
          _this.setData({
            sex:'boy'
          })
        }
      }
    })
  },
})
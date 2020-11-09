// pkgAmbitus/pages/ambitus/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId:null,
    ambitus:[],
    pois:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    this.setData({
      postId: q.post_id
    }, () => {
      _this.loadData()
      
    })

  },
  loadData(){
    var _this = this
    app.request({
      url:'/api/v4/posts/'+_this.data.postId,
      success: function(res) {
        //console.log(res.data.data);
        _this.setData({
          ambitus:res.data.data
        })
      wx.setNavigationBarTitle({title: _this.data.ambitus.title+'的周边配套'});
      }
    })
  },
  getMyevent(e) { //e为子组件传过来的值
    //console.log(e.detail)
    this.setData({
      pois: e.detail //这里是改变Page中data上的值
    })
  },
  onShareAppMessage: function () {

  },
})

// pages/map/index.js
const app = getApp()
const debug = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    posts: [],
    center: {},
    loading: false,
    mapViewHeight: '',
    postGroup: 'old',
    resultViewHeight: '0rpx;',
    resultViewState: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sys = app.globalData.system
    var h = sys.windowHeight * sys.pixelRatio
    this.setData({mapViewHeight: h + 'rpx'})
    this.getLocation()
  },

  popShow: function(){
    this.setData({
      popState: 1
    })
  },
  popClose: function(){
    this.setData({
      popState:0
    })
  },

  loadSubs: function(){
    var map = wx.createMapContext('map', this)
    // 获取屏幕范围内的经纬度，用于查询数据接口参数
    var _this = this
    map.getRegion({
      success(res) {
        // northeast : 东北，  southwest: 西南
        console.log('get region res', res)
        var latitude = res.southwest.latitude + ',' + res.northeast.latitude
        var longitude = res.southwest.longitude + ',' + res.northeast.longitude
        _this._loadSubs(latitude, longitude)
      }
    })       
  },

  _loadSubs: function (latitude, longitude){ 
    console.log('load subs')
    
    // 加载小区数据
    var _this = this
    // 标记点时候，将中心点也标记上

    var markers = []
    app.request({
      url: '/api/v1/sub_districts/',
      
      data: {
        per_page: 100,
        region_latitude: latitude,
        region_longitude: longitude,
      },

      success: function(resp){
        resp.data.data.forEach((sub,i) =>{
          console.log('sub', sub)
          if (sub.old_nums || sub.rental_nums){
            markers.push({
              iconPath: '/assets/icons/map-xiaoqu.png',
              id: i + 1,
              alpha: '0.6',
              latitude: sub.latitude,
              longitude: sub.longitude,
              width: 30,
              zIndex: 10,
              height: 30,
              callout: {
                content: sub.name,
                display: 'ALWAYS',
                borderRadius: 10,
                borderColor: '#00ae66',
                bgColor: '#00ae66',
                borderWidth: 1,
                fontSize: 12,
                color: '#ffffff',
                padding: 2,
                textAlign: 'center',
              }
            })            
          }
        })
        _this.setData({
          markers: markers
        })
      }
    })

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

  markertap: function(e){
    var sid = e.markerId
    console.log('markertap',  sid)
    this.loadPosts(sid)
    this.popShow()
  },

  loadPosts: function(sid){
    // 根据小区id查询下面的房源数据
    var query = {
      sub_district_id: sid,
      group_v2: this.data.postGroup,
    }
    var _this = this
    app.request({
      url: '/api/v2/posts',
      data: query,
      success(res){
        _this.setData({posts: res.data.data})
      }
    })
  },


  regionchange: function(e){
    console.log('region change', e)
    if (e.detail.type != 'end' || e.causedBy != 'drag'){
      return false
    }
    this.setData({loading: true})

    // 获取中心点的位置坐标
    var map = wx.createMapContext('map', this)
    var _this = this
    map.getCenterLocation({
      success: function (res) {
        console.log('res', res)
        _this.updateCenter(res.latitude, res.longitude)
      },
      fail: function(err){
        console.log('err', error)
      },
      complete: function(res){
        console.log('get center location', res)
      }
    })    
    this.setData({loading: false})

  },
  
  poiHandle: function(e){
    // 点击位置点，更新中心点
    console.log('poi click', e)
    var p = e.detail
    this.updateCenter(e.latitude, e.longitude)
  },

  updateCenter: function (latitude, longitude){
    // 更新地图的中心点信息
    var center = {
      longitude: longitude,
        latitude: latitude,        
    }
    this.setData({
      center: center,
    })
    // 重新加载小区数据
    this.loadSubs()
  },

  updateMarkers: function(subs){

  },

  getLocation: function(){
    // 定位到当前位置


    var _this = this
    // 检查是否有位置权限
    wx.getSetting({
      success(res){
        console.log('res ', res)
        if (!res.authSetting['scope.userLocation']){
          wx.openSetting({
            
          })
        }else{
          _this._getLocation()
        }
      }
    })
  },

  _getLocation: function(){
    var _this = this
    wx.getLocation({
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log('res', res)
        if (debug) {
          _this.updateCenter(31.19143, 121.31641)
          return false;
        }
        _this.updateCenter(res.latitude, res.longitude)
      }
    })        
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

  chooseLocation: function(){
    var _this = this
    wx.chooseLocation({
      success: function(res) {
        console.log('res', res)
        _this.updateCenter(res.latitude, res.longitude)
      },
    })
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
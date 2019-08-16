// pages/map/index.js
const app = getApp()
const debug = false
var map = null
const greenColor = '#00ae66'
const whiteColor = '#ffffff'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    currentGroupIndex: 0,
    groupItems: [
        {name: '二手房', value: 'old'},
        {name: '租房', value: 'rental'},
        {name: '新房', value: 'new'},
    ],
    posts: [],
    center: {},
    sid: null,
    mapViewHeight: app.globalData.system.windowHeight,
    loading: false,
    postGroup: 'old',
    resultViewState: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    map = wx.createMapContext('map', this)
    wx.setNavigationBarTitle({title: '地图找房'})
    //this.getLocation()
    this.initMap()
  },

  popShow: function(){
    this.setData({
      popState: 1
    })
  },

  popClose: function(){
    this.setData({
      sid: null,
      popState:0,
      posts: [],
    })
  },

  initMap: function(){
    // 初始化，第一次进入地图时候
    var pointsDict = {'old': [], 'new': [], 'rental': []}
    var points = []

    var _this = this
    app.request({
      url: '/api/v2/posts',
      success: function(resp){
        resp.data.data.forEach((post,i) =>{
          var sub = post.sub_district
          var point = {longitude: sub.longitude, latitude: sub.latitude}
          pointsDict[post.group].push(point)

        })

        var i = 0

        if(pointsDict['old'].length > 0){
          i = 0
          points = pointsDict['old']
        }else if(pointsDict['rental'].length > 0){
          i = 1
          points = pointsDict['rental']
        }else if(new_points.length > 0){
          id = 2
          points = pointsDict['new']
        }

        map.includePoints({
          points: points,
          success: function(){
            _this.setData({currentGroupIndex: i})
          },
        })
      },
    })
  
  },

  loadSubs: function(){
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
    var R = app.globalData.system.pixelRatio / 2.0
    var group = this.data.groupItems[this.data.currentGroupIndex].value || 'old'
    
    // 加载小区数据
    var _this = this
    // 标记点时候，将中心点也标记上

    var markers =  []
    app.request({
      url: '/api/v1/map_subs/',
      data: {
        region_latitude: latitude,
        region_longitude: longitude,
      },

      success: function(resp){
        resp.data.data.forEach((sub,i) =>{
          console.log('sub', sub)
          var marker = {
              iconPath: '/assets/images/none.png',
              id: sub.id,
              alpha: '0.6',
              latitude: sub.latitude,
              longitude: sub.longitude,
              width: 1,
              zIndex: 10,
              height: 1,
              callout: {
                content: sub.name,
                display: 'ALWAYS',
                borderRadius: 10 * R,
                borderColor: greenColor,
                bgColor: greenColor,
                color: whiteColor,
                borderWidth: 1 * R ,
                fontSize: 14 * R,
                padding: 6 * R ,
                textAlign: 'center',
              }
          } 
          switch(group){
              case 'old':
                  if(sub.old_nums > 0){
                      var t = ' | ' + sub.old_nums + '套'
                      marker.callout.content += t
                      markers.push(marker)
                  }
                  break;
              case 'rental':
                  if(sub.rental_nums > 0){
                      var t = ' | ' + sub.rental_nums + '套'
                      markers.push(marker)
                  }
                  break;
              case 'new':
                  if(sub.new_nums > 0){
                      var t = ' | ' + sub.new_nums + '套'
                      markers.push(marker)
                  }
                  break;
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
    if(sid == this.data.sid){
        return false;
    }

    console.log('markertap',  sid, e)
    // 改变marker的背景颜色
    var markers = this.data.markers
    markers.forEach((marker,i) => {
        var _borderColor = greenColor
        var _bgColor = greenColor
        var _color = whiteColor
        if(marker.id == sid){
            _bgColor = '#ff911b'
            _borderColor = '#ff911b'
        }
        marker['callout']['borderColor'] = _borderColor
        marker['callout']['bgColor'] = _bgColor
        marker['callout']['color'] = _color
    })

    this.setData({markers: markers, sid: sid}) 
    this.loadPosts(sid)
    this.popShow()
  },

  loadPosts: function(sid){
    // 根据小区id查询下面的房源数据
    var pGroup = this.data.groupItems[this.data.currentGroupIndex]
    var query = {
      sub_district_id: sid,
      group_v2: pGroup.value,
      order: 'id desc',
      per_page: 999,
    }
    var _this = this
    app.request({
      url: '/api/v2/posts',
      data: query,
      success(res){
        _this.setData({posts: res.data.data, total_posts: res.data.meta.total_entries})
      }
    })
  },


  regionchange: function(e){
    // 视野变化，重新加载sub数据
    this.popClose()

    console.log('region change', e)
    if (e.detail.type != 'end' ){
      return false
    }

    if(e.causedBy == 'update'){
        return false
    }

    this.loadSubs()

  },


  groupClick: function(e){
      console.log('e', e)
      var i = e.currentTarget.dataset.index
      this.setData({currentGroupIndex: i})
      this.popClose()
      this.loadSubs()
  },
  
  poiHandle: function(e){
    // 点击位置点，更新中心点
    console.log('poi click', e)

    var p = e.detail
    // 将位置移动到中心
    this.moveTo(p.latitude, p.longitude)
  },

  moveTo: function(latitude, longitude){
    map.moveToLocation({
        longitude: longitude,
        latitude: latitude,
        success(){ 
            // TODO 
        },
    })
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
          _this.moveTo(31.19143, 121.31641)
          return false;
        }
        _this.moveTo(res.latitude, res.longitude)
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
        _this.moveTo(res.latitude, res.longitude)
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

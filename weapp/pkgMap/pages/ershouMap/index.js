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
// pkgMap/pages/ershouMap/index.js
const app = getApp()
const houseApi = require("../../../api/house")
const mapApi = require("../../../api/map")
const debug = false
const bgColor = '#1989fa'
const whiteColor = '#ffffff'
const SCALE_DICT = {
    'city': 8,
    'district': 10,
    'sub_district': 12,
    'post': 12,
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
      level: 'city',
      scale: 8,
      map: null,
      filter: {},

      cityId: null,
      districtId: null,
      postId: null,
      markers: [],

      tabShow: true,
      post: null,
      center: {},
      sid: null,
      mapViewHeight: app.globalData.system.windowHeight,
      loading: true,
      resultViewState: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
      const map = wx.createMapContext('map', this)
      var filter = {}
      this.setData({
          map: map,
          filter: filter,
          // bgColor: app.globalData.myconfigs.color.primary,
      })
      wx.setNavigationBarTitle({
          title: '二手房地图找房'
      })
      var _this = this
      app.ensureConfigs((configs) => {
          _this.initMap()

      })
  },

  searchTextInput: function (e) {
      this.setData({
          searchText: e.detail
      })
  },

  clearSearch: function (e) {
      this.setData({
          searchText: ''
      })

  },

  filterChange: function (e) {
      // 当筛选条件改变
      var filter = e.detail
      if (filter.cityId) {
          this.setData({
              cityId: filter.city_id,
          })
          delete filter.city_id
      }
      if (filter.districtId) {
          this.setData({
              districtId: filter.district_id
          })
          delete filter.district_id

      }
      var _this = this
      this.setData({
          filter: filter
      }, () => {
          _this.loadMarkers('post')
      })

  },


  renderPost: function (pid) {
      // 显示所选房源
      var _this = this
      //  √
      houseApi.getHouseBlocks(pid).then((resp) => {
          if (resp.data.status != 0) {
              return false
          }
          var post = resp.data.data
          _this.setData({
              post: resp.data.data
          })
          _this.moveTo(post.latitude, post.longitude)
          _this.popShow()
      })
  },



  popShow: function () {
      this.setData({
          popState: 1
      })
  },

  popClose: function () {
      var scale = SCALE_DICT['sub_district']
      // console.log('pop close, set scale', scale)
      this.setData({
          popState: 0,
          scale: scale
      })
  },

  initMap: function (level = 'district') {
      // 初始化，第一次进入地图时候
      this.loadMarkers(level)
  },

  renderMarkers: function (markers) {

      // 将Markers 画在地图上
      // 根据不同的level，显示效果有所区别
      var _this = this
      var R = app.globalData.system.pixelRatio / 2.0
      var fontSize = app.globalData.system.fontSizeSetting * 0.8
      var padding = this.data.level == 'post' ? fontSize * 0.5 : fontSize * 2
      markers.map((m, i) => {
          var sub = m.sub_name || ''
          m._id = m.level + '.' + m.id // real id
          m.id = i // index 
        //   m.iconPath = '/assets/images/none.png',
              m.alpha = '0.6',
              m.width = 1,
              m.zIndex = 10,
              m.height = 1,

              m.callout = {
                  content: m.name + '\n' + sub,
                  display: 'ALWAYS',
                  borderRadius: fontSize,
                  borderColor: whiteColor,
                  bgColor: bgColor,
                  color: whiteColor,
                  borderWidth: R,
                  fontSize: fontSize,
                  padding: padding,
                  textAlign: 'center',
              }
          return m
      })
      var k = this.data.level
      var scale = SCALE_DICT[k]
      var _this = this
      this.setData({
          markers: markers
      }, () => {
          setTimeout(() => {
              wx.hideLoading();
              _this.setData({
                  loading: false
              })
          }, 3000);
      })

      if (this.data.level == 'city') {
          // 将中心点移动到第一个marker
          var m = markers[0]
          this.moveTo(m.latitude, m.longitude)
          return
      }

      // 将视野移动到
      this.data.map.includePoints({
          points: markers,
          padding: 20,
          success: function () { },
      })
  },

  upLevel: function () {
      // 返回上级视野
      var _this = this
      switch (this.data.level) {
          case 'city':
              break;
          case 'district':
              // 清空已经选中的district_id
              _this.loadMarkers('city')
              break;
          case 'post':
              _this.loadMarkers('district')
              break;
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  loadMarkers: function (level) {
      wx.showLoading({
          title: '加载地图...',
          mask: true,
      });
      this.setData({
          loading: true
      })

      var _level = level || 'district'
      var data = {
          district_id: this.data.districtId,
          city_id: this.data.cityId,
          level: _level,
      }
      // 合并filter 部分
      var filter = this.data.filter
      var _this = this
      Object.keys(filter).forEach((key, i) => {
          data[key] = filter[key]
      })
      var _this = this
      mapApi.getErshouMapMarkerList(data).then((resp) => {
          if (resp.data.status != 0) {
              return false
          }
          if (resp.data.data && resp.data.data.length > 0) {
              _this.setData({
                  level: _level
              })
              _this.renderMarkers(resp.data.data)
              return false
          }
          wx.showToast({
              title: '没有数据',
              icon: 'none'
          });
      })
  },

  markertap: function (e) {
      // console.log('marker click', e)
      var _this = this
      var index = e.detail.markerId
      // console.log('marker index ', index)
      var marker = this.data.markers[index]
      var markerId = marker._id
      // console.log('marker is', marker)
      this.setData({
          markerId: markerId
      })
      var res = markerId.split('.')
      var currentLevel = res[0]
      var nid = res[1]

      // 根据所点击的marker不同，加载不同数据
      var nextLevel = ''
      switch (currentLevel) {
          case 'city':
              this.setData({
                  cityId: nid
              })
              nextLevel = 'district'
              break;
          case 'district':
              this.setData({
                  districtId: nid
              })
              nextLevel = 'post'
              break;
          case 'house':
              // 房源被点击
              // 改变被点击的marker的背景颜色
              this.markerColorHandle(markerId)
              this.setData({
                  postId: nid
              })
              nextLevel = 'post'
              return this.renderPost(nid)
              return

      }
      // 加载下一级markers
      _this.loadMarkers(nextLevel)

      // TODO 
      //this.popShow()
  },
  markerColorHandle: function (markerId) {
      var markers = this.data.markers
      markers.forEach((marker, i) => {
          var _bgColor = bgColor
          var _color = whiteColor
          if (marker.id == markerId) {
              _bgColor = '#ff911b'
          }
          marker['callout']['bgColor'] = _bgColor
          marker['callout']['color'] = _color
      })
      this.setData({
          markers: markers,
          markerId: markerId
      })
  },


  regionchange: function (e) {
      // console.log('视角变化', e.type, e.causedBy)
      return
      if (e.type == 'begin') {
          this.scaleHandleStart(e)
      }
      if (e.type == 'end') {
          this.scaleHandleEnd(e)
      }
  },


  scaleHandleEnd: function (e) {
      if (this.data.scaleHandleEnable != true || e.causedBy != 'scale') {
          return false
      }
      // 地图被拖放
      // console.log('处理手势拖动缩放的情况', e)
      // 注意： 只需要处理用户手动缩放的情况
      // update的情况不需要处
      //  doc : https://developers.weixin.qq.com/miniprogram/dev/component/map.html
      this.popClose()
      var _this = this
      this.data.map.getScale({
          success (res) {
              // console.log('scale', res.scale)
              // 视野级别： 0~8：城市， 8~10：行政区， 10~12：商圈， 12~16：小区
              // 当视野扩大，自动显示上一级

              if (res.scale <= 10 && _this.data.level == 'district') {
                  _this.loadMarkers('city')
                  return
              }


              if (res.scale <= 16 && _this.data.level == 'post') {
                  _this.loadMarkers('district')

                  return
              }

          },
      })

  },



  moveTo: function (latitude, longitude) {
      this.setData({
          center: {
              longitude: longitude,
              latitude: latitude
          }
      })
      this.data.map.moveToLocation({
          longitude: longitude,
          latitude: latitude,
          success () { }
      })
  },

  getLocation: function () {
      // 定位到当前位置

      var _this = this
      // 检查是否有位置权限
      wx.getSetting({
          success (res) {
              if (!res.authSetting['scope.userLocation']) {
                  wx.openSetting({

                  })
              } else {
                  _this._getLocation()
              }
          }
      })
  },

  _getLocation: function () {
      var _this = this
      wx.getFuzzyLocation({
          success (res) {
              const latitude = res.latitude
              const longitude = res.longitude
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


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      path: '/pkgMap/pages/ershouMap/index',
      title: '二手房地图找房'
    }
  }
})
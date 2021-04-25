// pkgYfyj/pages/yfyj/index2/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: {},
    buildingdata: '',
    currentBuildingIndex: '',
    tabIndex: 1,
    detailsdata: '',
    buildingShow: true,
    detailstier: '',
    index: '',
    floordata: '',
    floor: '',
    floorRooms: '',
    newbuilding: ''
  },
  queryBuilding: function () {
    var _this = this
    app.request({
      url: '/api/v1/buildings?post_id=9',
      // data:query,
      success: function (res) {
        _this.setData({
          buildingdata: res.data.data,
          tabs: res.data.data.items
        })
      }
    })
  },
  tabChangeHandle: function (e) {
    console.log("eeeeee", e.detail)
    var tabs = this.data.tabs
    var index = this.data.tabIndex
    var name = tabs[index].id
    if (name == this.data.tab) {
      return
    }
    this.setData({
      tab: name
    }, )
  },
  queryDetails: function () {
    var _this = this
    app.request({
      url: '/api/v1/building_rooms?building_id=1',
      success: function (res) {
        if (res.data.status != 0) {
          return false
        }
        var mydata = res.data.data
        var floordata = (res.data.data).map((item) => {
          return item.floor
        })
        var myfloordata = Array.from(new Set(floordata)) //[1，3，5]
        // console.log("myfloordata",myfloordata)
        var groups = []
        myfloordata.forEach((floor) => {
          var newarr = {
            floor: floor,
            rooms: []
          }
          newarr.rooms = mydata.filter((r) => {
            return r.floor == floor
          })
          groups.push(newarr)
          // console.log("newarr", groups)
          _this.setData({
            floorRooms: groups,
            floordata: myfloordata,
            detailsdata: res.data.data,
          })
        })
      }
    })
  },
  mystatus: function (e) {
    var mystatus = e.detail.detailsShow
    var mybuilding = e.detail.myindex
    this.setData({
      detailsShow: mystatus,
      newbuilding: mybuilding
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryBuilding()
    this.queryDetails()
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
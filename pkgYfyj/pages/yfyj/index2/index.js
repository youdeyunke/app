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
    newbuilding: '',
    tabid:1,
    building_num:1,
    average:[]
  },
  queryBuilding: function () {
    var _this = this
    var query = this.data.tabIndex
    app.request({
      url: '/api/v1/buildings?post_id=9',
      // data:query,
      success: function (res) {
        _this.setData({
          buildingdata: res.data.data,
          tabs: res.data.data.items
        })
        // console.log("res",res.data.data)
      }
    })
  },
  tabChangeHandle: function (e) {
    var index = this.data.tabIndex
    var tab = this.data.tabs[index].id
    var building_num = this.data.tabs[index].name
    this.setData({
      tabIndex:e.detail,
      tabid:tab,
      building_num:building_num
    })
    this.queryDetails()
  },
  queryDetails: function () {
    var _this = this
    app.request({
      url: '/api/v1/building_rooms?building_id='+this.data.tabid,
      success: function (res) {
        if (res.data.status != 0) {
          return false
        }
        var mydata = res.data.data
        var floordata = (res.data.data).map((item) => {
          return item.floor
        })
        var myfloordata = Array.from(new Set(floordata)) //[1，3，5]
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
          // console.log("newarr", newarr)
          //求每层均价
          // var average_price = []
          // var areanum = (newarr.rooms).map((item)=>{return item.average_price})
          // // console.log("areanum",areanum)
          // var sum = 0
          // for(var i =0;i<areanum.length;i++){
          //   sum+=parseInt(areanum[i])
          // }
          // var average = Math.ceil(sum/areanum.length)
          // average_price.push(average)
          // console.log("avaerage",average)
          _this.setData({
            floorRooms: groups,
            floordata: myfloordata,
            detailsdata: res.data.data,
            average:average
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
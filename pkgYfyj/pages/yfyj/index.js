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
    tabid: 1,
    building_num: 1,
    average: [],
    searchShow: false,
    resultShow:false,
    post_id:null,
    // building:false,
    price_between: [{
        value: '不限',
        select: true
      },
      {
        value: '50-70',
        select: false
      },
      {
        value: '70-90',
        select: false
      },
      {
        value: '90-110',
        select: false
      },
      {
        value: '110-130',
        select: false
      },
      {
        value: '130-150',
        select: false
      },
      {
        value: '150-170',
        select: false
      },
      {
        value: '3000-4000',
        select: false
      }
    ],
    area_price: [{
      value: '不限',
      select: true
    }, 
    {
      value: '5000-6000',
      select: false
    }, 
    {
      value: '6000-7000',
      select: false
    }, 
    {
      value: '7000-8000',
      select: false
    }, 
    {
      value: '8000-9000',
      select:false
    }, 
    {
      value: '8000-9000',
      select:false
    }, 
    {
      value: '8000-9000',
      select:false
    }, 
    {
      value: '2400-2500',
      select:false
    }, 
    ],
    area:[
      {
        value:'不限',
        select:true
      },
      {
        value:'60-70',
        select:false
      },
      {
        value:'70-80',
        select:false
      },
      {
        value:'80-90',
        select:false
      },
      {
        value:'90-100',
        select:false
      },
      {
        value:'90-100',
        select:false
      },
      {
        value:'90-100',
        select:false
      },
      {
        value:'150-160',
        select:false
      },
    ],
    formdata:{
      price:'不限',
      areaprice:'不限',
      area:'不限'
    }
  },
  queryBuilding: function () {
    var _this = this
    var query = {post_id:this.data.post_id}
    app.request({
      url: '/api/v1/buildings',
      data:query,
      success: function (res) {
        console.log("buildingdata",res.data.data)
        if(res.data.data.items==''){
          console.log("没有数据")
          wx.showToast({
            title: '该房源还没有开通一房一价',
            icon:'none'
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: -1,
            })
          },1500)
        }else{
          _this.setData({
            buildingdata: res.data.data,
            tabs: res.data.data.items
          })
        }
      }
    })
  },
  tabChangeHandle: function (e) {
    var index = this.data.tabIndex
    var tab = this.data.tabs[index].id
    var building_num = this.data.tabs[index].name
    this.setData({
      tabIndex: e.detail,
      tabid: tab,
      building_num: building_num
    })
    this.queryDetails()
  },
  queryDetails: function () {
    var _this = this
    app.request({
      url: '/api/v1/building_rooms?building_id=' + this.data.tabid,
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
            rooms: [],
            areanum: [],
            area_min: '',
            area_max: '',
            total_min: '',
            total_max: ''
          }
          newarr.rooms = mydata.filter((r) => {
            return r.floor == floor
          })
          //求平均值
          var newareanum = (newarr.rooms).map((item) => {
            return item.average_price
          })
          var sum = 0
          for (var i = 0; i < newareanum.length; i++) {
            sum += parseInt(newareanum[i])
          }
          var average = Math.ceil(sum / newareanum.length)
          newarr.areanum = average

          //求面积区间
          var areabetween = (newarr.rooms).map((item) => {
            return item.area
          })
          var areamin = Math.min.apply(null, areabetween)
          var areamax = Math.max.apply(null, areabetween)
          newarr.area_min = areamin
          newarr.area_max = areamax

          //求价格区间
          var total_price = (newarr.rooms).map((item) => {
            return item.total_price
          })
          var totalmin = Math.min.apply(null, total_price)
          var totalmax = Math.max.apply(null, total_price)
          newarr.total_min = totalmin
          newarr.total_max = totalmax
          groups.push(newarr)
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
  unfoldSearch: function () {
    this.setData({
      searchShow: !this.data.searchShow
    })
  },
  closeSearch: function () {
    this.setData({
      searchShow: !this.data.searchShow
    })
  },
  priceHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var select = this.data.price_between
    for(var i = 0;i<select.length;i++){
      select[i].select=false
    }
    select[index].select = !select[index].select
    var key = e.currentTarget.dataset.key
    var formdata = this.data.formdata
    var myformdata = select.filter((myvalue)=>{return myvalue.select===true}).map((myvalue)=>{return myvalue.value})
    formdata[key]=myformdata.toString()
    this.setData({
      price_between: select,
      formdata:formdata
    })
  },
  areapriceHandle:function(e){
    var areaprice = this.data.area_price
    var index = e.currentTarget.dataset.index
    for(var i = 0;i<areaprice.length;i++){
      areaprice[i].select=false
    }
    areaprice[index].select = !areaprice[index].select
    var key = e.currentTarget.dataset.key
    var formdata = this.data.formdata
    var myformdata = areaprice.filter((myvalue)=>{return myvalue.select===true}).map((myvalue)=>{return myvalue.value})
    formdata[key]=myformdata.toString()
    this.setData({
      area_price:areaprice,
      formdata:formdata
    })
  },
  areaHandle:function(e){
    var area = this.data.area
    var index = e.currentTarget.dataset.index
    for(var i = 0;i<area.length;i++){
      area[i].select=false
    }
    area[index].select = !area[index].select
    var key = e.currentTarget.dataset.key
    var formdata = this.data.formdata
    var myformdata = area.filter((myvalue)=>{return myvalue.select===true}).map((myvalue)=>{return myvalue.value})
    formdata[key]=myformdata.toString()
    this.setData({
      area:area,
      formdata:formdata
    })
  },
  submitHanle:function(){
    this.setData({
      searchShow: !this.data.searchShow
    })
    console.log("数据",this.data.formdata)
  },
  resetHandle:function(){
    var myformdata = this.data.formdata
    var myprice_between = this.data.price_between
    myprice_between.map((item=>{return item.select=false}))
    myprice_between[0].select=true
    myformdata.price=myprice_between[0].value

    var myarea_price = this.data.area_price
    myarea_price.map((item=>{return item.select=false}))
    myarea_price[0].select=true
    myformdata.areaprice=myarea_price[0].value

    var myarea = this.data.area
    myarea.map((item=>{return item.select=false}))
    myarea[0].select=true
    myformdata.area=myarea[0].value

    this.setData({
      price_between:myprice_between,
      area_price:myarea_price,
      area:myarea,
      formdata:myformdata
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var post_id = options.post_id || options.id
    var _this = this
    _this.setData({
      post_id:post_id
    },function(){
      _this.queryBuilding()
      _this.queryDetails()
    }

    )
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
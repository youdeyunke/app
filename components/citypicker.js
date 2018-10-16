// components/citypicker.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 初始值，为[city_id, district_id]
    city: {type: Number},
    district: {type: Number}

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready: function(){
    this.loadCityList() 
    if(this.data.city){
      this.loadDistrictList(this.data.city) 
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  changeHandle: function(e){
    var val = e.detail.value
    var cityIndex = val[0]
    var districtIndex= val[1]
    console.log('va', val)

    if(cityIndex == 0){
      this.setData({districts: []})
      return [null, null]
    }

    var cid = this.data.cities[cityIndex].id
    this.loadDistrictList(cid)
    if(districtIndex == 0){
      return [cid, null]
    }

    var did = this.data.districts[districtIndex].id
    return [cid, did]

  },


  loadDistrictList: function(cityId){
    var _this = this
    app.request({
      url: '/api/v1/districts/',
      data: {city_id: cityId},
      hideLoading: true,
      success: function(resp){
        var data = [{id: null, name: '不限'}].concat(resp.data.data)
        _this.setData({districts: data})
      }
    })
  },


  loadCityList: function(){
    var _this = this
    app.request({
      url: "/api/v1/cities/",
      data: {},
      hideLoading: true,
      success: function(resp){
          var data = [{id: null, name: '不限'}].concat(resp.data.data)
          _this.setData({cities: data})
      },
    })

  },

  }
})

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
    show: false,
    value: [0, 0],
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
    onShow: function(){
      this.setData({show: true})
    },

    onClose: function(){
      this.setData({show: false})
    },

    onConfirm: function(){
      this.setData({show: false})
      var val = this.data.value
      console.log('val', val)
      var city = this.data.cities[val[0]]
      var district = this.data.districts[val[1]]
      this.triggerEvent('confirm', {city: city, district:district})
    },

  changeHandle: function(e){
    var val = e.detail.value
    var cityIndex = val[0]
    var districtIndex= val[1]
    var cid = this.data.cities[cityIndex].id

    this.setData({value: val})
    this.loadDistrictList(cid)


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

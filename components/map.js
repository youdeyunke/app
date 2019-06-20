// components/map.js
const app = getApp()


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    longitude: { type: Number },
    latitude: {type: Number},
    width: {type: Number, value: 750},
    height: {type: Number, value: 320},
    image: {type: String, value: ''},
    name: {type: String, value: null},
  },

  /**
   * 组件的初始数据
   */
  data: {
    ak: 'FdgWb2yDCALRFnQ1978WKpwztv4dHOHD',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ready: function(){
        wx.hideLoading()
    },

    clickHandle: function(e){
      app.uploadFormId(e)
      
      var _this = this
      wx.showLoading({
        title: '正在打开地图',
        mask: true
      })

      wx.getLocation({
        type: 'wgs84', //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = _this.data.latitude
          const longitude = _this.data.longitude
          wx.openLocation({
            latitude,
            longitude,
            scale: 18
          })
          wx.hideLoading()
        }
      })      
    },
  }
})

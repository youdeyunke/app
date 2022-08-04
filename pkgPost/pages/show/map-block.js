// pages/post/map-block.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      value: {type: Object, default: {}}

  },

  /**
   * 组件的初始数据
   */
  data: {
    pois:[],
    map: null,
    markers: [],
  },
  observers: {
    // 'pois': function (pois) {
    //     this.getMapContext()
    //     this.setMarker()
    // }
  },
  ready: function () {
    // this.setMarker()
  },
  attached: function () {
    var map = wx.createMapContext('map', this);
    this.setData({
        map: map
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    getLocation:function(){
      var _this = this
      //先获取授权状态
      wx.getSetting({
        success: (res)=>{
          console.log(res.authSetting)
          //如果scope.userLocation 为false 则引导用户授权
          if(!res.authSetting['scope.userLocation']){
            _this.openSetting()
          }else{
            //如果为true 则直接获取地理位置
            _this.openLocation()
          }
        },
      });
    },
    openLocation:function(){
      wx.openLocation({
        latitude:Number(this.data.value.latitude),
        longitude:Number(this.data.value.longitude),
        name:this.data.value.name,
        address:this.data.value.address
      })
    },
    openSetting(){
        var _this = this
        wx.showModal({
        title: '权限不足',
        showCancel:false,
        content: "请先打开“使用我的地理位置”开关",
        confirmText:"去授权",
        success (res) {
            if (res.confirm) {
            wx.openSetting({
                success: (res)=>{
                _this.openLocation()
                },
            });
            } 
        }
        })
    },
    // getMyevent(e) { //e为子组件传过来的值
    //     //console.log(e.detail)
    //     this.setData({
    //         pois: e.detail //这里是改变Page中data上的值
    //     })
    //     this.getMapContext()
    //     this.setMarker()
    // },
    // getMapContext() {

    //     var _this = this
    //     var arr = []
    //     arr.push({ longitude: this.data.value.longitude, latitude: this.data.value.latitude })
    //     var pois = this.data.pois
    //     pois.forEach(v => {
    //         var obj = {}
    //         obj.longitude = v.location.lng
    //         obj.latitude = v.location.lat
    //         arr.push(obj)
    //     })
    //     // //缩放视野展示所有经纬度 此方法传入的数组不能为空 所以手动进行非空验证
    //     // if(pois.length ==0){
    //     //     return
    //     // }
    //     // this.data.map.includePoints({
    //     //     points: arr,
    //     //     padding: [50, 50, 50, 50]
    //     // });
    //     console.log('经纬度arr',arr)
    //     this.setData({
    //         points: arr
    //     })
    // },
    // setMarker: function () {
    //     this.setData({markers: []})
    //     var pois = this.data.pois
    //     var markers = []
    //     var _this = this
    //     const bgColor = '#ff0000'
    //     const whiteColor = '#ffffff'
    //     var R = app.globalData.system.pixelRatio / 2.0
    //     var fontSize = app.globalData.system.fontSizeSetting * 0.8
    //     var padding = fontSize * 1
    //     var marker = {
    //         iconPath: '/assets/icons/marker.png',
    //         alpha: '0.5',
    //         latitude: _this.data.value.latitude,
    //         longitude: _this.data.value.longitude,
    //         width: "40rpx",
    //         height: "40rpx",
    //         zIndex: 10,
    //         callout : {
    //             content: _this.data.value.name, 
    //             bgColor: '#1989F9', 
    //             borderRadius: 4,
    //             display: 'ALWAYS',
    //             color: '#FFF', 
    //             padding:6,
    //             textAlign: 'center'
    //         }
    //     }
    //     markers.push(marker)

    //     // 以下是周边配套的定位点
    //     pois.forEach((v,i) => {
    //         var m = {
    //             id: v.id, 
    //             //iconPath: '/assets/icons/marker.png',
    //             latitude: v.location.lat,
    //             width:'40rpx',
    //             height:'40rpx',
    //             longitude: v.location.lng,
    //         }
    //         m.alpha = '0.6',
    //         m.width = 1,
    //         m.zIndex = 10,
    //         m.height = 1,
    //         m.callout = {
    //             content: i+1, 
    //             bgColor: '#ffffff', 
    //             borderRadius: 20,
    //             borderWidth: 2,
    //             borderColor:'#333333',
    //             display: 'ALWAYS',
    //             color: '#333333', 
    //             padding:6,
    //             textAlign: 'center'
    //         }
    //         markers.push(m)
    //     })
    //     this.setData({ markers: markers })
    //     console.log('markers', this.data.markers)
    // },
  }
})

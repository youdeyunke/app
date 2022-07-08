// pages/post/map-block.js
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
    pois:[]
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
    getMyevent(e) { //e为子组件传过来的值
        //console.log(e.detail)
        this.setData({
        pois: e.detail //这里是改变Page中data上的值
        })
    }
  }
})

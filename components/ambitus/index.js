//index.js
//获取应用实例
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    longitude: { type: Number },
    latitude: { type: Number },
  },
  /**
   * 组件的初始数据
   */
  data: {
    array:['地铁','幼儿园','小学','中学','美食','购物','公交','银行'],
    resp:[],
    active: 0,
    isShow:0
  },
  ready: function() {
    this.get()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getContent(e){
      var _this = this
      var app = getApp()
      var name = e.detail.title
      //console.log(e.detail);
      wx.request({
        url: 'https://apis.map.qq.com/ws/place/v1/search',
        data:{
          keyword:name,
          key:app.globalData.qqMapAppKey,
          boundary:`nearby(${this.data.latitude},${this.data.longitude},1000,0)`,
          page_size:'20'
        },
        success:function(res){
          //console.log(res);
          if(res.data.data.length == 0){
            _this.setData({
              resp:'',
              isShow : 1
            })
          }else{
            res.data.data.map(v=>{
              if(v._distance>=1000){
                v._distance= 1+'km'
              }else{
                v._distance= parseInt(v._distance)+'m'
              }
            })
            _this.setData({
              resp:res.data.data,
              isShow:0
            })
          }
        }
      })
    },
    get(){
      var _this = this
      var arr =this.data.array
      var active = this.data.active
      wx.request({
        url: 'https://apis.map.qq.com/ws/place/v1/search',
        data:{
          keyword:arr[active],
          key:app.globalData.qqMapAppKey,
          boundary:`nearby(${this.data.latitude},${this.data.longitude},1000,0)`,
          page_size:'20'
        },
        success:function(res){
          if(res.data.data.length == 0){
            _this.setData({
              isShow : 1
            })
          }else{
            res.data.data.map(v=>{
              if(v._distance>=1000){
                v._distance= 1+'km'
              }else{
                v._distance= parseInt(v._distance)+'m'
              }
            })
            _this.setData({
              resp:res.data.data
            })
          }
        }
      })
    }
  }
})

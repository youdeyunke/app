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
   // tabs :['地铁','幼儿园','小学','学校：中学','美食','购物','公交','银行'],
  tabs: [
    {name:'地铁', value: '地铁'},
    {name:'幼儿园', value:'学校:幼儿园'},
    {name:'小学', value:'学校:小学'},
    {name:'中学', value:'学校:中学'},
    {name:'美食', value:'美食'},
    {name:'购物', value:'购物'},
    {name:'公交', value:'公交'},
    {name:'银行', value:'银行'},
  ] ,
  resp:[],
    active: 0,
    isShow:0,
    contentAll:1,
    maxLength:2,
    buttonShow:true,
    buttonVal:'展开全部'
  },
  ready: function() {
    this.getContent()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabHandle:function(e){
      const { index } = e.detail 
      this.setData({active:index })
      this.getContent() 
    }, 


    getContent(e){
      var _this = this
      var app = getApp()
      var tab = this.data.tabs[this.data.active]
      wx.request({
        url: 'https://apis.map.qq.com/ws/place/v1/search',
        data:{
          keyword:tab.value,
          key:app.globalData.qqMapAppKey,
          boundary:`nearby(${this.data.latitude},${this.data.longitude},1000,0)`,
          page_size:'20'
        },
        success:function(res){
          //console.log(res.data.data);
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
          if(res.data.data.length<=2){
            _this.setData({
              buttonShow:false
            })
          }else{
            _this.setData({
              buttonShow:true
            })
          }
          _this.triggerEvent('myevent',res.data.data)
        }
      })
    },
    moreHandle(){
      var maxlength  = this.data.maxLength
      if(maxlength ==2){
        this.setData({
          maxLength:this.data.resp.length,
          buttonVal:'收起'
        })
      }else{
        this.setData({
          maxLength:2,
          buttonVal:'展开全部'
        })
      }
    },
  }
})

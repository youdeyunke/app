//index.js
//获取应用实例
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  /**
   * 组件的初始数据
   */
  data: {
    array:['地铁','幼儿园','小学','中学','美食','购物','公交','银行'],
    resp:[],
    active: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getContent(title){
      var _this = this
      var app = getApp()
      var name = title.detail.title
      console.log(name);
      wx.request({
        url: 'https://apis.map.qq.com/ws/place/v1/search',
        data:{
          keyword:name,
          key:app.globalData.qqMapAppKey,
          boundary:'nearby(34.337771,108.935397,1000,0)',
          page_size:'20'
        },
        success:function(res){
          console.log(res);
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
      })
    }
  }
})

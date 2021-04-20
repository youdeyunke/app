// pkgSearch/components/search-item/index.js
const app = getApp();
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
    house:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready:function(){
    var _this = this
    app.request({
      url: '/api/v1/hot_search',
      method:'GET',
      success:function(res){
        _this.setData({
          house:res.data.data
        })
      }
    })
  }
})

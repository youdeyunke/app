// pkgSearch/components/search/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    house_list:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectHanlde:function(e){
      var house = this.data.house_list[e.currentTarget.dataset.index]
      this.triggerEvent("changevalue",house)
    }
  },
  observers:{
    'value':function(v){
      var _this = this
      var myvalue = v
      app.request({
        url: '/api/v2/posts/quicksearch',
        method: 'GET',
        data: {
          kw: myvalue
        },
        success:function(res){
          _this.setData({
            house_list:res.data.data
          })
          //changeShow:控制筛选组件是否显示
        _this.triggerEvent("changeShow",res.data.data)
        }
      })
    }
  }
})

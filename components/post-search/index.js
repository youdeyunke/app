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
    house_list:'',
    mytitle:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectHanlde:function(e){
      var myid = e.currentTarget.dataset.myid
      var mytitle = e.currentTarget.dataseft.mytitle
      this.triggerEvent("changevalue",{myid,mytitle})
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
          // 
        _this.triggerEvent("changeShow",res.data.data)
        }
      })
    }
  }
})

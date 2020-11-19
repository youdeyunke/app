// components/post-selector/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{type:Boolean}
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: '',
    postItem:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({ show: false });
    },
    onChange(e){
      var _this = this
      let kw = e.detail
      if(kw == ''){
        this.setData({
          postItem:[]
          
        })
        return
      }
      app.request({
        url:'/api/v2/posts/quicksearch?kw='+kw,
        success: function(res) {
          _this.setData({
            postItem:res.data.data
          })
        }
      })
    },
    pidChange(e){
      const { id } = e.currentTarget.dataset
      this.triggerEvent("change", id )
    }
  }
})

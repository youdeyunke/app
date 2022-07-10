// components/common-filter-v2/menu-body.js
const app = getApp() 

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
    },
    show: {
      type: Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false, 
    currentIndex:0, 


  },

  attached: function(){
      var _this = this 
    app.ensureConfigs((myconfigs) => { 
        _this.setData({
          color: myconfigs.color.primary,
        })
      })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    itemClick: function (e) {
      const {index} = e.currentTarget.dataset 
      this.setData({currentIndex: index})
      var op = this.data.item.options[index]
      var data = {
        key: this.data.item.key , 
        value: op.value
      }
      this.triggerEvent('change', data )
      
    }


  }
})

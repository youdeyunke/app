// components/ud/ud-tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses:['mytabs','myborder'],
  properties: {
    tabs:{type:Array},
    activeIndex:{type:Number ,value:0}
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabChange(e){
      const{index} = e.currentTarget.dataset
      this.setData({
        activeIndex:index
      })
      this.triggerEvent('change',index)
    }
  }
})

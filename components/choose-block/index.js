// components/choose-block/choose-block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options:{
      type:Array,
      value:''
    },
    value:{
      type:String,
      value:''
    },

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods:{
    change(e) {
      var {item}=e.currentTarget.dataset
      this.triggerEvent("changeStatus",{item})
    }
  }
})

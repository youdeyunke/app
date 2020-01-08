// components/no-result.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      height: null,
      text: {type:String, value: '没有数据'},
  },

  observers:{
      "height": function(v){
          this.setData({
              heightStr: v + 'px'
          })
      },
  },

  ready: function(){
    var system = wx.getSystemInfoSync()
    var height = system['windowHeight']
    this.setData({height: height})
  },

  /**
   * 组件的初始数据
   */
  data: {
      heightStr: '100%'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

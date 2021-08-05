// components/pagemaker/posts/post-item0.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    post: { type: Object, value: {} },
    border: {type: Boolean, value: true, },
  },

  observers: {
    "post": function(p){
      if(!p){
        return 
      }
      if(!p.id){
        return
      }
      if(!p.url){
        var url = '/pkgPost/pages/show/index?id=' + p.id
        this.setData({url: url})
        return
      }
      this.setData({url: p.url})
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
  methods: {
    
  }
})

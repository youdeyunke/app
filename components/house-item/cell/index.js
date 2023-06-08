// components/pagemaker/posts/post-item0.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    post: { type: Object, value: {} },
    point: null,
    border: {type: Boolean, value: true, },
  },

  observers: {
    "post": function(post){
      if(!post){
        return 
      }
      if(!post.id){
        return
      }
      if(!post.url){
        var url = '/pkgPost/pages/show/index?id=' + post.id
        this.setData({url: url})
        
      }
      this.setData({url: post.url})

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

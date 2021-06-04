// components/pagemaker/posts/post-item0.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    post: { type: Object, value: {} },
    albumKey: {type: String, value: null},
    source: {type: String, value: null} 
  },


  observers: {
    "albumKey":function(key){
      if(!key){
        var url = '/pkgPost/pages/show/index?id=' + this.data.post.id
        this.setData({url: url})
        return
      }
      if(key == 'yaohao'){
        var url = '/pkgTickets/pages/tickets/index?post_id=' + this.data.post.id 
        this.setData({url: url})
        return
      }
    },
  },


  /**
   * 组件的初始数据
   */
  data: {
    url: '',

  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})

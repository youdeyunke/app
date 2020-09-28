const app = getApp()
// components/pagemaker/posts/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {type: Object, default: null}
  },

  ready(){
    //console.log('posts.module.config is', this.data.config)
    this.loadPosts()
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [],
    loading: false, 
  },

  /**
   * 组件的方法列表
   */
  methods: {


      loadPosts: function(){
        var _this= this
        var ids  = this.data.config.ids  || []
        if(ids.length == 0){
          return
        }
        var query = { 
          ids: ids.join(',')
        }
        app.request({
          url: '/api/v2/posts/', 
          data: query, 
          success: function(resp){
            var res = resp.data.data
            // TODO setData items
            console.log(res);
              res.forEach(v => {
                v.tags_list= v.tags_list.slice(0,3)
              });
            _this.setData({
              items:res
            })
          },
        })
      },



  },
  observers:{
    "config.ids":function(){
      this.loadPosts()
    }
  }
})

// components/pagemaker/posts/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {type: Object, default: null}
  },

  ready(){
    console.log('posts.module.config is', this.data.config)
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
        var ids  = this.data.config.ids  || []
        var query = { 
          ids: ids.join(',')
        }
        app.request({
          url: '/api/v2/posts/', 
          data: query, 
          success: function(resp){
            // TODO setData items
          },
        })
      },



  }
})

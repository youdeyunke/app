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
    morelink:{},
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
            var config = _this.data.config
            // TODO setData items
            res = res.sort((p1,p2)=>{
              var index1 = config.ids.findIndex((v)=>v === p1.id)
              var index2 = config.ids.findIndex((v)=>v === p2.id)
              return index1 - index2
            })
              res.forEach(v => {
                v.tag_objs= v.tag_objs.slice(0,3).map((tag,i)  => {
                  // 处理标签颜色，只以text_color 为准  
                  var color  =  tag.text_color === '#ffffff' ?   tag.color : tag.text_color     
                  tag.text_color = color 
                  return tag
  

                })
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

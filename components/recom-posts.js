// components/recom-posts.js
//
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subDistrictId:{
      type: Number, value: 0,
    },
    title: {
      type: String, value: '猜你喜欢', 
    },
    idNe: {
      type: Number, value: 0,
    },
    count: {
      type: Number, value: 5,
    },
    group: {
      type: String, value: 'new',
    },
  },


  ready: function(){
    this.loadRecoms()
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
  loadRecoms: function(){
    var _this = this
    var d = {
      'new': 'xinfang',
      'old': 'ershoufang',
      'rental': 'zufang',
    
    }
    var group = d[_this.data.group]
    app.request({
      hideLoading: true,
      url: '/api/v2/posts/',
      data: {
        group: group, 
        per_page: _this.data.count, 
        sub_district_id: _this.data.subDistrictId || '',
        order: 'id desc',
        id_ne: _this.data.idNe || 0,
      },
      success: function(resp){
        var posts = resp.data.data
        _this.setData({posts: posts})
        app.cachePosts(posts)
      },
    })
  },

  }
})

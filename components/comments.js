// components/comments.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mini: {type: Boolean, value: false},
    items: {type: Array, value: []},
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
  commentlikeHandle: function(e){

    var i = e.currentTarget.dataset.index
    var cid = this.data.items[i].id
    var key = 'liked_comment.' + cid
    if(wx.getStorageSync(key)){
      console.log('重复点击', key)
      return false
    }
    this.data.items[i].like_nums +=1 
    this.setData({items: this.data.items})

    app.request({
      url: '/api/v1/mycomments/like',
      hideLoading: true,
      method: 'POST',
      data: {id: cid},
      success: function(resp){
        console.log('resp')
        wx.setStorage({
          key: key,
          data: true,
        })        
      }
    })
  },

  }
})

// components/comments.js
const app = getApp()
const mycommentApi= require("../../api/mycomment")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    targetId: {
      type: Number, value: 0,  observer: "loadData"
    },
    targetType: {
      type: String, value: 'post'
    },
    order: {
      type: String, value: '',
    }
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

    loadData: function(){
      var _this = this
      var query = {
        target_id: _this.data.targetId, 
        target_type: _this.data.targetType,
        order: _this.data.order,
        }
        // 有待检测
    //   app.request({
    //     url: '/api/v1/mycomments有待检测',
    //     data: query,
    //     success: function(resp){
    //       _this.setData({
    //         items: resp.data.data
    //       })
    //     }
    //   })
      mycommentApi.getAllCommentList(query).then((resp)=>{
        _this.setData({
            items: resp.data.data
          })
      })
    },

    replyInput: function(e){
      this.setData({ replyContent: e.detail.value })
    },

    showReplyForm: function(e){
      this.setData({
        showReply: true
      })
    },

    closeReplyForm: function (e) {
      this.setData({
        showReply: false
      })
    },    

    replyHandle: function(e){
      var data  = e.currentTarget.dataset
      data.content = this.data.replyContent
      console.log('reply handle', data)
      var replyData = {
        target_id: data.targetId,
        target_type: data.targetType,
        mycomment_id: data.mycommentId
      }
      this.setData({
        replyData: replyData
      })
      console.log('resply data set', replyData)
      this.showReplyForm()
    },

    replySubmit: function(e){
      var c = this.data.replyContent
      if(c.length <= 5){
        wx.showToast({
          title: '多些几个字吧~',
          icon: 'none',
        })
        return false
      }
      this.postReply()
    },

    postReply: function(e){
      var _this = this
      var data = this.data.replyData
      data.content = this.data.replyContent
      console.log('data for post', data)
    //   有待检测
    //   app.request({
    //     url: '/api/v1/mycomments有待检测',
    //     data: data,
    //     method: 'POST',
    //     success: function(resp){
         
    //     }
    //   })
      mycommentApi.createComment(data).then((resp)=>{
        if(resp.data.status == 0){
            _this.closeReplyForm()
            wx.showToast({
              title: '回复成功',
            })
          }
      })
    },

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
// 有待检测
    //   app.request({
    //     url: '/api/v1/mycomments/like有待检测',
    //     hideLoading: true,
    //     method: 'POST',
    //     data: {id: cid},
    //     success: function(resp){
    //       console.log('resp')
    //       wx.setStorage({
    //         key: key,
    //         data: true,
    //       })        
    //     }
    //   })
      mycommentApi.likeComment(cid).then((res)=>{
        wx.setStorage({
            key: key,
            data: true,
          })        
    })
    },

  }
})

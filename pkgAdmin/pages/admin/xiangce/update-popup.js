// pkgAdmin/pages/admin/xiangce/update-poup.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    catId:{type:Number},
    postId:{type:Number},
    show:{type:Boolean},
    type:{type:String},
    val:{type:String}
  },

  /**
   * 组件的初始数据
   */
  data: {
    errorShow:'',
    btnDis:false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({ show: false });
    },
    blurHandle(e){
      if(e.detail.value<2 || e.detail.value>10){
        this.setData({
          errorShow:'请输入长度在2-10位',
          btnDis:true
        })
      }else{
        this.setData({
          errorShow:'',
          btnDis:false
        })
      }
    },
    getAlbum(){
      var _this = this
      if(this.data.type == 'create'){
        app.request({
          url:'/api/v1/media_cats/',
          method:'POST',
          data:{
            name:_this.data.val,
            post_id:_this.data.postId
          },
          success: function() {
            _this.triggerEvent('create')
            _this.setData({
              show:false
            })
          }
        })
      }else if(this.data.type == 'update'){
        app.request({
          url:'/api/v1/media_cats/'+_this.data.catId,
          method:'PUT',
          data:{
            name:_this.data.val,
          },
          success: function() {
            _this.triggerEvent('update',_this.data.val)
            _this.setData({
              show:false
            })
          }
        })
      }
    }
  }
})

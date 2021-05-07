// components/pagemaker/posts/more-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    morelink:{type:Object,default: {}}
  },
  /**
   * 组件的初始数据
   */
  data: {
    bg:'',
    bc:'',
    br:''
  },
  ready(){
    //console.log(this.data.morelink);
    //this.change()
    console.log(this.data.bg);
    console.log(this.data.bc);
  },
  observers:{
    'morelink.plain':function(){
      this.change()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    change:function (){
      if(this.data.morelink.plain != true){
        this.setData({
          bg : this.data.morelink.bg,
          br:'4rpx'
        })
      }else{
        this.setData({
          bg : 'none' ,
          br:'80rpx'
        })
      }
    },
  },    
})

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
    'morelink':function(val){
      if(!val){
        return
      }
      var bg =  val.plain ? 'none' : val.bg 
      var br =  val.round ? '80rpx' : '4rpx'
      this.setData({
        bg: bg, br: br
      })
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  },    
})

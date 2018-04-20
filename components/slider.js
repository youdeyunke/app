// components/slider.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [
      {src: 'http://jiayaosu-10013564.image.myqcloud.com/8d0a4fc3-dd7d-4c2b-88d1-b12f38e96053', opentype: 'navigateTo', url: '/pages/huodong/index', disable: true },   

      { src: 'http://jiayaosu-10013564.image.myqcloud.com/01871a47-06ff-4fc8-81de-ba4dcd9505df', opentype: 'navigateTo',url: '/pages/post/post?id=7'},
      
      { src: 'http://jiayaosu-10013564.image.myqcloud.com/9f3ac103-ab48-4123-933c-b5ce2eaeac70', opentype: 'switchTab',url: '/pages/tiao/index'},

      { src: 'http://jiayaosu-10013564.image.myqcloud.com/68972d89-6f43-4877-af6c-200441aed794#690*390', disable: true}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    soon: function(e){
      app.comingSoon()
    }

  }
})

// components/slider.js
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
      { src: '/assets/images/b1.jpg', opentype: 'navigateTo', url: '/pages/huodong/index' },   

      {src: '/assets/images/b4.jpg', opentype: 'navigateTo',url: '/pages/post/post?id=1'},
      
      {src: '/assets/images/b3.jpg', opentype: 'navigateTo',url: '/pages/posts/index'},
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

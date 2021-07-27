// pkgAdmin/pages/clue/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {type: String, value: '未知标题'}, 
    color: { type: String, value: '#1989fa'},
    size: { type: String, value: 'large'},
    image: {type: String, value: null},
    width: { type: Number, value: 710}, 
    height: { type: Number, value: 300}, 
    borderRadius: { type: Number, value: 10},
  },

  externalClasses: ['custom-class', 'custom-style'],

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

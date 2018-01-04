// components/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeId: {type: String, value: 'home'}
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [
      { text: '首页', id: 'home'},
      { text: '问答', id: 'qa'},
      { text: '我的', id: 'myself'}
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

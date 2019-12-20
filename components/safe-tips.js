// components/safe-tips.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      cat: { type: String, value: ''}
  },

  /**
   * 组件的初始数据
   */
  data: {
      info: {
          new: {
              title: '',
              desc: '',
          },
          old: {
              title: '本平台承诺真实房源假一赔百元!',
              desc: '',
          },
          rental: {
              title: '',
              desc: '',
          },
      }

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

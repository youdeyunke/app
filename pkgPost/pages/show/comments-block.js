// pages/post/comments-block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      value: {type: Object },
      color: { type: String, value: '#3A6BDD'}
  },

    observers: {
        "value.scopes": function (items) {
            // 过滤掉count为0的
            var items = items.filter((item,i) => { return item.count > 0})
            this.setData({scopes: items})
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

  }
})

// pages/post/html-block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      value: {type: Object, default: {}}

  },

    observers: {
        "value.html": function (html) {
            if (!html) {
                console.log('html内容为空')
                return false
            }
            html = html.replace(/\<img/gi, '<img class="rich-text-img" ')
            html = html.replace(/\<p/gi, '<p class="rich-text-p" ')
            this.setData({prettyHtml: html})

      },
  },

  /**
   * 组件的初始数据
   */
  data: {
      minicontent: true,
      prettyHtml: '',

  },

  /**
   * 组件的方法列表
   */
  methods: {
      contentHandle: function(e){
        this.setData({
          minicontent: ! this.data.minicontent 
        })
      },
  }
})

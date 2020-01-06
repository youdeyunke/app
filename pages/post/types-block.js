// pages/post/types-block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      value: {type: Object }
  },

  observers: {
      "value.groups": function(val){
          this.setData({
              currentGroup: val[0]
          })
      },

      "currentGroup": function(val){
          console.log('current group change', val)
          var items = []
          this.data.value.items.forEach((item, i) => {
              item.className = ' '
              if(item.s == val){
                  items.push(item)
              }
          })
          // 设置最后一个不显示border
          var i = items.length - 1
          items[i].className = 'border-none'
            
          // 标签发生变化
          var tags  = []
          this.data.value.groups.forEach((g, i) => {
              var tag = {name: g + '室', group: g, textColor: '#999999', color: '#f8f8f8'}
              if(g == val){
                 tag.textColor = '#1989fa'
                 tag.color = '#f1f5ff'
              }
              tags.push(tag)
          })
          this.setData({items: items, tags: tags})
      },
  },

  /**
   * 组件的初始数据
   */
  data: {
      items: [],
      tags: [],
      currentGroup: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
      groupClick: function(e){
          var g = e.target.dataset['group']
          if(g == this.data.currentGroup){
              return false
          }

          this.setData({currentGroup: g})
      },
  }
})

// components/type-filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {type: Boolean, value: false}
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    items: [
      {name: '一室', s: 1},
      {name: '两室', s: 2 },
      {name: '三室', s: 3 },
      {name: '四室', s: 4 },
      {name: '五室及以上', s: 5 },    
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancle: function(e){
      this.setData({
        currentIndex: 0,
      })
    },

    onConfirm: function(e){
      var i = this.data.currentIndex
      var r = this.data.items[i]
      this.triggerEvent('change', {s: r})
    },

    onSelect: function(e){
      console.log('e', e)
      var i = e.currentTarget.dataset.index
      if(i != this.data.currentIndex ){
        this.setData({currentIndex: i})
      }
    },

  }
})

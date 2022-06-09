// components/message/item.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      message: {type: Object, value: {}},
      currentUserId: {
        type: Number, value: null,
      },
  
    },
  
    /**
     * 组件的初始数据
     */
    data: {
        position: '',
    },
  
    observers: {
    },
  
  
    ready: function(){
  
  
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      _midChange: function(newVal, oldVal){
      },
  
    }
  })
  
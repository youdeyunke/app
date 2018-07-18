// components/qa.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {type: Object, value: null},
    mini :{type: Boolean, value: true},
    answer: {type: Boolean, value: true},
  },

  ready: function(){
    var showAnswer = false
    if(this.data.answer == true){
      if(this.data.item.answer){
        if(this.data.item.answer.length > 10){
          showAnswer = true
        }
      }
    }
    this.setData({showAnswer: showAnswer})
  },

  /**
   * 组件的初始数据
   */
  data: {

    showAnswer: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

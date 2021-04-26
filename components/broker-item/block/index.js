// components/broker/hot-brokers.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: { type: Object, value: null },
    postId: {type: Number, value: null},
  },

  observers: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      loading: false,
      items: [],
  },

  ready: function(){
 
  },

  /**
   * 组件的方法列表
   */
  methods: {
      shuffle: function(arr) {
        　　var i = arr.length, t, j
        　　while (i) { 
            　　j = Math.floor(Math.random() * i--)
            　　t = arr[i]
            　　arr[i] = arr[j]
            　　arr[j] = t
        　　}
        },



  }
})

// components/broker/hot-brokers.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: null
    },
    postId: {
      type: Number,
      value: null
    },
  },

  observers: {
    "item.level": function (v) {
      var levelImgs = [
        app.globalData.ui.broker_medal_1,
        app.globalData.ui.broker_medal_2,
        app.globalData.ui.broker_medal_3,
      ]
      // v = 1,2,3
      // https://qiniucdn.udeve.net/fang/medal.{{item.level}}.png
      v = v -  1 
      this.setData({ 
        levelImg: levelImgs[v]
      })

    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: false,
    levelImg: '',
    bg: '',
    items: [],
  },

  ready: function () {


    this.setData({
      bg: app.globalData.ui.broker_bg || '',


    })

  },

  /**
   * 组件的方法列表
   */
  methods: {
    shuffle: function (arr) {
      var i = arr.length,
        t, j
      while (i) {
        j = Math.floor(Math.random() * i--)
        t = arr[i]
        arr[i] = arr[j]
        arr[j] = t
      }
    },



  }
})
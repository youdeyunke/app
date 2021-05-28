// pkgBrokers/Pages/image/Components/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ranking: {
      type: Object
    },
    myindex: {
      type: Number
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
    GoPage(e) {
      var myid = e.currentTarget.dataset.myid
      wx.navigateTo({
        url: '/pkgBroker/pages/broker/profile?id=' + myid,
      })
    },
  },
})
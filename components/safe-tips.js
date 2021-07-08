// components/safe-tips.js
const app = getApp()
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
    statement:'',
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
  attached(){
    this.loadData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadData(){
      var config = app.globalData.myconfigs
      this.setData({
        statement:config.statement
      })
    }
  }
})

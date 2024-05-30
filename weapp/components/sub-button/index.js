/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// components/sub-button/index.js
const app = getApp()
const subscribeApi = require("../../api/subscribe")
const { post } = require("../../utils/request")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    target_id: { type: Number, value: 0 },
    target_type: { type: String, value: '' },
    custom_style: { type: String, value: '' },
    sub_text: { type: String, value: '+订阅' },
    unsub_text: {type: String, value: '取消订阅'},
    show_icon: { type: Boolean, value: false },
    is_round: { type: Boolean, value: false },
  },

  // ready(){
  //   this.loadStatus()
  // },

  observers: {
    "target_type": function(val){
      if (val) {
        this.loadStatus()
      }
    },
    "target_id": function(val){
      if (val) {
        this.loadStatus()
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    sub_status: false,
    loading: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadStatus(){
      var _this = this
      subscribeApi.getSubscribeStatus({
        target_id: _this.data.target_id,
        target_type: _this.data.target_type
      }).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        _this.setData({
          sub_status: resp.data.data
        })
      })
    },
    btnHandle(){
      var _this = this
      if (!app.globalData.token) {
        this.selectComponent('.loginwindow').openWindow()
        return
      }
      this.setData({
        loading: true
      })
      if(this.data.sub_status){
        _this.unsubTupai()
      } else {
        _this.subTupai()
      }
    },
    subTupai(){
      var _this = this
      subscribeApi.subscribe({
        target_id: _this.data.target_id,
        target_type: _this.data.target_type
      }).then((resp) => {
        _this.setData({
          loading: false
        })
        if (resp.data.code != 0) {
          return
        }
        wx.showToast({
          title: '订阅成功',
        })
        _this.setData({
          sub_status: true
        })
        // _this.loadStatus()
      })
    },
    unsubTupai(){
      var _this = this
      subscribeApi.unsubscribe({
        target_id: _this.data.target_id,
        target_type: _this.data.target_type
      }).then((resp) => {
        _this.setData({
          loading: false
        })
        if (resp.data.code != 0) {
          return
        }
        wx.showToast({
          title: '取消订阅成功',
          icon: 'none'
        })
        _this.setData({
          sub_status: false
        })
        // _this.loadStatus()
      })
    },
  }
})

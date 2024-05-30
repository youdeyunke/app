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
// components/page-contact/index.js
const app = getApp()
const brokerApi = require("../../api/broker")
const postApi = require("../../api/post")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pid: {
      type: Number,
      value: null
    },
    brokerId: {type: Number, value: null},
  },

  observers: {
    "pid": function (pid) {
      if (!pid) {
        return
      }

      // load broker info 
      var _this = this
      var query = {
        post_id: pid,
        per_page: 999
      }
      // TODO get from cache 
      brokerApi.getBrokerList(query).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        var brokers = resp.data.data.result;
        var _id = wx.getStorageSync('bindBrokerId')
        var foundBroker = brokers.find(function(broker) {
          return broker.user_id == _id;
        });
        if (foundBroker) {
          // 找到了符合条件的对象，可以使用 foundBroker 变量来引用该对象
          _this.setData({
            broker: foundBroker,
            showBroker: true
          })
          //设置该楼盘拨打的电话，用于户型
          wx.setStorageSync('post-'+ pid +'-mobile', foundBroker.mobile)
        } else {
          // 没有找到符合条件的对象
          _this.loadPostBaseInfo()
          _this.setData({
            showBroker: false,
          })
        }
        // _this.setData({
        //   broker: resp.data.data
        // })
      })
    },
    "brokerId": function (bid) {
      var key = 'bindBrokerId'
      var brokerId = wx.getStorageSync(key)
      if (brokerId) {
        return
      }
      if (!bid) {
        return
      }
      wx.setStorageSync(key, bid)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBroker: false,
    postInfo: null,
    broker: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadPostBaseInfo: function () {
      // 加载楼盘的基本信息
      var _this = this;
      postApi.getPostBaseInfo(this.data.pid).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        var post = resp.data.data;
         //设置该楼盘拨打的电话，用于户型
         wx.setStorageSync('post-'+ this.data.pid +'-mobile', post.phone)
        _this.setData({
          postInfo: post
        })
      })
    },
  }
})
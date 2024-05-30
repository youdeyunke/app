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
// components/recommended-post-items/index.js
const postApi = require("../../api/post")
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 展示楼盘数量
    showPostCount: { type: Number, value: 10 },
    // 当前楼盘id
    currentPostId: { type: Number, value: 0 },
    // 组件宽度
    width: { type: Number, value: 710 }
  },

  observers: {
    // 'currentPostId': function (val) {
    //   console.log(val);
    //   this.loadData()
    // }
  },

  ready(){
    var color = app.globalData.color
    this.setData({
        bg: color.broker_block_bg,
        primaryColor: color.primary,
    })
    this.loadData()
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [],
    primaryColor: '#1989fa'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadData(){
      var _this = this
      var data = {
        page: 1,
        per_page: this.data.showPostCount
      }
      if (this.data.currentPostId) {
        data.per_page = this.data.showPostCount + 1
      }
      postApi.getPostList(data).then((resp) => {
        var postItems = resp.data.data.result
        /** 
         * 如果currentPostId有值，对返回的数据进行处理，如果postItems中有id等于currentPostId的数据，则删除该条数据
         * 如果没有值，则随机选择10条数据
         * 完成以上操作后，将处理后的数据顺序打乱，然后赋值给items
         */ 
        if (_this.data.currentPostId) {
          var index = -1
          for (var i = 0; i < postItems.length; i++) {
            if (postItems[i].id == _this.data.currentPostId) {
              index = i
              break
            }
          }
          if (index != -1) {
            postItems.splice(index, 1)
          } else {
            postItems.splice(0, 1)
          }
        }
        postItems = _this.randomArray(postItems)
         

        _this.setData({
          items: postItems
        })
      })
    },
    randomArray(arr) {
      var newArr = arr.slice(0);
      for (let i = 0; i < newArr.length - 1; i++) {
        let j = i + Math.floor(Math.random() * (newArr.length - i));
        let temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
      }
      return newArr;
    },
  }
})

/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/pagemaker/navs/album-counter.js
const app = getApp() 
const albumApi=require("../../../api/album")

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    albumId: {type: Number, default: null},

  },

  observers: {
    "albumId": function(val){
      console.log(' album id is', val)
      if(!val){
        return
      }
      this.loadData(val)
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,

  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadData: function(albumId){
      var _this = this  
      albumApi.getAlbumDetail(albumId).then((resp)=>{
        if(resp.data.status != 0){
            return 
          }
          _this.setData({
            count: resp.data.data.post_count,
          })
      })
    },

  }
})

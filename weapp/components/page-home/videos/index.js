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
// components/pagemaker/videos/index.js
const app = getApp()
const videoApi = require("../../../api/video")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  ready() {
    this.loadData()
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [],
    showVideo: false,
    videoUrl: '',
    page: 1,
    morelink: {
      cat: 'page',
      opentype: 'navigateTo',
      path: '/pkgVideo/pages/video/index',
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadData() {

      var query = {}

        query.per_page = 4
        query.page = this.data.page
      
      videoApi.getVideoList(query).then((resp) => {
        var _this = this
        if (resp.data.code != 0) {
          return
        }
        if (this.data.page == 1) {
          _this.setData({
            items: resp.data.data
          })
        } else if (this.data.page > 1) {
          var oldData = _this.data.items
          var newData = resp.data.data
          var Data = oldData.concat(newData)
          _this.setData({
            items: Data
          })
        }

      })
    },
    closeVideoPopup() {
      this.setData({
        showVideo: false,
        videoUrl: ''
      })
    },

    videoHandle(e) {
      var video = e.currentTarget.dataset.video
      console.log(e, video);
      videoApi.addVideoViews(video.id)

      if (video.is_wxvideo) {
        wx.openChannelsActivity({
          finderUserName: video.wxauthor_id,
          feedId: video.wxvideo_id,
        })
      } else {
        wx.navigateTo({
          url: '/pkgVideo/pages/show/index?id=' + video.id,
        })
      }

    },

    loadMore: function () {

      var _this = this
      this.setData({
        page: _this.data.page + 1
      }, () => {
        _this.loadData()
      })
    },

  }
})
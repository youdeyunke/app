// pages/post/simple-images-block.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object },

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
        gotoVideo: function () {
            var url = this.data.value.video_url
            app.gotoVideo(url, '视频看房')
        },

        gotoVr: function () {
            var url = this.data.value.vr_url
            //var vr = 'https://csimum.udeve.cn/vr.html'
            //var vr = 'https://csimum.udeve.cn/vr2.html?id=21963'
            //var vrid = vr.split('?')[1].split('=')[1]
            //var vr = 'https://csimum.udeve.cn/vr2.html?id=' + vrid  + '&iframe=true'

            if (!url) {
                return false
            }
            app.gotoWebview(url, '全景看房')
        },

        viewImage: function (e) {
            // 去相册 
            var pid = this.data.value.post_id  
            var path = '/pkgXiangce/pages/xiangce/index?id=' + pid  
            wx.navigateTo({
              url: path,
            })
            return
        },

    }
})

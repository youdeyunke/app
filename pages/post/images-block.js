// pages/post/images-block.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object }
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
            if (!url) {
                return false
            }
            app.gotoVideo(url, '视频看房')
        },

        viewImage: function (e) {


            var urls = this.data.value.images
            var index = e.currentTarget.dataset.index
            var url = urls[index]
            wx.previewImage({
                current: url,
                urls: urls,
            })
            return 
            // goto default albumt 
            var cid = this.data.value.default_media_cat_id   
            var path = 
            
        },

        gotoVr: function () {
            var vr = this.data.value.vr_url
            if (!vr) {
                return false
            }
            app.gotoWebview(vr, '全景看房')
        },

    }
})

// pkgAdmin/pages/admin/xiangce/media-item.js
const app = getApp()
const mediaApi= require("../../../../api/media")
Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ['custom-class', 'custom-style'],

    properties: {
        item: { type: Object }
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: 0,

    },
    /**
     * 组件的方法列表
     */
    methods: {
        toggle: function () {
            var _this = this
            var id = this.data.item.id
            wx.showModal({
                title: '提示',
                content: '确定删除吗',
                success: function (res) {
                    if (res.confirm) {
                        mediaApi.deleteMediaItem(id).then((res)=>{
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success'
                            })
                            _this.triggerEvent('change')
                        })
                    }
                }
            })
        },
        playHandle: function () {
            if (this.data.item.filetype == 'video') {
                app.gotoVideo(this.data.item.url)
            }
            if (this.data.item.filetype == 'image') {
                wx.previewImage({
                    urls: [this.data.item.url]
                })
            }
        }

    }
})

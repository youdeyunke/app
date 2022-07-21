// components/event/item.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        canDelete: { type: Boolean },
        event: { type: Object },
    },

    observers: {
        "event.images": function (val) {
            if (!val) {
                return []
            }
            var urls = val.split(',')
            this.setData({ images: urls })
        }
    },

    ready: function(){
        this.setData({ 
            color: app.globalData.myconfigs.color.primary,
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        images: [],

    },

    /**
     * 组件的方法列表
     */
    methods: {
        imageClickHandle: function (e) {
            var index = e.currentTarget.dataset.index
            var url = this.data.images[index]
            var urls = this.data.images
            wx.previewImage({
                current: url,
                urls: urls,
                success: (result) => {

                },
                fail: () => { },
                complete: () => { }
            });

        },

    }
})

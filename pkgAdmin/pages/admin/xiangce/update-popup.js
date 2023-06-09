// pkgAdmin/pages/admin/xiangce/update-poup.js
const app = getApp()
const mediaApi = require("../../../../api/media")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Boolean
        },
        cat: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        errorShow: '',
        btnDis: false,
        loading: false,
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onClose() {
            this.setData({
                show: false
            });
        },
        changeHandle(v) {
            var cat = this.data.cat
            cat.name = v.detail
            this.setData({
                cat: cat
            })
            if (v.detail.length < 2) {
                this.setData({
                    btnDis: true
                })
            } else {
                this.setData({
                    errorShow: '',
                    btnDis: false
                })
            }
        },
        changeAlbum() {
            if (this.data.cat.id) {
                this.updateAlbum()
            } else {
                this.createAlbum()
            }
        },
        createAlbum() {
            var _this = this
            _this.setData({
                loading: true
            })
            //   有待检测
            //   app.request({
            //     url:'/api/v1/media_cats/有待检测',
            //     method:'POST',
            //     data:{
            //       name:_this.data.cat.name,
            //       target_id: _this.data.cat.post_id,
            //       target_type: "post"
            //       // post_id:_this.data.cat.post_id
            //     },
            //     success: function() {
            //       _this.triggerEvent('update')
            //       _this.setData({
            //         show:false,
            //         loading: false
            //       })
            //     }
            //   })
            mediaApi.createMediaCat({
                name: _this.data.cat.name,
                target_id: _this.data.cat.post_id,
                target_type: "post"
            }).then((res) => {
                _this.triggerEvent('update')
                _this.setData({
                    show: false,
                    loading: false
                })
            })
        },
        updateAlbum() {
            var _this = this
            _this.setData({
                    loading: true
                })
                var data = {
                    id: _this.data.cat.id,
                    name: _this.data.cat.name
                }
                // 有待检测
            //   app.request({
            //     url:'/api/v1/media_cats/有待检测'+_this.data.cat.id,
            //     method:'PUT',
            //     data:{
            //       name:_this.data.cat.name,
            //     },
            //     success: function() {
            //       _this.triggerEvent('update')
            //       _this.setData({
            //         show:false,
            //         loading: false
            //       })
            //     }
            //   })
            mediaApi.updateMediaCat(
                data
            ).then((res) => {
                _this.triggerEvent('update')
                _this.setData({
                    show: false,
                    loading: false
                })
            })
        },
    }
})
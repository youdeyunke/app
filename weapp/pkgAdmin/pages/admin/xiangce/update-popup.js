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
        onClose () {
            this.setData({
                show: false
            });
        },
        changeHandle (v) {
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
        changeAlbum () {
            if (this.data.cat.id) {
                this.updateAlbum()
            } else {
                this.createAlbum()
            }
        },
        createAlbum () {
            var _this = this
            _this.setData({
                loading: true
            })
            mediaApi.createMediaCat({
                name: _this.data.cat.name,
                target_id: _this.data.cat.target_id,
                target_type: "post"
            }).then((res) => {
                _this.triggerEvent('update')
                _this.setData({
                    show: false,
                    loading: false
                })
            })
        },
        updateAlbum () {
            var _this = this
            _this.setData({
                loading: true
            })
            var data = {
                id: _this.data.cat.id,
                name: _this.data.cat.name
            }
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
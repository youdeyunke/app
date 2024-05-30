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
// pkgPost/pages/show/xiangce-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object },
        color: { type: String, value: '#3A6BDD' }
    },

    /**
     * 组件的初始数据
     */
    data: {
        videoUrl: '',
        show: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        itemClick (e) {
            var items = this.data.value.items
            var i = e.currentTarget.dataset.i
            if (items[i].cat != 'video') {
                wx.navigateTo({
                    url: items[i].url,
                })
            }
            if (items[i].cat == 'video') {
                this.setData({
                    show: true,
                    videoUrl: items[i].cover
                })
            }
        },
        onClose () {
            this.setData({ show: false, videoUrl: '' });
        },
    }
})

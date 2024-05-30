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
// pkgPost/pages/show/points_block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object, value: {} },
        color: { type: String, value: '#3A6BDD' }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentId: 'icon-0',
        currentIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        swiperChange (e) {
            this.setData({
                currentIndex: e.detail.current,
                currentId: 'icon-' + e.detail.current
            })
        },
        navChange (e) {
            var i = e.currentTarget.dataset.i
            this.setData({
                currentIndex: i,
                currentId: 'icon-' + i
            })
        }
    }
})

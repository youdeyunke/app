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
// pages/post/types-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object },
        color: { type: String, value: '#3A6BDD' }
    },

    observers: {
        "value.items": function (items) {
            items = items.map((item, i) => {
                if (item.images_list && item.images_list.length >= 1) {
                    item.hasImage = true
                    item.cover = item.images_list[0]
                } else {
                    item.hasImage = false
                    item.cover = 'https://qiniucdn.udeve.net/fang/pkgPost/image-none.png'
                }

                if (item.tags) {
                    item.tags = item.tags.split(',')
                }
                return item
            })
            this.setData({ items: items })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        items: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
    }
})

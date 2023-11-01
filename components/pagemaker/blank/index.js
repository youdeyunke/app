/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/pagemaker/blank/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: {} },
    },

    observers: {
        "config.height": function (v) {
            // 图片的高度值
            if (!v || !v.value) {
                return false
            }

            var value = v.value
            this.setData({ heightValue: value + 'rpx' })
            return
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        heightValue: null,

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})

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
// components/eav/column/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object },
        value: { type: String, optionalTypes: [Boolean, Number] },
    },

    observers: {
        "config.options": function (val) {
            // 处理选项 
            if (!val) {
                return
            }
            var items = val.split('\n').map((item) => {
                var res = item.split('|')
                if (res.length == 0) {
                    return { name: res[0], value: res[0] }
                } else {
                    return { name: res[0], value: res[1] }
                }
            })
            this.setData({ options: items })

        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        options: [],

    },

    /**
     * 组件的方法列表
     */
    methods: {



    }
})

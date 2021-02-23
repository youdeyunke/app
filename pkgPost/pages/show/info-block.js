// pages/post/info-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object, value: null }

    },

    observers: {
        "value.meta": function (meta) {
            // 格式化楼盘参数信息
            if (!meta) {
                return
            }

            // 先将中文冒号替换为英文
            meta = meta.replaceAll("：", ":")
            var items = meta.split('\n').map((line, index) => {
                var res = line.split(':')
                if (res.length == 1) {
                    // 解析错误
                    return { label: res[0], text: '-' }
                }
                var label = res.splice(0, 1)[0]
                var text = res.join(':')
                return { label: label, text: text }
            })
            this.setData({ metaItems: items })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        metaItems: []

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})

// pages/post/qas-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object },
        color: { type: String, value: '#3A6BDD'}
    },

    observers: {
        "value.more_url": function (path) {
            var res = path.split('/')
            if (res[1] == 'pages') {
                path = '/pkgQa' + path
            }
            this.setData({ moreUrl: path })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        moreUrl: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})

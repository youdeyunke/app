// components/pagemaker/header/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object }
    },

    observers: {
        "config": function (c) {
            if(!c){
                return
            }
            var link = c.link && c.link.cat !== 'no' ? c.link : null
            console.log('link is', link)
            var data = {
                title: c.title.text,
                subtitle: c.subtitle.text,
                link: link
            }
            this.setData(data)
        },

    },

    ready: function () {
    },

    /**
     * 组件的初始数据
     */
    data: {
        title: '',
        subtitle: '',
        link: null,

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})

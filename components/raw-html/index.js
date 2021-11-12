// components/raw-html/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        html: { type: String, value: '' }

    },

    observers: {
        html: function (val) {
            this.prettyHtmlHandle(val)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        prettyHtml: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        prettyHtmlHandle: function (html) {
            html = html.replace(/\<img/gi, '<img  style="max-width:100%;height:auto;margin:0;padding:0;" ')
            html = html.replace(/\<p/gi, '<p style="line-height:1.4;color:#333333;margin:4px 0 4px 0;text-align:justify; text-justify:inter-ideograph;" ')
            this.setData({ prettyHtml: html })
        }

    }
})

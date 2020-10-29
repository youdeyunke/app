// pages/faxian/news-search.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        kw: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {

        clearHandle: function (e) {
            this.setData({ kw: '' })
            this.triggerEvent('change', this.data.kw)
        },

        searchTextInput: function (e) {
            this.setData({ kw: e.detail })
        },

        submitHandle: function (e) {
            console.log('e', e)
            this.triggerEvent('change', this.data.kw)
        },

    }
})

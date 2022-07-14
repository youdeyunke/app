// components/eav/column/options/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items: {type: Object},

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        open: function(){
            this.setData({ show: true })
        },

        close: function(){
            this.setData({show: false })
        },

    }
})

// components/typepicker.js

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        options: { type: Array, value: [] },
        show: { type: Boolean, value: false },
        position: {
            type: String, value: 'top'
        }
    },


    /**
     * 组件的初始数据
     */
    data: {
        currentIndex: '0', // vant 的index必须要是字符串
    },

    /**
     * 组件的方法列表
     */
    methods: {

        onClose: function () {
            this.triggerEvent('close')
        },

        optionClick: function (e) {
            const { index } = e.currentTarget.dataset;
            this.setData({ currentIndex: index.toString() })
        },

        onConfirm: function (e) {
            var index = this.data.currentIndex
            this.triggerEvent('change', { index: parseInt(index) })
        },
    }
})

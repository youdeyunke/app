// pages/messages/last-time.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        time: { type: Number },

    },

    /**
     * 组件的初始数据
     */
    data: {
        timeStr: '',
    },

    ready: function () {
        // format datetime
        var date = new Date(this.data.time)
        var y = ''
        var m = date.getMonth() + 1
        var d = date.getDate() 
        var h = date.getHours() 
        var m = date.getMinutes()
        var value =  m + '月' + d + '日 ' + h + ':' + m 
        this.setData({ timeStr: value })
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})

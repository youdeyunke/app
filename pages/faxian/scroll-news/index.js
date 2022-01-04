// pages/faxian/scroll-news/index.js
const app = getApp() 

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items: { type: Array, value: [] }

    },

    ready: function(){
        var color = app.globalData.myconfigs.color  
        this.setData({ 
            primaryColor: color.primary, 
        })
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

    }
})

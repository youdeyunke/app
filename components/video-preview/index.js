// components/video-preview/index.js
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
        show: false, 
        url: null, 

    },

    /**
     * 组件的方法列表
     */
    methods: {
        preview: function(url){
            this.setData({ url: url, show: true})
        },
        close: function(){
            this.setData({show:false, url: null})
        },

    }
})

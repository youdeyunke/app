// components/tt.js
const app = getApp()

Component({
    options: {

    },

    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object, value: {} }, 
        width: {type: Number, value: 710},
        styleName: {type: Object, value: 'default'}, 
    },

    observers: {
        "item": function(item){
            if(!item || !item.id || !item.content_type){
                return 
            }
            var t = item.content_type || 'html'

       
            if(t == 'video'){
                this.setData({ 
                    className: 'video-item'
                })
            }


        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        className: 'item'
    },

    ready: function () {

    },

    /**
     * 组件的方法列表
     */
    methods: {
    }
})

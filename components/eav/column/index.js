// components/eav/column/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: {type: Object}, 
        value: {type: String, optionalTypes: [Boolean, Number]},
    },

    observers: {
        "config.options": function(val){
            // 处理选项 
            if(!val){
                return 
            }
            var items = val.split('\n').map((item) => {
                var res = item.split('|')
                if(res.length == 0){
                    return {name: res[0], value: res[0]}
                }else{ 
                    return {name: res[0], value: res[1]}
                }
            }) 
            this.setData({options: items})
            
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        options: [],

    },

    /**
     * 组件的方法列表
     */
    methods: {

        cellClick: function(){
            var el = '#' + this.data.config.value_type + '-input'
            console.log('el',el)
            this.selectComponent(el).open()

        },

    }
})

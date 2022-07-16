// pkgBroker/pages/broker/components/broker-group-selector/index.js
const app = getApp() 

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
        groups: [],

    },

    attached: function(){
        this.loadData() 
    },

    /**
     * 组件的方法列表
     */
    methods: {

        open: function(){
            this.setData({ show: true })
        },
        close: function(){
            this.setData({ show: false })
        },

        selectHandle: function(e){
            const { index}  = e.currentTarget.dataset  
            var g = this.data.groups[index] 
            this.triggerEvent('change', g)
            this.close()
         },

        loadData: function(){
            var _this  = this  
            app.request({ 
                url: '/api/v1/broker_groups',  
                success: function(resp){ 
                    if(resp.data.status != 0){ 
                        return 
                    }
                    _this.setData({ 
                        groups: resp.data.data, 
                    })
                }
            })
        },

    }
})

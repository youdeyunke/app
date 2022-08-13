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

    /**
     * 组件的方法列表
     */
    methods: {

        open: function(cat){
            this.loadData(cat)
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

        loadData: function(cat){
            var _this  = this  
            var query = {
                cat: cat
            }
            app.request({ 
                url: '/api/v1/broker_groups',  
                data: query, 
                success: function(resp){ 
                    if(resp.data.status != 0){ 
                        return 
                    }
                    var gs = resp.data.data.filter((g) => { 
                        return  true
                    })
                    
                    // 只显示全民经纪人身份列表
                    _this.setData({ 
                        groups: gs, 
                    })
                }
            })
        },

    }
})

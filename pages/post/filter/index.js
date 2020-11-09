// pages/post/filter/index.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     * 根据filter传递的参数，自动调用对应房源的filter
     */

    properties: {
        filter: { type: Object, default: null }
    },

    observers: {
        "filter.group_v2": function (g) {
            console.log('filter.group v2', g)
            if(!g){
                return
            }
            this.setData({ postGroup: g })
        }
    },

    ready: function(){
            this.loadFilterOptions()
    },


    /**
     * 组件的初始数据
     */
    data: {
        postGroup: 'new', // 房源的类型
        filterOptions: {}, // 筛选下拉框
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
        loadFilterOptions: function(){
            // 加载销售状态选项
            // TODO 
            var _this  = this
            app.request({
                url: '/api/v1/filter_options/', 
                data: { group: _this.data.postGroup  },
                success: function(resp){
                    if(resp.data.status != 0){
                        return
                    }
                    _this.setData({filterOptions: resp.data.data})
                }
            })
        },


        filterChange: function (e) {
            this.triggerEvent("change", e.detail)
        }
    }
})

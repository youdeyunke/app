const link = require("../link")
const app = getApp()
const navsApi = require("../../../api/navs")



// components/pagemaker/navs/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null },
    },

    observers: {
        "config.positionId": function (pid) {
            if(!pid){
                return false 
            }
            var _this = this 
            // 根据position id 查询导航按钮
            // 有待检测
            // app.request({
            //     url: '/api/v1/navs?position_id= 有待检测' + pid, 
            //     hideLoading: true, 
            //     success: function(res){
            //         if(res.data.status != 0){
            //             return 
            //         }
            //         _this.setData({navs: res.data.data})
            //     }
            // })
            navsApi.getNavFromPosition(pid).then((res)=>{
                if(res.data.status != 0){
                    return 
                }
                _this.setData({navs: res.data.data})
            })

            
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        navs: [],

    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickHandle: function (e) {
            const { index } = e.currentTarget.dataset
            var item = this.data.navs[index]
            var obj = {} 
            try{
                obj = JSON.parse(item.link) 
            }catch(error){
                console.log(error)
            }
            link.clickHandle(obj)

        }

    }
})

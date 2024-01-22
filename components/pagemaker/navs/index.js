/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
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

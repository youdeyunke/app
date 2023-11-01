/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: Object
        },
        num: {
            type: Number
        },
        formdata: {
            type: Object
        },
        result: {
            type: Boolean
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        detailsShow: false,
        buildingShow: true,
        row: ''
    },
    /**
     * 组件的方法列表
     */
    methods: {
        unfoldHandle: function (e) {
            var myindex = e.currentTarget.dataset.index.floor
            var detailsShow = this.data.detailsShow
            this.setData({
                detailsShow: !detailsShow,
                buildingShow: !this.data.buildingShow,
            })
            this.triggerEvent("changestatus", { detailsShow, myindex })
            // console.log("不二",this.properties.result)


        },
        closeHandle: function () {
            this.setData({
                detailsShow: !this.data.detailsShow,
                buildingShow: !this.data.buildingShow
            })
        },
    },

})
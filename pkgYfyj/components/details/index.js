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
// pkgYfyj/components/details/index.js
const app = getApp()
Component({
    externalClasses: ['details-right'],
    /**
     * 组件的属性列表
     */
    properties: {
        items: {
            type: Object
        },
        formdata: {
            type: Object
        },
        result: {
            type: Boolean
        }

    },
    observers: {
        "formdata": function () {
            this.setData({
                result: false
            })
            var items = this.properties.items
            var mysearch = new Array(items)
            var myarea = parseInt((mysearch.map((value) => { return value.area })).toString()) //得到面积数据
            var myprice = parseInt((mysearch.map((value) => { return value.total_price })).toString()) //得到总价面积
            var myaverage = parseInt((mysearch.map((value) => { return value.average_price })).toString()) //得到平方价
            var formdata = this.properties.formdata
            for (let i in formdata) {
                var my = (((formdata[i]).split('-')).toString()).split(',')
                if (i == 'area') {
                    var areamin = my[0]
                    var areamax = my[1]
                } else if (i == 'price') {
                    var pricemin = my[0]
                    var pricemax = my[1]
                } else {
                    var averagemin = my[0]
                    var averagemax = my[1]
                }
            }
            if ((myarea >= areamin && myarea <= areamax) &&
                (myprice >= pricemin && myprice <= pricemax) &&
                (myaverage >= averagemin && myaverage <= averagemax)) {
                this.setData({
                    result: true
                })
            }
        }
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
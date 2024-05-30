/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// pkgSearch/components/search-item/index.js
const app = getApp();
const searchApi = require("../../../api/search")
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
        house: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    ready: function () {
        var _this = this
        searchApi.getHotSearchList().then((res) => {
            _this.setData({
                house: res.data.data
            })
        })
    }
})

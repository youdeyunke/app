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
// components/popup.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        label: {
            type: String, value: '',
        },
        show: {
            type: Boolean, value: false
        },
        position: {
            type: String, value: 'top'
        },
        cancleBtnText: {
            type: String, value: '重置'
        },
        confirmBtnText: {
            type: String, value: '确定'
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

        onConfirm: function (e) {
            this.triggerEvent('confirm', {}, {})
        },
        onCancle: function (e) {
            this.triggerEvent('cancle', {}, {})
        },

    }
})

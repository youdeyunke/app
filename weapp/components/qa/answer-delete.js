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
// pages/qa/answer-delete.js
const app = getApp()
var auth = require('../../utils/auth.js');
const qaApi = require("../../api/qa")

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        aid: { type: Number, value: null },
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
        deleteHandle: function (e) {
            var _this = this
            wx.showModal({
                title: '操作提示',
                content: '确定要删除这条回答吗？',
                success (res) {
                    if (res.confirm) {
                        _this.doDelete()
                    }
                }
            })
        },

        doDelete: function () {
            var _this = this
            qaApi.deleteAnswer(_this.data.aid).then((resp) => {
                if (resp.data.status != 0) {
                    return false
                }
                // 已删除
                _this.triggerEvent('deleted', {})
            })
        },

    }
})

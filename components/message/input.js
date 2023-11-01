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
// components/message/input.js
const app = getApp()
const messageApi = require("../../api/message")

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        receiverId: {
            type: Number,
            value: null,
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        content: '',
        pending: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {

        inputHandle: function (e) {
            this.setData({
                content: e.detail.value
            })
        },

        sentHandle: function (e) {
            console.log('confirm ', e)
            var _this = this
            if (_this.data.pending || _this.data.content.length == 0) {
                return false
            }

            var content = this.data.content
            _this.setData({
                content: '',
                lastContent: content,
                pending: true
            })

            messageApi.sendTextMessage(content, _this.data.receiverId).then((resp) => {
                // 返回结果
                _this.setData({ pending: false });
                if (resp.data.code == 0) {
                    _this.triggerEvent('success', resp.data.data)
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '发送消息失败，请重试',
                    })
                    console.error('error')
                }
            })
        },

    }
})
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
// components/range-input/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        maxlength: { type: Number, value: 4 },
        value: { type: String, value: "0,0" },
        unit: { type: String, value: '单位' },
    },



    observers: {
        value: function (value) {
            var res = value.split(',')
            this.setData({
                leftValue: res[0] || '',
                rightValue: res[1] || '',
            })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        leftValue: null,
        rightValue: null,

    },

    /**
     * 组件的方法列表
     */
    methods: {



        blurHandle: function (e) {
            console.log('blur handle', e, typeof this.data.leftValue)
            // 当输入框失去焦点
            // 验证输入值
            // 并触发更新
            if (this.data.leftValue == '' || this.data.rightValue == '') {
                return
            }

            // 左边要小于右边
            if (this.data.leftValue >= this.data.rightValue) {
                var error = '输入的范围值错误，请检查'
                this.setData({ showError: true, error: error })
                wx.showToast({
                    title: error,
                    icon: 'none',
                    duration: 1500,
                    mask: true,
                });
                return false
            }

            // sync value
            // 只有当两个都有值得时候，才触发value更新 
            var value = this.data.leftValue + ',' + this.data.rightValue
            this.setData({ value: value })
        },



        inputHandle: function (e) {
            // 输入后，更新value
            var v = e.detail
            const { key } = e.currentTarget.dataset
            // update data 
            var data = {}
            data[key] = v
            this.setData(data)

        },

    }
})

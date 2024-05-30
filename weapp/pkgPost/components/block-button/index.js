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
// pages/post/block-button.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        buttonShow: { type: Boolean },
        buttonVal: { type: String },
        url: { type: String, value: '' },
        maxLength: { type: Number },
        bgColor: { type: String, value: '#EBF5FF' },
        color: { type: String, value: '#1989f9' },
        allLength: { type: Number, value: 999999 }
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
        moreHandle () {
            var maxlength = this.data.maxLength
            if (maxlength == 2) {
                maxlength = this.data.allLength
                this.setData({
                    maxLength: maxlength,
                    buttonVal: '收起'
                })
            } else {
                maxlength = 2
                this.setData({
                    maxLength: maxlength,
                    buttonVal: '展开全部'
                })
            }
            this.triggerEvent('change', maxlength)
        },
        btnHandle () {
            var _this = this
            if (this.data.buttonVal == '展开全部' || this.data.buttonVal == '收起') {
                this.moreHandle()
                return
            }
            wx.navigateTo({
                url: _this.data.url
            })
        }
    },
})

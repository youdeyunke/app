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
// components/pagemaker/searchbar/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
    },

    observers: {
    },

    ready(){
        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                btnColor: myconfigs.color.primary_btn,
                color: myconfigs.color.primary,
            })
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        text: '',
        textColor: '',
        bodyBgColor: '',
        heightValue: '80rpx',
        btnColor: '',
        color: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        gotoSearch: function () {
            wx.navigateTo({
                url: '/pkgSearch/page/search/index',
                success: (result) => {

                },
                fail: () => { },
                complete: () => { }
            });

        },

    }
})

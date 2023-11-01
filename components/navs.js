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
// components/home-navs.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items: { type: Array, value: [] },
    },

    /**
     * 组件的初始数据
     */
    data: {
        navPages: wx.getStorageSync('navPages'),
    },

    observers: {
        "items.**": function (val) {
            this.initNavs()
        },
    },

    ready: function () {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickHandle: function (e) {
            var page = e.currentTarget.dataset.page
            var index = e.currentTarget.dataset.index
            console.log('p', page, 'i', index)
            var nav = this.data.navPages[page][index]
            console.log('nav click', nav)
            switch (nav.opentype.toLowerCase()) {
                case 'navigateto':
                    wx.navigateTo({
                        url: nav.path
                    })
                    break;
                case 'switchtab':
                    wx.switchTab({ url: nav.path })
                    break;
                case 'miniprogram':
                    console.log('打开小程序')
                    break;
            }
        },
        initNavs: function () {
            var _this = this
            var navs = this.data.items
            var navPages = []
            var index = 0
            var pageSize = 10
            for (var i = 0; i <= navs.length - 1; i++) {
                var nav = navs[i]
                if (!nav.path.startsWith('/')) {
                    nav.path = '/' + nav.path
                }

                if (navPages[index] && navPages[index].length == pageSize) {
                    // 满了
                    index += 1
                }

                // 将navs 转换成可翻页的格式
                if (typeof navPages[index] == 'undefined') {
                    navPages[index] = [nav]
                } else {
                    navPages[index].push(nav)
                }

            }
            console.log('navpages ', navPages)
            var heightClass = navPages[0].length <= 5 ? 'one' : 'two'
            _this.setData({ navPages: navPages, heightClass: heightClass })
        }
    }
})

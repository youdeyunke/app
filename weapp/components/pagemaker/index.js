/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/pagemaker/index.js
const app = getApp()
const pageApi = require("../../api/page")

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageId: {
            type: Number,
            default: 1
        },
        mode: {
            type: String,
            default: 'page',
        },
        pageKey: {
            type: String,
            default: null
        },
        pageHidden: {
          type: Boolean,
          default: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        modules: [],
        paddingSmall: 10,
        paddingLarge: 20,
        paddingValue: 0,

        widthValue: '750rpx',
        loading: true,
        config: null,
    },

    observers: {
        'pageId': function (v) {
            if (!v) {
                return
            }
            this.setData({
                loading: true
            })
            this.loadData()
        },
        'pageKey': function (v) {
            if (!v) {
                return
            }
            this.setData({
                loading: true
            })
            this.loadData()
        },

        "config.padding": function (v) {
            console.log('observers.padding', v)
        },
        "config.width": function (w) {

            if (!w || !w.size) {
                return
            }

            var value = '750rpx' // full
            switch (w.size) {
                case 'large':
                    value = '710rpx'
                    break;
                case 'small':
                    value = '690rpx'
                    break;
            }
            this.setData({
                widthValue: value
            })


        },
    },



    /**
     * 组件的方法列表
     */
    methods: {

        onReachBottom: function () {
            // load more
            this.selectComponent('#posts').loadMore()
        },

        filterOpen: function (e) {
            this.triggerEvent('filteropen', {})
            console.log('filter open 333')
        },

        filterClose: function (e) {
            this.triggerEvent('filterclose', {})
            console.log('filter close 333')
        },

        reload: function () {
            // 用于父组件调用，刷新页面
            this.setData({
                loading: true
            })
            this.loadData()
        },

        loadData: function (cb) {
            var _this = this
            var pageId = this.data.pageId
            var pageKey = this.data.pageKey
            var v = pageKey || pageId
            var q = {
                city_code: wx.getStorageSync('cityCode') || ''
            }
            q.mode = this.data.mode
            // √
            pageApi.getPageDetail(v).then((resp) => {
                var data = resp.data.data
                _this.setData({
                    loading: false,
                    modules: data.modules,
                    pageConfig: data.config,
                })
                _this.setNavbar(data.config)
                _this.triggerEvent('ready', data.config)
            })

        },



        // 设置导航栏颜色、文字、背景
        setNavbar: function (config) {
            if (!config || !config.title) {
                return
            }
            if (config.mode != 'page') {
                return
            }

            var bgColor = config.title.bgColor || '#F0F0F0'
            var fontColor = config.title.color || '#333333'
            var title = config.title.value || ''
            wx.setNavigationBarColor({
                frontColor: fontColor,
                backgroundColor: bgColor,
                success: (err) => {},
            });
            wx.setNavigationBarTitle({
                title: title,
            });
        }

    }
})
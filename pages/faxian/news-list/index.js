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
// pages/faxian/news/index.js
const app = getApp()
const newsApi = require("../../../api/news")
Component({
    /**
     * 组件的属性列表
     */

    /**
     * 组件的初始数据
     */
    data: {
        topNewsItems: [],
        newsItems: [],
        page: 1,
        kw: '',
        end: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadNewsCats: function () {
            //查询顶部
            var _this = this
            newsApi.getNewsCatList().then((resp) => {
                _this.setData({
                    newsCats: resp.data.data
                })
            })
        },

        loadData: function () {
            this.loadNews()
        },

        search: function (kw) {
            this.setData({
                kw: kw,
                page: 1,
                newsItems: []

            }, () => {
                this.loadData
            })
        },

        loadMore: function () {
            var page = this.data.page + 1
            this.setData({
                page: page,
            }, () => {
                this.loadData()
            })
        },

        reloadData: function () {
            this.setData({
                page: 1,
                kw: '',
                newsItems: [],
            }, () => {
                this.loadData()
            })
        },

        loadTopNews: function () {
            // 热门推荐
            var query = {
                is_top: true,
                per_page: 10
            }
            var _this = this
            newsApi.getNewsList(query).then((resp) => {
                if (resp.data.status != 0) {
                    return
                }
                var items = resp.data.data
                _this.setData({
                    topNewsItems: items,
                    loading: false
                })
            })
        },
        loadNews: function () {
            //楼盘资讯
            var _this = this
            var query = {
                page: this.properties.page,
                is_top: false,
                kw: this.properties.kw,
            }
            newsApi.getNewsList(query).then((resp) => {
                if (this.data.page == 1) {
                    _this.setData({
                        newsItems: resp.data.data
                    })
                } else if (this.data.page > 1) {
                    var oldData = _this.data.newsItems
                    var newData = resp.data.data
                    var Data = oldData.concat(newData)
                    _this.setData({
                        newsItems: Data
                    })
                }
            })
        },
    },
    ready: function () {
        this.loadNewsCats()
        this.loadTopNews()
        this.loadNews()
    },

    'observers': {
        "kw": function () {
            this.loadNews()
        },
        "page": function () {
            this.loadNews()
        },
    }
})
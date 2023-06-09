// pkgBroker/pages/broker/items.js
const app = getApp()
const postApi= require("../../../api/post")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        filter: {
            type: Object, value: {}, observer: "filterChange"
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        items: [],
        query: {},
        loading: false
    },
    ready: function () {
    },
    /**
     * 组件的方法列表
     */
    methods: {
        filterChange: function () {
            //console.log('filter change')
            var query = this.data.filter || {}
            if (Object.keys(query).length == 0) {
                return false;
            }

            query.page = 1
            this.setData({ query: query })
            this.loadData()
        },
        loadData: function () {
            var _this = this
            var query = this.data.query
            console.log('load data with query', query)

            if (!query) {
                return false
            }

            _this.setData({ loading: true })
            var query = this.data.query
            // 有待检验   该组件未找到引用
            postApi.getPostList(query).then((resp)=> {
                _this.setData({ items: resp.data.data,loading: false })
            })
        }
    }
})

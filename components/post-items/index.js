// components/sub-district/items.js
const app = getApp();
import Notify from '../../vant/notify/notify.js';


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        filter: {
            type: Object, value: {}, observer: "filterChange"
        },

        albumKey: {type: String, value: null},

    },

    /**
     * 组件的初始数据
     */
    data: {
        items: [],
        query: {},
        loading: true,
    },

    ready: function () { },

    /**
     * 组件的方法列表
     */
    methods: {

        filterChange: function (v) {
            var query = this.data.filter || {}
            if (Object.keys(query).length == 0) {
                return false;
            }
            this.setData({ query: query })
            this.loadData()
        },

        loadData: function () {
            var _this = this
            var query = this.data.query
            if (!query) {
                return false
            }

            _this.setData({ loading: true })
            var query = this.data.query
            app.request({
                url: '/api/v1/posts/',
                hideLoading: true,
                data: query,
                complete: function (r) {
                    _this.setData({ loading: false })
                },

                success: function (resp) {
                    var meta = resp.data.meta
                    var p = _this.data.query.page || 1
                    var i = p - 1
                    var data = { meta: meta }
                    if (p > 1) {
                        var key = 'items[' + i + ']'
                        data[key] = resp.data.data
                    } else {
                        data['items'] = [resp.data.data]
                    }
                    _this.setData(data)


                    for (var i = 0; i <= resp.data.data.length - 1; i++) {
                        var post = resp.data.data[i]
                        wx.setStorage({
                            key: 'post.' + post.id,
                            data: post,
                        })
                    }
            
                }
            })
        }
    }
})

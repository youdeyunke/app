// components/pagemaker/news/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null }

    },

    observers: {
        "config": function (config) {
            if(!config){
                return 
            }
            if(!config.ids){
                return 
            }
            var idsStr = config.ids.map((i) => {return i.toString()}).join(',')
            var query = {}
    
            switch(config.news_from){
                case 'news_ids': 
                    query.ids  = idsStr
                    break;
                case 'cat_ids':
                    break;  
            }

            this.setData({query: query }, () => {
                this.loadNews()
            })
            
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        query: {},
        items: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadNews: function () {
            var query = this.data.query 
            console.log('query is', query)
            var _this = this
            app.request({
                url: '/api/v1/news',
                data: query,
                hideLoading: true,
                success: function (resp) {
                    if (resp.data.status == 0) {
                        var items = resp.data.data
                        _this.setData({ items: items })
                    }
                }
            })
        }

    }
})

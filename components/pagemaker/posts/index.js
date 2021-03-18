const app = getApp()
// components/pagemaker/posts/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null }
    },

    ready() {
        //console.log('posts.module.config is', this.data.config)
        this.loadPosts()
    },

    /**
     * 组件的初始数据
     */
    data: {
        morelink: {},
        items: [],
        loading: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {


        loadPosts: function () {
            var _this = this
            var ids = this.data.config.ids || []
            var albumId = this.data.config.albumId || 0
            var f = this.data.config.dataFrom || 'ids'
            var query = {  }
            if(f == 'ids'){
                query.ids = ids.join(',')
            }
            if( f == 'album'){
                query.album_id = albumId
            }

            app.request({
                url: '/api/v1/posts/',
                data: query,
                success: function (resp) {
                    var res = resp.data.data
                    var config = _this.data.config
                    // TODO setData items
                    res = res.sort((p1, p2) => {
                        var index1 = config.ids.findIndex((v) => v === p1.id)
                        var index2 = config.ids.findIndex((v) => v === p2.id)
                        return index1 - index2
                    })
                    _this.setData({
                        items: res
                    })
                },
            })
        },



    },
    observers: {
        "config.ids": function () {
            this.loadPosts()
        }
    }
})

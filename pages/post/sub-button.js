// pages/post/sub-button.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cat: { type: String },
        pid: { type: Number },
    },


    ready: function () {
        this.loadStatus()
    },

    /**
     * 组件的初始数据
     */
    data: {
        loading: false,
        title: '',
        nameDict: {
            open: {
                btn: ['开盘提醒我', '取消开盘提醒']
            },
            price: {
                btn: ['变价提醒我', '取消变价提醒'],
            }
        },
        fid: null,
        status: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        setTitle: function () {
            // status变化出发title的变化
        },

        subHandle: function () {
            var _this = this
            var method = 'POST'
            var url = '/api/v1/event_followers'
            var data = { post_id: this.data.pid, cat: this.data.cat }
            if (this.data.status == 1) {
                // 取消订阅
                method = 'DELETE'
                url = url + '/' + this.data.fid
            }
            app.request({
                url: url,
                method: method,
                data: data,
                success: function (resp) {
                    // 提交后刷新状态
                    _this.loadStatus()
                }
            })
        },

        loadStatus: function () {
            // 查询订阅状态
            var _this = this
            app.request({
                url: '/api/v1/event_followers',
                data: {
                    post_id: _this.data.pid,
                    cat: _this.data.cat,
                },
                success: function (resp) {
                    _this.setTitle()
                    if (resp.data.data) {
                        _this.setData({
                            status: 1,
                            fid: resp.data.data.id,
                        })
                        return
                    }
                    _this.setData({
                        status: 0,
                        fid: null,
                    })
                    return
                }
            })
        },

    }
})

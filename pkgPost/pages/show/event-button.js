// pages/post/event-button.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
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
        showDialog: false,
        title: '',
        btnIcon: {
            open: {
                name: 'clock-o'
            },
            price: { name: 'chart-trending-o' },
        },
        nameDict: {
            title: ['订阅楼盘动态提醒', '已订阅!'],
            desc: ['一键订阅楼盘动态，开盘、变价、优惠活动等楼盘信息将会通过短信通知您，让您抢占买房先机', '已订阅，楼盘动态将会通过短信通知您'],
            btn: ['订阅提醒', '已订阅']
        },
        fid: null,
        status: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        confirmHandle: function (e) {
            this.setData({
                confirm: !this.data.confirm
            })
        },
        setTitle: function () {
            // status变化出发title的变化
        },

        closeHandle: function () {
            this.setData({ showDialog: false })
        },


        createSubTpl: function(cb){
            // 调用模板消息
            var tpl1 = 'ut-jnNer2qYToPJ6EGQddWcRI87UWYqEIIRdQOGlBHs' // 楼盘动态提醒
            wx.requestSubscribeMessage({
                tmplIds: [tpl1 ],
                success: function(res){
                    // TODO 
                    console.log('create sub tpl res',res)
                    typeof cb === 'function' && cb(res)
                }
            })    
        },

        openHandle: function () {
            wx.showLoading({
                title: '处理中',
                mask: true,
            });
            var _this = this
            auth.ensureUser((user) => {
                wx.hideLoading();

                // 如果是新订阅
                if (_this.data.status == 0) {
                    _this.createSubTpl((res) => {                    
                        _this.setData({ showDialog: true })
                    })
                    return
                }
                _this.subHandle()
            })
        },

        cancleSub: function(){
            var _this = this 
            var fid = this.data.fid 
            var pid = this.data.pid 
            app.request({
                url: '/api/v1/event_followers/' + fid ,
                method: 'DELETE',
                data:  { post_id: pid },
                success: function (resp) {
                    // 提交后刷新状态
                    _this.loadStatus()
                    wx.showToast({
                        title: '已取消订阅楼盘动态通知，系统将不会给您发送任何该楼的动态通知',
                        icon: 'none',
                        image: '',
                        duration: 1500,
                        mask: true,
                    });
                }
            })            
        },

        createSub: function(){
            var _this = this 
            app.request({
                url: '/api/v1/event_followers',
                method: 'POST',
                data:  { post_id: _this.data.pid },
                success: function (resp) {
                    // 提交后刷新状态
                    _this.loadStatus()
                }
            })
        },

        subHandle: function () {
            var _this = this
  
            if (this.data.status == 1) {
                // 取消订阅
                this.cancleSub()
                return
            }
            this.createSub()
        },

        loadStatus: function () {
            // 查询订阅状态
            if (!app.globalData.token) {
                return false
            }
            var _this = this
            app.request({
                url: '/api/v1/event_followers',
                hideLoading: true,
                data: {
                    post_id: _this.data.pid,
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

// pkgPost/components/broker-contact/index.js
const app = getApp() 

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bid: {type: Number, value: null}, 
        postId: {type: Number, value: null},

    },

    /**
     * 组件的初始数据
     */
    data: {
        broker: null,
        mode: 'full' // or mini
    },

    observers: {
        "bid": function(bid){
            if(!bid){
                return
            }

            // load broker info 
            var _this = this  
            // TODO get from cache 
            app.request({
                url: '/api/v1/brokers/' + bid, 
                hideLoading: true, 
                success: function(resp){
                    _this.setData({broker: resp.data.data})
                }
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chatHandle: function () {
            // TODO 如果咨询的是某个具体楼盘
            wx.navigateTo({
                url: '/pages/messages/show?broker_id=' + this.data.broker.id,
            });

        },

        callHandle: function () {
            var phone = this.data.broker.mobile
            wx.makePhoneCall({
                phoneNumber: phone,
            });

        },

        closeHandle: function () {
            this.setData({ mode: 'mini' })
        }

    }
})

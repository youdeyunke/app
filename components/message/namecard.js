// components/message/namecard.js
const app = getApp() 

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        message: {type: Object},

    },

    observers: {
        "message.content": function(uid){
            this.loadBrokerProfile(uid)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表loadBrokerProfile 
     */
    methods: {

        callHandle: function(){
            wx.makePhoneCall({
              phoneNumber: this.data.broker.mobile,
            })
        },

        copyHandle: function(){
            if(!this.data.broker.wechat){
                wx.showToast({
                    icon: 'none',
                  title: '未填写微信号，复制失败',
                })
                return false 
            }
            wx.setClipboardData({
              data: this.data.broker.wechat,
            })
        },

        loadBrokerProfile: function(uid){
            var _this = this  
            app.request({ 
                url: '/api/v1/brokers/show?user_id=' + uid,  
                success: function(resp){ 
                    if(resp.data.status != 0){
                        return 
                    }
                    _this.setData({broker: resp.data.data})
                }
            })
        }

    }
})

// components/comments/comment-item.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postId: { type: Number },
    },

    data: {
        wechat: '',
    },

    ready: function () { 
        var wechat = app.globalData.myconfigs.service_wechat
        this.setData({wechat: wechat})
    },

    methods: {

        copyWechat: function (e) {
            var _this = this
            wx.setClipboardData({
                data: _this.data.wechat,
                success: (result) => {
                    wx.showToast({
                        title: '微信号已复制',
                        icon: 'none',
                    });
                      
                },
            });
              
        }

    }
})

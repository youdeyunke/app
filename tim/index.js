const TIM = require('./tim-wx');
const COS = require('./cos-wx-sdk-v5.js');

module.exports = {
    tim: null,
    SIGN_DATA: null,

    initTim: function (appid) {
        console.log('初始化tim sdk', appid)
        if (!appid) {
            console.error('初始化tim sdk时没有传入appid')
            return
        }
        const options = { SDKAppID: appid, }
        var tim = TIM.create(options)
        tim.registerPlugin({ 'cos-wx-sdk': COS });
        tim.setLogLevel(0)

        // 设置tim的监听方法
        var _this = this
        tim.on(TIM.EVENT.SDK_READY, _this.SDK_READY)
        tim.on(TIM.EVENT.ERROR, _this.ERROR)
        tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, _this.CONVERSATION_LIST_UPDATED)
        tim.on(TIM.EVENT.KICKED_OUT, _this.KICKED_OUT)
        this.tim = tim
    },

    _login: function (signData) {
        // 根据服务端计算出的签名调用tim 的登陆方法
        var tim = this.tim
        var _this = this
        tim.login(signData).then(function (resp) {
            if (resp.code == 0 && resp.data.actionStatus == 'OK') {
                // 登陆成之后，将sign data 存起来便于下次使用 
                _this.SIGN_DATA = signData
                console.log('tim user login success, user id:', signData.userId)
            }
        })
    },


    login: function () {
        console.log('将用户登陆到tim端')
        // 初次获取
        const app = getApp()
        var tim = this.tim
        var _this = this

        if (this.SIGN_DATA) {
            console.log('tim user 已经生成过sign data了，无需重复调用服务器api', this.SIGN_DATA)
            this._login(this.SIGN_DATA)
            return
        }

        // 如果还没有生成sign 
        app.request({
            url: '/api/v1/tim/gen_sign',
            success: function (resp) {
                if (resp.data.error) {
                    console.error('tim 登陆失败。', resp.data.error)
                    return
                }
                var data = resp.data.data
                var signData = { userID: data.userid, userSig: data.sign }
                _this._login(signData)
            }
        })
    },

    CONVERSATION_LIST_UPDATED: function (event) {
        console.log('tim on CONVERSATION_LIST_UPDATED', event)
        console.log('tim 聊天列表更新， 检查小红点')
        var count = 0
        event.data.forEach((c, i) => {
            count += c.unreadCount
        })
        console.log('tim 未读消息的条数为', count)
        var barIndex = 1
        if (count == 0) {
            wx.removeTabBarBadge({
                index: barIndex,
                success: (result) => {
                },
                fail: () => { },
                complete: () => { }
            });
            return false
        }
        wx.setTabBarBadge({
            index: barIndex,
            text: count.toString(),
            fail: (error) => {
                console.log("tim 设置未读数失败", error)
            },
            complete: (info) => { }
        });
    },


    SDK_READY: function (event) {
        console.log('tim sdk ready now!', event)
        // 用户账户已经登陆了，可以开始监听事件
    },


    SDK_NOT_READY: function (event) {
        console.log('tim sdk not ready', event)
    },

    ERROR: function (event) {
        console.error('tim sdk 出错', event)
    },

    KICKED_OUT: function (event) {
        wx.showModal({
            title: '下线通知',
            content: '你的账号已在其它设备登陆，当前账号已被踢下线',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '重新登陆',
            confirmColor: '#1989fa',
            success: (result) => {
                if (result.confirm) {
                    loginHandle()
                } else {
                    wx.switchTab({
                        url: '/pages/home/home',
                    });
                }
            },
            fail: () => { },
            complete: () => { }
        });

    },

}
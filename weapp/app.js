/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
//app.js
const EXT = wx.getExtConfigSync()
const qrApi = require("./api/qr");
const heartbeatApi = require("./api/heartbeat");
const myconfigApi = require("./api/myconfig")

var onfire = require('/utils/onfire.min.js');
wx.onfire = onfire

App({
    globalData: {
        backToReload: false, // 通过naviate back 返回页面后，是否需要刷新页面数据？ 在onShow函数总判断，如果为true，就刷新页面数据
        cityId: null, // 全局城市过滤
        EXT: EXT,
        myconfigs: null,
        ui: {},
        color: {
            primary: '#1989fa'
        },
        visitorId: null, // 访客行为uid
        reddotIntervalId: null,
        system: {},
        userInfo: null,
        token: null,
        LOGIN_FLAG: 0,
        loginWindowShowStatus: false, // loginWindow是否打开，防止login window打开多次
        cities: [],
    },

    setUserInfo: function () {
        // 重新启动后，需要重新设置userinfo到globaldata

        var token = wx.getStorageSync('token');
        this.globalData.token = token;
        this.globalData.userInfo = wx.getStorageSync('userInfo');
        var flag = 0;
        if (token && token.length > 5) {
            flag = 1;
        }
        this.globalData.LOGIN_FLAG = flag;

    },

    ensureConfigs: function (cb) {
        var conf = this.globalData.myconfigs
        if (conf) {

            return typeof cb == "function" && cb(conf);
        }
        return this.loadConfigs(cb)
    },

    genQr: function (path, extData, cb) {
        /*  统一的生成二维码图片的方法  */
        console.log('生成二维码携带的数据:', path, extData)
        extData = JSON.stringify(extData)
        var _this = this
        qrApi.createQrImage(path, extData).then((resp) => {
            if (resp.data.status == 0) {
                return typeof cb == 'function' ** cb(resp.data.data)
            }
        })
    },

    loadConfigs: function (cb) {
        /* 从服务器加载系统配置嘻嘻 */
        var _this = this;
        // √
        myconfigApi.getMyconfigDetail().then((resp) => {
            var conf = resp.data.data;
            _this.globalData.myconfigs = conf
            // _this.globalData.ui = conf.ui // ui assets 
            _this.globalData.color = conf.color
            console.log(conf.text_banner);
            return typeof cb == "function" && cb(conf);
        })
    },

    onHide: function () {
    },

    timLogin: function () { },

    onLaunch: function () {
        var _this = this;
        // this.markVisitor() // 记录用户来源
        this.setUserInfo()
        // this.setSystemInfo()
        this.startReddotInterval()
        this.ensureConfigs(function (config) {
            _this.globalData.myconfigs = config;
        })
        // 监听小程序前后台切换
        wx.onAppShow(this.onAppShow)
        wx.onAppHide(this.onAppHide)
    },

    startReddotInterval: function () {
        // 开始小红点轮训
        this.heartbeat() // 先执行一次，免得要等待10秒之后才会执行
        this.clearReddotInterval()
        var iid = setInterval(this.heartbeat, 10000)
        this.globalData['reddotIntervalId'] = iid
        console.log('新的小红点轮训开始', iid)
    },

    clearReddotInterval: function () {
        var iid = this.globalData.reddotIntervalId
        if (iid) {
            console.log('停止查询小红点')
            clearInterval(iid);
        }
    },

    heartbeat: function () {

        var _this = this;

        var data = {}
        var key = 'bindBrokerId'
        var brokerId = wx.getStorageSync(key)
        var key = 'visitorUid'
        var uid = wx.getStorageSync(key)
        if (brokerId) {
          data.bind_broker_id = brokerId
        }
        if (uid){
          data.uid = uid
        }

        //    √
        heartbeatApi.heartBeat(data).then((resp) => {
            if (!resp.data.data) {
                return
            }
            var data = resp.data.data
            // 系统未读消息数量 `sys_message_count` 用于消息页面系统消息Tab栏的通知角标展示
            var c = data.unread_message_count
            _this.globalData.sys_message_count = data.sys_message_count;
            var tabbar = __wxConfig.tabBar.list
            const index = tabbar.findIndex(item => item.pagePath === 'pages/messages/index.html');
            
            var bindex = (index == -1 ? 1 : index)
            if ( !c || c == 0) {
                wx.removeTabBarBadge({
                    index: bindex
                })
            } else {
                wx.setTabBarBadge({
                    index: bindex,
                    text: c.toString(),
                })
            }
        })
    },

    gotoWebview: function (url, title = "") {
        this.globalData.webviewUrl = url
        wx.navigateTo({
            url: '/pages/webview/show',
        })
    },

    onAppShow: function () {
        console.log('小程序切换到前台')
    },

    onAppHide: function () {
        console.log('小程序切换到后台')
    },

    dingyueHandle: function (cb) {
        // 订阅消息
        var tplId = this.globalData.myconfigs.msg_tpl_id || ''
        wx.requestSubscribeMessage({
          tmplIds: [tplId],
          success: function (res) {
              if (res[tplId] === 'accept') {
                  typeof cb === 'function' && cb(); // 用户同意，执行回调
              } else {
                  // 处理不同的拒绝情况
                  let errMsg;
                  switch (res[tplId]) {
                      case 'reject':
                          errMsg = '您拒绝了订阅请求';
                          break;
                      case 'ban':
                          errMsg = '订阅功能已被封禁';
                          break;
                      case 'filter':
                          errMsg = '订阅请求因重名被过滤';
                          break;
                      default:
                          errMsg = '订阅失败，请稍后再试';
                  }
                  wx.showToast({
                      title: errMsg,
                      icon: 'none',
                      duration: 2000
                  });
              }
          },
          fail: function (err) {
              wx.showToast({
                  title: '订阅消息请求失败',
                  icon: 'none',
                  duration: 2000
              });
            }
        });
    },

});
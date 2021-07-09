//app.js
const auth = require("utils/auth.js");
const EXT = wx.getExtConfigSync()
//const T = require("utils/test.js");
//const TIM = require('tim/index.js');

App({
    globalData: {
        cityId: null, // 全局城市过滤
        EXT: EXT,
        myconfigs: null,

        sourceUid: null,  // 分享者user id
        sceneName: 'default',  // 内部约定场景值
        visitorId: null, // 访客行为id

        reddotIntervalId: null,
        system: {},
        apiHost: 'http://192.168.31.66:20210',
        //apiHost: 'https://zzgd.udeve.cn',
        userInfo: null,
        token: null,
        cities: [],
        qqMapAppKey: "OH2BZ-7QJK6-L44SI-MEJFO-PJNH2-IABHQ",
        navBarHeight: 0, // 导航栏高度
        menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
        menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
        menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    },

    ensureLocation: function (cb) {
        // 确保能获取用户位置信息
        var _this = this;
        var location = wx.getStorageSync("location");

        if (!location) {
            // 打开获取位置信息界面
            // 只能通过点击方式打开
            wx.openSetting({
                success: function (setting) {
                    var value = setting.authSetting["scope.userLocation"];
                    if (value) {
                        _this.getLocation();
                    }
                }
            });

            wx.showToast({
                title: "请允许获取位置信息",
                icon: "none",
                duration: 2000,
                success: function () { }
            });
        }

        if (location) {
            return cb(location);
        }
    },


    createSubTpl: function(tplIds, cb){
        // 调用模板消息
        wx.requestSubscribeMessage({
            tmplIds: tplIds,
            success: function(res){
                // TODO 
                console.log('create sub tpl res',res)
                typeof cb === 'function' && cb(res)
            }
        })    
    },      

    checkForceLogin: function () {
        // 检查是否强制登录
        var d = new Date()
        this.ensureConfigs(function (conf) {
            if (!conf['force_login']) {
                return false
            }
            auth.ensureUser(function (u) {
                console.log('服务端已开启强制登录，用户已登录')
            })
        })
    },

    ensureConfigs: function (cb) {
        var conf = this.globalData.myconfigs
        if (conf) {
            return typeof cb == "function" && cb(conf);
        }
        return this.loadConfigs(cb)
    },

    genQr: function (path, query, cb) {
        /*  统一的生成二维码图片的方法  */
        var qrdata = JSON.stringify(query)
        path = path + '?qrdata=' + qrdata
        console.log('qr path', path, 'qdata ', query)
        var _this = this
        this.request({
            url: '/api/v1/qr/',
            method: 'POST',
            hideLoading: false,
            data: { path: path },
            success: function (resp) {
                if (resp.data.status == 0) {
                    return typeof cb == 'function' ** cb(resp.data.data)
                }
            },
        })
    },



    loadConfigs: function (cb) {
        /* 从服务器加载系统配置嘻嘻 */
        var _this = this; 
        this.request({
            url: "/api/v1/myconfigs",
            hideLoading: true,
            success: function (resp) {
                var conf = resp.data.data;
                _this.globalData.myconfigs = conf
                return typeof cb == "function" && cb(conf);
            }
        });
    },

    downloadImage: function(url, cb){
        this._ensureAlbumScope((res) => {
            return this._downloadImage(url, cb)
        })
    },


    _downloadImage: function (url, cb) {

        // 先下载，再保存
        var url = url.replace('http://', 'https://')
        wx.showLoading({
            title: '正在保存图片',
            mask: true,
        });
        var _this = this
        var downTask = wx.downloadFile({
            url: url,
            success: (res) => {
                console.log('donwload success', res)
                _this.saveImage(res.tempFilePath,cb)
            },
            fail: () => {
                wx.showToast({
                    title: '下载图片失败',
                    icon: 'none',
                });
            },
            complete: () => {
                wx.hideLoading();
            }
        });
    },

    _ensureAlbumScope: function(cb){
        // 检查用户相册权限，如果没有相册权限，引导开启
        wx.getSetting({
            success:function(res){
                if(!res.authSetting['scope.writePhotosAlbum']){
                    wx.showModal({
                      cancelColor: 'cancelColor',
                      title: '权限',
                      content: '请先允许小程序访问相册权限',
                      success: function(r){
                        wx.openSetting({
                            fail: function(err){
                                console.log('fail', err)
                            },
                            success: function (res) {
                                
                                if (res.authSetting['scope.writePhotosAlbum']) {
                                    wx.showModal({
                                        title: '提示',
                                        content: '获取权限成功,再次点击图片即可保存',
                                        showCancel: false,
                                    })
                                }
                                else
                                {
                                    wx.showToast({
                                        title: '请先在“权限设置”中打开相册权限',
                                        icon: 'none',
                                        duration: 3000,
                                    })
                                }
                            },
                        })                         

                      }
                    })
                    return
                }
                typeof cb == 'function' && cb()
            }
        })
    },

    saveImage: function (path, cb) {
        wx.saveImageToPhotosAlbum({
            filePath: path,
            success:function(){
                wx.showToast({
                    icon: 'none',
                    title: '已保存，请前往手机相册查看',
                })
                return typeof cb == 'function' && cb()
            }
        })
        
    
    },

    getLocation: function () {
        // 先获取经纬度
        var _this = this;
        wx.getLocation({
            success: function (res) {
                //保存到data里面的location里面
                var lng = res.longitude;
                var lat = res.latitude;
                var locationStr = lat + "," + lng;
                wx.setStorageSync("location", locationStr);
            },
            complete: function () { }
        });
    },

    loadCities: function (cb) {
        if (this.globalData.cities && this.globalData.cities.length > 0) {
            return cb(this.globalData.cities);
        }

        var _this = this;
        this.request({
            url: "/api/v2/cities",
            hideLoading: true,
            success: function (resp) {
                _this.globalData.cities = resp.data.data;
                return cb(resp.data.data);
            }
        });
    },


    comingSoon: function () {
        wx.showToast({
            title: "功能正在完善中，敬请期待 :)",
            icon: "none",
            duration: 2000
        });
    },


    onHide: function () {
    },

    initTim: function () {
        return
        console.log('配置加载完毕，准备初始化tim sdk')
        var appid = 1400181975
        TIM.initTim(appid)
        // 如果当前用户已经登陆过的话，将tim也登陆
        setTimeout(function () {
            TIM.login()
        }, 1000)
    },


    timLogin: function () { },

    onLaunch: function () {

        var _this = this;
        this.setUserInfo()
        this.setSystemInfo()
        this.startReddotInterval()
        this.ensureConfigs(function (config) {
            _this.loadCities(function (cities) {
                _this.globalData.cities = cities;
                _this.getLocation();
            });
            //setTimeout(_this.initTim, 2000)
        })
        // 监听小程序前后台切换
        wx.onAppShow(this.onAppShow)
        wx.onAppHide(this.onAppHide)
    },

    startReddotInterval: function () {
        // 开始小红点轮训
        this.reddotHandle() // 先执行一次，免得要等待10秒之后才会执行
        
        this.clearReddotInterval()
        // 如果没有开启聊天功能，那么就不用轮训

        var iid = setInterval(this.reddotHandle, 10000)
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

    reddotHandle: function () {
        // 如果没有登录，就不检查
        if (!this.globalData.token) {
            console.log('未登录，不检查未读')
            return false
        }

        var _this = this;
        this.request({
            url: "/api/v1/chat_lists/reddot",
            hideLoading: true,
            success: function (resp) {
                var text = resp.data.data && resp.data.data >= 1 ?  resp.data.data.toString() : ''
                var c= resp.data.data || 0 
                if(c >= 1){
                    wx.setTabBarBadge({
                      index: 1,
                      text: c.toString(),
                    })
                }else{
                    wx.removeTabBarBadge({
                      index: 1,
                      fail: function(){}
                    })
                }
              
            }
        });
    },


    onAppShow: function () {
        console.log('小程序切换到前台')
        this.markUserOnlineStatus('online')
    },

    onAppHide: function () {
        console.log('小程序切换到后台')
        this.markUserOnlineStatus('offline')
    },

    markUserOnlineStatus: function (status) {
        // 向服务器端报告用户的在线状态
        this.request({
            url: '/api/v1/users/' + status,
            method: 'POST',
            hideLoading: true,
            success: function (resp) {
                // pass
            }
        })
    },


    setUserInfo: function () {
        // 从本地缓存中加载用户信息
        var user = wx.getStorageSync('userInfo')
        var token = wx.getStorageSync('token')
        this.globalData.userInfo = user
        this.globalData.token = token
        console.log('global user info is', user)
    },

    setSystemInfo: function () {

        try {
            var systemInfo = wx.getSystemInfoSync();
            var s = systemInfo['system'].split(' ')[0].toLowerCase()
            systemInfo['systemName'] = s
            this.globalData.system = systemInfo
            console.log('systeminfo', systemInfo)

            // 胶囊按钮位置信息
            const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
            // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
            that.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
            that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
            that.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
            that.globalData.menuHeight = menuButtonInfo.height;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
    },

    markVisitor: function (targetType, targetId, cb) {
        // TODO 未登录情况下产生一个唯一身份id
        var _this = this
        this.request({
            url: '/api/v1/visitors',
            hideLoading: true,
            method: 'POST',
            data: {
                target_id: targetId,
                target_type: targetType,
                scene_name: _this.globalData.sceneName, 
                source_uid: _this.globalData.sourceUid,
            },
            success: function (resp) {
                var data = resp.data
                if(data.status == 0){
                    _this.globalData.visitorId = data.data
                    console.log('set vid is', _this.globalData.visitorId)
                }

                typeof cb == 'function' && cb(resp.data.data)
            }
        })
    },


    markVisitorAction: function (actionName, value, seconds, cb) {
        // TODO 未登录情况下产生一个唯一身份id
        var _this = this
        seconds = seconds / 1000
        console.log('get vid is', _this.globalData.visitorId)
        this.request({
            url: '/api/v1/visitor_actions',
            hideLoading: true,
            method: 'POST',
            data: {
                visitor_id: _this.globalData.visitorId, 
                action_name: actionName, 
                value: value, 
                seconds: seconds,
            },
            success: function (resp) {
                var data = resp.data.data
                typeof cb == 'function' && cb(resp.data.data)
            }
        })
    },

    sendSms: function (mobile, cb) {
        var _this = this;
        _this.request({
            url: "/api/v1/sms/sendto",
            data: {
                mobile: mobile
            },
            success: function (resp) {
            }
        });
    },

    bindPhoneNumber: function (e, cb) {
        if (!e.detail.iv || !e.detail.encryptedData) {
            console.log('获取用户手机号错误')
            return false;
        }

        this.request({
            method: 'POST',
            url: '/api/v1/users/bind_xcx_mobile',
            data: {
                'iv': e.detail.iv,
                'encryptedData': e.detail.encryptedData
            },

            success: function (res) {
                if (res.data.status != 0) {
                    wx.showModal({
                        content: '服务器出现错误，请稍后再试',
                        showCancle: false
                    })
                } else {
                    // 绑定手机号成功
                    var user = res.data.data
                    typeof cb == 'function' && cb(user.mobile)
                }
            }
        })
    },


    request: function (obj) {
        var _this = this;
        var token = this.globalData.token;
        if (!obj.hideLoading) {
            wx.showLoading({ title: "加载中", mask: true });
        }

        var header = obj.header || {};
        if (!header["Content-Type"]) {
            header["Content-Type"] = "application/json";
        }
        if (!header["Authorization"] && token) {
            // 判断token有值才传递，防止传递null obj给后端
            header["Authorization"] = token;
        }

        header['Content-MD5'] = '18a8cf43bad24635aae501bb13a7157d'
        var d = new Date() 
        header['Accept-Datetime'] = d.toLocaleDateString()

        // This must be wx.request !
        var url = this.globalData.apiHost + obj.url;
        var _method = obj.method || 'GET'
        var _Methods = ['GET', 'POST', 'PUT', 'DELETE']
        if (!_Methods.includes(_method)) {
            console.log(_method, "方法错误,仅支持", _Methods)
        }

        wx.request({
            url: url,
            data: obj.data || {},
            method: obj.method || "GET",
            header: header,
            success: function (res) {
                if (res.data.statusCode == 500) {
                    wx.showModal({ title: "服务器错误", content: "服务器出错了，请稍后重试" });
                    return false;
                }

                if (res.data.status == 888) {
                    // 调起支付
                    wx.requestPayment({
                        timeStamp: res.data.data.timeStamp,
                        nonceStr: res.data.data.nonceStr,
                        package: res.data.data.package,
                        signType: res.data.data.signType,
                        paySign: res.data.data.paySign,
                        success: function (wxpay_res) {
                            if (wxpay_res['errMsg'] == "requestPayment:ok") {
                                // 支付成功了
                                wx.showToast({ title: "支付成功", icon: "success" });
                                return typeof obj.success == "function" && obj.success(res);
                            } else {
                                wx.showModal({
                                    title: "支付失败",
                                    content: wxpay_res['errMsg']
                                });
                                return typeof obj.fail == "function" && obj.success(res);
                            }

                        },
                        fail: function (wxpay_res) {
                            wx.showModal({ title: "支付失败", content: "支付失败，请重试" });
                            return typeof obj.fail == "function" && obj.success(res);
                        }
                    });
                    return
                }

                if (res.data.status == 889) {
                    var error = res.data.error;
                    wx.showModal({
                        title: "支付失败",
                        content: error
                    });
                    return false;
                }

                if (res.data.status == 444) {
                    var error = res.data.error;
                    wx.redirectTo({
                        url: "/pages/444/index?error=" + error
                    });
                    return false;
                }

                if (res.data.status == 404) {
                    var error = res.data.error;
                    
                    return false;
                }              

                if ([2000, 2001].includes(res.data.status)) {
                    // token 过期,清空当前登录状态
                    auth.gotoAuth("需要登录", "请先登录账号");
                    return false;
                }
                if (res.data.status == 1 && res.data.error) {
                    wx.showModal({
                        title: "温馨提示",
                        content: res.data.error
                    });
                }

                var t = _this.globalData.myconfigs && _this.globalData.myconfigs.timeout ? _this.globalData.myconfigs.timeout : 0
                setTimeout(function () {
                    // 加载完成后
                    if (!obj.hideLoading) {
                        wx.hideLoading();
                    }
                    wx.hideNavigationBarLoading();
                    wx.stopPullDownRefresh();
                    return typeof obj.success == "function" && obj.success(res);
                }, t)
            },
            fail: function (res) {
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
                wx.hideLoading();
                wx.hideToast();
                return typeof obj.fail === 'function' && obj.fail(res)
            },
            complete: function () {
                typeof obj.complete == "function" && obj.complete();
            }
        });
    }
});

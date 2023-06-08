//app.js
const auth = require("utils/auth.js");
const EXT = wx.getExtConfigSync()
const city = require("utils/city.js");
//const T = require("utils/test.js");
//const TIM = require('tim/index.js');
var onfire = require('/utils/onfire.min.js');
wx.onfire = onfire

App({
    globalData: {
        tabIndex: 0,
        backToReload: false, // 通过naviate back 返回页面后，是否需要刷新页面数据？ 在onShow函数总判断，如果为true，就刷新页面数据
        cityId: null, // 全局城市过滤
        EXT: EXT,
        myconfigs: null,
        ui: {},
        color: {
            primary: '#1989fa'
        },
        qrdata: null, // 解析二维码ID后得到的额外数据，扫码后设置到这里，用完之后需要清空，防止污染

        sourceUid: null, // 分享者user id
        visitorId: null, // 访客行为uid

        reddotIntervalId: null,
        system: {},
        //apiHost: 'http://82.157.35.247:9000',
        apiHost: 'https://weapp1.udeve.net/39086',
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
                        _this.wx.getFuzzyLocation({
                          type: 'type',
                          success: (result) => {},
                          fail: (res) => {},
                          complete: (res) => {},
                        });
                    }
                }
            });

            wx.showToast({
                title: "请允许获取位置信息",
                icon: "none",
                duration: 2000,
                success: function () {}
            });
        }

        if (location) {
            return cb(location);
        }
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


    setUserInfo: function () {
        // 重新启动后，需要重新设置userinfo到globaldata
        this.globalData.token = wx.getStorageSync('token')
        this.globalData.userInfo = wx.getStorageSync('userInfo')
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
        this.request({
            url: '/api/v1/qrs/',
            method: 'POST',
            hideLoading: false,
            data: {
                path: path,
                qr_data: extData
            },
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
                _this.globalData.ui = conf.ui // ui assets 
                _this.globalData.color = conf.color
                return typeof cb == "function" && cb(conf);
            }
        });
    },

    downloadImage: function (url, cb) {
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
                _this.saveImage(res.tempFilePath, cb)
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

    _ensureAlbumScope: function (cb) {
        // 检查用户相册权限，如果没有相册权限，引导开启
        wx.getSetting({
            success: function (res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.showModal({
                        cancelColor: 'cancelColor',
                        title: '权限',
                        content: '请先允许小程序访问相册权限',
                        success: function (r) {
                            wx.openSetting({
                                fail: function (err) {
                                    console.log('fail', err)
                                },
                                success: function (res) {

                                    if (res.authSetting['scope.writePhotosAlbum']) {
                                        wx.showModal({
                                            title: '提示',
                                            content: '获取权限成功,再次点击图片即可保存',
                                            showCancel: false,
                                        })
                                    } else {
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
            success: function () {
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
        wx.getFuzzyLocation({
            success: function (res) {
                //保存到data里面的location里面
                var lng = res.longitude;
                var lat = res.latitude;
                var locationStr = lat + "," + lng;
                wx.setStorageSync("location", locationStr);
            },
            complete: function () {}
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

    timLogin: function () {},

    onLaunch: function () {
        var _this = this;
        this.markVisitor() // 记录用户来源
        this.setUserInfo()
        this.setSystemInfo()
        this.startReddotInterval()
        this.ensureConfigs(function (config) {
            _this.globalData.myconfigs = config;
            _this.loadCities(function (cities) {
                _this.globalData.cities = cities;
                city.setCity()
            });
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
        // 如果没有登录，就不检查
        if (!this.globalData.token) {
            console.log('未登录，不检查未读')
            return false
        }

        var _this = this;
        var data = {
            sourceName: wx.getStorageSync('sourceName') || '',
            parentId: wx.getStorageSync('parentId') || '',
        }
        this.request({
            url: "/api/v1/heartbeat",
            data: data,
            method: 'POST',
            hideLoading: true,
            success: function (resp) {
                if (!resp.data.data) {
                    return
                }
                var data = resp.data.data
                // 未读消息 
                var c = data.unread_message_count 
                var bindex = 1
                if(c == 0){
                    wx.removeTabBarBadge({ index: bindex  })
                }else {
                    wx.setTabBarBadge({
                        index: bindex,
                        text: c.toString(),
                    })
                }
            }
        });
    },

    gotoWebview: function (url, title = "") {
        this.globalData.webviewUrl = url
        wx.navigateTo({
            url: '/pages/webview/show',
        })
    },

    cmdHandle: function (cmd, title) {
        // 防止同一个命令短时间重复执行 
        var d = 10 * 1000
        var now = new Date().getTime()
        if (this.globalData.lasCmdAt && this.globalData.lasCmdAt + d >= now) {
            console.log('不重复执行cmd', )
            return false
        }
        this.globalData.lasCmdAt = now
        switch (cmd) {
            case 'toast':
                wx.showToast({
                    icon: 'none',
                    title: title,
                })
        }
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
        // TODO 重新实现此方法
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

    markVisitor: function (cb) {
        // 未登录情况下产生一个唯一身份id
        // 注意，此方法只负责创建一个新的vid值，不负责处理绑定转发分享等逻辑，相关逻辑由heartbeat负责处理
        var _this = this
        var key = 'visitorUid'
        var vid = wx.getStorageSync(key); 
        if(vid && vid.length > 5){
          // 已经有vid了，不需要重新生成
          return ;
        }
        // 创建一个新的vid
        this.request({
            url: '/api/v1/visitors',
            hideLoading: true,
            method: 'POST',
            data: { },
            success: function (resp) {
                var data = resp.data
                if (data.status == 0) {
                    _this.globalData.visitorId = data.data
                    wx.setStorage({
                        key: key,
                        data: data.data
                    })
                    console.log('set vid is', _this.globalData.visitorId)
                }

                typeof cb == 'function' && cb(resp.data.data)
            }
        })
    },


    markVisitorAction: function (actionName, seconds, cb) {
        // TODO 未登录情况下产生一个唯一身份id
        var _this = this
        seconds = seconds / 1000
        var key = 'visitorUid'
        var uid = wx.getStorageSync(key)
        if (!uid) {
            console.log('没有visitor id，无法上报事件 ' + actionName)
            return
        }

        this.request({
            url: '/api/v1/visitor_actions',
            hideLoading: true,
            method: 'POST',
            data: {
                visitor_uid: uid,
                name: actionName,
                seconds: seconds,
            },
            success: function (resp) {
                var data = resp.data.data
                typeof cb == 'function' && cb(resp.data.data)
            }
        })
    },

    setShareParams:function(query){
      // 从参数中解析出分享参数并写入local storage
      let parentId = wx.getStorageSync('parentId');
      if(query.parentId){
        if(!parentId){
            wx.setStorage({
                key: 'parentId',
                data: query.parentId
            })
        }
      }
      let sourceName = query.sourceName
      if(query.sourceName){
        if(!sourceName){
            wx.setStorage({
                key: 'sourceName',
                data: query.sourceName,
            })
        }
      }
    },

    sendSms: function (mobile, cb) {
        var _this = this;
        _this.request({
            url: "/api/v1/sms/sendto",
            data: {
                mobile: mobile
            },
            success: function (resp) {}
        });
    },

    bindPostCustomer: function (postId, remark) {
        // 将客户和楼盘进行绑定关联 
        var _this = this
        var data = {
            post_id: postId,
            remark: remark || '未知'
        }
        this.request({
            url: '/api/v1/post_customers/',
            method: 'POST',
            hideLoading: true,
            data: data,
            success: function (resp) {
                // pass
            }
        })
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

    dingyueHandle: function (cb) {
        // 订阅消息
        var tplId = this.globalData.myconfigs.msg_tpl_id || ''
        wx.requestSubscribeMessage({
            tmplIds: [tplId],
            fail: function (res) {
                console.log('订阅消息失败:', res)
            },
            complete: function(e){ 
                typeof cb == 'function' && cb()
            }
        })
    },


    request: function (obj) {
        var _this = this;
        var token = this.globalData.token;
        if (!token) {
            // 重要。初次启动的时候，无法从globaldata忠拿到token，要本地读取
            token = wx.getStorageSync('token')
        }
        if (!obj.hideLoading) {
            wx.showLoading({
                title: "加载中",
                mask: true
            });
        }

        var header = obj.header || {};
        if (!header["Content-Type"]) {
            header["Content-Type"] = "application/json";
        }
        if (!header["Authorization"] && token) {
            // 判断token有值才传递，防止传递null obj给后端
            header["Authorization"] = token;
        }
        //console.log('api：', obj.url, 'token', token)

        header['Content-MD5'] = '18a8cf43bad24635aae501bb13a7157d'
        var d = new Date()
        header['Accept-Datetime'] = d.toLocaleDateString()

        // This must be wx.request !
        var host = EXT.apihost
        //console.log('ext is', EXT)
        var url = host + obj.url;
        var _method = obj.method || 'GET'
        _method = _method.toUpperCase()
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
                if (res.data.status == 500) {
                    wx.showModal({
                        title: "服务器错误",
                        content: "服务器出错了，请稍后重试"
                    });
                    wx.hideLoading()
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
                                wx.showToast({
                                    title: "支付成功",
                                    icon: "success"
                                });
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
                            wx.showModal({
                                title: "支付失败",
                                content: "支付失败，请重试"
                            });
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
                        url: "/pkgError/pages/444/index?error=" + error
                    });
                    return false;
                }

                if (res.data.status == 404) {
                    var error = res.data.error;
                    //wx.redirectTo({
                    //    url: "/pages/404/index?error=" + error
                    //});
                    //return false;
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

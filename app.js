//app.js
const ald   = require('utils/ald-stat.js')
const auth  = require("utils/auth.js");
const EXT   = wx.getExtConfigSync()

App({
  globalData: {
    EXT: EXT,
    system: {},
    assetsList: [ '客梯','货梯', '扶梯', '中央空调', '停车位', '天然气', '网络', '暖气', '上水', '下水', '排烟', '排污', '可明火', '380V', '外摆区' ],
    apiHost: EXT['apihost'] || 'https://weapp.udeve.cn/9000',
    userInfo: null,
    token: null,
    loadingStatus: 0,
    cities: [],
    qqMapAppKey: "OH2BZ-7QJK6-L44SI-MEJFO-PJNH2-IABHQ",
    serverMobile: "",

    filterTypeItem: {
      type: "picker",
      name: "户型",
      key: "type",
      options: [
        {
          label: "不限",
          value: ""
        },
        {
          label: "一室",
          value: "1"
        },
        {
          label: "两室",
          value: "2"
        },
        {
          label: "三室", 
          value: "3"
        },
        {
          label: "四室",
          value: "4"
        },
        {
          label: "五室以上",
          value: "5"
        }
      ]
    },


    filterAreaItem: {
      type: "picker",
      name: "面积",
      key: "area",
      options: [
        {
          label: "不限",
          value: ""
        },
        {
          label: "0~50㎡",
          value: "0,50"
        },
        {
          label: "50~100㎡",
          value: "50,100"
        },
        {
          label: "100~150㎡", 
          value: "100,150"
        },
        {
          label: "150~200㎡",
          value: "150,200"
        },
        {
          label: "200㎡以上",
          value: "200,99999"
        }
      ]
    },
    filterTotalPriceItem: {
      type: "picker",
      name: "总价",
      key: "total_price",
      options: [
        {
          label: "不限",
          value: ""
        },
        {
          label: "50万以内",
          value: "0,50"
        },
        {
          label: "50万～80万",
          value: "50,80"
        },
        {
          label: "80万~100万",
          value: "80,100"
        },
        {
          label: "100万~120万",
          value: "100,120"
        },
        {
          label: "120万~150万",
          value: "120,150"
        },
        {
          label: "150万~200万",
          value: "150,200"
        },
        {
          label: "200万~300万",
          value: "200,300"
        },
        {
          label: "300万~400万",
          value: "300,400"
        },
        {
          label: "400万以上",
          value: "400,99999"
        },
      ]
    },


    filterRentPriceItem: {
      type: "picker",
      name: "价格",
      key: "rent_price",
      options: [
        {
          label: "不限",
          value: ""
        },
        {
          label: "1000以内",
          value: "0,1000"
        },
        {
          label: "1000~1200",
          value: "1000,1200"
        },
        {
          label: "1200~1500",
          value: "1200,1500"
        },
        {
          label: "1500,2000",
          value: "1500,2000"
        },
        {
          label: "2000~2500",
          value: "2000,2500"
        },
        {
          label: "2500~3000",
          value: "2500,3000"
        },
        {
          label: "3000~4000",
          value: "3000,4000"
        },
        {
          label: "4000~5000",
          value: "4000,5000"
        },
        {
          label: "5000以上",
          value: "5000,99999"
        }
      ]
    },

    filterShopPriceItem: {
      type: "picker",
      name: "价格",
      key: "price",
      options: [
        {
          label: "不限",
          value: ""
        },
        {
          label: "5000以内",
          value: "0,5000"
        },
        {
          label: "5000~1万",
          value: "5000,10000"
        },
        {
          label: "1.5万~1.8万",
          value: "15000,18000"
        },
        {
          label: "1.8万~2.0万",
          value: "18000,20000"
        },
        {
          label: "2万~2.5万",
          value: "20000,25000"
        },
        {
          label: "2.5万~3万",
          value: "20000,30000"
        },
        {
          label: "3万以上",
          value: "30000,999999"
        }
      ]
    },

    filterOrderItem: {
      type: "picker",
      name: "排序",
      key: "order",
      options: [
        {
          label: "默认",
          value: "id desc"
        },
        {
          label: "面积（从大到小)",
          value: "area desc"
        },
        {
          label: "面积（从小到大)",
          value: "area asc"
        },
        {
          label: "租金（从小到大)",
          value: "rent_price  asc"
        },
        {
          label: "租金（从大到小)",
          value: "rent_price desc"
        }
      ]
    },
    filterRenttypeItem: {
      type: "picker",
      name: "转让类型",
      key: "rent_type",
      options: [
        {
          label: "出租",
          value: "rent"
        },
        {
          label: "出售",
          value: "sale"
        },
      ]
    }


  },


  chooseLocation: function (cb) { 
    var _this = this
    wx.chooseLocation({
          success: function (res) { 
              console.log('res', res)
              _this.request({
                  url: '/api/v1/sub_districts',
                  method: 'POST',
                  data: res,
                  success: function (resp) { 
                      if(resp.data.status == 0){
                        var data = resp.data.data
                        console.log('get sub_district ', data)
                        typeof cb == 'function' && cb(data)
                      }
                   }
              })
           }
      })
   },

  ensureLocation: function(cb) {
    
    // 确保能获取用户位置信息
    var _this = this;
    var location = wx.getStorageSync("location");

    if (!location) {
      // 打开获取位置信息界面
      // 只能通过点击方式打开
      wx.openSetting({
        success: function(setting) {
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
        success: function() {}
      });
    }

    if (location) {
      return cb(location);
    }
  },

  checkForceLogin: function(){
      // 检查是否强制登录
      var d = new Date()
      this.ensureConfigs(function(conf){
        if(!conf['force_login']){
          return false
        }
        var token = wx.getStorageSync('token')
        var userInfo = wx.getStorageSync('userInfo')
        if(token && userInfo){
          console.log('账号已经登录')
        }else{
          console.log('服务器已经开启强制登录验证，跳转到登录界面')
          wx.redirectTo({ url: '/pages/auth/index' })
        }
      })
  },

  ensureConfigs: function(cb){
      var conf = this.globalData.myconfigs
      if(conf){
        return typeof cb == "function" && cb(conf);
      }
      return this.loadConfigs(cb)
  },

  
  genQr: function(path, cb){
      /*  统一的生成二维码图片的方法  */
      var _this = this
      this.request({
          url: '/api/v1/qr/',
          method: 'POST',
          data: { path: path },
          success: function(resp){
              if(resp.data.status == 0){
                return typeof cb == 'function' ** cb(resp.data.data)
              }
          },
      })
  },

  loadConfigs: function(cb) {
    /* 从服务器加载系统配置嘻嘻 */
    var _this = this;
    this.request({
      url: "/api/v1/myconfigs",
      hideLoading: true,
      success: function(resp) {
        var conf = resp.data.data;
        wx.setStorageSync( "myconfigs", conf )
        _this.globalData.myconfigs = conf
        return typeof cb == "function" && cb(conf);
      }
    });
  },

  saveImage: function(path, cb){
    wx.saveImageToPhotosAlbum({
      filePath: path,
      complete: function(res){
        if(res.errMsg == 'saveImageToPhotosAlbum:fail auth deny'){
            wx.navigateTo({
              url: '/pages/myself/setting',
              success: function(){
                wx.showToast({
                  title: '请先在“权限设置”中打开相册权限',
                  icon: 'none',
                  duration: 3000,
                  success: function(){ },
                })
              },
            })
        }
      },
      success: function(res) { 
        wx.showToast({
          icon: 'none',
          title: '已保存，请前往手机相册查看',
        })
        return typeof cb == 'function' && cb()
      }
    })    
  },

  getLocation: function() {
    // 先获取经纬度
    var _this = this;
    wx.getLocation({
      success: function(res) {
        //保存到data里面的location里面
        var lng = res.longitude;
        var lat = res.latitude;
        var locationStr = lat + "," + lng;
        wx.setStorageSync("location", locationStr);
      },
      complete: function() {}
    });
  },

  loadCities: function(cb) {
    if (this.globalData.cities && this.globalData.cities.length > 0) {
      console.log("global data c", this.globalData.cities);
      return cb(this.globalData.cities);
    }

    var _this = this;
    this.request({
      url: "/api/v2/cities",
      hideLoading: true,
      success: function(resp) {
        _this.globalData.cities = resp.data.data;
        return cb(resp.data.data);
      }
    });
  },

  cachePosts: function(posts) {
    // 在列表页面中，缓存房源详情信息
    var _this = this;
    posts.forEach(function(post, i) {
      var pid = post.id;
      var key = "post.data." + pid;
      var _post = wx.getStorageSync(key);
      if (!_post) {
        _this.request({
          url: "/api/v2/posts/" + pid,
          hideLoading: true,
          success: function(resp) {
            var post = resp.data.data;
            wx.setStorage({
              key: key,
              data: post
            });
            console.log("cached post.id", pid);
          }
        });
      }
    });
  },

  loadPosts: function(that) {
    if (!that.data.hasMore) {
      return false;
    }
    var query = {
      //city_id: that.data.city_id || '',
      offset: that.data.offset || 0,
      limit: that.data.limit || 0,
      group: that.data.group || "all"
    };
    var _this = this;
    this.request({
      url: "/api/v1/posts",
      data: query,
      success: function(resp) {
        console.log("app.resp", resp);
        var d = {};
        if (resp.data.data.length == 0) {
          d.hasMore = false;
        } else {
          var k = "posts[" + that.data.offset + "]";
          d[k] = resp.data.data;
          _this.cachePosts(resp.data.data);
        }
        d.offset = resp.data.paginate.offset;
        that.setData(d);
      }
    });
  },

  comingSoon: function() {
    wx.showToast({
      title: "功能正在完善中，敬请期待 :)",
      icon: "none",
      duration: 2000
    });
  },

  startReddotInterval: function() {
    return false;

    var _this = this;
    var key = "reddot.inteval";
    var iid = wx.getStorageSync(key);
    if (iid) {
      clearInterval(iid);
    }
    console.log("开始检查红点");
    iid = setInterval(_this.getReddot, 15000);
    wx.setStorageSync(key, iid);
  },

  getReddot: function() {
    return false;

    var _this = this;
    this.request({
      url: "/api/v1/chat_lists/reddot",
      hideLoading: true,
      success: function(resp) {
        if (resp.data.data == 1) {
          console.log("显示红点");
          wx.showTabBarRedDot({
            index: 1
          });
        }
      }
    });
  },

  onLaunch: function() {
    var _this = this;
    this.loadConfigs()
    this.getSystemInfo()
    this.getReddot();
    this.startReddotInterval();
    this.loadCities(function(cities) {
      _this.globalData.cities = cities;
      _this.getLocation();
    });
    console.log('EXT is ', EXT)
  },

  getSystemInfo: function(){

    try {
      var res = wx.getSystemInfoSync();
      var s = res['system'].split(' ')[0].toLowerCase()
      res['systemName'] = s
      this.globalData.system  = res
      console.log('systeminfo', res)
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }    
  },

  markVisitor: function(oid, otype){
      var _this = this
      this.request({
          url: '/api/v1/visitors',
          hideLoading: true,
          method: 'POST',
          data: {
              target_id: oid,
              target_type: otype
          },
          success: function(resp){
              // pass
          }
      })
  },
  
  uploadFormid: function(e, cb){
    return this.uploadFormId(e, cb)
  },

  uploadFormId: function(e, cb) {
    // 保存formid
    if(!e || !e.detail){
      return false; 
    }

    var _this = this;
    var formId = e.detail.formId
    var token = wx.getStorageSync("token");

    if (!token) {
      console.log('token empty pass')
      return false;
    }

    if (formId == 'the formId is a mock one'){
      console.log('formid pass, ', formId)
      return false;
    }

    wx.checkSession({
      success: function(){
        console.log('check session success, post formid ', e.detail.formId)
        _this.request({
          hideLoading: true,
          url: "/api/v1/formid/",
          data: {formid: e.detail.formId},
          hideLoading: true,
          method: "POST",
          success: function(resp){
              return typeof cb == 'function' && cb(resp.data)
          }
        });
      },
    })
  },

  setLoginBack: function(eb) {
    return wx.setStorageSync("login_back", eb);
  },

  loginBack: function() {
    // 回到登录前页面
    var eb = wx.getStorageSync("login_back");
    if (eb.key && eb.value) {
      if (eb.key == "redirect") {
        wx.redirectTo({
          url: eb.value
        });
      }
      if (eb.key == "switch") {
        wx.switchTab({
          url: eb.value
        });
      }
      wx.setStorage({
        key: "login_back",
        data: null
      });
    }
  },

  sendSms: function(mobile, cb) {
    var _this = this;
    _this.request({
      url: "/api/v1/sms/sendto",
      data: {
        mobile: mobile
      },
      success: function(resp) {
        console.log("send sms resp", resp);
      }
    });
  },

    bindPhoneNumber: function(e,  cb){
      if(!e.detail.iv || !e.detail.encryptedData){
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
                  var user =  res.data.data
                  console.log(that.data.mobile)
                  typeof cb == 'function' && cb(user.mobile)
              }
          }
      })
    },


  request: function(obj) {
    var _this = this;
    var token = wx.getStorageSync("token");
    if (!obj.hideLoading) {
      wx.showLoading({ title: "加载中", mask: true });
    }

    var header = obj.header || {};
    if (!header["Content-Type"]) {
      header["Content-Type"] = "application/json";
    }
    if (!header["Authorization"]) {
      header["Authorization"] = token;
    }

    // This must be wx.request !
    var url = this.globalData.apiHost + obj.url;
    var _method = obj.method || 'GET'
    var _Methods = ['GET', 'POST', 'PUT', 'DELETE']
    if(!_Methods.includes(_method)){
        console.log(_method, "方法错误")
    }

    wx.request({
      url: url,
      data: obj.data || {},
      method: obj.method || "GET",
      header: header,
      success: function(res) {
        if (res.data.statusCode == 500) {
          console.log("server error", res);
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
            success: function(wxpay_res) {
              console.log('wxpay res is', wxpay_res, 'obj.success func is', obj.success)
              if(wxpay_res['errMsg'] ==  "requestPayment:ok"){
                // 支付成功了
                wx.showToast({ title: "支付成功", icon: "success" });
                return typeof obj.success == "function" && obj.success(res);
              }else{
                wx.showModal({
                  title: "支付失败",
                  content: wxpay_res['errMsg']
                });
                return typeof obj.fail == "function" && obj.success(res);
              }

            },
            fail: function(wxpay_res) {
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

        if ([2000, 2001].includes(res.data.status)) {
          console.log("login required status", res.data.status);
          // token 过期
          wx.setStorageSync("userInfo", null);
          wx.setStorageSync("token", null);
          auth.gotoAuth("需要登录", "请先登录账号");
          return false;
        }
        if (res.data.status == 1 && res.data.error) {
          wx.showModal({
            title: "温馨提示",
            content: res.data.error
          });
        }
        return typeof obj.success == "function" && obj.success(res);

      },
      fail: function(res) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },
      complete: function() {
        if(!obj.hideLoading){ wx.hideLoading(); }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        typeof obj.complete == "function" && obj.complete();
      }
    });
  }
});

const app = getApp();
var qiniu = require('../../../utils/qiniu.js');
var auth = require('../../../utils/auth.js');

Page({
    /*/
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        mobile: '',
        name: '',
        smsCode: '',
        sex: 1,
        userGroupName: '点击选择',
        userGrupId: null,
        loading: true,

        sexOptions: [{
                label: '男',
                value: '1'
            },
            {
                label: '女',
                value: '0'
            }
        ],
        join_status: '',
    },
    //接受子组件传过来的数据
    valueHandle: function (e) {
        console.log("e", e)
        var formdata = this.data.formData;
        formdata['post_title'] = e.detail.title;
        formdata['post_id'] = e.detail.id
        this.setData({
            keyword: e.detail.title,
            showkw: false,
            formData: formdata
        })
    },
    changeSex: function (e) {
        var value = e.detail.item.value
        var sex = this.data.sex
        if (value == 0) {
            sex = 0
        }
        if (value == 1) {
            sex = 1
        }
        this.setData({
            sex: sex,
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */


    serachHandle: function (e) {
        var value = e.detail.value;
        var formdata = this.data.formData
        formdata['post_title'] = value
        console.log("经纪人页面eeee", value)
        this.setData({
            keyword: value,
            showkw: true,
        })
        if (this.data.keyword === '') {
            this.setData({
                showkw: false
            })
        }
    },

    onLoad: function (q) {
        var _this = this
        wx.showLoading()
        this.setData({
            loading: true,
        })

        if (q.post_id) {
            this.setDefaultPost(q.post_id)
        }

        wx.setNavigationBarTitle({
            title: '申请入驻',
        })
    },


    changeMobile: function(){
        this.setData({ 
            mobile: '', 
            mobileLock: false, 
        })
    },


    setDefaultPost: function (pid) {
        // 默认选中的楼盘 
        var _this = this
        var fdata = this.data.formData
        app.request({
            url: '/api/v1/post_base_info/' + pid,
            success: function (resp) {
                var p = resp.data.data
                _this.setData({
                    postId: p.id,
                    postTitle: p.title,
                })
            }
        })
    },


    chooseImage: function (e) {
        if (this.data.uploading == true) {
            return false;
        }
        var _this = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            success(res) {
                _this.setData({
                    uploading: true
                })
                const path = res.tempFilePaths[0]
                qiniu.upload(path, (url) => {
                    var key = e.currentTarget.dataset.key;
                    var formdata = _this.data.formData;
                    formdata[key] = url
                    console.log("key", key)
                    // _this.updateAvatar(url)
                    if (key == 'avatar') {
                        _this.setData({
                            imageurl1: url,
                        })
                    } else if (key == 'namecard') {
                        _this.setData({
                            imageurl3: url
                        })
                    } else if (key == 'wechat_qr') {
                        _this.setData({
                            imageurl2: url
                        })
                    }
                    _this.setData({
                        uploading: false,
                        formData: formdata,
                    })
                    console.log("111fomrdata", formdata)
                })
            }
        })
    },


    validate: function () {
        var data = this.data
        if (data.mobile.length != 11) {
            wx.showToast({
                icon: 'none',
                title: '手机号错误',
            })
            return false
        }

        if(data.mobileLock == false && !data.smsCode){
            wx.showToast({
                icon: 'none',
                title: '请填写短信验证码',
            })
            return false 
        }

        if (!data.name) {
            wx.showToast({
                icon: 'none',
                title: '姓名不能为空',
            })
            return false
        }
        if (data.name.length <= 1 || data.name.length >= 5) {
            wx.showToast({
                icon: 'none',
                title: '姓名长度错误',
            })
            return false
        }
        // if (!data.wechat) {
        //     wx.showToast({
        //         title: '微信号不能为空',
        //         icon: 'none'
        //     })
        //     return false
        // }


        return true
    },

    doPost: function (data) {
        var _this = this

        app.request({
            url: '/api/v1/brokers/',
            data: {
                profile: data
            },
            method: "POST",
            success: function (resp) {
                if (resp.data.status != 0) {
                    return
                }

                wx.showToast({
                    icon: 'success',
                    title: '提交成功'
                })

                setTimeout(function () {
                    wx.navigateTo({
                        url: '/pkgBroker/pages/broker/audit/index?status=pending',
                    })
                }, 1000)

            },
        })
    },

    showUserGroupSelector: function(){
        var el = this.selectComponent('#broker-group-selector')
        el.open()
    },

    groupChange: function(e){
        console.log('e', e)
        var v = e.detail  
        this.setData({ 
            groupName: v.name,  
            groupValue: v.value, 
        })
    },

    submitHandle: function (e) {
        var _this = this

        var isok = this.validate()
        if (!isok) {
            return
        }
        var data = { 
            name: this.data.name, 
            mobile: this.data.mobile, 
            sex: this.data.sex,  
            // wechat: this.data.wechat, 
            post_id: this.data.postId, 
            group_value: this.data.groupValue, 
            group_name: this.data.groupName,
        }
        this.setData({
            loading: true
        })
        var _token = app.globalData.token 
        if(!_token){
            _this.smsLoginHandle(() => {
                _this.doPost(data)
            })
            return
        }else{ 
            _this.doPost(data)
        }

        return 
    },


    smsLoginHandle(cb) {
        // 通过短信验证码登陆账号
        var mobile = this.data.mobile
        var code = this.data.smsCode
        if (!(/^1[3456789]\d{9}$/.test(mobile))) {
            wx.showModal({
                title: '手机号格式错误',
                icon: 'none'
            })
            return false
        }
        if (code.length != 4) {
            wx.showModal({
                title: '验证码输入错误',
                icon: 'none'
            })
            return false
        }
        app.request({
            url: '/api/v1/sms/auth',
            method: 'POST',
            data: {
                mobile: mobile,
                code: code
            },
            success: function (res) {
                var data = res.data
                if (data.status == 0) {
                    // 保存下服务器返回的token
                    var token = data.data.token
                    var user = data.data.user
                    auth.setUserInfo(token, user) 
                    return cb()
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var u = app.globalData.userInfo
        this.checkBrokerStatus()
        if (u && u.id) {
            this.setData({
      
                mobile: u.mobile,
                mobileLock: true,
            })
        }

      var _this  = this  
      app.ensureConfigs((myconfigs) => { 
        _this.setData({
          color: myconfigs.color.primary,
          btnColor: myconfigs.color.primary_btn
        })
      })

    },

    checkBrokerStatus: function () {
        var _this = this
        app.request({
            url: '/api/v1/brokers/check_status',
            method: 'POST',
            data: {},
            success: function (resp) {
                console.log("res", resp)
                _this.setData({
                    userstate: resp.data.data
                })
                var join_status = resp.data.data.join_status
                // 审核中

                if (join_status == 1) {
                    wx.redirectTo({
                        url: '/pkgBroker/pages/broker/audit/index?status=pending',
                    })
                }
                // 已入驻
                if (join_status == 2) {
                    wx.redirectTo({
                        url: '/pkgBroker/pages/broker/audit/index?status=ok',
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.checkBrokerStatus()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
})

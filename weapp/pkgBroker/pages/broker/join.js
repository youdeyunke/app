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
const app = getApp();
const postApi = require("../../../api/post");
const brokerApi = require("../../../api/broker");
var upload = require('../../../utils/upload.js');

Page({
    /*/
     * 页面的初始数据
     */
    data: {
        userInfo: null,

        // bank: '',
        // sub_bank: '',
        // bank_user: '',
        // bank_id: '',
        // mobileLock: true,
        mobile: '',
        name: '',
        smsCode: '',
        postTitle: '请选择',
        postId: '',
        sex: 1,
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


    changeMobile: function () {
        this.setData({
            mobile: '',
            mobileLock: false,
        })
    },


    setDefaultPost: function (pid) {
        // 默认选中的楼盘 
        var _this = this
        //    √
        postApi.getPostBaseInfo(pid).then((resp) => {
            var p = resp.data.data
            _this.setData({
                postId: p.id,
                postTitle: p.title,
            })
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
            success (res) {
                _this.setData({
                    uploading: true
                })
                const path = res.tempFilePaths[0]
                upload.upload(path, (url) => {
                    var key = e.currentTarget.dataset.key;
                    var data = {}
                    data[key] = url
                    console.log("key", key)

                    _this.setData(data)
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

        if (data.mobileLock == false && !data.smsCode) {
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
        // if (!data.groupValue || !data.groupName) {
        //     wx.showToast({
        //         icon: 'none',
        //         title: '请选择身份',
        //     })
        //     return false
        // }


        if (!data.postId) {
            wx.showToast({
                icon: 'none',
                title: '请绑定主营楼盘',
            })
            return false
        }

        if (!data.avatar) {
            wx.showToast({
                icon: 'none',
                title: '请上传个人头像',
            })
            return false
        }
        if (!data.wechat) {
            wx.showToast({
                icon: 'none',
                title: '请填写微信号码',
            })
            return false
        }

        // if (!data.bank || !data.bank_user || !data.sub_bank || !data.bank_id) {
        //     wx.showToast({
        //         icon: 'none',
        //         title: '请填写银行卡信息',
        //     })
        //     return false
        // }


        return true
    },

    doPost: function (data) {
        //  √
        brokerApi.createBroker(data).then((resp) => {
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
        })
    },

    showUserGroupSelector: function () {
        var _this = this
        wx.navigateTo({
            url: '/pages/enums/index?cat=broker_group',
            events: {
                change: function (e) {
                    console.log('e', e);
                    _this.setData({
                        groupValue: e.value,
                        groupName: e.name,
                    })
                }
            },
        })
    },

    groupChange: function (e) {
        var v = e.detail
        this.setData({
            groupName: v.name, // 这里只选择身份显示名称，例如：渠道经纪人、全民经纪人、业主
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
            wechat: this.data.wechat,
            post_title: this.data.postTitle,
            post_id: this.data.postId,
            wechat_qr: this.data.wechat_qr,
            avatar: this.data.avatar,
            namecard: this.data.namecard,
            post_id: this.data.postId,
        }
        this.setData({
            loading: true
        })

        _this.doPost(data)
        

        return
    },


    gotoPostSelector: function () {
        var _this = this
        wx.navigateTo({
            url: '/pkgPost/pages/selector/index',
            events: {
                'change': function (post) {
                    _this.setData({
                        postTitle: post.title,
                        postId: post.id,
                    })
                }
            },
        })
    },

    shoLoginWindow(){
      this.selectComponent('.loginwindow').openWindow()
    },
  
    loginsuccess(e){
      console.log(e);
      var _this = this
      setTimeout(() => {
        var u = app.globalData.userInfo
        if (u && u.id) {
            _this.setData({
                mobile: u.mobile,
                mobileLock: true,
            })
        }
      },1000)
  
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

        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                color: myconfigs.color.primary,
                btnColor: myconfigs.color.primary_btn
            })
        })

    },
    // √
    checkBrokerStatus: function () {
        var _this = this
        brokerApi.checkBrokerStatus({
        }).then((resp) => {
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
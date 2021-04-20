const app = getApp();
var qiniu = require('../../../utils/qiniu.js');
var auth = require('../../../utils/auth.js');

Page({
    /*/
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        uploading: false,
        companiesLoading: true,
        companyPickerShow: false,
        loading: true,
        companies: [],
        company: {
            name: '',
            id: ''
        },
        state: '',
        phonenumber: '',
        imageurl1: "../../images/join/7.png",
        imageurl2: "../../images/join/8.png",
        imageurl3: "../../images/join/9.png",
        formData: {
            name: '',
            wechat: '',
            wechat_qr: '',
            namecard: '',
            avatar: '',
        },
        keyword: '',
        showkw: false,
        userstate: '',
        join_status:''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    serachHandle: function (e) {
        var value = e.detail.value;
        console.log("经纪人页面eeee", value)
        this.setData({
            keyword: value,
            showkw: true
        })
        if (this.data.keyword === '') {
            this.setData({
                showkw: false
            })
        }
    },
    // 接收子组件传过来的数据
    searchtitle: function (e) {
        var mytitle = e.detail.mytitle;
        var formdata = this.data.formData;
        formdata['company_name'] = mytitle;
        this.setData({
            formData: formdata,
            keyword: mytitle,
            showkw: false
        })
        console.log("所有发送的数据", formdata)

    },
    inputHandle: function (e) {
        var value = e.detail.value;
        var key = e.currentTarget.dataset.key;
        var formdata = this.data.formData;
        formdata[key] = value;
        this.setData({
            formData: formdata,
        })
        console.log("formdata", formdata)
    },
    onLoad: function (options) {
        var _this = this
        wx.showLoading()
        this.setData({
            loading: true
        })
        auth.ensureUser(function (userInfo) {
            app.loadConfigs(function (conf) {
                _this.loadCompanies()
                _this.setData({
                    joinType: conf['broker_join_type'],
                })
               
            })
        })
    },

    closeCompanyPicker: function () {
        this.setData({
            companyPickerShow: false
        })
    },

    showCompanyPicker: function () {
        this.setData({
            companyPickerShow: true
        })
    },

    companyChange: function (e) {
        var c = e.detail.value
        if (c.id == this.data.company.id) {
            return false
        }
        this.setData({
            company: c
        })
        console.log('set company', c)
    },

    loadCompanies: function () {
        var _this = this
        app.request({
            url: '/api/v1/companies/',
            data: {
                per_page: 99999,
                page: 1
            },
            success: function (resp) {
                var first = [{
                    name: '没有可选的企业/团队',
                    id: ''
                }]
                var items = first.concat(resp.data.data)
                items = items.map((item, i) => {
                    return {
                        text: item.name,
                        id: item.id
                    }
                })
                _this.setData({
                    companiesLoading: false,
                    companies: items
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
        var data = this.data.formData
        console.log("data", data)
        var noneAvatar = data.avatar
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
        if (!data.wechat) {
            wx.showToast({
                title: '微信号不能为空',
                icon: 'none'
            })
            return false
        }
        if (!data.avatar) {
            wx.showToast({
                icon: 'none',
                title: '请先上传头像',
            })
            return false
        }
        if (!data.wechat_qr) {
            wx.showToast({
                icon: 'none',
                title: '请先上传二维码',
            })
            return false
        }
        if (!data.namecard) {
            wx.showToast({
                icon: 'none',
                title: '请先上传名片',
            })
            return false
        }

        return true
    },



    doPost: function (data) {
        var _this = this
        var joinSubmit = this.data.formData
        app.request({
            url: '/api/v1/brokers/',
            data: {
                profile: joinSubmit
            },
            method: "POST",
            success: function (resp) {
                if (resp.data.status == 0) {
                    wx.showToast({
                        icon: 'success',
                        title: '提交成功'
                    })
                    console.log("joj", this.data.profile)
                }
            },
        })
    },

    submitHandle: function (e) {
        var _this = this
        var data = e.detail.value
        //data['company_id'] = this.data.company.id
        var isok = this.validate()
        if (!isok) {
            return
        }
        this.setData({
            loading: true
        })
        this.doPost(data)
        wx.navigateTo({
            url: '/pkgBroker/pages/broker/audit/index?status=0',
        })
    },

    mobileBind: function (e) {
        console.log('用户授权获取手机号成功', e.detail)
        var mobile = e.detail
        if (!mobile) {
            wx.showToast({
                title: '手机号授权失败，请重试',
                icon: 'error',
            })
            return false
        }
        var broker = this.data.broker || {}
        broker['mobile'] = mobile
        this.setData({
            broker: broker
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var _this = this
        var mobile = _this.data.userInfo.mobile

        _this.setData({
            phonenumber: mobile,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            userInfo: app.globalData.userInfo
        })
        this.checkBrokerStatus()
    },

    checkBrokerStatus: function(){
        var _this=this 
        app.request({
            url: '/api/v1/brokers/check_status', 
            method: 'POST',
            data: {},
            success: function(resp){
                _this.setData({
                    userstate:resp.data.data
                }) 
                var join_state = JSON.stringify(resp.data.data)
                // 审核中
                if(resp.data.data.join_status==1){
                    wx.redirectTo({
                         url: '/pkgBroker/pages/broker/audit/index?status='+join_state,
                    })
                }
                // 已入驻
                if(resp.data.data.join_status==2){
                    wx.redirectTo({
                      url: '/pkgBroker/pages/broker/audit/index?status='+join_state,
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
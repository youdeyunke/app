// // pages/myself/broker.js
// const app = getApp()
// var qiniu = require('../../../utils/qiniu.js');
// var auth = require('../../../utils/auth.js');

// Page({

//     /**
//      * 页面的初始数据
//      */
//     data: {
//         userInfo: {},
//         uploading: false,
//         companiesLoading: true,
//         companyPickerShow: false,
//         loading: true,
//         service_mobile: null, 
//         service_wechat: null,
//         companies: [],
//         company: { name: '', id: '' },
//         state: '',
     
//         successShow:false
//     },

//     /**
//      * 生命周期函数--监听页面加载
//      */
//     onLoad: function (options) {
//         var _this = this
//         wx.showLoading()
//         this.setData({ loading: true })
//         auth.ensureUser(function (userInfo) {
//             app.loadConfigs(function (conf) {
//                 _this.loadCompanies()
//                 _this.setData({ 
//                     joinType: conf['broker_join_type'], 
//                     service_mobile: conf.service_mobile, 
//                     service_wechat: conf.service_wechat,
//                 })
//                 _this.loadUserInfo()
//             })
//         })
//     },

//     closeCompanyPicker: function () {
//         this.setData({
//             companyPickerShow: false
//         })
//     },

//     showCompanyPicker: function () {
//         this.setData({
//             companyPickerShow: true
//         })
//     },

//     companyChange: function (e) {
//         var c = e.detail.value
//         if (c.id == this.data.company.id) {
//             return false
//         }
//         this.setData({ company: c })
//     },

//     loadCompanies: function () {
//         var _this = this
//         app.request({
//             url: '/api/v1/companies/',
//             data: { per_page: 99999, page: 1 },
//             success: function (resp) {
//                 var first = [{ name: '没有可选的企业/团队', id: '' }]
//                 var items = first.concat(resp.data.data)
//                 items = items.map((item, i) => { return { text: item.name, id: item.id } })
//                 _this.setData({
//                     companiesLoading: false,
//                     companies: items
//                 })
//                 console.log('coms', items)
//             }
//         })
//     },

//     chooseImage: function (e) {
//         if (this.data.uploading == true) {
//             return false;
//         }

//         var _this = this
//         wx.chooseImage({
//             count: 1,
//             sizeType: ['original', 'compressed'],
//             success(res) {
//                 _this.setData({ uploading: true })
//                 const path = res.tempFilePaths[0]
//                 qiniu.upload(path, (url) => {
//                     _this.updateAvatar(url)
//                     _this.setData({ uploading: false })
//                 })
//             }
//         })
//     },

//     updateAvatar: function (url) {
//         var _this = this
//         // 设置avatar
//         app.request({
//             url: '/api/v1/users/update_avatar',
//             data: { avatar: url },
//             method: 'POST',
//             success: function (resp) {
//                 if (resp.data.status == 0) {
//                     _this.loadUserInfo()
//                     wx.showToast({
//                         icon: 'none',
//                         title: '头像上传成功！',
//                         duration: 2000,
//                     })
//                 }
//             }
//         })
//     },



//     loadUserInfo: function () {
//         // 从服务器加载最新的用户数据
//         var _this = this
//         this.setData({ loading: true })
//         auth.getRemoteUserInfo(function (user) {
 
//             _this.setData({
//                 userInfo: user,
//                 broker: user.broker_profile,
//                 loading: false
//             })
//             wx.hideLoading()
//             // 如果没有开通经纪人，并且已经提交了个人资料，就进入购买
//             if (!user.broker_profile.enable && user.apply_status != 0 && _this.data.joinType != 'free') {
//                 wx.navigateTo({
//                     url: '/pkgBroker/pages/broker/membership'
//                 })
//             }
//         })
//     },

//     gotoEdit: function (e) {
//         this.setData({
//             state: 'new'
//         })
//     },


//     validate: function (data, cb) {
//         var noneAvatar = !this.data.userInfo.avatar || this.data.userInfo.avatar.endsWith('default-avatar.png')
//         if (noneAvatar) {
//             wx.showToast({
//                 icon: 'none',
//                 title: '请先上传头像',
//             })
//             return false
//         }

//         if (!data.name) {
//             wx.showToast({
//                 icon: 'none',
//                 title: '姓名不能为空',
//             })
//             return false
//         }


//         if (data.length <= 1 || data.length >= 5) {
//             wx.showToast({
//                 icon: 'none',
//                 title: '姓名长度错误',
//             })
//             return false
//         }

//         if (!data.mobile && data.mobile.length != 11) {
//             wx.showToast({
//                 title: '请填写正确的手机号',
//                 icon: 'none',
//             })
//             return false
//         }

//         return cb(data)
//     },

//     fixHandle: function (e) {
//         var user = this.data.userInfo
//         user['apply_status'] = 0
//         this.setData({ userInfo: user })
//     },

//     doPost: function (data) {
//         var _this = this
//         var joinType = this.data.joinType
//         app.request({
//             url: '/api/v1/brokers/',
//             data: { profile: data },
//             method: "POST",
//             success: function (resp) {
//                 if (resp.data.status == 0) {
//                     var user = resp.data.data
//                     app.globalData.userInfo = user
//                     _this.setData({ userInfo: user, loading: false })

//                     /* 资料提交成功，
//                     如果是付费入驻，进入套餐选择界
//                     */
//                     if (joinType == 'free') {
//                         wx.showToast({
//                             icon: 'success',
//                             title: '提交成功，请等待管理审核'
//                         })
//                         return false
//                     }

//                     wx.navigateTo({
//                         url: '/pkgBroker/pages/broker/membership'
//                     })
//                 }
//             },
//         })
//     },

//     submitHandle: function (e) {
//         this.setData({successShow:true})
//     },
//     backHandle(){
//         this.setData({successShow:false})
//     },
//     mobileBind: function (e) {
//         console.log('用户授权获取手机号成功', e.detail)
//         var mobile = e.detail
//         if (!mobile) {
//             wx.showToast({
//                 title: '手机号授权失败，请重试',
//                 icon: 'error',
//             })
//             return false
//         }

//         var broker = this.data.broker || {}
//         broker['mobile'] = mobile
//         this.setData({ broker: broker })
//     },

//     /**
//      * 生命周期函数--监听页面初次渲染完成
//      */
//     onReady: function () { },

//     /**
//      * 生命周期函数--监听页面显示
//      */
//     onShow: function () {
       
//         this.setData({
//             userInfo: app.globalData.userInfo
//         })
//     },

//     /**
//      * 生命周期函数--监听页面隐藏
//      */
//     onHide: function () {

//     },

//     /**
//      * 生命周期函数--监听页面卸载
//      */
//     onUnload: function () {

//     },

//     /**
//      * 页面相关事件处理函数--监听用户下拉动作
//      */
//     onPullDownRefresh: function () {
//         this.loadUserInfo()
//     },

//     /**
//      * 页面上拉触底事件的处理函数
//      */
//     onReachBottom: function () {

//     },

//     /**
//      * 用户点击右上角分享
//      */
//     onShareAppMessage: function () {

//     }
// })







const app = getApp();
var qiniu = require('../../../utils/qiniu.js');
var auth = require('../../../utils/auth.js');

Page({

    /**
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
        phonenumber:'',
        imageurl1:"../../images/join/7.png",
        imageurl2:"../../images/join/8.png",
        imageurl3:"../../images/join/9.png",
        formData: {
            name: '',
            wechat: '',
            wechat_qr: '',
            namecard: '',
            avatar: '',
        },
        keyword:'',
        showkw:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    serachHandle:function(e){
        var value = e.detail.value;
        console.log("经纪人页面eeee",value)
        this.setData({
            keyword:value,
            showkw:true
        })
        if(this.data.keyword === ''){
            this.setData({
                showkw:false
            })
        }
    },
    // 接收子组件传过来的数据
    searchtitle:function(e){
        var mytitle = e.detail.mytitle;
        var formdata = this.data.formData;
        formdata['company_name'] = mytitle;
        this.setData({
            formData: formdata,
            keyword:mytitle,
            showkw:false
        })
        console.log("所有发送的数据",formdata)

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
                _this.loadUserInfo()
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
                    console.log("key",key)
                    // _this.updateAvatar(url)
                    if(key == 'avatar'){
                        _this.setData({
                            imageurl1:url,
                        })
                    }else if(key == 'namecard'){
                        _this.setData({
                            imageurl3:url
                        })
                    }else if(key == 'wechat_qr'){
                        _this.setData({
                            imageurl2:url
                        })
                    }
                    _this.setData({
                        uploading: false,
                        formData: formdata,
                    })
                    console.log("111fomrdata",formdata)
                })
            }
        })
    },
    updateAvatar: function (url) {
        var _this = this
        // 设置avatar
        app.request({
            url: '/api/v1/users/update_avatar',
            data: {
                avatar: url
            },
            method: 'POST',
            success: function (resp) {
                if (resp.data.status == 0) {
                    _this.loadUserInfo()
                    wx.showToast({
                        icon: 'none',
                        title: '头像上传成功！',
                        duration: 2000,
                    })
                }
            }
        })
    },
    loadUserInfo: function () {
        // 从服务器加载最新的用户数据
        var _this = this
        this.setData({
            loading: true
        })
        auth.getRemoteUserInfo(function (user) {
            _this.setData({
                userInfo: user,
                broker: user.broker_profile,
                loading: false
            })
            wx.hideLoading()
            // 如果没有开通经纪人，并且已经提交了个人资料，就进入状态显示页面
            console.log('user info is', user)
            if(!user.is_broker && user.apply_status == 1){
                wx.navigateTo({
                    url: '/pkgBroker/pages/broker/audit/index',
                  })
                return
            }

            // 如果已经开通了
            console.log('user.is_broker', user.is_broker)
            if (user.is_broker ) {
            
                console.log('fuck')
                wx.showModal({
                    title: '操作提示',
                    content: '您已经入驻成功，无需重复申请',
                    showCancle: false,
                    success(res) {
                  
                        wx.navigateBack({
                          delta: -1,
                        })
                      
                    }
                  })
                return
            }
        })
    },

    gotoEdit: function (e) {
        this.setData({
            state: 'new'
        })
    },


    validate: function () {
        var data = this.data.formData 
        console.log("data",data)
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
        if(!data.wechat){
            wx.showToast({
              title: '微信号不能为空',
              icon:'none'
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

    fixHandle: function (e) {
        var user = this.data.userInfo
        user['apply_status'] = 0
        this.setData({
            userInfo: user
        })
    },

    loadCurrentUserInfo: function(){
        // 判断当前账号状态 
        var uid = app.globalData.userInfo.id
        app.request({
            url: '/api/v1/brokers/' + uid, 
            success: function(resp){
                console.log('resp,',resp.data.data)
                var user = resp.data.data 
                console.log('user.status is', user.status)
                if(user.status == 1){
                    // 审核中
                    wx.redirectTo({
                      url: '/pkgBroker/pages/broker/audit/index',
                    })
                    return
                }
                if(user.status == -1){
                    var msg = user.reject_reason 
                    wx.showModal({ title: "审核被拒绝", content: msg });
                    return
                }
                if(user.status == 1){
                    wx.showToast({
                      title: '您已经入驻，无需重复申请',
                      icon:'none',
                    })
                    setTimeout(function(){
                        wx.navigateBack({
                          delta: 1,
                        })
                    },1500)
                    return
                }
            }
        })
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
                    console.log("joj",this.data.profile)
                }
            },
        })
    },

    submitHandle: function (e) {
        var _this = this
        var data = e.detail.value
        //data['company_id'] = this.data.company.id
        var isok = this.validate() 
        if(!isok){
            return
        }
        this.setData({
            loading: true
        })
        this.doPost(data)      
        wx.navigateTo({
          url: '/pkgBroker/pages/broker/audit/index',
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
            phonenumber:mobile,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            userInfo: app.globalData.userInfo
        })
        this.loadCurrentUserInfo()
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
        this.loadUserInfo()
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
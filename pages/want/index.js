// pages/myself/zhao.js
const app = getApp()
var auth = require('../../utils/auth.js');
import Notify from '../../vant/notify/notify';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabIndex:0, 
        tabs: [
            {value: 'form', title: "定制找房"},
            {value: 'form', title: "自助找房"},
        ],
        isDone: false,

        contact_name: '',
        contact_mobile: '',
        contact_sex: 1, 


        area: '', // 期望面积,

        purpose: '', // 关注点
        position: '', // 期望区域
        housetype: '', // 期望户型 
        intent: '', // 详细期望
        contact: '',
        sms_code: '',

        purposeList: [{
                name: '刚需'
            },
            {
                name: '改善房'
            },
            {
                name: '投资增值'
            },
            {
                name: '给父母住'
            },
            {
                name: '学区房'
            },
            {
                name: '其他'
            },
          
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {

    },


    gotoHome: function () {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },

    getFormData: function () {
        var data = {}
    },

    showError: function(msg){
        Notify({message: msg , type:'danger'})
    },

    reWrite: function(e){
        this.setData({isDone: false})
    },


    validate: function (cb) {
        if (!this.data.budget_min) {
            this.showError('请填写预算范围')
            return
        }

        if (!this.data.position) {
            this.showError('请填写区域')
            return
        }

        if (!this.data.housetype) {
            this.showError( '请填写户型')
            return
        }       

        if (!this.data.area) {
            this.showError( '请填写面积')
            return
        }       


        if (!this.data.contact_name) {
            this.showError( '请填写联系人姓名')
            return
        }

        if(this.data.contact_mobile_lock == false && !this.data.sms_code){
            this.showError( '请填写短信验证码')
            return 
        }


        var data = {
            cat: this.data.cat,
            budget: this.data.budget_min + ',' + this.data.budget_max || ' ',
            position: this.data.position,
            intent: this.data.intent,
            housetype: this.data.housetype,  
            area: this.data.area, 
            points: this.data.purpose, 

            name: this.data.contact_name,
            mobile: this.data.contact_mobile,
            sex: this.data.contact_sex, 
        }
        return cb(data)
    },

    sexToggle: function(e){
        this.setData({
            contact_sex: this.data.contact_sex == 1 ? 0 : 1 , 
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
        this.setData({
            contact_mobile: mobile
        })
    },

    mobileIconClickHandle: function (e) {
        wx.showModal({
            title: '提示',
            content: '手机号码仅用做经纪人联系您，请务必填写真实号码',
        })
    },

    smsLoginHandle(cb) {
        // 通过短信验证码登陆账号
        var phone = this.data.contact_mobile
        var code = this.data.sms_code
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
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
                mobile: phone,
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


    submitHandle: function (e) {
        var _this = this
        _this.validate(function (data){
            // 如果需要提交验证码
            var _token = app.globalData.token 
            if(!_token){
                _this.smsLoginHandle(() => {
                    _this.postData(data)
                })
                return
            }
            _this.postData(data)
            return 
        })

    },

    postData: function(data){
        // 将表单数据处理成线索表所需要的数据格式 
        var clueData = { 
            name: data.name,  
            phone: data.mobile,  
            sex: data.sex, 
            content: ''
        }
        var res = [
            '预算：' + data.budget ,
            '区域:' + data.position , 
            '户型:' + data.housetype,  
            '面积:' +  data.area,
            '其他:' + data.intent, 
            '用途:' +  data.points,  
        ]
        clueData.content = res.join('\n')

        app.request({
            url: '/api/v1/clues/',
            data: data,
            method: 'POST',
            success: function (resp) {
                if (resp.data.status != 0) {
                    wx.showToast({
                        title: '服务器出现错误，请稍后再试',
                        icon: 'none',
                    })
                    return false
                }

                // 设置一些重要标志位 
                _this.setData({
                    isDone: true, 
                    sms_code: null,
                    contact_mobile_lock: true,  
                })
            }
        })        
    },

    inputChange: function (e) {
        var key = e.target.dataset.name
        var value = e.detail
        var d = {}
        d[key] = value
        this.setData(d)
    },


    purposeHandle: function (e) {
        var i = e.currentTarget.dataset.index
        var ps = this.data.purposeList
        var p = ps[i]
        var purpose = []

        p.selected = !p.selected
        ps[i] = p
        this.data.purposeList.forEach(function (item, i) {
            console.log('item', item)
            if (item.selected) {
                purpose.push(item.name)
            }
        })


        this.setData({
            purposeList: ps,
            purpose: purpose.join(',')
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
        var user = app.globalData.userInfo
        if (!user) {
            this.setData({
                contact_mobile_lock: false,
            })
            return
        }
        var contact_mobile_lock = false
        if (user.mobile && user.mobile.length == 11) {
            contact_mobile_lock = true
        }
        this.setData({
            contact_mobile: user.mobile,
            contact_mobile_lock: contact_mobile_lock
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

    }
})
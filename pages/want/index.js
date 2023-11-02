/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pages/myself/zhao.js
const app = getApp()
const smsApi = require("../../api/sms")
const needApi = require("../../api/need")
const myEnum = require("../../api/enum")
var auth = require('../../utils/auth.js');
import Notify from '../../vant/notify/notify';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isDone: false,
        contact_name: '',
        contact_mobile: '',
        contact_sex: 1,
        area: '', // 期望面积,
        value: [100, 200],
        valueRuler: [30, 80, 150, 200, 300, 500],
        budget_min: 100,
        budget_max: 200,
        purpose: '', // 关注点
        position: '', // 期望区域
        housetype: '', // 期望户型 
        intent: '', // 详细期望
        contact: '',
        sms_code: '',

        positionList: [],
        housetypeList: [
            { name: '1居', value: 1, },
            { name: '2居', value: 2, },
            { name: '3居', value: 3, },
            { name: '4居', value: 4 },
            { name: '5居', value: 5 },
            { name: '5居+', value: 6 },
        ],

        areaList: [
            { name: '80㎡以下' },
        ],

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

    loadAreaList () {
        var _this = this
        myEnum.getEnumList("areaList").then((resp) => {
            if (resp.data.status != 0) {
                return
            }
            var rdata = resp.data.data
            if (rdata && rdata.length > 0) {
                _this.setData({ areaList: rdata })
            }
        })
    },

    loadPurpose () {
        var _this = this
        myEnum.getEnumList("purpose").then((resp) => {
            if (resp.data.status != 0) {
                return
            }
            var rdata = resp.data.data
            if (rdata && rdata.length > 0) {
                _this.setData({ purpose: rdata })
            }
        })
    },

    loadhousetype () {
        var _this = this
        myEnum.getEnumList("housetype").then((resp) => {
            if (resp.data.status != 0) {
                return
            }
            var rdata = resp.data.data
            if (rdata && rdata.length > 0) {
                _this.setData({ housetypeList: rdata })
            }
        })
    },

    loadbudget () {
        var _this = this
        myEnum.getEnumList("budget").then((resp) => {
            if (resp.data.status != 0) {
                return
            }
            var rdata = resp.data.data
            if (rdata && rdata.length > 0) {
                _this.setData({ budgetList: rdata })
            }
        })
    },

    loadData: function () {
        var _this = this
        var query = {
            cityCode: wx.getStorageSync('cityCode') || ''
        }
        needApi.getNeedList(query).then((resp) => {
            if (resp.data.status != 0) {
                return
            }
            var rdata = resp.data.data


            if (rdata.area && rdata.area.length > 0) {
                _this.setData({ areaList: rdata.area })
            }

            if (rdata.purpose && rdata.purpose.length > 0) {
                _this.setData({ purposeList: resp.data.data.purpose })
            }
            if (rdata.housetype && rdata.housetype.length > 0) {
                _this.setData({ housetypeList: rdata.housetype })
            }
            if (rdata.budget && rdata.budget.length > 0) {
                _this.setData({ budgetList: rdata.budget })
            }

            _this.setData({
                positionList: rdata.districts,
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {

        this.loadData()
        // this.loadAreaList()
        // this.loadPurpose()
        // this.loadhousetype()
        // this.loadbudget()
    },


    gotoHome: function () {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },

    getFormData: function () {
        var data = {}
    },

    showError: function (msg) {
        Notify({ message: msg, type: 'danger' })
    },

    reWrite: function (e) {
        this.setData({ isDone: false })
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
            this.showError('请填写户型')
            return
        }

        if (!this.data.area) {
            this.showError('请填写面积')
            return
        }


        if (!this.data.contact_name) {
            this.showError('请填写联系人姓名')
            return
        }

        if (this.data.contact_mobile_lock == false && !this.data.sms_code) {
            this.showError('请填写短信验证码')
            return
        }


        var data = {
            cat: this.data.cat,
            budget_min: this.data.budget_min,
            budget_max: this.data.budget_max,
            position: this.data.position,
            content: this.data.intent,
            housetype: this.data.housetype,
            area: this.data.area,
            points: this.data.purpose,
            name: this.data.contact_name,
            mobile: this.data.contact_mobile,
            sex: this.data.contact_sex,
        }
        var budget_max = this.data.budget_max
        if (budget_max == 500) {
            delete data.budget_max
        }
        return cb(data)
    },

    sexToggle: function (e) {
        this.setData({
            contact_sex: this.data.contact_sex == 1 ? 0 : 1,
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

    smsLoginHandle (cb) {
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
        smsApi.smsAuth(phone, code).then((res) => {
            var data = res.data
            if (data.status == 0) {
                // 保存下服务器返回的token
                var token = data.data.token
                var user = data.data.user
                auth.setUserInfo(token, user)
                return cb()
            }
        })
    },


    submitHandle: function (e) {
        var _this = this
        _this.validate(function (data) {
            // 如果需要提交验证码
            // 应该改为，判断点击了修改按钮之后
            var _token = app.globalData.token
            if (!_token) {
                _this.smsLoginHandle(() => {
                    _this.postData(data)
                })
                return
            }
            _this.postData(data)
            return
        })

    },

    postData: function (data) {
        var _this = this
        // 将表单数据处理成线索表所需要的数据格式  
        needApi.submitNeed(data).then((resp) => {
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
            wx.showToast({
                title: '提交成功，我们的专业顾问将尽快与您联系',
            })
            setTimeout(() => {
                wx.navigateBack({
                    delta: 1,
                })
            }, 1500)
        })
    },

    inputChange: function (e) {
        var key = e.target.dataset.name
        var value = e.detail
        var d = {}
        d[key] = value
        this.setData(d)
    },

    positionHandle: function (e) {
        var i = e.currentTarget.dataset.index
        var ps = this.data.positionList
        var p = ps[i]
        var position = []

        p.selected = !p.selected
        ps[i] = p
        this.data.positionList.forEach(function (item, i) {
            if (item.selected) {
                position.push(item.text)
            }
        })
        this.setData({
            positionList: ps,
            position: position.join(',')
        })
    },

    housetypeHandle: function (e) {
        var i = e.currentTarget.dataset.index
        var ps = this.data.housetypeList
        var p = ps[i]
        var housetype = []

        p.selected = !p.selected
        ps[i] = p
        this.data.housetypeList.forEach(function (item, i) {
            if (item.selected) {
                housetype.push(item.name)
            }
        })
        this.setData({
            housetypeList: ps,
            housetype: housetype.join(',')
        })
    },

    areaHandle: function (e) {
        var i = e.currentTarget.dataset.index
        var ps = this.data.areaList
        var p = ps[i]
        var area = []

        p.selected = !p.selected
        ps[i] = p
        this.data.areaList.forEach(function (item, i) {
            if (item.selected) {
                area.push(item.name)
            }
        })
        this.setData({
            areaList: ps,
            area: area.join(',')
        })
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

    onChange (e) {
        console.log(e.detail)
        this.setData({
            budget_min: e.detail[0],
            budget_max: e.detail[1],
            value: e.detail
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
        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                primaryColor: myconfigs.color.primary,
                primaryBtnColor: myconfigs.color.primary_btn
            })
        })

        var user = app.globalData.userInfo
        var contact_mobile_lock = false
        if (user == null) {
            this.setData({
                contact_mobile_lock: contact_mobile_lock
            })
            return
        }
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

    changeMobile: function (e) {
        this.setData({
            contact_mobile: '',
            contact_mobile_lock: false,
        })
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

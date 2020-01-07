// pages/owner/sale.js

const app = getApp()
var auth = require('../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pid: null,
        sex: 1,
        sexOptions: [{
            label: '先生',
            value: 1
        },
        {
            label: '女士',
            value: 0
        },
        ],
        post: null,
        postValue: '',
        tabs: [{
            name: '隐号报备',
            value: 'protected'
        },
        {
            name: '全号报备',
            value: 'full'
        },
        ],

        mobileType: 'protected',

        setpsText: ["报备客户", "核实成交", "发放佣金"],
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        this.setData({
            pid: q.pid || ''
        })
        this.loadPost(q.pid)
    },

    tabChange: function (e) {
        var i = e.detail.name
        var tab = this.data.tabs[i]
        this.setData({
            mobileType: tab.value,
            mobile: ''
        })
    },

    sexChange: function (e) {
        this.setData({
            sex: e.detail.value
        })
    },

    mobileChange: function (e) {
        this.setData({
            mobile: e.detail.value
        })
    },

    inputChange: function (e) {
        console.log('input change', e)
        var k = e.currentTarget.dataset['name']
        var v = e.detail
        var data = {}
        data[k] = v
        this.setData(data)
        console.log('set data', data)
    },

    loadPost: function (pid) {
        if (!pid) {
            return false;
        }
        var _this = this
        app.request({
            url: '/api/v2/posts/' + pid,
            success: function (resp) {
                var p = resp.data.data
                var post_name = p.title + ' ' + p.sub_district.name + ' ' + p.type_info.text + ' ' + p.area_info.text
                _this.setData({
                    post: p,
                    post_name: post_name
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    backHandle: function (e) {
        wx.navigateBack({
            delta: 1
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '报备客户',
        })
        this.loadPost(this.data.pid)
    },



    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },


    validateFormData: function (fdata) {
        console.log('fdata', fdata)
        if (!fdata['name']) {
            wx.showToast({
                title: '请填写客户姓名',
                icon: 'none'
            })
            return false;
        }

        if (!fdata['mobile'] || fdata['mobile'].length != 11) {
            wx.showToast({
                title: '请填写正确的手机号',
                icon: 'none'
            })
            return false;
        }

        if (!fdata['post_name'] || fdata['post_name'].length <= 1) {
            wx.showToast({
                title: '请填写客户意向房源',
                icon: 'none'
            })
            return false;
        }

        return true
    },

    submit: function (e) {
        app.uploadFormid(e)
        var _this = this
        var fdata = {
            mobile: _this.data.mobile,
            name: _this.data.name,
            post_name: _this.data.post_name,
            sex: _this.data.sex,
            post_id: _this.data.pid
        }
        var isok = this.validateFormData(fdata)
        if (!isok) {
            return false;
        }

        app.request({
            url: '/api/v1/customers',
            method: 'POST',
            data: {
                customer: fdata
            },
            success: function (resp) {
                console.log('resp.data', resp.data)
                if (resp.data.status != 0) {
                    return false;
                }
                wx.showModal({
                    title: '报备成功',
                    content: '系统已经记录下该客户信息，一旦签约，你将获得相应的佣金',
                    success: function (res) {
                        wx.navigateTo({
                            url: '/pages/fenxiao/customers',
                        })
                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () { },


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

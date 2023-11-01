/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
const app = getApp()
const userApi = require("../../api/user")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        customer: null,
        name: null,

    },

    loadData: function () {
        // 加载数据表结构
        var _this = this
        userApi.getUserProfileDetail(this.data.upId).then((resp) => {
            if (resp.data.status != 0) {
                return
            }
            _this.setData({
                rValue: resp.data.data.r,
                customer: resp.data.data.customer,
                name: resp.data.data.customer.name,
                mobile: resp.data.data.customer.mobile,
                eavAttributes: resp.data.data.eav_attributes,
            })
            wx.setNavigationBarTitle({
                title: '客户：' + resp.data.data.customer.name,
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (q) {
        this.setData({
            upId: q.id,
        }, () => {
            this.loadData()
        })

        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                color: myconfigs.color.primary,
                btnColor: myconfigs.color.primary_btn
            })
        })
    },

    gotoColumn: function (e) {
        const {
            index
        } = e.target.dataset
        var column = this.data.eavAttributes[index]
        var value = this.data.customer[column.name]
        if (column.editable == false) {
            return
        }

        var _this = this
        // 打开编辑字段界面，并传值 
        wx.navigateTo({
            url: '/pages/eav/column',
            events: {
                change: function (result) {
                    console.log('值被修改了', result)
                    var customer = _this.data.customer
                    customer[result.key] = result.value
                    _this.setData({
                        customer: customer
                    })
                }
            },
            success: function (res) {
                res.eventChannel.emit('setColumn', column)
                res.eventChannel.emit('setValue', value)

            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide () {

    },

    submitHandle: function () {
        var _this = this
        var data = this.data.customer
        data.name = this.data.name
        // 检查必填字段
        this.data.eavAttributes.forEach((att, index) => {
            var value = data[att.name]
            if (!value) {
                wx.showToast({
                    title: att.label + '是必填项，不能为空',
                })
                return false
            }
        })
        var info = {
            user_profile: data
        }
        info.id = this.data.upId
        userApi.updateUserProfileDetail(info).then((resp) => {
            if (resp.data.status != 0) {
                console.log('error', resp.data.status)
                return
            }
            _this.loadData()

            wx.showToast({
                title: '已保存',
            })
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage () {

    }
})
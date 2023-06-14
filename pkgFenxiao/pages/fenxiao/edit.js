// pkgFenxiao/pages/fenxiao/edit.js

const app = getApp()
const customerApi = require("../../../api/customer")
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        radio:'wuxiao',
        jiaoyiRadio: '',
        status: 0,
        status_remark_items: ['超过报备保护期','客户信息填写错误','关联房源选择错误','其他原因'], 
        deal_status_items: [],
        deal_status_item_id: '',
        status_remark: '',
        receiver_name: '',
        receiver_mobile: '',
        admin_remark: ''
    },

    wuxiaoClick(e){
        var i = e.currentTarget.dataset.i
        console.log(e.currentTarget.dataset.i)
        this.setData({
            status_remark: this.data.status_remark_items[i]
        })
    },

    radioChange(event){
        this.setData({
            radio: event.detail
        })
        if(event.detail == 'wuxiao'){
            this.setData({
                status: 0
            })
        }
        if(event.detail == 'youxiao'){
            this.setData({
                status: 2
            })
        }
    },

    onClick(event){
        console.log('222',event.currentTarget.dataset)
        this.setData({
            jiaoyiRadio: event.currentTarget.dataset.name,
            deal_status_item_id: event.currentTarget.dataset.i+1
        })
    },

    submitData(){
        var id = this.data.id
        var status = this.data.status
        if(status == 0){
            var data = {
                status: this.data.status,
                status_remark: this.data.status_remark,
            }
        }
        if(status == 2){
            var data = {
                status: this.data.status,
                deal_status_item_id: this.data.deal_status_item_id,
                receiver_name: this.data.receiver_name,
                receiver_mobile: this.data.receiver_mobile,
                admin_remark: this.data.admin_remark
            }
        }
        // 有待检测
        // console.log(data)
        // app.request({
        //     url: '/api/v1/customers/有待检测'+id,
        //     method: 'PUT',
        //     data: data,
        //     success(res){
             
        //     }
        // })
        customerApi.updateCustomer(id,data).then((res)=>{
            app.globalData.reloadCustomer = true
        })
        wx.navigateBack({
            delta: 2,
          })
    },

    cancel(){
        wx.navigateBack({
          delta: 1,
        })
    },

    loadData(id){
        var _this = this
        // 有待检测
        // app.request({
        //     url: '/api/v1/customers/有待检测'+id,
        //     success(res){
               
        //     }
        // })
        customerApi.getCustomerDetail(id).then((res)=>{
            if(res.data.data.status == 0){
                _this.setData({
                    status: res.data.data.status,
                    status_remark: res.data.data.status_remark
                })
            }
            if(res.data.data.status == 2){
                _this.setData({
                    status: res.data.data.status,
                    deal_status_item_id: res.data.data.deal_status_item_id,
                    receiver_name: res.data.data.receiver_name,
                    receiver_mobile: res.data.data.receiver_mobile,
                    admin_remark: res.data.data.admin_remark,
                    radio: 'youxiao',
                    jiaoyiRadio: res.data.data.deal_status_item.name
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        console.log(app.globalData.myconfigs.deal_status_items)
        this.setData({
            deal_status_items: app.globalData.myconfigs.deal_status_items,
            id: options.id
        })
        this.loadData(options.id)
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
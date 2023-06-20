// pkgErshou/pages/show.js
var houseApi = require("../../api/house")
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        block: {},
        banners: {},
        rule: null,
        bids: [], // 出价记录
        has_joined: false, // 是否报名参加过
        members: [], // 报名的成员列表
        houseId: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.loadData(options.id)
    },

    loadRule: function (ruleId) {
        // 如果是竞价房源，那么需要拉取竞价规则信息；
        // TODO 
        houseApi.getRuleDetail(ruleId).then((res) => {
            const data = res.data.data;
            // let num = data.starts_at.indexOf('T')
            // let starts= data.starts_at(0,num)
            // data.starts_at=starts
            // let num1= data.ends_at.indexof("T")
            // let end= data.starts_at(0,num1)
            // data.ends_at=end
            this.setData(data);
        })
    },

    loadData: function (e) {
        var _this = this
        houseApi.getHouseBlocks(e).then((res) => {
            wx.setNavigationBarTitle({
                title: res.data.data.title
            })
            _this.setData({
                block: res.data.data,
                banners: res.data.data.banners,
                houseId: res.data.data.id
            })
            if (res.data.data.rule_id) {
                _this.loadRule(res.data.data.rule_id)
            }

        })
    },
    // VR看房
    vrBtn(e) {
        // console.log("12121点击vr",e.currentTarget.dataset.vr);
        app.gotoWebview(e.currentTarget.dataset.vr)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    payAndJoin: function () {
        // 报名参加竞拍
        var ruleId = this.data.rule.id;
        houseApi.payAndJoin(ruleId).then((res) => {});
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
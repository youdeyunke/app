// pkgErshou/pages/show.js
var houseApi = require("../../api/house")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        block:{
            banners: {}
        },
        rule: null,
        bids:[], // 出价记录
        postId:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.loadData(options.id)
    },

    loadRule: function(ruleId){
        // 如果是竞价房源，那么需要拉取竞价规则信息；
        // TODO 
        houseApi.getRuleDetail(ruleId).then((res) => {
           const data =  res.data.data;
            this.setData({rule: data.rule, bids:data.bids});
        })
    },

    loadData: function (e) {
        var _this = this
        houseApi.getHouseBlocks(e).then((res) => {
            //console.log("121res",res.data.data);
            _this.setData({
                block:res.data.data,
                postId:res.data.data.id
            })
            if(res.data.data.rule_id){
                _this.loadRule(res.data.data.rule_id)
            }
        })
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
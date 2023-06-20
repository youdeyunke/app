// pkgErshou/pages/index.js
const houseApi = require("../../api/house")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        page:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.loadData()
    },

    loadData: function () {
        var _this = this
        var query={
            page:this.data.page
        }
        houseApi.getHouseList(query).then((res) => {
            if(res.data.data.result.length>0) {
                var item= _this.data.items
                res.data.data.result.map((ritem)=>{
                    item.push(ritem)
                })
                _this.setData({
                    items:item
                })
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
        var page = this.data.page || 1
        this.setData({
            page: page + 1,
        },()=>{
            this.loadData()
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
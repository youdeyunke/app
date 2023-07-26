// pkgPingce/pages/pingce/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId:null,
        postData:{},
        pingceList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            postId:options.postid
        })
        this.loadPost()
        this.loadpingce()
    },
    loadPost: function(){
        var pid = this.data.postId
        var _this = this 
        app.request({
            url: '/api/v2/posts/' + pid,
            method: 'GET',
            success: function(resp){
                _this.setData({
                    postData: resp.data.data
                })
            }
        })
    },
    loadpingce: function () {
        var _this = this
        var query = {
            api: "/api/v6/getReviewList",
            data: {
                "post_id": this.data.postId
            }

        }
        app.request({
            url: '/api/proxy',
            data: query,
            method: 'POST',
            success: function (resp) {
                _this.setData({
                    pingceList: resp.data.data,
                }, () => {
                    _this.calculateAverage(resp.data.data)
                })
            }
        })
    },
    calculateAverage(arr) {
        let sum = 0;
        let count = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += arr[i].score;
            count++;
        }
        const average = (sum / count).toFixed(1);
        this.setData({
            zongpingfen: average
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
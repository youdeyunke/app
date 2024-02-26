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
// pkgBrokers/Pages/Brokers/index.js
const app = getApp()
const brokerApi = require("../../../api/broker")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ranking: '',
        pid: null,
    },
    LoadHandle () {
        var _this = this
        var data = { per_page: 100 }
        if(this.data.pid) {
          data.post_id = this.data.pid
        }

        // √
        brokerApi.getBrokerList(data).then((res) => {
            if(res.data.code != 0){ return }
            var arr = res.data.data.result
            // 将arr 按照score属性排序
            arr.sort(function(a, b) {
              return b.score - a.score
            })  
            // 如果排序后的数组大于20，将数组减少到20   
            if (arr.length > 20) {
              arr = arr.slice(0, 20)
            }

            _this.setData({
                ranking: arr
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var _this = this
        if (options.pid) {
          this.setData({
            pid: options.pid
          })
        }
        this.LoadHandle()
        wx.setNavigationBarTitle({
            title: '置业顾问排行榜'
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
        this.LoadHandle()
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
        return {
            title: '置业顾问排行榜',
        }
    }
})
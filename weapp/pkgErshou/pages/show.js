/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// pkgErshou/pages/show.js
var houseApi = require("../../api/house")
var shareApi = require("../../api/share");
const favApi = require("../../api/fav")
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        block: {},
        banners: {},
        btnText: "立即报名", // 按钮大文字
        btnDesc: null, //按钮小字
        houseId: null,
        title: "",
        headSwitch: true,
        tixingtext: "提醒",
        business: "",
        favStatus: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (options) {
        this.loadData(options.id)
    },

    loadData: function (e) {
        var _this = this
        houseApi.getHouseBlocks(e).then((res) => {
            // _this.genShareId(res.data.data.title, res.data.data.id);
            wx.setNavigationBarTitle({
                title: res.data.data.title
            })
            _this.setData({
                block: res.data.data,
                banners: res.data.data.banners,
                houseId: res.data.data.id,
                business: res.data.data.business,
                btnText: "立即联系",
            })
        })
    },
    // VR看房
    vrBtn (e) {
        app.gotoWebview(e.currentTarget.dataset.vr)
    },
    gochujia: function () {
        wx.navigateTo({
            url: '/pkgErshou/pages/chujiajilu/index?id=' + this.data.rule.id
        });
    },
    guanzhuHouse() {

      var hid = this.data.houseId
      var _this = this
      favApi.createFav('house', hid).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        _this.setData({
          favStatus: resp.data.data
        })
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
        // var path = "/pkgErshou/pages/show?id=" + this.data.houseId + "&share_id=" + this.data.shareId
        var path = "/pkgErshou/pages/show?id=" + this.data.houseId 
        var _this = this
        const promise = new Promise(resolve => {
          var data = {
            uid: wx.getStorageSync('visitorUid'),
            score_config_key: 'share_post',
            share_complete_path: path,
            title: this.data.block.title,
          }
          shareApi.createShareLog(data).then((resp) => {
            if (resp.data.status == 0 && resp.data.data != 0) {
                var shareId = resp.data.data;
            }
            resolve({
                title: _this.data.block.title,
                path: '/pkgShare/pages/index?id=' + shareId,
            })
          })
        })

        return {
            title: this.data.block.title,
            path: path, // 自定义的分享路径
        };
    },
    // 自定义朋友圈分享内容
    onShareTimeline: function () {
        return {
            title: this.data.block.title
        };
    }
})
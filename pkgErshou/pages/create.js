// pkgErshou/pages/create.js
const houseApi = require("../../api/house");

Page({

    /**
     * 页面的初始数据
     */
    data: {

        type_name: "几室几厅",
        business: "出售",
        sub_district_name: "点击搜索小区",
        district_name: "点击选择区域",
        content: "房源详细情况介绍：",
        position: "朝南",
        fitment: "精装",
        images: "",
        type_image: "",
        video:"",
        area: null,
        price_value: null,
        show:true,

        // 以下是隐藏字段
        address: "",
        district_id: null,
        latitude: null,
        longitude: null,

    },
    businessChange: function (name) {
        this.setData({
            business: name.detail.name
        })
    },
    chooseFitment: function (e) {
        // 跳转到选择枚举值的页面  
        // 在选择页面点击后，修改此页面的 fitment字段
        var _this = this
        wx.navigateTo({
            url: '/pages/enums/index?cat=house_fitment',
            events: {
                change: function (post) {
                    // TODO 选中了一个楼盘
                    _this.setData({
                        fitment: post.name
                    })
                }
            },
        })
    },


    choosePosition: function (e) {
        // 跳转到选择枚举值的页面  
        // 在选择页面点击后，修改此页面的 position字段
        var _this = this
        wx.navigateTo({
            url: '/pages/enums/index?cat=house_position',
            events: {
                change: function (post) {
                    // TODO 选中了一个楼盘
                    _this.setData({
                        position: post.name
                    })
                }
            },
        })
    },

    chooseLocation: function (e) {
        var _this = this
        wx.getSetting() //获取用户权限
        wx.chooseLocation({
            success: function (poi) {
                _this.updatePoi(poi)
            }
        })
    },
    chooseDistrict: function (e) {
        // TODO 
        // 在二级页面点击后，修改此页面的district_id、district_name 3个字段
        var _this = this
        wx.navigateTo({
            url: '/pages/districts/select',
            events: {
                change: function (ditem) {
                    // TODO 选中了一个楼盘
                    _this.setData({
                        district_name: ditem.text,
                        district_id: ditem.id
                    })
                }
            },
        })
    },


    updatePoi: function (poi) {
        // console.log('1街道地址更新1', poi,"------",poi.name)
        this.setData({
            address: poi.name,
            sub_district_name: poi.name,
            latitude: poi.latitude,
            longitude: poi.longitude,
        })
    },
    typeimagesHandle:function (image) {
        this.setData({
            type_image: JSON.stringify(image.detail.value)
        })
    },
    imagesHandle:function (image) {
        this.setData({
            images: JSON.stringify(image.detail.value)
        })
    },
    videoHandle:function (video) {
        this.setData({
        video:JSON.stringify(video.detail.video)
        })
    },
    // 面积强制转换
    areaonChange:function (area) {
        let value = area.detail.replace(/^\D./g, '')
        this.setData({
            area:value  
        })
    },
     // 价格强制转换
    price_valueonChange:function (price_value) {
        let value = price_value.detail.replace(/^\D./g, '')
        this.setData({
            price_value:value  
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options.business) {
            this.setData({
                business: options
            })
        }

    },


    // 提交表单
    submitHandle: function () {
        var data = this.data;
        houseApi.createHouse(data).then((res) => {
            // todo 
            console.log(res);
            if(res.errMsg=="request:ok") {
                wx.showToast({
                    title: '提交成功',
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
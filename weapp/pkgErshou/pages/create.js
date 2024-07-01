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
// pkgErshou/pages/create.js
const houseApi = require("../../api/house");
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type_name: "",
        business: "出售",
        sub_district_name: "",
        district_name: "",
        content: "",
        position: "",
        fitment: "",
        images: "",
        type_image: "",
        video: "",
        area_value: null,
        price_value: null,
        show: true,
        focus: false,
        contact_name: "",
        contact_mobile: "",
        seller: "",
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

    contentInput: function(e) {
      this.setData({
        content: e.detail.value // 将输入的内容与content进行双向绑定
      });
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
    chooseSeller: function (e) {
        var _this = this
        wx.navigateTo({
            url: '/pages/enums/index?cat=house_seller',
            events: {
                change: function (post) {
                    _this.setData({
                        seller: post.value
                    })
                }
            },
        })
    },

    checkLogin(){
      if (!app.globalData.token) {
        this.selectComponent('.loginwindow').openWindow()
        return
      }
      this.setData({
        contact_mobile: app.globalData.userInfo.mobile
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
        this.setData({
            address: poi.name,
            sub_district_name: poi.name,
            latitude: poi.latitude,
            longitude: poi.longitude,
        })
    },
    typeimagesHandle: function (image) {
        var type_imagejoin = image.detail.value.map(function (obj) {
            return obj.url;
        }).join("|");
        this.setData({
            type_image: type_imagejoin
        })
    },
    imagesHandle: function (image) {
        var imagesjoin = image.detail.value.map(function (obj) {
            return obj.url;
        }).join("|");
        this.setData({
            images: imagesjoin
        })
    },
    videoHandle: function (video) {
        this.setData({
            video: JSON.stringify(video.detail.video)
        })
    },
    focusField () {
        this.setData({
            focus: true
        })
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad (options) {
        if (options.business) {
            this.setData({
                business: options
            })
        }
        this.setData({
          bg: 'https://tcdn.udeve.net/fang/login-window.png',
          primaryColor: app.globalData.myconfigs.color.primary || '#1989fa',
          primaryBtnColor: app.globalData.myconfigs.color.primary_btn || 'linear-gradient(270deg, #1989FA 0%, rgba(25, 137, 250, 0.6) 100%)',
      })
    },


    // 提交表单
    submitHandle: function () {
        var data = this.data;
        if (!data.district_name && !data.district_id) {
            wx.showToast({
                title: '请选择区域',
                icon: 'none'
            })
            return
        }
        if (!data.address && !data.sub_district_name && !data.latitude && !data.longitude) {
            wx.showToast({
                title: '请选择小区',
                icon: 'none'
            })
            return
        }
        if (!data.type_name) {
            wx.showToast({
                title: '请填写户型',
                icon: 'none'
            })
            return
        }
        if (!data.area_value) {
            wx.showToast({
                title: '请填写面积',
                icon: 'none'
            })
            return
        }
        if (!data.fitment) {
            wx.showToast({
                title: '请选择装修',
                icon: 'none'
            })
            return
        }
        if (!data.position) {
            wx.showToast({
                title: '请选择朝向',
                icon: 'none'
            })
            return
        }
        if (!data.price_value) {
            wx.showToast({
                title: '请填写价格',
                icon: 'none'
            })
            return
        }
        if (!data.content) {
            wx.showToast({
                title: '请填写详细介绍',
                icon: 'none'
            })
            return
        }
        if (!data.type_image) {
            wx.showToast({
                title: '请上传户型图',
                icon: 'none'
            })
            return
        }
        if (!data.images) {
            wx.showToast({
                title: '请上传房源照片',
                icon: 'none'
            })
            return
        }
        if (!data.contact_name) {
            wx.showToast({
                title: '请输入姓名',
                icon: 'none'
            })
            return
        }
        if (!data.seller) {
            wx.showToast({
                title: '请选择身份',
                icon: 'none'
            })
            return
        }
        else {
            houseApi.createHouse(data).then((res) => {
                // todo 
                if (res.data.code != 0) {
                    return
                }
                wx.showModal({
                    title: '提交成功',
                    content: '房源审核通过后将上架到小程序',
                    showCancel: false,
                    complete: (res) => {
                      if (res.confirm) {
                          wx.navigateBack({
                              delta: 1
                          });
                      }
                    }
                })

            })
        }


    },

    setMobile(){
      if (app.globalData.userInfo) {
        this.setData({
          contact_mobile: app.globalData.userInfo.mobile
        })
      }
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
        if (!app.globalData.token) {
          this.selectComponent('.loginwindow').openWindow()
          return
        }
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

    }
})
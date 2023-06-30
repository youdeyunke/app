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
    btnText: "立即报名", // 按钮大文字
    btnDesc: null, //按钮小字
    bids: [], // 出价记录
    joined: false, // 是否报名参加过
    members: [], // 报名的成员列表
    houseId: null,
    title: "",
    headSwitch: true,
    show: false,
    zixun_show: true,
    tixingtext: "提醒"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData(options.id)
    var value = wx.getStorageSync('houseId')
    if (value == "") {
      this.setData({
        tixingtext: "设置提醒"
      })
    } else {
      this.setData({
        tixingtext: "已设提醒"
      })
    }
  },

  // 时间格式处理
  processDate(dateString) {
    const date = new Date(dateString);
    const month = this.formatNumber(date.getMonth() + 1); // 获取月份，注意月份要加1
    const day = this.formatNumber(date.getDate()); // 获取日期
    const time = date.toTimeString().slice(0, 8); // 获取时间，截取前8个字符

    return `${month}-${day} ${time}`;
  },

  // 格式化数字为两位数
  formatNumber(num) {
    return num < 10 ? `0${num}` : num;
  },
  // 判断当前时间是否在指定的时间区间内
  checkTimeRange(min, max) {
    const minDate = new Date(min);
    const maxDate = new Date(max);
    const currentDate = new Date();

    if (currentDate < minDate) {
      this.setData({
        title: "即将开始:" + this.processDate(this.formatDateTime(minDate))
      })
    } else if (currentDate > maxDate) {
      this.setData({
        headSwitch: false
      })
    } else {
      this.setData({
        title: "结束时间:" + this.processDate(this.formatDateTime(maxDate))
      })
    }
  },

  // 格式化日期时间
  formatDateTime(dateTime) {
    const year = dateTime.getFullYear();
    const month = this.formatNumber(dateTime.getMonth() + 1);
    const day = this.formatNumber(dateTime.getDate());
    const time = dateTime.toTimeString().slice(0, 8);

    return `${year}-${month}-${day} ${time}`;
  },


  // // 倒计时
  // // 判断当前时间是否在指定的时间区间内
  // checkTimeRange(min, max) {
  //     const minDateTime = new Date(min);
  //     const maxDateTime = new Date(max);
  //     const currentDate = new Date();
  //     if (currentDate < minDateTime) {
  //         this.showMinTime(minDateTime);
  //     } else if (currentDate > maxDateTime) {
  //         this.showMaxTime(maxDateTime);
  //     } else {
  //         this.startCountdown(maxDateTime);
  //     }
  // },

  // // 显示最小时间
  // showMinTime(minDateTime) {
  //     this.setData({
  //         title: "即将开始:" + this.formatDateTime(minDateTime)
  //     })
  // },

  // // 显示最大时间
  // showMaxTime(maxDateTime) {
  //     this.setData({
  //         headSwitch: false
  //     })
  // },

  // // 开始倒计时
  // startCountdown(targetDateTime) {
  //     var _this = this
  //     setInterval(function () {
  //         const remainingTime = _this.calculateRemainingTime(targetDateTime);
  //         if (remainingTime <= 0) {
  //             clearInterval(this);
  //             showMaxTime(targetDateTime);
  //         } else {
  //             _this.setData({
  //                 title: "距离结束:" + _this.formatRemainingTime(remainingTime)
  //             })
  //         }
  //     }, 1000);
  // },

  // // 计算剩余时间（单位：毫秒）
  // calculateRemainingTime(targetDateTime) {
  //     const currentDate = new Date();
  //     return targetDateTime.getTime() - currentDate.getTime();
  // },

  // // 格式化剩余时间
  // formatRemainingTime(remainingTime) {
  //     const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  //     return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
  // },

  // // 格式化日期时间
  // formatDateTime(dateTime) {
  //     const month = formatNumber(dateTime.getMonth() + 1);
  //     const day = formatNumber(dateTime.getDate());
  //     const time = dateTime.toTimeString().slice(0, 8);

  //     return `${month}-${day} ${time}`;
  // },



  // 查看按钮
  seeMore() {
    this.setData({
      show: true
    })
  },
  closePopup() {
    this.setData({
      show: false
    })
  },
  //   咨询按钮
  callHandle: function (e) {
    var m = this.data.block.contact_mobile
    wx.makePhoneCall({
      phoneNumber: m,
    })
  },
  remindBtn: function () {
    var value = wx.getStorageSync('houseId')
    if (value == "") {
      houseApi.createHouseAuctionRemind(this.data.houseId).then((res) => {
        if (res.statusCode == 200) {
          wx.setStorage({
            key: "houseId",
            data: "house.auction_" + this.data.houseId
          })
          wx.showToast({
            title: '已设提醒',
          })
          this.setData({
            tixingtext: "已设提醒"
          })
        }
      })
    } else {
      houseApi.deleteHouseAuctionRemind(this.data.houseId).then((res) => {
        wx.removeStorage({
          key: 'houseId',
        })
        wx.showToast({
          title: '取消提醒',
          icon:"none"
        })
        this.setData({
          tixingtext: "设置提醒"
        })
      })
    }


  },
  loadRule: function (ruleId) {
    // 如果是竞价房源，那么需要拉取竞价规则信息；
    // TODO 
    houseApi.getRuleDetail(ruleId).then((res) => {
      const data = res.data.data;
      var time_on = this.processDate(data.rule.starts_at)
      var end_time = this.processDate(data.rule.ends_at)
      this.checkTimeRange(data.rule.starts_at, data.rule.ends_at)
      data.rule.starts_at = time_on
      data.rule.ends_at = end_time
      // 已经报名参加过，按钮文字需要变化
      if (data.joined) {
        this.setData({
          btnText: "立即出价",
          btnDesc: "幅度：" + data.rule.bid_range
        })
      }
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
      } else {
        _this.setData({
          btnText: "立即联系",
          zixun_show: false
        })
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

  btnHandle: function () {
    if (this.data.btnText == "立即联系") {
      this.callHandle()
    }
    if (this.data.joined) {
      this.bidHandle()
    } else {
      this.payAndJoinHandle(this.data.rule.id);
    }
  },

  // 出价
  bidHandle: function () {
    // 参与出价，出价后要刷新
    wx.showLoading();
    houseApi.createBid(this.data.rule.id).then((res) => {
      if(res.data.code == 0){
        wx.showToast({
          title: '出价成功',
        })
      }
      this.loadData(this.data.houseId);
    })
  },
  callWxpay:function(data){
    var _this = this;
    wx.requestPayment({
      timeStamp:data.time_stamp,
      nonceStr:data.nonce_str,
      paySign: data.pay_sign,
      signType:data.sign_type,
      package:data.package_value,
      success:function(e){
        wx.showToast({
          title: '支付成功',
        })
        _this.loadData(_this.data.houseId);
      },
      fail:function(e){
        wx.showToast({
          title: '支付失败，请重试',
          icon:'none',
        })
      }
    })
  },

  payAndJoinHandle: function () {
    // 报名参加竞拍
    // 此接口会吊起微信支付界面
    // 先刷新再报名

    var ruleId = this.data.rule.id;
    var _this = this;
    houseApi.payAndJoin(ruleId).then((res) => {
      if(res.data.code != 0){
        return false;
      }
      // 调用微信支付
      _this.callWxpay(res.data.data);
    });
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

    return {
      title: this.data.block.title,
      path: '/pkgErshou/pages/show' // 自定义的分享路径
    };
  },
  // 自定义朋友圈分享内容
  onShareTimeline: function () {
    return {
      title: this.data.block.title
    };
  }
})
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
        btnText:"立即报名", // 按钮大文字
        btnDesc:null,//按钮小字
        bids: [], // 出价记录
        has_joined: false, // 是否报名参加过
        members: [], // 报名的成员列表
        houseId: null,
        title:"",
        headSwitch:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.loadData(options.id)
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
 checkTimeRange(min,max) {
    const minDate = new Date(min);
    console.log("min",minDate);
    const maxDate = new Date(max);
    const currentDate = new Date();
  
    if (currentDate < minDate) {
      this.setData({
          title:"即将开始:"+this.processDate(this.formatDateTime(minDate))                        
      })
    } else if (currentDate > maxDate) {
      this.setData({
        headSwitch:false
    })
    } else {
      this.setData({
        title:"结束时间:"+this.processDate(this.formatDateTime(maxDate))
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
  

  

    loadRule: function (ruleId) {
        // 如果是竞价房源，那么需要拉取竞价规则信息；
        // TODO 
        houseApi.getRuleDetail(ruleId).then((res) => {
            const data = res.data.data;
            var time_on = this.processDate(data.rule.starts_at)
            var end_time = this.processDate(data.rule.ends_at) 
            this.checkTimeRange(data.rule.starts_at,data.rule.ends_at)
            data.rule.starts_at=time_on
            data.rule.ends_at=end_time
            // 已经报名参加过，按钮文字需要变化
            if(data.has_joined){
              this.setData({
                btn:"立即出价",
                btnDesc: "幅度：" + this.data.rule.bid_range
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

    btnHandle:function(){
      if(this.data.has_joined){
        this.bidHandle()
      }else{
        this.payAndJoinHandle(this.data.rule.id);
      }
    },

    // 出价
    bidHandle:function(){
      // 参与出价，出价后要刷新
      wx.showLoading();
      houseApi.createBid(this.data.rule.id).then((res) =>{
        this.loadData(this.data.houseId);
      })
    },

    payAndJoinHandle: function () {
        // 报名参加竞拍
        var ruleId = this.data.rule.id;
        houseApi.payAndJoin(ruleId).then((res) => {
          console.log("res",res)
          if(res.data.code != 0 && res.data.message && res.data.message.indexOf("充值") > 0){
            console.log("bb");
            var url = '/pkgWallet/pages/wallet/recharge?amount=' + this.data.rule.deposit;
            console.log('aaa',url)
            wx.navigateTo({
              url:url,
            })
          }
          this.loadData(this.data.houseId);
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

    }
})
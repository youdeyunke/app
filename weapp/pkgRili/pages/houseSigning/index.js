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
// pkgRili/pages/houseSigning/index.js
const app = getApp()
const housesigningApi = require("../../../api/house_signing")
Page({

    /**
     * 页面的初始数据
     */
    data: {
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],//星期
      maxDayList: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],//一年12个月，每个月的天数，初始化都给平年
      nowYear: new Date().getFullYear(),//当前年份
      nowMonth: new Date().getMonth()+1,//当前月份
      totalDay: [],//日历天数
      yhrlData: [],
      lastUpdate: '',
    },
    changeDate(e) {
      let type = e.currentTarget.dataset.type;
      let nowYear = this.data.nowYear;
      let nowMonth = this.data.nowMonth;
      switch(type) {
        case "preYear": //上一年
          nowYear -= 1;
          this.setData({nowYear});
          break;
        case "preMonth": //上一月
          nowMonth -= 1;
          if(nowMonth <= 0) {
            nowMonth = 12;
            nowYear -= 1;
          }
          break;
        case "nextMonth": //下一月
          nowMonth += 1;
          if(nowMonth >= 13) {
            nowMonth = 1;
            nowYear += 1;
          }
          break;
        case "nextYear": //下一年
          nowYear += 1;
          break;
      }
      this.setData({nowYear, nowMonth});
      this.initCalendar();
    },

    initCalendar() {
      let maxDayList = this.data.maxDayList;
      let year = this.data.nowYear, month = this.data.nowMonth;
      if((year%4 == 0 && year%100 != 0) || year%400 == 0) {//计算当前年是不是闰年，规则：能被4整除且不被100整除，或者能被400整除的年份
        maxDayList[1] = 29;//2月份29天
      }else {//平年
        maxDayList[1] = 28;//2月份28天
      }
      this.setData({maxDayList});
      let firstDayWeek = new Date(year + "/" + month + "/1").getDay() ;//当前月的1号是星期几
      firstDayWeek = firstDayWeek > 0 ? firstDayWeek : 7;//星期日从0转成7
      let endDayWeek = new Date(year + "/" + month + "/" +maxDayList[month - 1]).getDay();//当前月最后一天是星期几
      endDayWeek = endDayWeek > 0 ? endDayWeek : 7;//星期日从0转成7
      let beforArr = [], afterArr = [];//beforArr：本月1号之前需要补充上个月月尾几天，afterArr：本月尾补充下个月月初几天
      //求出补充的上个月的日子
      for(let i=0; i<firstDayWeek-1; i++) {//找出1号之前的空缺上个月的尾数日,比如今天是周三，则i=3-1, 取前两天的日子
        let deffTime = (i+1)*24*60*60*1000; //缺的天数的毫秒值
        let firstTime = new Date(year + "/" + month + "/1").getTime();//本月1号的毫秒值
        beforArr[i] = {otherMonth: true, day: new Date(firstTime - deffTime).getDate()};//从对应月份的尾数天开始存，比如31，30，29... 
      }
      beforArr = beforArr.reverse();//将补的上月的日子翻转
      //求出补充的下个月的日子
      for(let i=0; i<7-endDayWeek; i++) {//找出月尾对应的星期几，看看到周日还差几天就从下个月月初补几天
        afterArr[i] = {otherMonth: true, day: i+1};
      }
      let nowMonthArr = [];//当前月所有日子
      for(let i=0; i<maxDayList[month - 1]; i++) {
        nowMonthArr[i] = {day: i+1, yhrlData: null}; //给显示的月份加上yhrlData空数组
        if(year == new Date().getFullYear()) {//如果切换到了本年本月本日，则凸显今日
          if(month == new Date().getMonth() + 1) {
            if(new Date().getDate() == i+1) {
              nowMonthArr[i].today = true;
            }
          }
        }
        //该部分为给有开盘数据的日子加上数据
        let yhrlData = this.data.yhrlData
        // console.log('777',yhrlData)
        // var reg = /(\d{4})\-(\d{2})\-(\d{2})/;
        for(let x = 0;x < yhrlData.length; x++){
          let yy = this.data.nowYear, mm = this.data.nowMonth;
          if(yy == yhrlData[x].year){
            if(mm == yhrlData[x].month){
              if(yhrlData[x].day == i+1){
                nowMonthArr[i].yhrlData = yhrlData[x];
                if(yhrlData[x].day == 5){ console.log(yhrlData[x],nowMonthArr[i])}
              }
            }
          }
        }
        
      }
      let totalDayList = beforArr.concat(nowMonthArr).concat(afterArr);//将所有日期拼接
      let totalDay = [], arr = [];//totalDay:最终用来展示数据，arr：用来分割每一周的日子
      for(let i=0; i<totalDayList.length; i++) {
        arr.push(totalDayList[i]);
        if((i+1)%7 == 0) {//每7天存为一组
          totalDay.push(arr);
          arr = [];//存完清空
        }
      }
      this.setData({totalDay});
    },

    loadData(){
      var _this = this
      var data = {
        page: 1,
        per_page: 9999,
    }
      housesigningApi.getHousesignings(data).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        var lastUpdate = ''
        if (resp.data.data.data && resp.data.data.data.length > 0) {
          lastUpdate = resp.data.data.data[0].createdAt
        }
        _this.setData({
          yhrlData: resp.data.data.data,
          lastUpdate: lastUpdate,
        }, () => {
          _this.initCalendar()
        })
      })
    },

    gotoLoupan(e){
      var id = e.currentTarget.dataset.postid
      console.log(e)
      wx.navigateTo({
        url: '/pkgPost/pages/show/index?id='+id,
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.loadData()
      var color = app.globalData.color
      this.setData({
        primaryColor: color.primary || '#9e1d1d',
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      // this.initCalendar();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      // this.initCalendar();
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
      return {
        title: '二手房网签数据',
        path: '/pkgRili/pages/houseSigning/index',
        success: function () { },
        fail: function () { }
      }
    },
    onShareTimeline: function () {
        return {
          title: '二手房网签数据',
        }
    }
})
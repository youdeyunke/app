// pages/detail/detail.js
const util = require('./util.js')
const mortgageHelper = require('./mortgageHelper.js')
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    monthlyPaymentStr: '0',
    monthlyPaymentClass: '',
    balanceStr: '',
    totalLoanStr: '',
    totalInterestStr: '',
    TotalPaidStr: '',
    loanTypeName: '',
    paymentYear: 0,
    showDetail: false,
    payDetails: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let mortgage = app.globalData.mortgageData;
    let loanTypeName = '等额本息(每月等额还款)';
    if (mortgage.paymentMethod === 2) {
      loanTypeName = '等额本金(每月递减还款)';
    }
    wx.setNavigationBarTitle({ title: loanTypeName })

    var mortgageDetail = mortgageHelper.calculatePaymentDetail(mortgage);

    mortgageDetail.monthlyPayment = util.truncate(mortgageDetail.monthlyPayment);
    let balanceStr = '';
    if (mortgageDetail.balance > 0) {
      mortgageDetail.balance = util.truncate(mortgageDetail.balance);
      balanceStr = mortgageDetail.balance.toLocaleString();
    }
    let paymentMonthStr = mortgageDetail.monthlyPayment.toLocaleString();
    let monthlyPaymentClass = '';
    if (paymentMonthStr.length < 8) {
      monthlyPaymentClass = '';
    } else if (paymentMonthStr.length < 10) {
      monthlyPaymentClass = 'bigNum1';
    } else if (paymentMonthStr.length < 14) {
      monthlyPaymentClass = 'bigNum2';
    } else {
      monthlyPaymentClass = 'bigNum3';
    }
    mortgageDetail.totalPaid = util.truncate(mortgageDetail.totalPaid);
    mortgageDetail.totalInterest = util.truncate(mortgageDetail.totalInterest);
    this.setData({
      monthlyPaymentStr: paymentMonthStr,
      monthlyPaymentClass: monthlyPaymentClass,
      balanceStr: balanceStr,
      totalLoanStr: mortgageDetail.totalLoan.toLocaleString(),
      totalInterestStr: mortgageDetail.totalInterest.toLocaleString(),
      TotalPaidStr: mortgageDetail.totalPaid.toLocaleString(),
      loanTypeName: loanTypeName,
      paymentYear: mortgage.paymentYear,
      payDetails: mortgageDetail.payDetails
    });
  },
  showYearsDetailToggle: function () {
    this.setData({
      showDetail: !this.data.showDetail
    });
  },
  showMonthDetailToggle: function (event) {
    let index = event.currentTarget.dataset.index;
    var showMonths = 'payDetails[' + index + '].showMonths';
    this.setData({
      [showMonths]: !this.data.payDetails[index].showMonths
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showToast({
      title: '感谢您的分享，谢谢您！',
      icon: 'none',
      duration: 1500
    });

    return {
      title: '个人房贷(商业/公积金/组合贷款)计算，每月还款明细查看',
      path: '/pages/index/index?f=detail',
      imageUrl: '../../images/share.jpg'
    }
  }
})
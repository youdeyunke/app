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
// pages/detail/detail.js
const util = require('./util.js')
const mortgageHelper = require('./mortgageHelper.js')
const wxCharts = require('../../../utils/wxcharts-min.js');
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
        wx.showLoading({
            title: '计算中',
            mask: true,
        })

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

        this.initChart()


        wx.hideLoading()
    },

    initChart: function () {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        this.setData({ windowWidth: windowWidth })

        var v1 = parseFloat(this.data.totalInterestStr) // 总利息
        var v2 = parseFloat(this.data.totalLoanStr) // 贷款额
        var v3 = v2 + v1

        var r1 = Math.floor(100 * v1 / v3)
        var r2 = Math.floor(100 * v2 / v3)

        new wxCharts({
            canvasId: 'mychart',
            animation: true,
            type: 'pie',
            width: windowWidth,
            height: windowWidth,
            dataLabel: true,
            series: [
                {
                    name: '支付利息',
                    data: v1,
                    format: (rate) => {
                        return '支付利息' + v1 + '万';
                    },
                }, {
                    name: '贷款金额',
                    data: v2,
                    format: (rate) => {
                        return '贷款金额' + v2 + '万';
                    },
                }
            ],
        })
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

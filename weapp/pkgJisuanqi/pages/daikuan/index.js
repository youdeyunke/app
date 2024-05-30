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
//index.js
const util = require('./util.js')
//获取应用实例
const app = getApp()

Page({
    /**
     * 页面数据
     */
    data: {
        businessTotalLoan: 0,
        gjjTotalLoan: 0,
        loanType: '1',
        startDate: undefined,

        lprRate: 4.65,
        lprBase: 0, // lpr基点
        lprValue: 4.65, // 计算基点之后的lpr值

        actionsBottom: 20,
        businessTotalLoanStr: '',
        gjjTotalLoanStr: '',
        showGJJ: false,
        showBusiness: true,
        gjjFocus: false,
        businessFocus: false,
        startDateStr: '',

        paymentMethodIndex: 0,
        paymentYearIndex: 29,
        gjjLoanRateIndex: 0,
        loanTypeArr: [{
            text: '商业贷款',
            id: 1,
            idStr: '1',
            checked: true
        }, {
            text: '公积金贷款',
            id: 2,
            idStr: '2',
        }, {
            text: '组合贷款',
            id: 3,
            idStr: '3',
        }],
        paymentMethodArr: [{
            text: '等额本息(每月等额还款)',
            id: 1
        }, {
            text: '等额本金(每月递减还款)',
            id: 2
        }],
        paymentYearArr: [],
        gjjLoanRateArr: []
    },

    observers: {
        "lprRate": function (val) {
            console.log('lpr rate change', val)
            // TODO  
        },
        "lprBase": function (val) {
            console.log('lpr base change', val)
            // TODO 
        },
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        wx.setNavigationBarTitle({ title: '房贷计算器' })

        var currentDate = new Date();
        var paymentYearArr = [];
        for (let i = 1; i <= 30; i++) {
            paymentYearArr.push({
                value: i,
                text: `${i}年 (${i * 12}月)`
            });
        }
        var lprRate = app.globalData.myconfigs.lpr_rate || 4.65
        var businessTotalLoanStr = ''
        var businessTotalLoan = 0
        if (q.total) {
            businessTotalLoanStr = q.total
            businessTotalLoan = parseFloat(q.total)
        }
        console.log('businessTotalLoanStr', businessTotalLoanStr, businessTotalLoan)

        this.setData({
            paymentYearArr: paymentYearArr,
            businessTotalLoanStr: businessTotalLoanStr,
            businessTotalLoan: businessTotalLoan,
            gjjLoanRateArr: util.getGJJLoanRateArr(this.data.paymentYear),
            startDate: currentDate,
            startDateStr: util.formatDate(currentDate),
            lprRate: lprRate, // 初始值
            lprBase: 0,
        })
        this.resetData(1)

        this.setData({
          primaryColor: app.globalData.myconfigs.color.primary || '#1989fa',
          primaryBtnColor: app.globalData.myconfigs.color.primary_btn || 'linear-gradient(270deg, #1989FA 0%, rgba(25, 137, 250, 0.6) 100%)',
      })

    },
    // 公共方法
    resetData: function (loanType) {
        console.log('longtype is', loanType)
        var loanType = String(loanType)
        let paymentYear = 30;
        var currentDate = new Date();
        this.setData({
            loanType: loanType,
            paymentMethodIndex: 0,
            paymentYearIndex: 29,
            gjjLoanRateIndex: 0,
            showBusiness: loanType === '1' || loanType === '3',
            showGJJ: loanType === '2' || loanType === '3',
            gjjLoanRateArr: util.getGJJLoanRateArr(paymentYear),
            startDate: currentDate,
            startDateStr: util.formatDate(currentDate),
            // businessFocus: loanType === '1' || loanType === '3',
            // gjjFocus: loanType === '2',

        })
    },
    getMortgageData: function () {
        var data = {
            businessTotalLoan: parseFloat(this.data.businessTotalLoan),
            // TODO 
            businessLoanRate: this.data.lprValue, // lpr利率
            gjjTotalLoan: parseFloat(this.data.gjjTotalLoan),
            gjjLoanRate: this.data.gjjLoanRateArr[this.data.gjjLoanRateIndex].value,
            paymentMethod: this.data.paymentMethodArr[this.data.paymentMethodIndex].id,
            paymentYear: this.data.paymentYearArr[this.data.paymentYearIndex].value,
            startDate: this.data.startDate,
            loanType: this.data.loanType
        }
        return data;
    },
    //事件处理函数
    inputFocus: function (e) {
        this.setData({
            actionsBottom: e.detail.height
        })
        return;
    },
    inputBlur: function (e) {
        this.setData({
            actionsBottom: 0
        })
        return;
    },

    lprRateInput: function (e) {
        // 输入lpr利率
        let value = e.detail || 0;
        if (value == 0) {
            // TODO 
            return false
        }
        this.setData({ lprRate: value })
        this.calculateLprValue()
    },
    lprBaseInput: function (e) {
        // 输入lpr利率
        let value = e.detail || 0;
        if (value == 0) {
            // TODO 
            return false
        }
        this.setData({ lprBase: value })
        this.calculateLprValue()
    },

    calculateLprValue: function () {
        // 根据lpr 和基点，计算实际利率 
        var value = parseFloat(this.data.lprRate) + parseFloat(this.data.lprBase) * 0.01
        this.setData({ lprValue: value })
    },

    businessTotalLoanInput: function (e) {
        let value = e.detail || 0;
        console.log('e', e, 'value', value)
        if (value === 0) {
            this.setData({
                businessTotalLoan: 0,
                businessTotalLoanStr: ''
            })
            return;
        }
        let valueStr = value.toString();
        if (valueStr.indexOf(".") < valueStr.length - 2) {
            value = util.truncate(value);
            this.setData({
                businessTotalLoan: value,
                businessTotalLoanStr: value
            })
        }
    },

    tipsToggleHandle: function () {
        this.setData({ showTips: !this.data.showTips })


    },
    gjjTotalLoanInput: function (e) {
        let value = e.detail || 0.0;
        if (value === 0) {
            this.setData({
                gjjTotalLoan: 0,
                gjjTotalLoanStr: ''
            })
            return;
        }
        let valueStr = value.toString();
        if (valueStr.indexOf(".") < valueStr.length - 2) {
            value = util.truncate(value);
            this.setData({
                gjjTotalLoan: value,
                gjjTotalLoanStr: value
            })
        }
    },
    loanTypeChange: function (e) {
        console.log('tab change', e)
        var i = e.detail.index
        var t = this.data.loanTypeArr[i]
        this.resetData(t.id);
    },
    paymentMethodchange: function (e) {
        var index = e.detail.value;
        this.setData({
            paymentMethodIndex: index
        })
    },
    paymentYearchange: function (e) {
        var index = e.detail.value;
        var paymentYear = this.data.paymentYearArr[index].value;
        this.setData({
            paymentYearIndex: index,
            gjjLoanRateArr: util.getBusinessLoanRateArr(paymentYear)
        })
    },
    startDateChange: function (e) {
        this.setData({
            startDate: new Date(e.detail.value),
            startDateStr: util.formatDate(new Date(e.detail.value))
        });
    },
    gjjLoanRateChange: function (e) {
        var index = e.detail.value;
        this.setData({
            gjjLoanRateIndex: index
        })
    },
    calculateLoan: function () {
        var mortgageData = this.getMortgageData();
        switch (mortgageData.loanType) {
            case "1":
                if (!mortgageData.businessTotalLoan) {
                    wx.showToast({
                        title: '请输入商业贷款金额',
                        icon: 'none',
                        duration: 2000
                    })
                    this.setData({
                        businessFocus: true
                    })
                    return;
                }
                break;
            case "2":
                if (!mortgageData.gjjTotalLoan) {
                    wx.showToast({
                        title: '请输入公积金贷款金额',
                        icon: 'none',
                        duration: 2000
                    })
                    this.setData({
                        gjjFocus: true
                    })
                    return;
                }
                break;
            case "3":
                if (!mortgageData.businessTotalLoan) {
                    wx.showToast({
                        title: '请输入商业贷款金额',
                        icon: 'none',
                        duration: 2000
                    })
                    this.setData({
                        businessFocus: true
                    })
                    return;
                }
                if (!mortgageData.gjjTotalLoan) {
                    wx.showToast({
                        title: '请输入公积金贷款金额',
                        icon: 'none',
                        duration: 2000
                    })
                    this.setData({
                        gjjFocus: true
                    })
                    return;
                }
                break;
        }
        app.globalData.mortgageData = mortgageData;
        wx.navigateTo({
            url: '/pkgJisuanqi/pages/daikuan/detail'
        });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '房贷计算器',
            path: '/pkgJisuanqi/pages/daikuan/index'
        }
    },
    onShareTimeline () {
        return {
            title: '房贷计算器',
            path: '/pkgJisuanqi/pages/daikuan/index'
        }
    }
})

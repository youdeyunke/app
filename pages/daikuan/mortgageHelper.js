const util = require('./util.js')

/**
 * 本金还款的月还款额
 * @param {*贷款总额} total
 * @param {*还款月数} months
 * @param {*月利率} monthRate
 */
const equalPrincipalAndInterest = (total, months, monthRate) => {
    //〔贷款本金×月利率×（1＋月利率）＾还款月数〕÷〔（1＋月利率）＾还款月数－1〕
    let tempRate = Math.pow((1 + monthRate), months);
    let monthlyPayment = total * monthRate * tempRate / (tempRate - 1);
    return monthlyPayment;
}

/**
 * 本金还款的月还款额
 * @param {*贷款总额} total
 * @param {*还款月数} months
 * @param {*月利率} monthRate
 */
const equalPrincipal = (total, months, monthRate) => {
    // 每月月供额 = 每月应还本金 + 每月应还利息
    // 每月应还本金 = 贷款本金 ÷ 还款月数
    // 每月应还利息 = (贷款本金 - 已归还本金累计额) × 月利率
    let principal = total / months * 1.0;
    let interest = total * monthRate;
    let monthlyPayment = util.truncate(principal + interest);
    return monthlyPayment;
}

let tempTotalPaid = 0;

/**
 * 等额本息 月供明细
 * @param {*待还本金} surplus
 * @param {*没有偿还本息} monthlyPayment
 * @param {*月利率} monthRate
 */
const getInterestMonthDetail = (surplus, monthlyPayment, monthRate) => {
    let interest = surplus * monthRate;
    let principal = monthlyPayment - interest;
    surplus = surplus - principal;
    return {
        monthlyPayment: monthlyPayment,
        principal: principal,
        interest: interest,
        surplus: surplus
    }
}

/**
 * 等额本金 月供明细
 * @param {*待还本金} surplus
 * @param {*没有偿还本金} principal
 * @param {*月利率} monthRate
 */
const getPrincipalMonthDetail = (surplus, principal, monthRate) => {
    let interest = surplus * monthRate;
    let monthlyPayment = principal + interest;
    surplus -= principal;
    return {
        monthlyPayment: monthlyPayment,
        principal: principal,
        interest: interest,
        surplus: surplus
    }
}

/**
 * 月供明细
 * @param {*还款月数} months
 * @param {*开始还款日期} startDate
 * @param {*每月明细计算数据(Array)} loadDatas
 */
const getMonthDetails = (months, startDate, loadDatas) => {
    var startYear = startDate.getFullYear();
    tempTotalPaid = 0;
    let monthDetails = [];
    let surplusArr = [];
    for (let j = 0; j < months; j++) {
        let monthInterest = {};
        if (loadDatas.length === 1) {
            let [monthdetailFunc, surplus, monthMoney, monthRate] = loadDatas[0];
            if (!surplusArr[0]) {
                surplusArr[0] = surplus;
            }
            monthInterest = monthdetailFunc(surplusArr[0], monthMoney, monthRate);
            surplusArr[0] = monthInterest.surplus;
        } else {
            monthInterest = {
                monthlyPayment: 0,
                principal: 0,
                interest: 0,
                surplus: 0,
                month: 0
            };
            for (let k = 0; k < loadDatas.length; k++) {
                let [monthdetailFunc, surplus, monthMoney, monthRate] = loadDatas[k];
                if (!surplusArr[k]) {
                    surplusArr[k] = surplus;
                }
                let interestItem = monthdetailFunc(surplusArr[k], monthMoney, monthRate);
                surplusArr[k] = interestItem.surplus;
                monthInterest.monthlyPayment += interestItem.monthlyPayment;
                monthInterest.principal += interestItem.principal;
                monthInterest.interest += interestItem.interest;
                monthInterest.surplus += interestItem.surplus;
            }
        }
        monthInterest.paymentDate = startDate.addMonths(j);
        monthInterest.month = monthInterest.paymentDate.getMonth() + 1;

        tempTotalPaid += monthInterest.monthlyPayment;
        let currentYear = monthInterest.paymentDate.getFullYear();
        let arrIndex = currentYear - startYear;
        let tempItem = monthDetails[arrIndex];
        if (tempItem != undefined) {
            tempItem = monthDetails[arrIndex]
            tempItem.yearPaid += monthInterest.monthlyPayment;
            tempItem.yearInterest += monthInterest.interest;
        } else {
            tempItem = {
                yearPaid: monthInterest.monthlyPayment,
                yearInterest: monthInterest.interest,
                year: currentYear,
                months: [],
                showMonths: false
            };
        }
        tempItem.months.push(monthInterest);
        monthDetails[arrIndex] = tempItem;
    }
    return monthDetails;
}

/**
 * 计算月供明细
 * @param {贷款信息} mortgage 
 */
const calculatePaymentDetail = (mortgage) => {
    let monthlyPayment = 0;
    let balance = 0;
    let paymentMonth = mortgage.paymentYear * 12;
    let totalLoan = 0;
    let totalPaid = 0;
    let payDetails = [];

    mortgage.businessTotalLoan *= 10000;
    mortgage.gjjTotalLoan *= 10000;
    mortgage.businessLoanRate /= 100;
    mortgage.gjjLoanRate /= 100;

    let monthSYRate = mortgage.businessLoanRate / 12.0;
    let monthGJJRate = mortgage.gjjLoanRate / 12.0;

    let loadDatas = [];
    switch (mortgage.loanType) {
        case '1': //商业贷款
            totalLoan = mortgage.businessTotalLoan;
            // 等额本息
            if (mortgage.paymentMethod === 1) {
                monthlyPayment = equalPrincipalAndInterest(mortgage.businessTotalLoan, paymentMonth, monthSYRate);

                loadDatas.push([getInterestMonthDetail, mortgage.businessTotalLoan, monthlyPayment, monthSYRate]);
                payDetails = getMonthDetails(paymentMonth, mortgage.startDate, loadDatas);
                totalPaid = tempTotalPaid;
            } else {
                //等额本金
                let principal = mortgage.businessTotalLoan / paymentMonth * 1.0;
                monthlyPayment = equalPrincipal(mortgage.businessTotalLoan, paymentMonth, monthSYRate);

                loadDatas.push([getPrincipalMonthDetail, mortgage.businessTotalLoan, principal, monthSYRate]);
                payDetails = getMonthDetails(paymentMonth, mortgage.startDate, loadDatas);
                totalPaid = tempTotalPaid;
                balance = principal * monthSYRate;
            }
            break;
        case '2': //公积金贷款
            totalLoan = mortgage.gjjTotalLoan;
            // 等额本息
            if (mortgage.paymentMethod === 1) {
                monthlyPayment = equalPrincipalAndInterest(mortgage.gjjTotalLoan, paymentMonth, monthGJJRate);

                loadDatas.push([getInterestMonthDetail, mortgage.gjjTotalLoan, monthlyPayment, monthGJJRate]);
                payDetails = getMonthDetails(paymentMonth, mortgage.startDate, loadDatas);
                totalPaid = tempTotalPaid;
            } else {
                //等额本金
                let principal = mortgage.gjjTotalLoan / paymentMonth * 1.0;
                monthlyPayment = equalPrincipal(mortgage.gjjTotalLoan, paymentMonth, monthGJJRate);

                loadDatas.push([getPrincipalMonthDetail, mortgage.gjjTotalLoan, principal, monthGJJRate]);
                payDetails = getMonthDetails(paymentMonth, mortgage.startDate, loadDatas);
                totalPaid = tempTotalPaid;
                balance = principal * monthSYRate;
            }
            break;
        case '3': //组合贷款
            totalLoan = mortgage.businessTotalLoan + mortgage.gjjTotalLoan;
            // 等额本息
            if (mortgage.paymentMethod === 1) {
                //商业
                let syMonthlyPayment = equalPrincipalAndInterest(mortgage.businessTotalLoan, paymentMonth, monthSYRate);
                //公积金
                let gjjMonthlyPayment = equalPrincipalAndInterest(mortgage.gjjTotalLoan, paymentMonth, monthGJJRate);
                monthlyPayment = syMonthlyPayment + gjjMonthlyPayment;

                loadDatas.push([getInterestMonthDetail, mortgage.businessTotalLoan, syMonthlyPayment, monthSYRate]);
                loadDatas.push([getInterestMonthDetail, mortgage.gjjTotalLoan, gjjMonthlyPayment, monthGJJRate]);
                payDetails = getMonthDetails(paymentMonth, mortgage.startDate, loadDatas);
                totalPaid = tempTotalPaid;
            } else {
                //等额本金
                //商业
                let syPrincipal = mortgage.gjjTotalLoan / paymentMonth * 1.0;
                let syMonthlyPayment = equalPrincipal(mortgage.businessTotalLoan, paymentMonth, monthSYRate);
                //公积金
                let gjjPrincipal = mortgage.gjjTotalLoan / paymentMonth * 1.0;
                let gjjMonthlyPayment = equalPrincipal(mortgage.gjjTotalLoan, paymentMonth, monthGJJRate);

                let syBalance = syPrincipal * monthSYRate;
                let gjjBalance = gjjPrincipal * monthSYRate;
                balance = syBalance + gjjBalance;
                monthlyPayment = syMonthlyPayment + gjjMonthlyPayment;

                loadDatas.push([getPrincipalMonthDetail, mortgage.businessTotalLoan, syPrincipal, monthSYRate]);
                loadDatas.push([getPrincipalMonthDetail, mortgage.gjjTotalLoan, gjjPrincipal, monthGJJRate]);
                payDetails = getMonthDetails(paymentMonth, mortgage.startDate, loadDatas);
                totalPaid = tempTotalPaid;
            }
            break;
    }

    totalLoan = totalLoan / 10000.0;
    totalPaid = totalPaid / 10000.0;
    return {
        monthlyPayment: monthlyPayment,
        balance: balance,
        totalLoan: totalLoan,
        totalPaid: totalPaid,
        totalInterest: totalPaid - totalLoan,
        payDetails: payDetails
    };

}

module.exports = {
    equalPrincipalAndInterest: equalPrincipalAndInterest,
    equalPrincipal: equalPrincipal,
    calculatePaymentDetail: calculatePaymentDetail
}
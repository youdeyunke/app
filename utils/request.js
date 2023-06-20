const app = getApp()
console.log("121request_app", app);
const defaultApiHost = 'http://192.168.31.66:2021';
const EXT = wx.getExtConfigSync();
const apiHost = EXT.host || defaultApiHost;





// 发送http请求
const http = ({
    url = '',
    data = {},
    ...other
} = {}) => {
    var header = {
        'content-type': 'application/json',
    }
    if (!header["Content-Type"]) {
        header["Content-Type"] = "application/json";
    }

    if (wx.getStorageSync('token')) {
        header.Authorization = wx.getStorageSync('token');
    }

    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            data: data,
            header: header,
            ...other,
            success: function (res) {
                if (res.data.status == 500) {
                    wx.showModal({
                        title: "服务器错误",
                        content: "服务器出错了，请稍后重试"
                    });
                    wx.hideLoading()
                    return false;
                }

                if (res.data.status == 888) {
                    // 调起支付
                    wx.requestPayment({
                        timeStamp: res.data.data.timeStamp,
                        nonceStr: res.data.data.nonceStr,
                        package: res.data.data.package,
                        signType: res.data.data.signType,
                        paySign: res.data.data.paySign,
                        success: function (wxpay_res) {
                            if (wxpay_res['errMsg'] == "requestPayment:ok") {
                                // 支付成功了
                                wx.showToast({
                                    title: "支付成功",
                                    icon: "success"
                                });
                                resolve(res)
                                // return typeof obj.success == "function" && obj.success(res);
                            } else {
                                wx.showModal({
                                    title: "支付失败",
                                    content: wxpay_res['errMsg']
                                });
                                reject(res)
                                // return typeof obj.fail == "function" && obj.success(res);
                            }

                        },
                        fail: function (wxpay_res) {
                            wx.showModal({
                                title: "支付失败",
                                content: "支付失败，请重试"
                            });
                            reject(res)
                            //   return typeof obj.fail == "function" && obj.success(res);
                        }
                    });
                    return
                }

                if (res.data.status == 889) {
                    var error = res.data.error;
                    wx.showModal({
                        title: "支付失败",
                        content: error
                    });
                    return false;
                }


                if (res.data.status == 444) {
                    var error = res.data.error;
                    wx.redirectTo({
                        url: "/pkgError/pages/444/index?error=" + error
                    });
                    return false;
                }

                if (res.data.status == 404) {
                    var error = res.data.error;
                    //wx.redirectTo({
                    //    url: "/pages/404/index?error=" + error
                    //});
                    //return false;
                }

                if ([2000, 2001].includes(res.data.status)) {
                    // token 过期,清空当前登录状态
                    auth.gotoAuth("需要登录", "请先登录账号");
                    return false;
                }
                if (res.data.status == 1 && res.data.error) {
                    wx.showModal({
                        title: "温馨提示",
                        content: res.data.error
                    });
                }
                if (res.data.status == 1 && res.data.message) {
                    wx.showModal({
                        title: "温馨提示",
                        content: res.data.message,
                    });
                }

                var t = app && app.globalData && app.globalData.myconfigs && app.globalData.myconfigs.timeout ? app.globalData.myconfigs.timeout : 0

                setTimeout(function () {
                    // 加载完成后
                    resolve(res)
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
                    wx.stopPullDownRefresh();
                }, t)
            },
            fail: function (res) {
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
                wx.hideLoading();
                wx.hideToast();
            },
            complete: function () {}
        });

    })
}

// 判断是否需要拼接请求头
const getUrl = (url) => {
    if (url.indexOf('://') == -1) {
        url = apiHost + url;
    }
    return url
}


// get请求
const get = (url, data = {}) => {
    return http({
        url,
        data
    })
}
//   post请求
const post = (url, data = {}) => {
    return http({
        url,
        data,
        method: 'post'
    })
}
const put = (url, data = {}) => {
    return http({
        url,
        data,
        method: 'put'
    })
}

const destroy = (url, data = {}) => {
    return http({
        url,
        data,
        method: 'DELETE'
    })
}
module.exports = {
    get,
    post,
    put,
    destroy,
}
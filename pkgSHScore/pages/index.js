/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// newHoseNum/pages/nhLogger.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 动态社保积分系数
        shebaoxishu: 0,
        // 动态社保积分月数
        shebaoyueshu: 0,
        // 状况
        questionItems: [
            // 家庭状况
            {
                title: '家庭状况',
                styleName: 'small',
                score: -1,
                // 控制内容排列方式为行排列
                flexStyle: 'row',
                options: [{
                    label: "家庭",
                    score: 10,
                    selected: false,
                    style: 'radiorow',
                },
                {
                    label: "单身",
                    score: 0,
                    selected: false,
                    style: 'radiorow',
                },
                ]
            },
            // 户籍状况
            {
                title: '户籍状况',
                styleName: 'small',
                score: -1,
                // 控制内容排列方式为行排列
                flexStyle: 'row',
                options: [{
                    label: "上海户口",
                    score: 10,
                    selected: false,
                    style: 'radiorow',
                },
                {
                    label: "非上海户口",
                    score: 0,
                    selected: false,
                    style: 'radiorow',
                },
                ]
            },
            // 房产状况
            {
                title: '房产状况',
                styleName: 'small',
                score: -1,
                // 控制内容排列方式为行排列
                flexStyle: 'row',
                options: [{
                    label: "上海无房",
                    score: 20,
                    selected: false,
                    style: 'radiorow',
                },
                {
                    label: "上海有房",
                    score: 0,
                    selected: false,
                    style: 'radiorow',
                },
                ]
            },
            {
                title: '5年内购房情况',
                styleName: 'big',
                score: -1,
                // 控制内容排列方式为列排列
                flexStyle: 'column',
                options: [{
                    label: "无房，五年内无购房记录",
                    score: 20,
                    selected: false,
                    style: 'radiocolumn',
                },
                {
                    label: "有房，五年内无购房记录",
                    score: 5,
                    selected: false,
                    style: 'radiocolumn',
                },
                {
                    label: "无房，五年内有购房记录",
                    score: 0,
                    selected: false,
                    style: 'radiocolumn',
                },
                {
                    label: "有房，五年内有购房记录",
                    score: 0,
                    selected: false,
                    style: 'radiocolumn',
                },
                ]
            }
        ],
        // 动态社保积分
        shebaojifen: {
            title: '动态社保积分',
            name1: '社保系数',
            name2: '社保月数',
        },
    },

    // 修改家庭状况audio
    changephoto (e) {
        const questionItems = this.data.questionItems
        let i = e.target.dataset.i
        let j = e.target.dataset.j
        questionItems[i].options.map((item) => {
            item.selected = false
        })
        questionItems[i].options[j].selected = true
        questionItems[i].score = questionItems[i].options[j].score
        this.setData({
            questionItems: questionItems
        })

    },

    computedData () {
        const value1 = this.data.shebaoxishu
        const value2 = this.data.shebaoyueshu
        const value3 = value1 * value2
        let result = 0, open = 0
        this.data.questionItems.map((item) => {
            if (item.score == -1) {
                wx.showToast({
                    title: '请继续完善信息',
                    icon: 'error',
                    duration: 2000
                })
                open = 1
                return
            }
            result = result + item.score
        })
        result = result + value3
        result = result.toFixed(2)
        if (open == 1) {
        } else {
            wx.navigateTo({
                url: "../../pkgSHScore/pages/show?result=" + result
            })
        }
    },

    submit () {
        this.computedData()
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
// pages/visitors/index.js
const app = getApp()
const myvisitorApi = require("../../api/myvisitor")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: '',
        scopes: [
            { name: '今日', value: 'today_items' },
            { name: '昨日', value: 'yesterday_items' },
            { name: '本月', value: 'this_month_items' },
            { name: '全部', value: 'all' },
        ],
        total_pages:0,
        noResult: false,
        scopeIndex: 0,
        page: 1,
        targetId: '',
        per_page: 20,
        loading: true,
        vistorList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        var scopeIndex = this.data.scopes.findIndex((item, index) => { return item.value === q.scope })
        scopeIndex = scopeIndex <= 0 ? 0 : scopeIndex
        this.setData({
            scopeIndex: scopeIndex || 0,
            targetId: q.targetId || '',
            targetType: q.targetType || 'post',
        },
        function () {
            _this.loadData()
        })
    },

    tabChange: function (e) {
        var index = e.detail.name
        var _this = this
        this.setData({ scopeIndex: index, page: 1, loading: true ,vistorList:[]}, () => {
            _this.loadData()
        })
    },

    loadData: function () {
        var _this = this
        var si = this.data.scopeIndex
        var query = {
            order: 'updated_at desc',
            page: this.data.page,
            scope: this.data.scopes[si].value,
            target_type: this.data.targetType || 'post',
            target_id: this.data.targetId || '',
        }
        // 有待检测
        // app.request({
        //     url: '/api/v1/myvisitors/有待检测',
        //     data: query,
        //     success: function (resp) {
    
        //     },
        // })
        myvisitorApi.getMyVisitorList(query).then((resp)=>{
            var data = { loading: false }
            data.noResult = resp.data.meta.total_visitors === 0
            _this.setData({
                total_pages : resp.data.total_pages,
                loading:false
            })
            _this.ListData(resp.data.data)
        })
    },
    ListData:function(arr){
        //获取data中的 vistorList
        var vistorList = this.data.vistorList
        var obj ={}
        arr.forEach((v,i,a)=>{
            var v1 = v
            //根据空格切割字符串
            var arr1 = v.updated_at.trim().split(" ")
            //将浏览的小时和分钟存放到数据中
            a[i].lookTime=arr1[1]
            //将日期根据-切割 然后在拼接 月和 日
            var x =arr1[0].trim().split("-")[1] + '-' +arr1[0].trim().split("-")[2];
            //中文版
            var strc =  arr1[0].trim().split("-")[1] + '月' +arr1[0].trim().split("-")[2] + '日';
            
            if(!obj[x]){
                obj[x]={}
                obj[x].date = strc
                obj[x].logs =[]
            }
            obj[x].logs.push(v1)
            vistorList.push(obj[x])
        })
        this.setData({
            vistorList :vistorList
        })
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
        this.setData({
            page:1,
            loading:true,
            vistorList:[]
        }),
            this.loadData()
        
        
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var page = this.data.page || 1
        if(page < this.data.total_pages){
            this.setData({
                page: page + 1,
                loading: true,
            })
        }else{
            return false
        }
        this.loadData()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

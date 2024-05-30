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
// pages/news/index.js
const app = getApp()
const newsApi = require("../../../api/news")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        catId: '',
        per_page: 8,
        active: 0,
        isEmpty: false,
        isEnd: false,
        loading: false,
        cats_key: 'news.cats',
        news: [],
        kw: '',
        primaryColor: '#9e1d1d'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        var catId = q.cat_id || ''
        wx.setNavigationBarTitle({ title: '楼市资讯' })
        this.ensureCats(function (cats) {
            // 根据catid 找到需要选中哪个分类
            var active = 0
            cats.forEach((cat, i) => {
                if (cat.id.toString() == catId.toString()) {
                    active = i
                }
            })
            if(!catId){
                catId = cats[0].id
            }
            
            var color = app.globalData.color
            var data = {
                active: active,
                cats: cats,
                primaryColor: color.primary || '#9e1d1d',
                catId: catId
            }
            _this.setData(data)
            _this.loadNews()
        })
    },

    onShow: function () {
        this.loadCats()
    },

    kwChange(){
      this.loadNews()
    },

    catChange: function (e) {
        var i = e.currentTarget.dataset.i
        var cat = this.data.cats[i]
        this.setData({
            isEmpty: false,
            isEnd: false,
            catId: cat.id,
            active: i,
            page: 1,
            news: [],
        })
        console.log('cat chage')
        this.loadNews()
    },


    ensureCats: function (cb) {
        var key = this.data.cats_key
        var cats = wx.getStorageInfoSync(key)
        if (cats && cats.length > 0) {
            return cb(cats)
        } else {
            this.loadCats(function (cats) {
                return cb(cats)
            })
        }
    },

    loadCats: function (cb) {
        var _this = this
        newsApi.getNewsCatList().then((resp) => {
            var newcat = {
                id: 0,
                name: '全部'
            }
            var cats = resp.data.data
            cats.unshift(newcat)
            _this.setData({
                cats: cats,
            })
            // var key = _this.data.cats_key
            // wx.setStorageSync(key, resp.data.data)

            if (typeof cb == 'function') {
                return cb(resp.data.data)
            }
        })
    },

    loadNews: function () {
        var _this = this
        this.setData({
            isEmpty: false
        })

        if (this.data.isEnd) {
            return false
        }

        this.setData({
            loading: true
        })
        var query = {
            // cat_id: _this.data.catId,
            page: _this.data.page,
            per_page: _this.data.per_page,
            kw: _this.data.kw,
        }
        if(this.data.active){
            query.cat_id = _this.data.catId
        }
        // √
        newsApi.getNewsList(query).then((resp) => {
            var index = _this.data.page - 1
            var key = 'news[' + index + ']'
            var data = {
                loading: false,
            }

            if (resp.data.data.length == 0) {
                data['isEnd'] = true
                if (_this.data.page == 1) {
                    data['isEmpty'] = true
                    data['isEnd'] = false
                }
            }

            data[key] = resp.data.data
            _this.setData(data)
            // console.log('set data', data)
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
        var _this = this
        this.setData({
            news: [],
            isEmpty: false,
            isEnd: false,
            page: 1,
        })
        this.loadNews()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var _this = this
        this.setData({
            page: _this.data.page + 1
        })
        this.loadNews()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      return{
        path: '/pkgNews/pages/news/index',
        title: '楼市资讯'
      }
    }
})

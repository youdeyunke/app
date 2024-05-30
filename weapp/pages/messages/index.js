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
// pages/messages/index.js
const app = getApp()
const messageApi = require("../../api/message")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLogin: false,
        userInfo: {},
        sleepTime: 1000,
        iid: null,
        active: 0,
        primaryColor: '#9e1d1d',
        sys_message_count: 0,
        systemItems: [],
        page: 1,
        showDingyue: true,
        configs: null,
    },

    closeDinyueHandle(){
      this.setData({
        showDingyue: false
      })
    },

    dingyueHandle: function () {
      var _this = this;
      app.dingyueHandle(function () {
        wx.showToast({
          title: '已订阅',
        })
        _this.setData({ showDingyue: false })
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '消息'
        })

        var color = app.globalData.color
        this.setData({
            primaryColor: color.primary || '#9e1d1d',
        })
        wx.setNavigationBarColor({
          backgroundColor: color.primary || '#9e1d1d',
          frontColor: '#ffffff',
        })
        var _this = this
        app.ensureConfigs(function (configs) {
          _this.setData({
              configs: configs
          })
        })
        this.loadSysMessage()
    },

    readAllSys(){
      // 将通知全部已读取
      var _this = this

      messageApi.markSysReadAll().then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        wx.showToast({
          title: '已将全部通知标记为已读',
          icon: 'none'
        })
        var systemItems =  _this.data.systemItems.map((item) =>{ 
          item.unread = false;
          return item;
        })
        // 修改未读数为0
        _this.setData({
          sys_message_count:0,
          systemItems:systemItems,
        })
      })
    },

    stopInterval: function () {
        // 退出后要关闭定时器
        var iid = this.data.iid
        if (iid) {
            clearInterval(iid)
            this.setData({
                iid: null
            })
            console.log('已停止定时器')
        }
    },

    startInterval: function () {
        // 开启定时器，并防止重复
        var _this = this
        var t = 5 * 1000
        var iid = setInterval(() => {
        }, t);
        this.setData({
            iid: iid
        })
        console.log('开启定时器，刷新聊天列表', t)
    },

    deleteSysHandle(e){
      var _this = this
      console.log(e);
      var sid = e.currentTarget.dataset.sid


      wx.showModal({
        title: '删除通知',
        content: "确定要删除这条通知吗？",
        success: function (res) {
            if (!res.confirm) {
                return
            }
            _this.deleteSysMes(sid)
        }
    })
    },

    deleteSysMes(sid){
      
      var _this = this

      messageApi.deleteSysMes(sid).then((resp) => {
        if (resp.data.status != 0) {
          return
        }
        wx.showToast({
          icon: 'none',
          title: '已删除',
      })
      var arr = this.data.systemItems
      var resarr = arr.filter(item => item.id != sid)
        _this.setData({
          systemItems: resarr
        })
      })
    },

    loadSysMessage(){
      var _this = this
      var data = {
        page: this.data.page,
        per_page: 10,
      }
      messageApi.getSysMessage(data).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        var newarr = resp.data.data
        _this.setData({
          systemItems: [..._this.data.systemItems, ...newarr]
        })
      })
    },

    sysItemClickHandle(index) {
      var index = index.currentTarget.dataset.index
      var id = this.data.systemItems[index].id
      var url = this.data.systemItems[index].url
      var _this= this
      messageApi.markSysMesRead(id).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        var items = _this.data.systemItems
        if(items[index].unread==true) {
          _this.setData({
            sys_message_count:_this.data.sys_message_count-1
          })
        }
        items[index].unread=false
        let temp = 'systemItems[' + index + ']'
        // _this.setData({
        //   systemItems:items
        // })
        _this.setData({
          [temp] : items[index]
        })
        wx.navigateTo({
          url: '/pages/messages/systemMesShow/index?id=' + id,
        })
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    dingyue: function () {
        app.dingyueHandle()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this = this 
        wx.removeTabBarBadge({
            index: 2,
            fail: function (res) {
                console.log('清空未读数失败', res)
            }
        })

        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setPage('/pages/messages/index')
        }

        if (app.globalData.LOGIN_FLAG != 1) {
            // 未登录
            this.selectComponent('.loginwindow').openWindow()
            return;
        } else {
          this.selectComponent('.loginwindow').closeWindow()
        }
        this.stopInterval()
        this.startInterval()
        this.setData({
          sys_message_count: app.globalData.sys_message_count,
        })
        var user = wx.getStorageSync('userInfo');
        this.setData({
            userInfo: user
        })

    },

    loginSuccess: function (data) {

        this.setData({
            userInfo: data.detail
        })
        this.loadSysMessage()
        this.stopInterval()
        this.startInterval()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.stopInterval()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.stopInterval()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        var _this =this
        this.loadSysMessage()
        this.setData({
          page: 1,
          systemItems: []
        },() => {
          _this.loadSysMessage()
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      var _this =this
      this.setData({
        page: this.data.page + 1
      },() => {
        _this.loadSysMessage()
      })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
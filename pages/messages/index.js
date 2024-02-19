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
// pages/messages/index.js
const app = getApp()
const messageApi = require("../../api/message")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        isLogin: false,
        userInfo: {},
        sleepTime: 1000,
        iid: null,
        active: 0,
        primaryColor: '#9e1d1d',
        chat_message_count: 0,
        sys_message_count: 0,
        systemItems: [],
        page: 1,
        showDingyue: true,
        configs: null,
    },

    onChange(event) {
      var title = event.detail.title
      if (title == "通知") {
        this.setData({
          page:1,
          systemItems: []
        })
        this.loadSysMessage()
      }
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
        var _this = this
        app.ensureConfigs(function (configs) {
          _this.setData({
              configs: configs
          })
        })

    },

    readAll: function () {
        // √
        messageApi.markReadAll().then((resp) => {
          if (resp.data.code != 0) {
            return
          }
          wx.showToast({
              title: '已将全部消息标记为已读',
              icon: 'none'
          })
        })
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
          this.loadData();
        }, t);
        this.setData({
            iid: iid
        })
        console.log('开启定时器，刷新聊天列表', t)
    },

    deleteHandle: function (e) {
        const {
            index
        } = e.currentTarget.dataset
        var item = this.data.items[index]
        if (item.sender_id == 0) {
            return
        }
        var _this = this
        wx.showModal({
            title: '删除对话',
            content: "确定要删除和" + item.sender_info.name + '的对话吗？聊天记录不会被删除。',
            success: function (res) {
                if (!res.confirm) {
                    return
                }
                _this.deleteChat(item.id)
            }
        })
    },

    deleteChat: function (chatId) {
        var _this = this
        messageApi.deleteChat(chatId).then((resp) => {
            if (resp.data.status == 0) {
                wx.showToast({
                    icon: 'none',
                    title: '已删除',
                })
                setTimeout(_this.loadData, 1000)
            }
        })
    },

    loadData: function () {
        var _this = this
        messageApi.getChatList().then((res) => {
            if (res.data.code == 0) {
                // 如果列表没有变化就不更新 
                // console.log(_this);
                var old = _this.data.items
                var n = res.data.data.result
                if (JSON.stringify(n) == JSON.stringify(old)) {
                    return
                }
                var items = n.map((item) => {
                    if (item.last_content_type == 'post') {
                        item.last_content = '[楼盘]'
                    }
                    if (item.last_content_type == 'namecard') {
                        item.last_content = '[名片]'
                    }
                    if (item.last_content_type == 'image') {
                        item.last_content == '[图片]'
                    }
                    if (item.last_content_type == 'location') {
                        item.last_content = '[定位]'
                    }
                    return item
                })
                _this.setData({
                    items: items,
                    sleepTime: res.data.sleep || 5,
                    chat_message_count: res.data.data.count || 0,
                })
            }
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
        this.loadData()
        this.stopInterval()
        this.startInterval()
        this.setData({
          sys_message_count: app.globalData.sys_message_count,
          chat_message_count: app.globalData.chat_message_count,
        })
        var user = wx.getStorageSync('userInfo');
        this.setData({
            userInfo: user
        })

        // 如果已经订阅消息，不显示底部提示
        wx.getSetting({
          withSubscriptions: true,
          success (res) {

            console.log(res.subscriptionsSetting)
            if(!res.subscriptionsSetting.mainSwitch){
              return
            }
            var tplId = app.globalData.myconfigs.msg_tpl_id || ''

            if ( res.subscriptionsSetting.hasOwnProperty('itemSettings') && res.subscriptionsSetting.itemSettings.hasOwnProperty(tplId) && res.subscriptionsSetting.itemSettings[tplId] == 'accept') {
              _this.setData({
                showDingyue: false
              })
            }
          }
        })

    },

    loginSuccess: function (data) {

        this.setData({
            userInfo: data.detail
        })
        this.loadData()
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
        this.loadData()
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
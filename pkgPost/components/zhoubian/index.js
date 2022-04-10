//index.js
//获取应用实例
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        longitude: { type: Number },
        latitude: { type: Number },
        type: { type: String }
    },
    /**
     * 组件的初始数据
     */
    data: {
        tabs: [
         
            { name: '幼儿园', value: '学校:幼儿园', icon: 'map-i-yey.png', isActive: false },
            { name: '小学', value: '学校:小学', icon: 'map-i-xx.png', isActive: false },
            { name: '中学', value: '学校:中学', icon: 'map-i-zx.png', isActive: false },
            { name: '美食', value: '美食', icon: 'map-i-ms.png', isActive: false },
            { name: '购物', value: '购物', icon: 'map-i-gw.png', isActive: false },
            { name: '公交', value: '公交', icon: 'map-i-gj.png', isActive: false },
            { name: '地铁', value: '地铁', icon: 'map-i-dt.png', isActive: true },
            { name: '银行', value: '银行', icon: 'map-i-yh.png', isActive: false },
        ],
        resp: [],
        active: 0,
        isShow: 0,
        maxLength: 2,
    },
    ready: function () {
        setTimeout(this.getContent, 500)
    },
    /**
     * 组件的方法列表
     */
    methods: {

        getContent(e) {
            var _this = this
            var app = getApp()
            var tab = this.data.tabs[this.data.active]
            //console.log(this.data.latitude,this.data.longitude);
            wx.request({
                url: 'https://apis.map.qq.com/ws/place/v1/search',
                data: {
                    keyword: tab.value,
                    key: app.globalData.qqMapAppKey,
                    boundary: `nearby(${_this.data.latitude},${_this.data.longitude},5000,0)`,
                    page_size: '20'
                },
                success: function (res) {
                    console.log(res);
                    if(res.data.status == 310){
                        console.log(res.message)
                        return
                    }
                    if (res.data && res.data.data.length == 0) {
                        _this.setData({
                            resp: '',
                            isShow: 1
                        })
                    } else {
                        res.data.data.map(v => {
                            if (v._distance >= 1000) {
                                var d = v._distance / 1000
                                v._distance =  d.toFixed(1) + 'km'
                            } else {
                                v._distance = parseInt(v._distance) + 'm'
                            }
                        })
                        _this.setData({
                            resp: res.data.data,
                            isShow: 0
                        })
                    }
                    if (res.data.data.length <= 2) {
                        _this.setData({
                            buttonShow: false
                        })
                    } else {
                        _this.setData({
                            buttonShow: true
                        })
                    }
                    _this.triggerEvent('myevent', res.data.data)
                }
            })
        },
        handleItemTap(e) {
            this.setData({ maxLength: 2 })
            var _this = this
            const { index } = e.currentTarget.dataset;
            var tabs = this.data.tabs
            tabs.forEach((v, i) => {
                if (i == index) {
                    v.isActive = true
                } else {
                    v.isActive = false
                }
            });
            this.setData({
                tabs: tabs,
                active: index
            })
            this.getContent()
        },
        lengthChange(e) {
            this.setData({ maxLength: e.detail })
        }
    }
})

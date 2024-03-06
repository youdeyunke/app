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
// pkgErshou/pages/zhoubian.js
//index.js
//获取应用实例
const app = getApp()
const qqmapApi = require("../../api/qqmap")
const postApi = require("../../api/post")
const houseApi = require("../../api/house")
const surroundApi = require("../../api/surround")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        longitude: {
            type: Number
        },
        activeItemIndex: {
            type: Number,
            value: null
        },
        latitude: {
            type: Number
        },
        type: {
            type: String
        },
        mode: {
            type: String
        },
        postId: {
            type: Number,
            default: null
        },
        haveTabs: {
            type: String
        }
    },
    observers: {
        'haveTabs': function () {
            var tabs = this.data.haveTabs.split(',')
            if (tabs == '') {
                this.setData({
                    resTabs: this.data.tabs
                })
                return
            }
            var resTabs = this.data.tabs.filter((t) => {
                for (let i = 0; i < tabs.length; i++) {
                    if (t.id == tabs[i]) {
                        return t
                    }
                }
            })
            this.setData({
                resTabs: resTabs
            })
        },
        'postId': function (res) {
            if (!res) { return }
            this.loadData()
        },
        "latitude": function (res) {
            if (!res) { return }
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        tabs: [{
            id: 'youeryuan',
            name: '幼儿园',
            value: '学校:幼儿园',
            icon: 'map-i-yey.png',
            isActive: false
        },
        {
            id: 'xiaoxue',
            name: '小学',
            value: '学校:小学',
            icon: 'map-i-xx.png',
            isActive: false
        },
        {
            id: 'zhongxue',
            name: '中学',
            value: '学校:中学',
            icon: 'map-i-zx.png',
            isActive: false
        },
        {
            id: 'meishi',
            name: '美食',
            value: '美食',
            icon: 'map-i-ms.png',
            isActive: false
        },
        {
            id: 'gouwu',
            name: '购物',
            value: '购物',
            icon: 'map-i-gw.png',
            isActive: false
        },
        {
            id: 'gongjiao',
            name: '公交',
            value: '公交',
            icon: 'map-i-gj.png',
            isActive: false
        },
        {
            id: 'ditie',
            name: '地铁',
            value: '地铁',
            icon: 'map-i-dt.png',
            isActive: true
        },
        {
            id: 'yinhang',
            name: '银行',
            value: '银行',
            icon: 'map-i-yh.png',
            isActive: false
        },
        ],
        resp: [],
        active: 0,
        isShow: 0,
        maxLength: 2,
        activeMarkerIndex: null,
        pois: [],
        post: null,
    },
    attached: function () {
            // var pois = this.data.pois

        if (this.data.mode == 'full') {
            this.setData({
                mapW: 750,
                mapH: 750
            })
        }
        if (this.data.mode == 'mini') {
            this.setData({
                mapW: 690,
                mapH: 320
            })
        }

    },
    ready: function () {
        
    },
    /**
     * 组件的方法列表
     */
    methods: {
        setMarker: function () {
            this.setData({
                markers: []
            })
            var markers = []
            var _this = this
            const bgColor = '#ff0000'
            const whiteColor = '#ffffff'
            var R = app.globalData.system.pixelRatio / 2.0
            var fontSize = app.globalData.system.fontSizeSetting * 0.8
            var marker = {
                iconPath: '/assets/icons/marker.png',
                alpha: '0.5',
                latitude: _this.data.post.latitude,
                longitude: _this.data.post.longitude,
                width: "40rpx",
                height: "40rpx",
                zIndex: 10000,
                callout: {
                    content: _this.data.post.title,
                    bgColor: '#1989F9',
                    borderRadius: 4,
                    display: 'ALWAYS',
                    color: '#FFF',
                    padding: 6,
                    textAlign: 'center'
                }
            }
            markers.push(marker)
            this.setData({
                markers: markers
            })
        },
        loadData () {
            var _this = this
            // 拉取楼盘的基本信息：坐标、名称、id
            //   √
            houseApi.getHouseBlocks(_this.data.postId
            ).then((res) => {
                var post = res.data.data
                _this.setData({
                    post: post
                },() => {
                  _this.setMarker()
                })
            })
        },
    }
})

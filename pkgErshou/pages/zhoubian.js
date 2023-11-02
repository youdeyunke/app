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
            this.getContent()
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
        // this.getContent()
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
        // this.getContent()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getContent (e) {
            var _this = this
            var tab = this.data.tabs[this.data.active]
            surroundApi.getSurroundList({
                post_id: _this.data.postId,
                cat: tab.id
            }).then((resp) => {
                _this.setData({
                    pois: resp.data.data,
                    resp: resp.data.data,
                }, () => {
                    _this.getMapContext()
                    _this.setMarker()
                })
            })
            // qqmapApi.placeSearch({
            //     keyword: tab.value,
            //     latitude: _this.data.latitude,
            //     longitude: _this.data.longitude,
            //     page_size: '20'
            // }).then((res) => {
            //         if(res.data.status == 310){
            //             console.log(res.message)
            //             return
            //         }
            //         if (res.data && res.data.data.length == 0) {
            //             _this.setData({
            //                 resp: [],
            //                 isShow: 1
            //             })
            //         } else {
            //             var resp = res.data.data.map(v => {
            //                 if (v._distance >= 1000) {
            //                     var d = v._distance / 1000
            //                     v._distance =  d.toFixed(1) + 'km'
            //                 } else {
            //                     v._distance = parseInt(v._distance) + 'm'
            //                 }
            //                 return v
            //             })
            //             _this.setData({
            //                 resp: resp,
            //                 isShow: 0
            //             })
            //         }
            //         _this.setData({ 
            //             pois: res.data.data 
            //         },() => {
            //             _this.getMapContext(),
            //             _this.setMarker()
            //         })
            // })
        },
        getMapContext () {
            var _this = this
            var arr = []
            arr.push({
                longitude: this.data.post.longitude,
                latitude: this.data.post.latitude
            })
            var pois = this.data.pois
            pois.forEach(v => {
                var obj = {}
                obj.longitude = v.location.lng
                obj.latitude = v.location.lat
                arr.push(obj)
            })
            // //缩放视野展示所有经纬度 此方法传入的数组不能为空 所以手动进行非空验证
            // if(pois.length ==0){
            //     return
            // }
            // this.data.map.includePoints({
            //     points: arr,
            //     padding: [50, 50, 50, 50]
            // });
            console.log('经纬度arr', arr)
            this.setData({
                points: arr
            })
        },
        setMarker: function () {
            this.setData({
                markers: []
            })
            var pois = this.data.pois
            var markers = []
            var _this = this
            const bgColor = '#ff0000'
            const whiteColor = '#ffffff'
            var R = app.globalData.system.pixelRatio / 2.0
            var fontSize = app.globalData.system.fontSizeSetting * 0.8
            var padding = fontSize * 1
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
            pois.forEach((v, i) => {
                var m = {
                    id: i,
                    //iconPath: '/assets/icons/marker.png',
                    latitude: v.location.lat,
                    width: '40rpx',
                    height: '40rpx',
                    longitude: v.location.lng,



                }
                m.alpha = '0.6',
                    m.width = 1,
                    m.zIndex = i,
                    m.height = 1,
                    m.callout = {
                        content: i + 1,
                        bgColor: '#ffffff',
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: '#333333',
                        display: 'ALWAYS',
                        color: '#333333',
                        padding: 6,
                        textAlign: 'center'
                    }
                markers.push(m)
            })
            this.setData({
                markers: markers
            })
            // console.log('markers', this.data.markers, pois)
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
                })
            })
        },
        markertap: function (e) {

            var mid = e.detail.markerId
            console.log('markertap', e, 'marker id is', mid)
            // 高亮
            var markers = this.data.markers.map((m, i) => {
                if (i == 0) {
                    return m
                }
                if (m.id == mid) {
                    // 点击了这个,高亮显示 
                    m.callout.bgColor = '#1989fa'
                    m.zIndex = 1000
                    console.log('mid hit', mid)
                } else {
                    m.zIndex = i
                    m.callout.bgColor = '#ffffff'
                }
                return m
            })
            this.setData({
                markers: markers,
                activeItemIndex: mid
            })

        },
        handleItemTap (e) {
            this.setData({
                maxLength: 2
            })
            var _this = this
            const {
                index
            } = e.currentTarget.dataset;
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
    }
})

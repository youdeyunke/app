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
// components/pagemaker/header/index.js
const app = getApp() 

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object }
    },

    observers: {
        "config": function (c) {
            if(!c){
                return
            }
            var link = c.link && c.link.cat !== 'no' ? c.link : null
            var data = {
                title: c.title.text,
                icon: c.title.icon,
                subtitle: c.subtitle.text,
                link: link
            }
            this.setData(data)
        },

    },

    ready: function () {
        this.setData({ 
            themeColor: app.globalData.myconfigs.color.primary,
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        title: '',
        subtitle: '',
        link: null,

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})

// components/pagemaker/header/module-box.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null },
        radius: {type: Number, default:0},
        width: {type: String, default: 'full'},
    },

    observers: {
        "config.margin.top": function(v){
            if(v == false){
                this.setData({'marginTopValue': '0rpx'})
            }
        },

        "config.margin.bottom": function(v){
            if(v == false){
                this.setData({'marginBottomValue': '0rpx'})
            }
        },        
        "config.shadow": function(v){
            if(v == 'off'){
                this.setData({shadowEnable: false})
          
            }
    
        },
 

        "radius": function(r){
            if(!r){
                return 
            }
            var val = r * 2 + 'rpx'
            this.setData({radiusValue: val})
        },

        "config.background": function (bg) {
            if (!bg) {
                return
            }
            // 设置背景
            var bgColor = '#ffffff'
            var bgImage = 'none'
            switch (bg.cat) {
                case 'none':
                    bgColor = 'none'
                    bgImage = 'none'
                    break;
                case 'default':
                    bgColor = bg.default
                    bgImage = 'none'
                    break;
                case 'custom':
                    bgColor = bg.color
                    bgImage = "url('" + bg.image + "')"
                    break;
            }

            this.setData({ bgColor: bgColor, bgImage: bgImage })
        },
      

    },

    /**
     * 组件的初始数据
     */
    data: {
        bgColor: '',
        bgImage: '',
        height: 'auto',
        shadowEnable: true, 
        widthSize: '750rpx',
        radiusValue: '2rpx',
        marginTopValue: '16rpx', 
        marginBottomValue: '16rpx',
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})

// components/pagemaker/searchbar/link.js
Component({
    externalClasses: ['custom-class', 'custom-style'],
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null }

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        functionHandle: function () {
            var phone = this.data.config.phone
            wx.makePhoneCall({
                phoneNumber: phone,
            });
        },

        weappHandle: function () {
            // TODO 
            var config = this.data.config
        },

        pageHandle: function () {
            var path = this.data.config.path
            switch (this.data.config.opentype) {
                case 'switchTab':
                    wx.switchTab({
                        url: path,
                    });
                    break;
                case 'navigateTo':
                    wx.navigateTo({
                        url: path,
                    });
                    break;
            }
        },

        clickHandle: function () {
            console.log('link click', this.data.config)
            var config = this.data.config
            if (!config) {
                return
            }
            switch (config.cat) {
                case 'page':
                    this.pageHandle()
                    break;
                case 'web':
                    this.webHandle()
                    break;
                case 'function':
                    this.functionHandle()
                    break;
            }

        }

    }
})

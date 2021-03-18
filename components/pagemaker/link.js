module.exports = {


    functionHandle: function (config) {
        var phone = config.phone
        wx.makePhoneCall({
            phoneNumber: phone,
        });
    },

    weappHandle: function (config) {
        // TODO 
        //  打开另外一个小程序
    },

    pageHandle: function (config) {
        var path = config.path
        switch (config.opentype) {
            case 'switchTab':
                wx.switchTab({
                url: path,
                });
                break;
            case 'navigateTo':
                wx.navigateTo({
                    url: path,
                    fail: function(){
                        wx.showToast({
                            icon: 'none',
                          title: '页面不存在',
                        
                        })
                    },
                });
                break;
        }
    },

    clickHandle: function (config) {
        // 点击按钮后，根据link对象，决定做和操作
        if (!config) {
            return
        }

        switch (config.cat) {
            case 'page':
                this.pageHandle(config)
                break;
            case 'web':
                this.webHandle(config)
                break;
            case 'function':
                this.functionHandle(config)
                break;
        }

    }

}
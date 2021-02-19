Component({
    data: {
        selected: 0,
        selectedColor: "#333",
        backgroundColor: "#fff",
        color: "#999",
        borderStyle: "black",
        list: [{
            pagePath: "/pages/home/home",
            iconPath: "/assets/tabs/home.0.png",
            selectedIconPath: "/assets/tabs/home.1.png",
            text: "首页"
        },
        {
            pagePath: "/pages/messages/index",
            iconPath: "/assets/tabs/message.0.png",
            selectedIconPath: "/assets/tabs/message.1.png",
            text: "消息"
        },
        {
            pagePath: "/pages/faxian/index",
            iconPath: "/assets/tabs/faxian.0.png",
            selectedIconPath: "/assets/tabs/faxian.1.png",
            text: "发现"
        },

        {
            pagePath: "/pages/myself/index",
            iconPath: "/assets/tabs/myself.0.png",
            selectedIconPath: "/assets/tabs/myself.1.png",
            text: "我的"
        }]
    },
    attached() {
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            this.setData({
                selected: data.index
            })
            wx.switchTab({ url })
        }
    }
})
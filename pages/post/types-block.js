// pages/post/types-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object }
    },

    observers: {
        "value.groups": function (val) {
            this.setData({
                currentGroup: val[0]
            })
        },

        "currentGroup": function (val) {
            console.log('current group change', val)
            var items = []
            var imgUrls = []
            this.data.value.items.forEach((item, i) => {
                item.className = ' '
                if (item.s == val) {
                    items.push(item)
                }
                if (item.image) {
                    imgUrls.push(item.image.url)
                }
            })
            // 设置最后一个不显示border
            var i = items.length - 1
            items[i].className = 'border-none'

            // 标签发生变化
            var tags = []
            this.data.value.groups.forEach((g, i) => {
                var tag = { name: g + '室', group: g, className: ' ' }
                if (g == val) {
                    tag.className = 'active'
                }
                tags.push(tag)
            })
            this.setData({ items: items, tags: tags, imgUrls: imgUrls })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        items: [],
        showImage: false,
        currentImage: '',
        tags: [],
        imgUrls: [],
        currentGroup: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        viewImage: function (e) {
            var i = e.currentTarget.dataset.index
            var item = this.data.items[i]
            var url = item.image.url
            var urls = this.data.imgUrls
            this.setData({
                currentImage: url,
                showImage: true,
            })
        },

        closeImage: function(e){
            this.setData({
                showImage: false,
            })
        },

        groupClick: function (e) {
            var g = e.target.dataset['group']
            if (g == this.data.currentGroup) {
                return false
            }

            this.setData({ currentGroup: g })
        },
    }
})

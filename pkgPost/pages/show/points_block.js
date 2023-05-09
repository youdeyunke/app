// pkgPost/pages/show/points_block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {type: Object, value: {}},
        color: { type: String, value: '#3A6BDD'}
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentId: 'icon-0',
        currentIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        swiperChange(e){
            console.log(e)
            this.setData({
                currentIndex: e.detail.current, 
                currentId: 'icon-' + e.detail.current
            })
        },
        navChange(e){
            var i = e.currentTarget.dataset.i
            this.setData({
                currentIndex: i,
                currentId: 'icon-' + i
            })
        }
    }
})

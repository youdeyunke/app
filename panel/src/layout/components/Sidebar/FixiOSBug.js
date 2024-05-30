/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
export default {
    computed: {
        device () {
            return this.$store.state.app.device
        }
    },
    mounted () {
        // In order to fix the click on menu on the ios device will trigger the mouseleave bug
        // https://github.com/PanJiaChen/vue-element-admin/issues/1135
        this.fixBugIniOS()
    },
    methods: {
        fixBugIniOS () {
            const $subMenu = this.$refs.subMenu
            if ($subMenu) {
                const handleMouseleave = $subMenu.handleMouseleave
                $subMenu.handleMouseleave = (e) => {
                    if (this.device === 'mobile') {
                        return
                    }
                    handleMouseleave(e)
                }
            }
        }
    }
}

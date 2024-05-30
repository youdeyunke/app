<!--
+----------------------------------------------------------------------
| 友得云客  - 开启房产营销新纪元
+----------------------------------------------------------------------
| Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
+----------------------------------------------------------------------
| Licensed 友得云客不是自由软件 未经允许不可移除相关版权
+----------------------------------------------------------------------
| Author: www.youdeyunke.com
+----------------------------------------------------------------------
-->
<template>
    <div class="drawer-container">
        <div>
            <h3 class="drawer-title">Page style setting</h3>

            <div class="drawer-item">
                <span>Theme Color</span>
            </div>

            <div class="drawer-item">
                <span>Open Tags-View</span>
                <el-switch v-model="tagsView" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>Fixed Header</span>
                <el-switch v-model="fixedHeader" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>Sidebar Logo</span>
                <el-switch v-model="sidebarLogo" class="drawer-switch" />
            </div>

        </div>
    </div>
</template>

<script>

export default {
    components: {  },
    data () {
        return {}
    },
    computed: {
        fixedHeader: {
            get () {
                return this.$store.state.settings.fixedHeader
            },
            set (val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'fixedHeader',
                    value: val
                })
            }
        },
        tagsView: {
            get () {
                return this.$store.state.settings.tagsView
            },
            set (val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'tagsView',
                    value: val
                })
            }
        },
        sidebarLogo: {
            get () {
                return this.$store.state.settings.sidebarLogo
            },
            set (val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'sidebarLogo',
                    value: val
                })
            }
        }
    },
    methods: {
        themeChange (val) {
            this.$store.dispatch('settings/changeSetting', {
                key: 'theme',
                value: val
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, .85);
        font-size: 14px;
        line-height: 22px;
    }

    .drawer-item {
        color: rgba(0, 0, 0, .65);
        font-size: 14px;
        padding: 12px 0;
    }

    .drawer-switch {
        float: right
    }
}
</style>

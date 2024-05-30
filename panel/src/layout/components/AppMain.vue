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
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <router-view :key="key" />
            </keep-alive>
        </transition>
    </section>
</template>

<script>
import Watermark from "@/utils/watermark";

export default {
    name: "AppMain",
    components: {},
    computed: {
        cachedViews () {
            return this.$store.state.tagsView.cachedViews;
        },
        key () {
            return this.$route.path;
        },
    },

    watch: {
        "$store.state.myconfig": {
            deep: true,
            immediate: true,
            handler (val) {
                if (val.watermark) {
                    console.log('121i', val.watermark);
                    Watermark.set()
                } else {
                    console.log('121e', val.watermark);
                    Watermark.clear()
                }
            }

        }
    },

    methods: {},

    mounted: function () {
        // Watermark.set();
    },
};
</script>

<style lang="scss" scoped>
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}

.fixed-header+.app-main {
    padding-top: 50px;
}

.hasTagsView {
    .app-main {
        /* 84 = navbar + tags-view = 50 + 34 */
        min-height: calc(100vh - 84px);
    }

    .fixed-header+.app-main {
        padding-top: 84px;
    }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>

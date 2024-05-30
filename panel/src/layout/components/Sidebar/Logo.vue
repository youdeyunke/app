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
    <div class="sidebar-logo-container" :class="{ 'collapse': collapse }">
        <transition name="sidebarLogoFade">
            <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo-mini" />
                <h1 v-else class="sidebar-title">{{ title }}</h1>
            </router-link>
            <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo" />
                <!-- <h1 class="sidebar-title">{{ title }}</h1> -->
            </router-link>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "SidebarLogo",
    computed: {
        ...mapGetters(["myconfig"]),

        logo: function () {
            return this.myconfig.logo || require("@/assets/images/logo_200_200.png");
        },
    },
    props: {
        collapse: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            title: "管理后台",
        };
    },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;

    & .sidebar-logo-link {
        height: 100%;
        width: 100%;

        & .sidebar-logo {
            width: 64px;
            height: 32px;
            vertical-align: middle;
            margin-right: 12px;
        }

        & .sidebar-logo-mini {
            vertical-align: middle;
            // margin-right: 12px;
            width: 40px;
            height: 20px;
        }


        & .sidebar-title {
            display: inline-block;
            margin: 0;
            color: #fff;
            font-weight: 600;
            line-height: 50px;
            font-size: 14px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            vertical-align: middle;
        }
    }

    &.collapse {
        .sidebar-logo {
            margin-right: 0px;
        }
    }
}
</style>

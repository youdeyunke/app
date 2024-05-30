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
    <div :class="{ 'has-logo': showLogo }">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
                :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText"
                :collapse-transition="false" mode="vertical">
                <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
        <div class="scrollbar-bottom" v-if="!isCollapse">
            {{ myconfig.server_version || '' }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapGetters([
            'sidebar', 'permission_routes', 'myconfig'
        ]),
        activeMenu () {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        showLogo () {
            return this.$store.state.settings.sidebarLogo
        },
        variables () {
            return variables
        },
        isCollapse () {
            return !this.sidebar.opened
        }
    }
}
</script>
<style scoped>
.scrollbar-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  height: 36px;
  /* background-color: #f5f5f5; */
  color: #ffffff;
  font-size: 14px; /* 设置适当的字体大小 */
  font-weight: normal; /* 设置适当的字体样式 */
  text-align: center;
}

</style>

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
    <div class="app-container">
        <advanced-card 
            title="界面设计器-功能介绍" 
            desc="用于管理员对小程序tab页面进行个性化编辑，支持实时预览编辑效果，并允许利用特定组件灵活调整页面样式。" 
            image="assets/images/advanced/pagemaker.gif">
        </advanced-card>
    </div>
</template>

<script>
import advancedCard from "../advancedCard.vue";
export default {
    name: "pagemaker",
    components: { advancedCard },
};
</script>

<style scoped lang="scss"></style>

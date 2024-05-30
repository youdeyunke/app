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
    <i class="el-icon-error" @click="clickHandler" />
</template>
<script>
export default {
    methods: {
        clickHandler (e) {
            this.$emit('click')
            e.stopPropagation()
        }
    }
}
</script>
<style lang="scss" scoped>
i {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-50%) translateX(50%);
    color: #f00;
    cursor: pointer;
}
</style>

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
    <el-tooltip class="item" effect="dark" :content="hint" placement="right-start">
        <i class="el-icon-warning-outline"></i>
    </el-tooltip>
</template>
<style lang="scss" scoped>
.el-tooltip {
    font-size: large;
    color: #999999;
}
</style>

<script>
export default {
    name: "help-icon",
    props: {
        text: { type: String, default: "" },
    },
    data () {
        return {
            hint: "",
        };
    },
    created () {
        this.hint = this.text;
    },
    watch: {
        text (newVal, oldVal) {
            this.hint = this.text;
        },
    },
};
</script>
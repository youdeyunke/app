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
<!-- 用el-icon的方式显示显示布尔值的状态 true/false -->

<template>
    <div class="public-status" v-cloak>
        <i :style="{ color: iconColor }" :class="iconName"></i>
    </div>
</template>

<script>
export default {
    name: "public-status",
    data () {
        return {};
    },
    props: {
        status: { type: Boolean, default: false },
        activeColor: { type: String, default: "#1989fa" },
        inactiveColor: { type: String, default: "#999999" }
    },

    mounted: function () { },

    computed: {
        iconColor: function () {
            return this.status == true ? this.activeColor : this.inactiveColor;
        },

        iconName: function () {
            return this.status == true ? "el-icon-success" : "el-icon-remove-outline";
        }
    },

    methods: {}
};
</script>

<style scoped></style>
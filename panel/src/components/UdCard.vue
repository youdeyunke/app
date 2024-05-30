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
    <div :style="{ 'min-height': height }" class="udcard">
        <div class="title" v-if="title">
            <h2>{{ title }}</h2>
            <el-divider />
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "ud-card",
    props: {
        title: { type: String, default: null },
        minHeight: { type: Number, default: 100 },
    },
    computed: {
        height: function () {
            return this.minHeight + "px";
        },
    },
};
</script>

<style>
.udcard {
    margin-bottom: 15px;
    background: #fff;
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
}
</style>

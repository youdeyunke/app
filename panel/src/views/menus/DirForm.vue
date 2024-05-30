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
    <div class="" v-cloak v-if="item">
        <el-form-item label="模块标题" required>
            <el-input v-model="item.title" />
        </el-form-item>
        <el-form-item label="模块图标" required>
            <el-input v-model="item.icon" />
        </el-form-item>

        <el-form-item label="路由地址" required>
            <el-input v-model="item.path" />
        </el-form-item>

        <el-form-item label="重定向">
            <el-input v-model="item.redirect" />
        </el-form-item>

        <el-form-item label="是否隐藏" required>
            <el-switch v-model="item.hidden" />
        </el-form-item>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
        };
    },
    props: {
        item: { type: Object, default: null },
    },

    mounted: function () { },

    computed: {},

    methods: {},
};
</script>

<style scoped></style>

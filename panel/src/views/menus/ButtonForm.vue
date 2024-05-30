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
        <el-form-item label="所属页面">
            <item-selector cat="menu" v-model="item.father_id" />
        </el-form-item>
        <el-form-item label="按钮名称" required>
            <el-input v-model="item.title" />
        </el-form-item>
        <el-form-item label="权限标识" required>
            <el-input v-model="item.key" />
        </el-form-item>
    </div>
</template>

<script>
import ItemSelector from "./ItemSelector";
export default {
    components: { ItemSelector },
    data () {
        return {
            menus: [],
            loading: false,
        };
    },
    props: {
        item: { type: Object, default: null },
    },

    mounted: function () {
        this.loadData();
    },

    computed: {},

    methods: {
        loadData: function () { },
    },
};
</script>

<style scoped></style>

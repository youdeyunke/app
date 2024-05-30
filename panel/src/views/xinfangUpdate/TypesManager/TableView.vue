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
    <div class="types-table-view" v-cloak>
        <el-table :data="types">
            <el-table-column label="#" prop="id"></el-table-column>
            <el-table-column label="户型" prop="name"></el-table-column>
            <el-table-column label="朝向" prop="position"></el-table-column>
            <el-table-column label="销售状态" prop="sale_status_item.name"></el-table-column>
            <el-table-column label="售价">
                <template slot-scope="scope">{{ scope.row.unknow_price ? '待定' : scope.row.total_price + '万/套' }}</template>
            </el-table-column>
            <el-table-column label="面积" prop="area"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-link type="primary" @click="editHandle(scope.row)">编辑</el-link>
                    <el-link type="danger" @click="deleteHandle(scope.row)">删除</el-link>
                </template>
            </el-table-column>
        </el-table>
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
        types: {
            type: Array,
            default: [],
        },
    },

    mounted: function () { },

    computed: {},

    methods: {
        editHandle: function (row) {
            this.$emit("edit", row);
        },
        deleteHandle: function (row) {
            this.$emit("delete", row);
        },
    },
};
</script>

<style scoped></style>
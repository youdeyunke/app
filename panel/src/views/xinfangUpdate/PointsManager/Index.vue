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
    <div class="" v-cloak v-loading="loading">
        <div class="tools">
            <div></div>
            <div class="right">
                <el-button v-show="!showForm" size="small" @click="loadItems" icon="el-icon-refresh">刷新</el-button>

                <el-button :disabled="showForm" size="small" icon="el-icon-plus" type="primary"
                    @click="createNewHandle">添加一个亮点</el-button>
            </div>
        </div>
        <view class="empty" v-if="items.length === 0">还没有添加任何亮点信息</view>
        <el-table v-show="!showForm" :data="items" style="width: 100%" fit @selection-change="(val) => (selection = val)">
            <el-table-column prop="id" label="ID" width="70"> </el-table-column>
            <el-table-column prop="desc" label="介绍"> </el-table-column>
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-link target="_blank" type="primary" @click="editHandle(scope.row)">编辑</el-link>
                    <el-link target="_blank" type="danger" @click="deleteHandle(scope.row)">删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <point-form v-on:quxiao="cancleHandle" v-show="showForm" @change="changeHandle" :item="currentItem" />
    </div>
</template>

<script>
import { getPostPointsList, deletePostPoints } from "@/api/post_points";
import PointForm from "./PointForm.vue";
export default {
    components: { PointForm },
    data () {
        return {
            page: 1,
            total: 0,
            items: [],
            pageSize: 10,
            loading: false,
            currentItem: {},
            showForm: false,
        };
    },
    props: {
        postId: { type: Number, default: null },
    },

    watch: {
        postId: {
            immediate: true,
            handler (val, oval) {
                if (val) {
                    this.loadItems();
                }
            },
        },
    },

    mounted: function () { },

    computed: {},

    methods: {
        resetFormData: function () {
            // 情况表单数据
            this.currentItem = {
                post_id: this.postId,
                company: "",
                buildings: "",
                date: "",
                number: "",
            };
        },
        cancleHandle: function (e) {
            console.log(e)
            this.showForm = e
        },
        showFormHandle: function (e) {
            this.loading = false;
            this.showForm = true;
        },

        createNewHandle: function (e) {
            this.resetFormData();
            this.showFormHandle();
        },
        changeHandle: function () {
            this.$message.success("已保存");
            this.page = 1;
            this.loadItems();
        },
        editHandle: function (item) {
            this.currentItem = item;
            this.showForm = true;
        },

        deleteHandle: function (item) {
            this.$confirm("确定要删除这个亮点吗?", "删除提示").then(() => {
                deletePostPoints(item.id).then((res) => {
                    this.loadItems();
                });
            });
        },
        loadItems: function () {
            this.loading = true;
            var query = {
                post_id: this.postId,
            };
            getPostPointsList(query).then((resp) => {
                this.resetFormData();
                if (resp.status != 0) {
                    return false;
                }
                this.items = resp.data;
                this.total = resp.total_count;
                this.loading = false;
            });
        },
    },
};
</script>

<style scoped>
.tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>

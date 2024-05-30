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
    <div class="app-container" v-cloak v-loading="loading">
        <ud-card>
            <div class="tools">
                <el-button v-if="btns.create_role" size="small" type="primary" @click="createHandle" icon="el-icon-plus">新建角色</el-button>
            </div>

            <el-table :data="items" v-if="items">
                <el-table-column type="expand" label="">
                    <template slot-scope="scope">
                        已开通权限：
                        <span v-for="item,i in scope.row.permission_items" :key="i">
                            <el-tag style="margin-bottom: 5px" size="mini">{{ item.title }}</el-tag>
                            &nbsp;
                        </span>
                    </template>
                </el-table-column>

                <el-table-column label="角色名称" prop="name"></el-table-column>
                <el-table-column label="激活">
                    <span slot-scope="scope">
                        {{ scope.row.enable === true ? "是" : "未激活" }}
                    </span>
                </el-table-column>

                <el-table-column label="操作">
                    <span slot-scope="scope">
                        <el-link v-if="btns.update_role" type="primary" @click="editHandle(scope.row)">编辑</el-link>
                        <el-link v-if="btns.update_role" type="info" @click="permissionHandle(scope.row)">分配权限</el-link>
                        <el-link v-if="btns.delete_role" type="danger" @click="deleteHandle(scope.row)">删除</el-link>
                    </span>
                </el-table-column>
            </el-table>
        </ud-card>

        <info-form :show.sync="showInfoForm" :item="currentItem" @submit="submitHandle" />
        <permission-form :show.sync="showPermissionForm" :role="currentItem" @submit="updatePermissionHandle" />
    </div>
</template>

<script>
import UdCard from "@/components/UdCard";
import Vue from "vue";
import InfoForm from "./InfoForm";
import PermissionForm from "./PermissionForm";
import { getRoleList, updateRole, createRole, deleteRole } from "@/api/permission";

export default {
    name: "roles",
    components: { InfoForm, UdCard, PermissionForm },
    data () {
        return {
            items: [],
            showInfoForm: false,
            showPermissionForm: false,
            currentItem: null,
            loading: false,
        };
    },
    props: {
        btns: { type: Object },
    },

    watch: {
        showPermissionForm: function (v1, v2) {
            if (v1 == false && v2 == true) {
                // 关闭了权限窗口，重新加载
                this.loadData();
            }
        },
        showInfoForm: function (v1, v2) {
            if (v1 == false && v2 == true) {
                // 关闭了权限窗口，重新加载
                this.loadData();
            }
        },
    },

    mounted: function () {
        this.loadData();
    },

    computed: {
        isNew: function () {
            return !this.currentItem.id;
        },
    },

    methods: {
        loadData: function () {
            getRoleList().then((resp) => {
                this.items = resp.data;
            });
        },

        permissionHandle: function (item) {
            this.currentItem = item;
            this.showPermissionForm = true;
        },

        editHandle: function (item) {
            this.currentItem = item;
            this.showInfoForm = true;
        },

        updatePermissionHandle: function (val) {
            this.loadData();
        },

        deleteHandle: function (item) {
            this.$confirm("确定要删除这个角色吗？").then(() => {
                deleteRole(item.id).then((res) => {
                    this.loadData();
                });
            });
        },

        submitHandle: function () {
            var data = this.currentItem;
            if (!data.name) {
                this.$message.error("请输入角色名称")
                return
            }
            if (data.id) {
                updateRole(data).then((resp) => {
                    this.saveCallback(resp);
                });
                return;
            }
            createRole(data).then((resp) => {
                this.saveCallback(resp);
            });
        },

        saveCallback: function (resp) {
            this.loadData();
            this.showInfoForm = false;
            this.$message.success("保存成功");
        },
        createHandle: function () {
            var item = {
                name: "",
                enable: true,
            };
            Vue.set(this, "currentItem", item);
            this.showInfoForm = true;
            this.loading = false;
        },
    },
};
</script>

<style scoped>
.tools {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}
</style>

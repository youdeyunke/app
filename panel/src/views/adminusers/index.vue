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
    <ud-card>
        <el-button style="float: right; margin-bottom: 10px" type="primary" size="small" icon="el-icon-plus"
            v-if="btns.create_adminuser" @click="newAdminHandle">添加管理员账号</el-button>
        <el-table :data="admins" border>
            <el-table-column prop="id" label="#" width="80" />
            <el-table-column prop="email" label="用户名" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="mobile" label="手机号" />
            <el-table-column label="角色">
                <span slot-scope="scope">
                    <span v-for="(role,i ) in scope.row.roles" :key="i">
                        <el-tag plain size="mini">{{ role.name }}</el-tag>
                    </span>
                    &nbsp;
                </span>
            </el-table-column>
            <el-table-column label="有效期">
                <template slot-scope="scope">
                    <span v-if="scope.row.is_forever">永久</span>
                    <span v-else>{{ scope.row.expired_at }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-link v-if="btns.update_adminuser" type="info" @click="editAdminHandle(scope.row)">编辑</el-link>
                    <el-link v-if="btns.delete_adminuser && !scope.row.is_last" type="danger"
                        @click="deleteAdminHandle(scope.row.id)">删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑账号" :destroy-on-close="true" :visible.sync="showForm" width="400px">
            <admin-user-form :data="currentAdminUser" @change="userChange"></admin-user-form>
        </el-dialog>
    </ud-card>
</template>

<script>
import { getAdminUsers, createAdminUser, deleteAdminUser } from "@/api/adminuser";
import UdCard from '@/components/UdCard'
import AdminUserForm from "./Form";
export default {
    props: {
        btns: { type: Object, default: {} },
    },
    components: { AdminUserForm, UdCard },
    data () {
        return {
            loading: false,
            showForm: false,
            currentAdminUser: null,
            admins: [],
        };
    },

    mounted: function () {
        this.loadAdminUsers();
    },

    computed: {},

    methods: {
        newAdminHandle: function () {
            this.currentAdminUser = {
                email: "",
                password: "",
                mobile: "",
                avatar: "",
                role_ids: [],
                name: "",
                expired_at: "",
                is_forever: true,
            };
            this.showForm = true;
        },
        userChange: function () {
            this.loading = true;
            this.showForm = false;
            this.currentAdminUser = null;
            this.loadAdminUsers();
        },
        loadAdminUsers: function () {
            getAdminUsers().then((resp) => {
                this.admins = resp.data.filter((user, i) => {
                    user.role_ids = user.roles.map((r) => {
                        return r.id;
                    });
                    return user
                });
            });
        },

        createAdminHandle: function () {
            createAdminUser(this.NewAdminUser).then((resp) => {
                if (resp.status == 0) {
                    this.NewAdminUser["email"] = "";
                    this.loadAdminUsers();
                }
            });
        },

        editAdminHandle: function (user) {
            this.currentAdminUser = user;
            this.showForm = true;
            this.loadAdminUsers();
        },

        deleteAdminHandle: function (aid) {
            this.$confirm("确认要删除这个管理员账号吗？").then(() => {
                deleteAdminUser(aid).then((resp) => {
                    if (resp.status == 0) {
                        this.loadAdminUsers();
                    }
                });
            });
        },
    },
};
</script>

<style scoped></style>

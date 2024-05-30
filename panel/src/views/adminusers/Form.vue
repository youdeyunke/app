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
    <div class="admin-user-form" v-cloak v-loading="loading">
        <el-form label-position="left" label-width="100px" v-if="adminUser">
            <el-form-item label="邮箱" required>
                <el-input style="width: 220px" v-model="adminUser.email" placeholder="邮箱地址"></el-input>
                <div v-if="!adminUser.id">注意：初始密码为8个8</div>
            </el-form-item>

            <el-form-item label="姓名" required>
                <el-input style="width: 220px" v-model="adminUser.name" placeholder></el-input>
            </el-form-item>

            <el-form-item label="手机号">
                <el-input max-length="11" style="width: 220px" v-model="adminUser.mobile" placeholder></el-input>
            </el-form-item>

            <el-form-item label="账号角色" required>
                <el-select v-model="adminUser.role_ids" multiple placeholder="请选择">
                    <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="头像">
                <image-picker v-model="adminUser.avatar" />
                <div style="font-size: 10px; color: #999">
                    <i class="el-icon-info"></i>
                    最佳图片尺寸 宽度100px，高度100px 或同比例
                </div>
            </el-form-item>

            <el-form-item label="账号有效期">
                <date-picker :disabled="adminUser.is_forever == true" v-model="adminUser.expired_at"></date-picker>
                <el-checkbox label="永久有效" v-model="adminUser.is_forever"></el-checkbox>
            </el-form-item>

        </el-form>
        <div slot="footer" style="display: flex;justify-content: right;">
            <el-button size="mini" type="default" @click="$emit('change')" icon="el-icon-close">取消</el-button>
            <el-button size="mini" v-auto-disabled type="primary" @click="submitHandle" icon="el-icon-check">确定</el-button>
        </div>
    </div>
</template>

<script>
import DatePicker from "@/components/DatePicker";
import { createAdminUser, updateAdminUser, deleteAdminUser } from "@/api/adminuser";
import { getRoleList } from "@/api/permission";
import ImagePicker from "@/components/ImagePicker";

export default {
    data () {
        return {
            loading: false,
            roles: [],
            adminUser: {},
        };
    },
    components: { DatePicker, ImagePicker },
    props: {
        data: { type: Object, default: null },
    },
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler (val) {
                if (val) {
                    this.adminUser = val;
                }
            },
        },
    },

    mounted: function () {
        this.loadRoles();
    },

    computed: {
        canSave: function () {
            // 是否可以点击保存按钮
            if (!this.adminUser.email) {
                return false;
            }
            if (!this.adminUser.name) {
                return false;
            }
            return true;
        },
    },

    methods: {
        loadRoles: function () {
            getRoleList().then((resp) => {
                this.roles = resp.data;
            });
        },

        validate: function (data) {
            if (!data.email) {
                this.$message.error("邮箱地址不能为空");
                return false;
            }

            if (!data.name) {
                this.$message.error("姓名不能为空");
                return false;
            }

            if (!data.role_ids) {
                this.$message.error("角色不能为空");
                return false;
            }

            if (data.mobile && data.mobile.length != 11) {
                this.$message.error("手机号长度错误");
                return false;
            }
            return true

        },

        submitHandle: function () {
            var data = this.adminUser;
            var isok = this.validate(data);
            console.log('update admin 1111', isok)
            if (!isok) {
                return;
            }

            console.log('update admin 2222')
            this.loading = true;
            data.password = "88888888";
            if (!data.id) {
                createAdminUser(data).then(() => {
                    this.loading = false;
                    this.$emit("change");
                });
                return;
            }

            // update
            console.log('update admin 3333')
            delete data.password
            updateAdminUser(data).then(() => {
                this.loading = false;
                this.$emit("change");
            });
        },
    },
};
</script>

<style scoped></style>

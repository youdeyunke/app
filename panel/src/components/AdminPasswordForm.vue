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
    <el-form v-model="admin" v-loading="loading" label-position="right" label-width="80px">
        <el-form-item label="旧密码">
            <el-input type="password" v-model="admin.old_password" placeholder="请输入旧密码" />
        </el-form-item>

        <el-form-item label="新密码">
            <el-input type="password" v-model="admin.new_password" placeholder="请输入新密码" />
        </el-form-item>

        <el-form-item label="确认密码">
            <el-input type="password" v-model="admin.new_password_confirm" placeholder="请再次输入新密码" />
        </el-form-item>

        <el-form-item label="">
            <el-alert v-if="error" type="error">{{ error }}</el-alert>
        </el-form-item>


        <el-form-item>
            <el-button type="default" @click="cancleHandle" :disabled="loading">取消</el-button>
            <el-button type="primary" @click="submitHandle" :disabled="!canSubmit">确认修改</el-button>
        </el-form-item>
    </el-form>
</template>


<script>
import { changePassword } from "@/api/adminuser";

export default {
    data: function () {
        return {
            loading: false,
            error: null,
            admin: {
                old_password: "",
                new_password: "",
                new_password_confirm: "",
            },
        };
    },

    computed: {
        canSubmit: function () {
            if (
                this.admin.old_password &&
                this.admin.new_password &&
                this.admin.new_password_confirm
            ) {
                return true;
            }
            return false;
        },
    },

    methods: {
        cancleHandle: function () {
            this.$emit("cancle", {});
        },

        submitHandle: function () {
            // validate
            if (this.admin.new_password !== this.admin.new_password_confirm) {
                this.error = "两次新密码输入不一致，请检查"
                return
            }

            // ok

            this.loading = true;
            this.error = null

            changePassword(this.admin).then((resp) => {
                console.log("resp", resp);
                this.loading = false;
                this.admin = {
                    old_password: "",
                    new_password: "",
                    new_password_confirm: "",
                };
                if (resp.status == 0) {
                    this.$message.success("管理员密码已修改成功,请使用新密码登录");
                    this.$emit("success", {});
                } else {
                    this.error = resp.error
                }
            });
        },
    },
};
</script>

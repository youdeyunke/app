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
    <div class="navbar">
        <el-dialog title="修改管理员密码" :visible.sync="passwordFormVisible" width="400px" :modal="true" :modal-append-to-body="false">
            <admin-password-form @success="changePasswordSuccess" @cancle="changePasswordCancle" />
        </el-dialog>

        <el-dialog title="我的个人资料" :visible.sync="dialogFormVisible" width="500px" :modal="false">
            <user-form :form-user="brokerDetail" @change="userChange" @cancle="dialogFormVisible = false" />
        </el-dialog>

        <el-dialog title="联系客服" :visible.sync="qrVisible" width="500px" :append-to-body="true">
            <el-image :src="require('@/assets/images/wxkf.png')" style="width: 100%;" />
        </el-dialog>

        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <el-button size="small" icon="el-icon-plus" style="margin-top: 5px;" @click="qrVisible = true">咨询客服</el-button>
            <!-- el-button size="small" icon="el-icon-chat-round" type="primary" style="margin-right: 10px; margin-top: 5px;" @click="gotoUrl">咨询客服</!-->
            <Uplicense ref="uplicense"></Uplicense>
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <el-avatar v-if="user.profile.avatar" :src="user.profile.avatar" size="small" />

                    <div class="username">
                        <div class="name">
                            &nbsp;
                            {{ user.profile.name || user.profile.email || user.profile.mobile }}&nbsp;
                            <span v-if="user.profile.company_name">{{
                                user.profile.company_name
                            }}</span>
                            <el-tag size="mini" v-for="r in user.profile.roles">{{ r.name }}</el-tag>
                        </div>
                    </div>

                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item divided>
                        <span style="display: block" @click="passwordHandle">修改密码</span>
                    </el-dropdown-item>

                    <el-dropdown-item divided>
                        <span style="display: block" @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import AdminPasswordForm from "@/components/AdminPasswordForm";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Uplicense from "@/components/Uplicense";
import { mapGetters } from "vuex";
var UA = require("ua-device");

export default {
    components: {
        Breadcrumb,
        Hamburger,
        AdminPasswordForm,
        Uplicense,
    },
    computed: {
        ...mapGetters(["sidebar", "token", "user"]),
    },

    data: function () {
        return {
            brokerDetail: {},
            dialogFormVisible: false,
            passwordFormVisible: false,
            qrVisible: false,
        };
    },

    mounted: function () {
        this.checkUA();
    },

    methods: {
        checkUA: function () {
            var ua = new UA(navigator.userAgent);
            console.log("ua info", ua);
            if (ua.device.type !== "desktop") {
                this.$alert("管理系统不兼容手机浏览器，请使用PC浏览器打开", "提示");
                return false;
            }
            // ie
            if (ua.browser.name === "Internet Explorer") {
                this.$alert(
                    "管理系统不兼容IE浏览器，请使用谷歌浏览器、火狐浏览器、苹果浏览器",
                    "提示"
                );
                return;
            }
        },
        changePasswordCancle: function () {
            this.passwordFormVisible = false;
        },

        changePasswordSuccess: function () {
            this.passwordFormVisible = false;
        },

        userChange: function (data) {
            this.$store.commit("user/SET_USER", data);
        },

        editHandle: function () {
            this.dialogFormVisible = !this.dialogFormVisible;
        },

        passwordHandle: function () {
            this.passwordFormVisible = !this.passwordFormVisible;
        },

        toggleSideBar () {
            this.$store.dispatch("app/toggleSideBar");
        },

        async logout () {
            await this.$store.dispatch("user/logout");
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        },

        gotoUrl () {
            window.open("https://work.weixin.qq.com/kfid/kfc8a0f8817daf2ec01");
        },
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    border-bottom: 1px solid #f4f4f4;
    user-select: none;

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 10px;

            .avatar-wrapper {
                margin-top: 5px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
        }
    }
}
</style>

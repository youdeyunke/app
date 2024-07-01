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
    <div class="login-container">
        <div class="login-window" v-loading="loading">
            <div class="left">

                <img  src="https://tcdn.udeve.net/udyk/6555ca584049db2b0c23871c.png" class="logo" />

                <img src="https://tcdn.udeve.net/assets/images/a411ef83776aa.png" class="theme" />

                <div class="cr">
                    <a href="https://www.youdeyunke.com/" target="_blank">优得（西安）信息科技有限公司</a>
                    &nbsp;版权所有
                </div>
            </div>
            <div class="right">
                <el-form ref="loginForm" size="large" :model="loginForm" v-loading="loading" class="login-form"
                    auto-complete="on" label-position="left">
                    <div class="top">
                        <b>登录</b>
                    </div>

                    <div v-if="loginForm.account_type === 'email'">
                        <el-form-item prop="email">
                            <el-input ref="email" v-model="loginForm.email" placeholder="电子邮箱地址"
                                prefix-icon="el-icon-user-solid" class="myinput" name="email" type="text" tabindex="1"
                                auto-complete="on" />
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input :key="passwordType" ref="password" class="myinput" v-model="loginForm.password"
                                prefix-icon="el-icon-warning" :type="passwordType" :show-password="true" placeholder="管理密码"
                                name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
                        </el-form-item>
                    </div>

                    <el-form-item prop="yzm">
                        <el-input ref="yzm" v-model="loginForm.captcha_value" placeholder="验证码"
                            prefix-icon="el-icon-key" class="myinput" name="yzm" type="text"
                            tabindex="3" auto-complete="on" @keyup.enter.native="handleLogin">
                            <template slot="suffix">
                                <el-image @click="loadYzmImg" style="width: 115px;height: 36px;overflow: inherit;margin-top: 2px;"
                                    :src="yzmImg"></el-image>
                            </template>
                        </el-input>

                    </el-form-item>

                    <div class="footer">
                        <el-button :loading="loading" style="width: 100%" type="primary"
                            @click.native.prevent="handleLogin">马上登录</el-button>
                    </div>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { getMyconfigs } from "@/api/weapp";
import { getYzmImg } from "@/api/yzm";

export default {
    name: "Login",
    data () {
        return {
            timer: null,
            myconfigs: {},
            countdown: 30,
            loginForm: {
                email: "",
                password: "",
                mobile: "",
                code: "",
                admin_auth_code: "",
                account_type: "email",
            },
            loading: false,
            passwordType: "password",
            redirect: undefined,
            yzmImg: '',
        };
    },

    mounted: function () {
        this.loadConfig();
        this.loadYzmImg()
        // 如果通过auth code 登录
        var acode = this.$route.query.admin_auth_code;
        if (acode && acode.length > 1) {
            this.loginWithAdminAuthCode(acode);
        }
    },

    computed: {
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
                this.loading = route.query && route.query.admin_auth_code ? true : false;
                this.loginWithAdminAuthCode(route.query.admin_auth_code);
            },
            immediate: true,
        },
    },
    methods: {
        loadConfig: function () {
            this.loading = true;
            getMyconfigs().then((resp) => {
                this.myconfigs = resp.data;
                this.loading = false;
            });
        },

        loadYzmImg () {
            getYzmImg().then((resp) => {
                if (resp.status != 0) {
                    return
                }
                this.yzmImg = resp.data.image
                this.loginForm.captcha_uuid = resp.data.captcha_uuid
            })
        },

        loginWithAdminAuthCode: function (auth_code) {
            if (!auth_code) {
                return false;
            }

            this.loginForm["admin_auth_code"] = auth_code;
            this.loginForm["account_type"] = "email";
            this.handleLogin();
        },

        handleLogin () {
            this.loading = true;
            this.$store
                .dispatch("user/login", this.loginForm)
                .then((resp) => {
                    this.$router.push({ path: "/" });
                    this.loadYzmImg()
                    this.loading = false;
                })
                .catch((err) => {
                    console.log("error", err);
                    this.loading = false;
                    this.loginForm.password = "";
                    this.loginForm.code = "";
                    this.loadYzmImg()
                });
        },
    },
};
</script>

<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #f4f4f4;
$light_gray: #eee;

.myinput {
    height: 40px;
    line-height: 40px;
    // border: 1px solid #cecece;
    width: 100%;
    // border-radius: 4px;
    box-sizing: border-box;
    // padding: 0 15px;
}

.myinput:focus {
    outline: none;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.15);
}

.login-container {
    transition: background 0.6s;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    .login-window {
        // width: 100%;
        // background: rgba(255, 255, 255, 0.6);
        // height: 100%;
        width: 720px;
        height: 480px;
        box-shadow: 8px 8px 11px 0 rgba(211,218,224,0.5);
        background-color: #fff;
        border-radius: 4px;
        display: inline-block;
        vertical-align: middle;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;

        .login-methods {
            display: flex;
            margin-top: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .footer {
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .left {
            height: 100%;
            width: 320px;
            background-size: 500px 490px;
            background-color: #409eff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .logo{
                width: 120px;
                height: 60px;
            }

            .theme {
                width: 320px;
                height: 320px;
            }

            .cr {
                color: #f4f4f4;
                font-size: 12px;
                letter-spacing: 1.4;
                margin: 0 0 20px 0;
            }
        }

        .right {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            align-items: center;
        }

        .el-form {
            width: 288px;
            margin: 20px auto 20px auto;
        }

        .footer {
            height: 40px;
        }

        .top {
            position: relative;
            width: 100%;
            height: 90px;
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0;
            color: #333;
            line-height: 117px;
            overflow: hidden;
            margin-bottom: 20px;
            text-align: center;
        }
    }
}
</style>

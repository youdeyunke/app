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
    <div class="user-selector" v-cloak>
        <el-select :disabled="loading" :loading="loading" v-model="userId" @change="userIdChangeHandle" :filterable="true"
            :remote="true" placeholder="搜索用户" :size="size" :remote-method="remoteSearch" :style="customStyle" popper-class="select_popper"
             autocomplete="off">
            <div slot="prefix" style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        ">
                <i class="el-icon-user-solid"></i>
            </div>
            <el-option label="输入手机号、姓名进行搜索" :value="null">
                <div class="empty-option">无</div>
            </el-option>

            <el-option v-for="(user, index) in allUsers" :key="index" :value="user.user_id" :label="user.name">
                <div style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
          ">
                    <el-avatar size="small" :src="user.avatar" />
                    <span>&nbsp; {{ user.name }} ({{ user.mobile }})</span>
                </div>
            </el-option>
        </el-select>
    </div>
</template>

<style scoped lang="scss">
.empty-option {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #999;
    border-bottom: 1px solid #f9f9f9;
}
.select_popper {
  z-index: 99999 !important;
}
</style>

<script>
import { getSimpleUserList, getUserDetail } from "@/api/user";
export default {
    data () {
        return {
            users: [],
            currentUser: null,
            searching: false,
            loading: false,
        };
    },
    props: {
        value: { type: Number, default: null },
        disabled: { type: Boolean, default: false },
        //firstOption: { type: Object, default: null },
        customStyle: { type: String, default: "" },
        cat: { type: String, default: "broker" },
        size: { type: String, default: "normal" },
    },

    mounted: function () {
        this.initUserList();
    },

    watch: {
        value: {
            immediate: true,
            handler (val) {
                if (!val) {
                    return;
                }
                this.loadCurrentUser();
            },
        },
    },

    computed: {
        allUsers: function () {
            // 下拉用户列表 = 当前所选用户 + 搜索列表(搜索列表里排除当前选中的用户)
            var users = this.users;
            if (this.currentUser) {
                return [this.currentUser].concat(
                    this.users.filter((user, i) => {
                        if (this.currentUser && user.id == this.currentUser.id) {
                            return false;
                        }
                        return true;
                    })
                );
            }
            return this.users;
        },
        userId: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("input", val);
            },
        },
    },

    methods: {
        userIdChangeHandle: function (uid) {
            // 从users中找到当前选中的user
            if (!uid) {
                this.$emit("change", null);
                return;
            }

            var items = this.users.forEach((u, i) => {
                if (u.id == uid) {
                    this.$emit("change", u);
                }
            });
        },

        loadCurrentUser: function () {
            // 如果默认带有user id值得话， 需要加载默认数据，否则会显示user.id
            if (!this.userId) {
                this.currentUser = null;
                return false;
            }
            this.loading = true;
            var _this = this;

            getUserDetail(this.userId).then((resp) => {
                _this.loading = false;
                _this.currentUser = resp.data;
            });
        },
        initUserList: function () {
            // 打开，下拉列表为空的情况
            if (this.users.length > 0) {
                return false;
            }
            this.searching = true;
            this.users = [];
            var _this = this;
            var query = { limit: 20, cat: this.cat };
            getSimpleUserList(query).then((resp) => {
                _this.searching = false;
                _this.users = resp.data;
            });
        },

        remoteSearch: function (kw) {
            if (kw == "") {
                return false;
            }
            this.searching = true;
            this.users = [];
            var _this = this;
            var query = { kw: kw };
            getSimpleUserList(query).then((resp) => {
                _this.searching = false;
                _this.users = resp.data;
            });
        },
    },
};
</script>


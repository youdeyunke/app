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
        <el-select :disabled="loading" :loading="loading" v-model="adminUserId" @change="adminUserIdChangeHandle"
            :filterable="true" placeholder="搜索置业顾问" :size="size" :style="customStyle" :popper-append-to-body="false"
            autocomplete="off">
            <div slot="prefix" style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        ">
                <i class="el-icon-user-solid"></i>
            </div>
            <el-option label="输入关键字进行搜索" :value="null">
                <div class="empty-option">无</div>
            </el-option>

            <el-option v-for="(user, index) in allUsers" :key="index" :value="user.id" :label="user.name">
                <div style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
          ">
                    <span> {{ user.name }}|{{ user.email }}|{{ user.team_name }}</span>
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
</style>

<script>
import { getAdminUserList, } from "@/api/adminuser";
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
        adminUserId: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("input", val);
            },
        },
    },

    methods: {
        adminUserIdChangeHandle: function (uid) {
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

        initUserList: function () {
            // 打开，下拉列表为空的情况
            if (this.users.length > 0) {
                return false;
            }
            this.searching = true;
            this.users = [];
            var _this = this;
            var query = { per_page: 99999999 };
            getAdminUserList(query).then((resp) => {
                _this.searching = false;
                _this.users = resp.data;
            });
        },

    },
};
</script>

<style scoped></style>
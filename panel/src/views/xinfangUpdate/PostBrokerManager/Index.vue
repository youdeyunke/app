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
    <div >

        <div v-if="!dialogFormVisible">
            <div class="myheader">
                <div class="part-left">
                    <div class="block">
                        <el-radio-group v-model="scopeValue" :disabled="loading" size="small" placeholder="请选择">
                            <el-radio-button label="validate_brokers">已入驻</el-radio-button>
                            <el-radio-button label="pending">待审核</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="block">
                        <el-input v-model="kw" style="border-radius: 100%; width: 250px" size="small"
                            placeholder="输入姓名、手机号、昵称搜索">
                            <el-button slot="append" icon="el-icon-search" @click="doSearch" />
                        </el-input>
                        <el-button v-if="kw" type="text" size="small" @click="clearKw">清空</el-button>
                    </div>
                </div>
                <div class="part-right">
                    <div class="block">
                        <el-button size="small" @click="loadData" icon="el-icon-refresh">刷新</el-button>
                        <el-button size="small" type="primary" @click="createUserHandle" icon="el-icon-plus">添加置业顾问</el-button>
                    </div>
                </div>
            </div>

            <el-table v-loading="loading" style="width: 100%" :data="items" size="small" element-loading-text="正在加载" fit
                highlight-current-row>
                <el-table-column prop="user_id" label="#" :width="80" />
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="mobile" label="账号(手机号)" />
                <el-table-column label="照片">
                    <template slot-scope="scope">
                        <el-avatar :src="scope.row.avatar + '?imageView2/2/w/100'" :width="20" />
                    </template>
                </el-table-column>
                <el-table-column prop="wechat" label="微信" />
                <el-table-column prop="desc" label="个性签名" />
                <el-table-column prop="tags" label="标签" />

                <el-table-column label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-link type="primary" size="small" @click="formDialogHandle(scope.row)">{{ scope.row.status == 2 ?
                            "设置" : "审核" }}</el-link>
                        <el-link type="danger" size="small" @click="deleteHandle(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pager">
                <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
                    @size-change="updatePageSize" />
            </div>
        </div>
        <broker-profile-form v-if="dialogFormVisible" :broker-id="currentBrokerId" :profile="currentItem"
            user-group="broker" @change="userChange" @cancel="userCancel" @cancle="dialogFormVisible = false" />

    </div>
</template>
  
<style lang="scss" scoped>
.app-container {
    .myheader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0px;

        .part-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .block {
                margin-right: 10px;
            }
        }

        .el-input {
            width: 250px;
            border-radius: 100%;
        }
    }
}
</style>
  
<script>
import { deleteBrokerProfile, getBrokerProfileList, } from "@/api/user";
import BrokerProfileForm from './BrokerProfileForm'
export default {
    name: "brokers",
    props: {
        btns: { type: Object, default: null },
        postId: {
            type: Number,
            default: null,
        },
    },
    components: {
        BrokerProfileForm,
    },
    data: function () {
        return {
            currentBrokerId: null,
            currentItem: null,
            groupId: null,
            dialogFormVisible: false,
            scopeItems: [],
            scopeValue: "validate_brokers",
            companies: [],
            items: [],
            kw: "",
            loading: true,
            per_page: 20,
            total: 0,
            current_page: 1,
        };
    },

    watch: {
        scopeValue: function (newValue, oldValue) {
            this.current_page = 1;
            this.loadData();
        },

        groupId: function (gid) {
            this.currentBrokerId = 1;
            this.loadData();
        },

        current_page: function (newVal, oldVal) {
            this.loadData();
        },
        per_page: function (newVal, oldVal) {
            this.loadData();
        },
    },

    created () {
        this.loadData();
    },

    methods: {
        deleteHandle: function (profile) {
            this.$confirm("确定要删除置业顾问 " + profile.name + "吗？").then(() => {
                deleteBrokerProfile(profile.id).then((resp) => {
                    if (resp.status == 0) {
                        this.$message.success("已删除");
                        this.loadData();
                    }
                });
            });
        },

        doSearch: function () {
            // 搜索
            this.loading = true;
            this.page = 1;
            this.scope = 'all'
            this.user_group_id = ''
            this.loadData();
        },

        clearKw: function () {
            this.kw = "";
            this.loadData();
        },

        userChange: function (user) {
            this.dialogFormVisible = false;
            this.currentBrokerId = null;
            this.loadData();
        },

        userCancel: function () {
            this.dialogFormVisible = false;
            this.currentBrokerId = null;
            this.loadData();
        },

        formDialogHandle: function (broker) {
            this.currentBrokerId = broker.id;
            this.currentItem = broker;
            this.dialogFormVisible = true;
        },


        createUserHandle: function () {
            this.currentBrokerId = null;
            this.currentItem = {
                post_id: this.postId,
                sex: 1,
            };
            this.dialogFormVisible = true;
        },

        updateCurrentPage: function (page) {
            this.current_page = page;
        },

        updatePageSize: function (size) {
            this.per_page = size || 10;
        },

        loadData: function () {
            this.loading = true;
            var _this = this;
            getBrokerProfileList({
                order: "id desc",
                scope: _this.scopeValue,
                page: _this.current_page,
                post_id: _this.postId,
                per_page: _this.per_page,
                kw: _this.kw || "",
            }).then((resp) => {
                _this.items = resp.data.result.map((broker, i) => {
                    return broker;
                });
                _this.total = resp.data.page.total_items;
                _this.loading = false;
            });
        },
    },
};
</script>
  
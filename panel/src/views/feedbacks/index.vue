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
    <div class="app-container">
        <ud-card>

            <div class="myheader">
                <div class="part-left">
                    <el-input v-model="kw" style="border-radius: 100%; width: 250px" size="small"
                            placeholder="输入标题、内容搜索">
                            <el-button slot="append" icon="el-icon-search" @click="doSearch" />
                        </el-input>
                        <el-button v-if="kw" type="text" size="small" @click="clearKw">清空</el-button>
                </div>
                <div class="part-right">
                    <div class="block">
                        <el-button size="small" icon="el-icon-refresh"
                            @click="loadData">刷新</el-button>
                    </div>
                </div>
            </div>
            <el-table v-loading="loading" :data="items" size="small" fit highlight-current-row>
                <el-table-column prop="id" width="120px" label="#" />
                <el-table-column prop="feedback_type" label="反馈类型" />
                <el-table-column prop="content" label="反馈内容" />
                <el-table-column prop="expired_at" label="反馈时间">
                    <template slot-scope="scope">
                        {{ scope.row.created_at | utcFormater }}
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="editHandle(scope.row)">查看</el-link>
                        <el-link v-if="btns.delete_feedback" type="danger"
                            @click="deleteHandle(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>

            <detail-form ref="detailform" @change="changedHandle" />
            <div class="pager">
                <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
                    @size-change="updatePageSize" />
            </div>
        </ud-card>
    </div>
</template>

<script>
import detailForm from './detailForm'
import {
    getFeedbackList,
    deleteFeedback
} from "@/api/feedback";
export default {
    components: { detailForm },
    name: 'coupons',
    props: {
        btns: { type: Object, default: {} },
    },
    data () {
        return {
            loading: false,
            items: [],
            total: 0,
            current_page: 1,
            per_page: 20,
            kw: '',
        };
    },
    watch: {
        current_page: function (newVal, oldVal) {
            this.loadData();
        },
        per_page: function (newVal, oldVal) {
            this.loadData();
        },
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        deleteHandle: function (item) {
            var msg =
                "您确定要删除这个反馈吗？";
            this.$confirm(msg, "删除确认").then((resp) => {
                this.loading = true;
                deleteFeedback(item.id).then((resp) => {
                    this.loading = false;
                    if (resp.status == 0) {
                        this.$message.success("已删除");
                        this.loadData();
                    }
                });
            });
        },

        updateCurrentPage: function (page) {
            this.current_page = page;
        },

        updatePageSize: function (size) {
            this.per_page = size || 10;
        },

        changedHandle: function () {
            this.loadData();
        },

        editHandle: function (item) {
            var data = JSON.parse(JSON.stringify(item))
            this.$refs.detailform.openDialog(data)
        },

        doSearch: function () {
            // 搜索
            this.loading = true;
            this.current_page = 1;
            this.loadData();
        },

        clearKw: function () {
            this.kw = "";
            this.loadData();
        },

        loadData: function () {
            this.loading = true;
            var _this = this
            getFeedbackList({
                page: _this.current_page,
                per_page: _this.per_page,
                kw: _this.kw || "",
            }).then((resp) => {
                this.loading = false;
                if(resp.code != 0){
                    return
                }
                this.items = resp.data.result;
                this.total = resp.data.page.total_items;
            });
        },

    },
};
</script>

<style scoped lang="scss">
.myheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;

    .part-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .block {
            margin-left: 10px;
        }
    }

    .part-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .block {
            margin-right: 10px;
        }
    }
}
</style>

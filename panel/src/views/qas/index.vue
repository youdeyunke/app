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
                    <div class="block">
                        <el-input v-model="kw" style="border-radius:100%;width:250px;" size="small" placeholder="搜索问题关键词">
                            <el-button slot="append" icon="el-icon-search" @click="doSearch" />
                        </el-input>
                        <el-button v-if="search_kw" type="text" size="small" @click="clearKw">清空</el-button>
                    </div>
                </div>
                <div class="part-right">
                    <div class="block">
                        <el-button :disabled="loading" icon="el-icon-refresh" size="small" type="default" plain round
                            @click="loadData">刷新数据</el-button>
                    </div>
                </div>
            </div>

            <el-table :data="items" highlight-current-row v-loading="loading">
                <el-table-column prop="content" label="问题" />
                <el-table-column prop="target_name" label="房源" />
                <el-table-column prop="created_at_pretty" label="时间" width="200px" />
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <div class="operation">
                            <el-link v-if="btns.update_qa" type="success" size="small"
                                @click="detailsHandle(scope.row.id)">回答({{ scope.row.answers_count }})</el-link>
                            <el-link v-if="btns.delete_qa" type="danger" size="small"
                                @click="deleteQuestionHandle(scope.row.id)">删除</el-link>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
                    @size-change="updatePageSize" />
            </div>
        </ud-card>
        <answers ref="answers" :questionId="questionId" @refresh="refreshHandle"></answers>
    </div>
</template>

<style scoped>
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

    .el-input {
        with: 250px;
        border-radius: 100%;
    }
}

.operation {
    display: flex;
    justify-content: space-around;
}
</style>

<script>
import { getQuestionsList, deleteQuestion, deleteAnswer } from "@/api/question";
import UdCard from "@/components/UdCard";
import answers from "./answers";
export default {
    name: 'qas',
    props: {
        btns: { type: Object, default: null },
    },
    components: { UdCard, answers },
    data () {
        return {
            items: [],
            kw: "",
            search_kw: "",
            current_page: 1,
            per_page: 10,
            total: 0,
            loading: true,
            questionId: null,
        };
    },

    watch: {
        current_page: function (newVal, oldVal) {
            console.log("watch current page", newVal);
            this.loadData();
        },
        per_page: function (newVal, oldVal) {
            this.loadData();
        },
    },
    mounted () {
        this.loadData();
    },
    methods: {
        doSearch: function () {
            // 搜索
            this.loading = true;
            this.page = 1;
            this.search_kw = this.kw;
            this.loadData();
        },

        clearKw: function () {
            this.kw = "";
            this.search_kw = "";
            this.page = 1;
            this.loadData();
        },

        questionSelect: function (row) { },

        updateCurrentPage: function (page) {
            console.log("update current page", page);
            this.current_page = page;
        },

        updatePageSize: function (size) {
            this.per_page = size || 10;
        },

        loadData: function () {
            this.loading = true;
            var query = {
                page: this.current_page || 1,
                per_page: this.per_page || 20,
                kw: this.search_kw,
            };
            getQuestionsList(query).then((resp) => {
                this.items = resp.data;
                this.total = resp.total;
                this.loading = false;
            });
        },
        deleteQuestionHandle: function (qid) {
            this.$confirm("确定要删除这条提问吗?", "删除提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.loading = true;
                deleteQuestion(qid).then((resp) => {
                    this.loadData();
                });
            });
        },
        deleteAnswerHandle: function (aid) {
            this.$confirm("确定要删除这条回答吗?", "删除提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.loading = true;
                deleteAnswer(aid).then((resp) => {
                    this.loadData();
                });
            });
        },
        detailsHandle (qid) {
            this.questionId = qid;
            this.$refs.answers.showdialog = true;
        },
        refreshHandle () {
            this.loadData();
        },
    },
};
</script>
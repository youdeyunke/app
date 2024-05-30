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
    <div class="Qa">
        <div v-show="!showdialog">
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
                        <el-button :disabled="loading" icon="el-icon-refresh" size="small"
                            @click="loadData">刷新</el-button>
                    </div>
                </div>
            </div>
            <el-table :data="items" highlight-current-row v-loading="loading">
                <el-table-column prop="content" label="问题" />
                <el-table-column prop="created_at" label="时间" width="200px" />
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <div class="operation">
                            <el-link type="success" size="small" @click="detailsHandle(scope.row.id)">回答({{
                                scope.row.answers_count }})</el-link>

                            <el-link
                                :type="scope.row.public ? 'warning' : 'primary'"
                                size="small"
                                @click="publicHandle(scope.row)"
                                >{{ scope.row.public == true ? "隐藏" : "显示" }}</el-link
                            >
                            
                            <el-link type="danger" size="small" @click="deleteQuestionHandle(scope.row.id)">删除</el-link>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
                    @size-change="updatePageSize" />
            </div>
        </div>

        <answers ref="answers" :questionId="questionId" @refresh="refreshHandle" @cancel="cancleHandle" v-show="showdialog">
        </answers>
    </div>
</template>

<script>
import { getQuestionsList, deleteQuestion, deleteAnswer, publicQuestion } from "@/api/question";
import answers from "./answers";
export default {
    name: 'Qa',

    props: {
        postId: {
            type: Number,
            default: null,
        },
    },

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
            showdialog: false
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

    components: { answers },

    computed: {},

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

        publicHandle(item) {
            this.$confirm("确定要" + (item.public ? "隐藏" : "显示") + "这条提问吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.loading = true;
                publicQuestion(item.id).then((resp) => {
                    this.loading = false
                    this.loadData();
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
                });
            });
        },

        loadData: function () {
            this.loading = true;
            var query = {
                page: this.current_page || 1,
                per_page: this.per_page || 20,
                kw: this.search_kw,
                target_type: 'post',
                target_id: this.postId
            };
            getQuestionsList(query).then((resp) => {
                this.items = resp.data.result;
                this.total = resp.data.page.total_items;
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
                    this.loading = false
                    this.loadData();
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
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
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
                });
            });
        },
        detailsHandle (qid) {
            this.questionId = qid;
            this.showdialog = true;
        },
        refreshHandle () {
            this.loadData();
        },
        cancleHandle () {
            this.showdialog = false
        }
    }
}
</script>

<style scoped>
.myheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
}

.myheader .part-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.myheader .part-right .block {
  margin-left: 10px;
}

.myheader .part-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.myheader .part-left .block {
  margin-right: 10px;
}

.myheader .el-input {
  width: 250px;
  border-radius: 100%;
}

.operation {
  display: flex;
  justify-content: space-around;
}
</style>

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
        <el-dialog title="回答详情" :destroy-on-close="true" :visible.sync="showdialog" width="1000px">
            <el-alert :closable="false" :title="question.content" :description="userdata.name" type="info"></el-alert>
            <el-table v-loading="loading" element-loading-text="正在加载回答详情" :data="answersData" stripe style="width: 100%">
                <el-table-column label="用户" width="180">
                    <template slot-scope="scope">
                        <el-avatar fit="fill" :src="scope.row.user.avatar"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="回答"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <div>
                            <el-link type="danger" @click="deleteAnswerHandle(scope.row.id)">删除</el-link>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-divider content-position="left">添加回复</el-divider>
            <div class="newanswer">
                <user-selector v-model="newAnswer.userId" group="broker"></user-selector>
                <el-input style="width:650px;" placeholder="请输入回复内容" v-model="newAnswer.content" clearable></el-input>
                <el-button type="primary" @click="onsubmit">提交</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" plain @click="cancel">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getQuestionDetail, createAnswer, deleteAnswer } from "@/api/question";
import UserSelector from "@/components/UserSelector";
export default {
    components: { UserSelector },
    props: {
        questionId: { type: Number, default: null },
    },
    data () {
        return {
            showdialog: false,
            question: "",
            answersData: [],
            newAnswer: {},
            userdata: {},
            loading: true,
        };
    },
    watch: {
        questionId: {
            immediate: true,
            deep: true,
            handler (newVal, oldVal) {
                if (newVal) {
                    this.listData();
                }
            },
        },
    },
    methods: {
        listData () {
            getQuestionDetail(this.questionId).then((resp) => {
                this.question = resp.data;
                this.userdata = resp.data.user;
                this.answersData = resp.data.answers;
                this.loading = false;
            });
        },
        onsubmit () {
            if (!this.loading) {
                this.loading = true;
                let data = {
                    question_id: this.questionId,
                    user_id: this.newAnswer.userId,
                    content: this.newAnswer.content,
                };
                // 先让他置为true
                let isok = true;
                // 有一个判断条件不满足的话就让他为false
                if (!data.user_id) {
                    this.$message.error("请选择用户");
                    isok = false;
                }
                if (!data.content) {
                    this.$message.error("请输入回复内容");
                    isok = false;
                }
                if (data.content.length <= 2) {
                    this.$message.error("回复内容不能小于两个字符");
                    isok = false;
                }
                // 如果这个标记为false就让loading为false 并终止程序
                if (!isok) {
                    this.loading = false;
                    return;
                }

                createAnswer(data).then((resp) => {
                    this.newAnswer = {};
                    this.$emit("refresh");
                    this.$message.success("回复成功！");
                    this.listData();
                    this.loading = false;
                });
            }
        },
        deleteAnswerHandle (aid) {
            this.$confirm("确定要删除这条回答吗?", "删除提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                deleteAnswer(aid).then((resp) => {
                    this.listData();
                    this.$emit("refresh");
                });
            });
        },
        cancel () {
            this.newAnswer = {};
            this.showdialog = false;
        },
    },
};
</script>
<style lang="scss" scoped>
.newanswer {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
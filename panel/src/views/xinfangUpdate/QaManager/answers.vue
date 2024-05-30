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
    <div v-show="showdialog">
        <div class="tools">
            <el-link type="primary" icon="el-icon-back" @click="cancel">返回</el-link>
        </div>
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
                        <el-link
                                :type="scope.row.is_public ? 'warning' : 'primary'"
                                size="small"
                                @click="publicHandle(scope.row)"
                                >{{ scope.row.is_public == true ? "隐藏" : "显示" }}</el-link
                            >
                        <el-link type="danger" size="small" @click="deleteAnswerHandle(scope.row.id)">删除</el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-divider content-position="left">添加回复</el-divider>
        <div class="newanswer">
            <user-selector v-model="newAnswer.userId" size="small" group="broker"></user-selector>
            <el-input style="margin: 0 10px;" size="small" placeholder="请输入回复内容" v-model="newAnswer.content" clearable></el-input>
            <el-button type="primary" size="small" @click="onsubmit" icon="el-icon-check">提交</el-button>
        </div>
    </div>
</template>
  
<script>
import { getQuestionDetail, createAnswer, deleteAnswer,publicAnswer } from "@/api/question";
import UserSelector from "@/components/UserSelector";
export default {
    components: { UserSelector },
    props: {
        questionId: { type: Number, default: null },
        showdialog: { type: Boolean, default: false }
    },
    data () {
        return {
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
        publicHandle(item) {
            this.$confirm("确定要" + (item.is_public ? "隐藏" : "显示") + "这条回答吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.loading = true;
                publicAnswer(item.id).then((resp) => {
                    this.loading = false
                    this.listData();
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
                });
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
                if (data.content && data.content.length <= 2) {
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
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
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
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
                });
            });
        },
        cancel () {
            this.newAnswer = {};
            // this.showdialog = false;
            this.$emit("cancel")
        },
    },
};
</script>
<style lang="scss" scoped>
.tools {
    margin-bottom: 10px;
}

.newanswer {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
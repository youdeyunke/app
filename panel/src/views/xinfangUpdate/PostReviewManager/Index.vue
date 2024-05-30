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
    <div class="" v-cloak v-loading="loading">
        <div class="tools" v-show="!showForm">
            <div>
                <el-form size="small" label-width="130px" label-position="left">
                    <el-form-item label="是否显示楼盘评测">
                        <el-switch v-model="reviewEnable" @change="updateReviewEnable"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <div class="right">
                <el-form size="small" label-width="130px" label-position="left">
                    <el-form-item>
                        <el-button v-show="!showForm" size="small" @click="loadItems" icon="el-icon-refresh">刷新</el-button>
                        <el-button :disabled="!reviewEnable" size="small" icon="el-icon-plus" type="primary"
                            @click="createNewHandle">添加一个楼盘评测</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <view class="empty" v-if="items.length === 0">还没有添加任何楼盘评测信息</view>
        <el-table v-show="!showForm" :data="items" style="width: 100%" fit @selection-change="(val) => (selection = val)">
            <el-table-column prop="id" label="ID" width="70"> </el-table-column>
            <el-table-column prop="name" label="评测名称"> </el-table-column>
            <el-table-column label="评测分数">
                <template slot-scope="scope">
                    <el-rate disabled v-model="scope.row.score" allow-half></el-rate>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="评测摘要"> </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-link target="_blank" type="primary" @click="editHandle(scope.row)"
                        :disabled="!reviewEnable">编辑</el-link>
                    <el-link target="_blank" type="danger" @click="deleteHandle(scope.row)"
                        :disabled="!reviewEnable">删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <Review-form v-on:quxiao="cancleHandle" v-show="showForm" @change="changeHandle" :post_id="postId"
            :item="currentItem" />
    </div>
</template>
  
<script>
import { getPostReviewsList, deletePostReviews, updatePostReviewsEnable } from "@/api/post_review";
import ReviewForm from "./ReviewForm.vue";
export default {
    components: { ReviewForm },
    data () {
        return {
            items: [],
            loading: false,
            currentItem: {},
            showForm: false,
        };
    },
    props: {
        postId: { type: Number, default: null },
        reviewEnable: { type: Boolean, default: false }
    },

    watch: {
        postId: {
            immediate: true,
            handler (val, oval) {
                if (val) {
                    this.loadItems();
                }
            },
        },
    },

    mounted: function () { },

    computed: {},

    methods: {
        updateReviewEnable: function () {
            this.loading = true;
            updatePostReviewsEnable(this.postId).then((resp) => {
                this.loading = false;
                if (resp.code != 0) { return }
                this.reviewEnable = resp.data
            })
        },
        resetFormData: function () {
            // 情况表单数据
            this.currentItem = {
                post_id: this.postId,
            };
        },
        cancleHandle: function (e) {
            console.log(e)
            this.showForm = e
        },
        showFormHandle: function (e) {
            this.loading = false;
            this.showForm = true;
        },

        createNewHandle: function (e) {
            this.resetFormData();
            this.showFormHandle();
        },
        changeHandle: function () {
            this.$message.success("已保存");
            this.loadItems();
        },
        editHandle: function (item) {
            this.currentItem = item;
            this.showForm = true;
        },

        deleteHandle: function (item) {
            this.$confirm("确定要删除这个评测吗?", "删除提示").then(() => {
                deletePostReviews(item.id).then((res) => {
                    this.loadItems();
                });
            });
        },
        loadItems: function () {
            this.loading = true;
            var query = {
                post_id: this.postId,
            };
            getPostReviewsList(query).then((resp) => {
                this.resetFormData();
                if (resp.status != 0) {
                    return false;
                }
                this.items = resp.data;
                this.total = resp.total_count;
                this.loading = false;
            });
        },
    },
};
</script>
  
<style scoped>
.tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>
  
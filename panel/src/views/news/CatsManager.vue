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
    <div class="cats" v-cloak>
        <div v-if="showForm == false">
            <el-table :data="cats" v-loading="loading">
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="状态" :width="60">
                    <template slot-scope="scope">
                        <span style="font-size:18px;font-weight:bolder;">
                            <public-status :status="scope.row.is_public"></public-status>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope" :width="160">
                        <el-link @click="editHandle(scope.row)">编辑</el-link>
                        <el-link type="danger" @click="deleteHandle(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>

            <el-button style="margin:10px auto 0 auto; width:100%;" type="primary" plain round icon="el-icon-circle-plus"
                @click="createHandle">新增分类</el-button>
        </div>

        <cat-form @change="changeHandle" v-else :cat="currentCat"></cat-form>
    </div>
</template>

<script>
import { getNewsCatList, deleteNewsCat } from "@/api/news";
import CatForm from "./CatForm";
import PublicStatus from "@/components/PublicStatus";

export default {
    components: { CatForm, PublicStatus },
    data () {
        return {
            cats: [],
            currentCat: null,
            showForm: false,
            loading: false
        };
    },
    props: {},

    mounted: function () {
        this.loadData();
    },

    computed: {},

    methods: {
        changeHandle: function (cat) {
            this.showForm = false;
            this.loadData();
        },

        deleteHandle: function (cat) {
            this.$confirm(
                "确定要删除分类 " +
                cat.name +
                "吗？"
            ).then(() => {
                deleteNewsCat(cat.id).then(resp => {
                    if (resp.status != 0) {
                        return;
                    }
                    this.loadData();
                });
            });
        },

        editHandle: function (cat) {
            this.currentCat = cat;
            this.showForm = true;
        },
        createHandle: function () {
            var cat = { id: null, name: "", is_public: true };
            this.currentCat = cat;
            this.showForm = true;
        },

        loadData: function () {
            getNewsCatList().then(resp => {
                if (resp.status != 0) {
                    return;
                }
                this.cats = resp.data.map((cat, i) => {
                    return cat;
                });
            });
        }
    }
};
</script>

<style scoped></style>
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
    <div class="vr-manager">
        <div class="tools" v-if="!showForm">
            <el-button size="small" @click="createHandle" icon="el-icon-plus" type="primary">新建轮播图</el-button>
        </div>

        <div class="vr-listing" v-show="!showForm">
            <el-table :data="items">
                <el-table-column label="ID" prop="id" width="100"></el-table-column>
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.image" style="max-width:100px;max-height:100px;"></el-image>
                    </template>
                </el-table-column>

                <el-table-column label="类型" prop="cat_name">
                </el-table-column>

                <el-table-column label="顺序" prop="number">
                </el-table-column>


                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="editHandle(scope.row)">编辑</el-link>
                        <el-link type="danger" @click="deleteHandle(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <banner-form @cancle="() => showForm = false" @change="reloadHandle" v-show="showForm"
            :item="BannerItem"></banner-form>
    </div>
</template>

<style lang="scss" scoped>
.tools {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}
</style>

<script>
import { getPostBannerList, createPostBanner, deletePostBanner } from "@/api/post-banner";
import { getAppConfig } from "@/api/myconfig";
import HelpIcon from "@/components/HelpIcon";
import BannerForm from "./BannerForm";

export default {
    components: {
        BannerForm,
        HelpIcon,
    },
    props: {
        postId: {
            type: Number,
            default: null,
        },
    },

    data () {
        return {
            showForm: false,
            post: null,
            cdnDomain: "tcdn.udeve.net",
            cdnProtoco: "http",
            loading: false,
            BannerItem: {},
            items: [],
        };
    },

    watch: {
        postId: {
            immediate: true,
            handler (val, oval) {
                if (val) {
                    this.loadData();
                }
            },
        },
    },

    created: function () { },
    computed: {},

    methods: {
        reloadHandle: function () {
            this.showForm = false;
            this.loading = true;
            this.loadData();
        },

        createHandle: function () {
            this.BannerItem = {
                post_id: this.postId,
                cover: "",
                name: "",
                url: "",
                open_type: "weapp",
            };
            console.log("vr item is", this.BannerItem);
            this.showForm = true;
        },

        editHandle: function (vr) {
            this.BannerItem = vr;
            this.showForm = true;
        },

        downloadHandle: function (vr) {
            // 点击下载文件
            var url = vr.url;
            window.open(url, "_blank");
        },

        deleteHandle: function (vr) {
            // 删除vr
            this.$confirm("确定要删除这个轮播图吗？", "删除提示", {
                confirmButtonText: "删除",
                cancleButtonText: "不删除",
                type: "warning",
            }).then(() => {
                this.loading = true;
                deletePostBanner(vr.id).then((resp1) => {
                    this.loadData();
                });
            });
        },

        loadData: function () {
            var _this = this;
            this.loading = true;
            var q = { post_id: this.postId };
            getPostBannerList(q).then((resp) => {
                if (resp.status != 0) {
                    return;
                }
                _this.items = resp.data;
                _this.loading = false;
            });
        },
    },
};
</script>

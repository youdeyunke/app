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
                <div class="part-left"></div>
                <div class="part-right">
                    <div class="block">
                        <el-button v-if="btns.create_album" size="small" type="primary" icon="el-icon-plus"
                            @click="createHandle">新建房源分类</el-button>
                    </div>
                </div>
            </div>

            <el-table v-loading="loading" :data="albums" size="small" fit highlight-current-row>
                <el-table-column prop="id" width="120px" label="#" />
                <el-table-column prop="name" label="分类名称">
                    <template slot-scope="scope">
                        {{ scope.row.name }}
                        <el-tag v-if="scope.row.cat == 'function'" type="default" effect="plain" size="mini">条件查询</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="post_count" label="楼盘数量" />
                <el-table-column prop="title" label="分享文案标题" />
                <el-table-column prop="content" label="介绍说明" />
                <el-table-column prop="number" label="排序" />
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-link v-if="btns.update_album" type="primary" @click="editHandle(scope.row)">基本信息</el-link>
                        <el-link v-if="btns.update_album && scope.row.cat == 'default'" type="primary"
                            @click="postsHandle(scope.row)">绑定楼盘</el-link>
                        <el-link v-if="btns.delete_album && scope.row.can_delete == true" type="danger"
                            @click="deleteHandle(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>

            <album-form ref="albumform" @change="albumChanged" />
            <album-admin ref="albumadmin" @change="albumChanged" />
            <posts-manager ref="posts" @change="albumChanged"></posts-manager>

        </ud-card>
    </div>
</template>

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

<script>
import {
    getPostSimpleList,
    getAlbumList,
    getPostAlbumList,
    deleteAlbum,
} from "@/api/post";
import AlbumForm from "./AlbumForm";
import AlbumAdmin from "./AlbumAdmin";
import PostsManager from './PostsManager.vue'
export default {
    components: { AlbumForm, AlbumAdmin, PostsManager, },
    name: 'albums',
    props: {
        btns: { type: Object, default: {} },
    },
    data () {
        return {
            loading: false,
            albums: [],
        };
    },
    created: function () {
        this.loadData();
    },
    methods: {
        postsHandle: function (item) {
            this.$refs.posts.openDialog(item)
        },


        deleteHandle: function (item) {
            var msg =
                "您确定要删除这个房源分类吗？（删除房源分类，不会删除系统房源数据）";
            this.$confirm(msg, "删除确认").then((resp) => {
                this.loading = true;
                deleteAlbum(item.id).then((resp) => {
                    this.loading = false
                    if (resp.status == 0) {
                        this.$message.success("已删除");
                        this.loadAlbums();
                    }
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
                });
            });
        },

        createHandle: function () {
            var item = {
                name: '',
                cat: 'default',
                post_ids: [],
                title: '',
                desc: '',
                cover: '',
            };
            this.$refs.albumform.openDialog(item)
        },

        albumChanged: function () {
            this.loadAlbums();
        },

        editHandle: function (album) {
            this.$refs.albumform.openDialog(album)
        },

        adminHandle: function (album) {
            this.$refs.albumadmin.openDialog(album)
        },

        loadData: function () {
            this.loadAlbums();
        },

        // 加载系统已有分类
        loadAlbums: function () {
            getAlbumList().then((resp) => {
                this.albums = resp.data;
                this.loading = false;
            });
        },

    },
};
</script>
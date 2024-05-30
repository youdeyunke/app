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
    <div v-cloak>

        <!-- 操作 -->
        <div class="header">
            <div class="part-left">
                <div class="block">
                    <el-input v-model="kw" style="border-radius: 100%; width: 250px" size="small" placeholder="输入标签名称搜索">
                        <el-button slot="append" icon="el-icon-search" @click="doSearch" />
                    </el-input>
                    <el-button v-if="kw" type="text" size="small" @click="clearKw">清空</el-button>
                </div>
            </div>

            <div class="part-right">
                <div class="block" v-if="selectionTags.length > 0">
                    <el-button :disabled="selectionTags.length == 0" size="small" type="danger" plain icon="el-icon-delete"
                        @click="patchDeleteHandle()">删除所选</el-button>
                </div>
                <div class="block">
                    <el-button :disabled="loading" icon="el-icon-refresh" size="small" type="default" plain
                        @click="loadData">刷新数据</el-button>
                </div>
                <div class="block">
                    <el-button size="small" type="primary" icon="el-icon-plus" @click="newHandle">添加标签</el-button>
                </div>
            </div>
        </div>

        <!-- 列表 -->
        <el-table v-loading="loading" element-loading-text="正在加载标签列表" style="width: 100%" size="medium " fit
            :data="tagItems" :highlight-current-row="true" @selection-change="handleSelectionChange">
            <el-table-column prop="id" label="#" width="50" type="selection" />
            <el-table-column prop="id" label="#" width="180"></el-table-column>
            <el-table-column prop="name" label="卖点标签">
                <template slot-scope="scoped">
                    <span plain size="mini" v-if="scoped.row" :style="{
                        color: scoped.row.color,
                        'border-color': scoped.row.color,
                        padding: '2px',
                        'border-width': '1px',
                        'border-style': 'solid',
                    }">{{ scoped.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="editHandle(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" :destroy-on-close="true"
            :title="currentTag.id ? '编辑标签' : '新建标签'" :visible.sync="showDialog" width="500px">
            <tag-form :tag="currentTag" @change="changeHandle" @cancle="showDialog = false"></tag-form>
        </el-dialog>

        <div class="pager">
            <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
                :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
                @size-change="updatePageSize" />
        </div>

    </div>
</template>

<script>
import UdCard from "@/components/UdCard";
import TagForm from "./form";
import { getTagList, deleteTag } from "@/api/tag";
import { getAppConfig } from "@/api/myconfig";
export default {
    name: "tags",
    components: { UdCard, TagForm },
    data () {
        return {
            loading: true,
            // 列表数据
            tagItems: [],
            // dialog显示隐藏
            showDialog: false,
            // 当前数据id
            currentTag: {},
            // 总数据条数
            total: 0,
            // 每页展示多少条数据
            per_page: 10,
            // 当前页数
            current_page: 1,
            // 根据分类显示
            kw: "",
            selectionTags: [],
        };
    },
    mounted () {
        var _this = this;
        getAppConfig().then((resp) => {
            _this.loadData();
        });
    },
    watch: {
        current_page (newVal, oldVal) {
            this.loadData();
        },
        per_page (nweVal, oldVal) {
            this.loadData();
        },
    },
    methods: {
        // 获取数据
        loadData () {
            this.loading = true;
            var _this = this;
            getTagList({
                page: _this.current_page,
                per_page: _this.per_page,
                kw: _this.kw || "",
            }).then((resp) => {
                _this.tagItems = resp.data.result.map((tag, i) => {
                    return tag;
                });
                console.log(resp);
                _this.total = resp.data.total_count;
                _this.loading = false;
            });
        },
        doSearch: function () {
            this.loading = true;
            this.current_page = 1;
            this.kw = this.kw;
            this.loadData();
        },
        clearKw: function () {
            this.kw = "";
            this.loadData();
        },
        newHandle () {
            this.showDialog = true;
            this.currentTag = {
                id: null,
                name: '',
                color: '#666666',
            }
        },
        editHandle (tag) {
            this.currentTag = tag
            this.showDialog = true;
        },
        changeHandle () {
            this.showDialog = false;
            this.loadData();
            this.currentTag = {}
        },
        deleteHandle (id) {
            this.$confirm("确定要删除这个标签吗？").then(() => {
                deleteTag(id).then((resp) => {
                    if (resp.status === 0) {
                        this.$message({ type: "success", message: "删除标签成功！" });
                        this.loadData();
                    }
                });
            });
        },
        patchDeleteHandle () {
            var _this = this;
            this.$confirm("确定要删除该标签吗？").then(() => {
                _this.loading = true;
                _this.selectionTags.forEach((p, i) => {
                    deleteTag(p.id).then((resp) => {
                        if (i == _this.selectionTags.length - 1) {
                            _this.loadData();
                            _this.$message.success("已删除");
                        }
                    });
                });
            });
        },

        handleSelectionChange (items) {
            this.selectionTags = items;
        },
        updateCurrentPage (page) {
            this.current_page = page;
        },
        updatePageSize (size) {
            this.per_page = size || 10;
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
    border-bottom: 0.2px solid #ebeef5;

    .part-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .part-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .block {
        margin-right: 10px;
    }
}
</style>

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
    <div v-loading="loading">
        <el-card>
            <div class="myheader">
                <div class="part-left">
                    <div class="block">
                        <el-input v-model="kw" style="border-radius: 100%; width: 220px" size="small" placeholder="搜索">
                            <el-button slot="append" icon="el-icon-search" @click="doSearch" />
                        </el-input>
                        <el-button v-if="kw" type="text" size="small" @click="clearKw">清空</el-button>
                    </div>
                </div>
                <div class="part-right">
                    <div class="block">
                        <el-button :disabled="loading" icon="el-icon-refresh" size="small" type="default"
                            @click="loadData">刷新数据</el-button>
                    </div>

                    <div class="block">
                        <el-button size="small" type="primary" icon="el-icon-plus"
                            @click="newFormHandle">新建</el-button>
                    </div>
                </div>
            </div>
            <el-table :data="items" highlight-current-row @row-click="itemSelect">
                <el-table-column prop="id" label="#" />
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.image" height="80" />
                    </template>
                </el-table-column>

                <el-table-column prop="name" label="名称" />
                <el-table-column prop="view_nums" label="展现次数" />
                <el-table-column prop="click_nums" label="点击次数" />
                <el-table-column prop="skip_nums" label="跳过次数" />
                <el-table-column label="点击率">
                    <template slot-scope="scope">
                        {{ scope.row.view_nums && scope.row.click_nums && scope.row.view_nums !== 0 ? (scope.row.click_nums / scope.row.view_nums * 100).toFixed(2) + '%' : 'N/A' }}
                    </template>
                </el-table-column>
                <el-table-column label="开启投放">
                    <template slot-scope="scope">
                        {{ scope.row.public ? '已开启' : '未开启' }}
                    </template>
                </el-table-column>

                <el-table-column label="操作" :width="140">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="editHandle(scope.row)">编辑</el-link>
                        <el-link type="danger" @click="deleteHandle(scope.row.id)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
                    @size-change="updatePageSize" />
            </div>
        </el-card>

        <el-dialog :visible.sync="showForm" :fullscreen="false" :destroy-on-close="true" width="500px" v-loading="loading"
            title="开屏广告设置">
            <el-form label-width="120px" label-position="right" v-if="currentItem">
                <el-form-item label="广告名称" required>
                    <el-input show-word-limit maxlength="20" style="width: 220px" v-model="currentItem.name"></el-input>
                </el-form-item>

                <el-form-item label="图片">
                    <image-picker v-model="currentItem.image" />
                </el-form-item>

                <el-form-item label="点击后">
                    <link-editor v-model="linkObj" />
                </el-form-item>

                <el-form-item label="倒计时(秒)" required>
                    <el-input show-word-limit maxlength="60" type="number" style="width: 220px"
                        v-model="currentItem.time"></el-input>
                </el-form-item>

                <el-form-item label="开启投放">
                    <el-switch v-model="currentItem.public" />
                </el-form-item>
            </el-form>
            <div slot="footer" >
                <el-button block size="mini"  v-loading="loading" @click="closeHandle" icon="el-icon-close">取消</el-button>
                <el-button block  size="mini" v-loading="loading" type="primary" @click="submitHandle" icon="el-icon-check">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.inline {
    display: flex;
    justify-content: space-between;
}

.icon-uploader .el-upload,
.icon-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 355px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-uploader img {
    width: 355px;
    height: 150px;
}

.icon-uploader .el-upload:hover {
    border-color: #409eff;
}

.app-container {
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
}
</style>

<script>
import {
    getFlashList,
    updateFlash,
    deleteFlash,
} from "@/api/flash";

import ImagePicker from "@/components/ImagePicker";
import LinkEditor from '@/components/LinkEditor.vue';

export default {
    name: "flash",
    components: { ImagePicker, LinkEditor },
    data () {
        return {
            showMore: false,
            linkObj: {},
            cats: [],
            kw: "",
            showForm: false,
            total: 0,
            per_page: 20,
            page: 1,
            items: [],
            loading: false,
            currentItem: null,
        };
    },
    props: {},

    computed: {
        submitBtnText () {
            return this.currentItem.id ? "保存" : "创建";
        },
    },

    mounted: function () {
        this.loadData();
    },

    methods: {

        updateCurrentPage: function (page) {
            this.page = page;
        },

        updatePageSize: function (size) {
            this.per_page = size || 10;
        },

        closeHandle: function () {
            this.currentItem = {};
            this.showForm = false;
        },

        newFormHandle: function () {
            this.currentItem = {
                id: null,
                name: null,
                link: {},
                image: null,
                public: false,
            };
            console.log('new form handle', this.currentItem)
            this.showForm = true;
            this.loading = false;
        },
        editHandle: function (item) {
            this.showForm = true;
            this.currentItem = item;
            this.linkObj = JSON.parse(item.link)
        },
        doSearch: function () {
            // 搜索
            this.loading = true;
            this.page = 1;
            this.loadData();
        },

        clearKw: function () {
            this.kw = "";
            this.kw = "";
            this.page = 1;
            this.loadData();
        },

        itemSelect: function (item) {
            this.currentItem = item;
        },

        deleteHandle: function (itemId) {
            var _this = this;
            this.$confirm("确定要删除这个广告吗?", {
                confirmButtonText: "确定删除",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                deleteFlash(itemId).then((resp) => {
                    _this.currentItem = {};
                    _this.loadData();
                });
            });
        },

        validate: function (data) {
            if (!data.name || data.name.length <= 3) {
                this.$message.error("广告名称不能少于3个字");
                return false;
            }

            if (!data.image) {
                this.$message.error("请上传广告图片");
                return false;
            }

            return true;
        },

        submitHandle: function () {
            var data = this.currentItem;
            var isok = this.validate(data);
            if (!isok) {
                return false;
            }

            this.loading = true;
            data.link = JSON.stringify(this.linkObj)
            updateFlash(data).then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    this.loadData();
                    this.$message.success("保存成功");
                }
            });
        },

        loadData: function () {
            this.loading = true;
            this.showForm = false
            var query = {
                page: this.page,
                per_page: this.per_page,
                kw: this.kw,
            };
            getFlashList(query).then((resp) => {
                this.items = resp.data.result.map((item, i) => {
                    item.rate = '-'
                    if (item.view_nums > 0) {
                        var v = 100 * item.click_nums / item.view_nums
                        item.rate = v.toFixed(2)
                    }
                    return item
                });
                this.total = resp.data.page.total_items;
                this.loading = false;
            });
        },
    },
};
</script>

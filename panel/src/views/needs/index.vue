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
                    <div class="block"></div>
                    <div class="block">
                        <el-input v-model="kw" style="border-radius: 100%; width: 250px" size="small"
                            placeholder="输入姓名、手机号称搜索">
                            <el-button slot="append" icon="el-icon-search" @click="doSearch" />
                        </el-input>
                    </div>

                    <div class="block">
                        <el-button v-if="kw" type="text" size="small" @click="clearFilter">清空</el-button>
                    </div>
                </div>

                <div class="part-right">
                    <div class="block">
                        <el-button size="small" icon="el-icon-refresh" plain @click="loadData">刷新</el-button>
                    </div>
                    <div class="block">
                        <el-button size="small" type="primary" v-loading="downloading" @click="downloadCsv" icon="el-icon-download">导出数据</el-button>
                    </div>
                </div>
            </div>

            <el-table v-loading="loading" style="width: 100%" :data="items" size="small" element-loading-text="正在加载数据" fit
                highlight-current-row>
                <el-table-column prop="id" label="#" :width="80" />

                <el-table-column label="客户手机号" :width="180" prop="mobile">
                </el-table-column>
                <el-table-column label="客户姓名" :width="100" prop="name">
                </el-table-column>

                <el-table-column label="预算" prop="yusuan" width="300px"></el-table-column>

                <el-table-column label="区域" prop="position" :width="200"> </el-table-column>

                <el-table-column prop="housetype" label="户型" />
                <el-table-column label="面积" prop="area"> </el-table-column>
                <el-table-column prop="points" label="购房目的" />
                <el-table-column prop="remark" label="备注" />
                <el-table-column prop="date" label="提交时间" />
            </el-table>
            <div class="pager">
                <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
                    @size-change="updatePageSize" />
            </div>
        </ud-card>
    </div>
</template>

<style lang="scss" scoped>
.app-container {
    .myheader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0px;

        .part-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .block {
                margin-right: 10px;
            }
        }


        .part-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .block {
                margin-right: 10px;
            }
        }

    }
}
</style>

<script>
import { getNeedList, deleteNeed, exportNeedData } from "@/api/need";
import UdCard from "@/components/UdCard";
import PostSelector from "@/components/PostSelector";
import filters from '@/utils/filters'
export default {
    components: { UdCard, PostSelector },
    name: "needs",
    props: {
        btns: { type: Object, default: null },
    },
    data: function () {
        return {
            kw: "",
            items: [],
            loading: true,
            downloading: false,
            per_page: 20,
            total: 0,
            current_page: 1,
        };
    },

    computed: {},

    watch: {
        current_page: function (newVal, oldVal) {
            this.loadData();
        },
        per_page: function (newVal, oldVal) {
            this.loadData();
        },
    },
    created () {
        this.loadData();
    },

    methods: {
        deleteHandle: function (item) {
            console.log("delete item", item);
            this.$confirm("确定要删除这条记录吗？", "确定删除").then(() => {
                deleteNeed(item.id).then((resp) => {
                    if (resp.status !== 0) {
                        return;
                    }
                    this.loadData();
                    this.$message.success("已删除");
                });
            });
        },

        doSearch: function () {
            // 搜索
            this.loading = true;
            this.page = 1;
            this.items = [];
            this.loadData();
        },

        clearFilter: function () {
            this.page = 1;
            this.kw = "";
            this.items = [];
            this.loadData();
        },

        updateCurrentPage: function (page) {
            this.current_page = page;
        },

        updatePageSize: function (size) {
            this.per_page = size || 10;
        },

        loadData: function () {
            this.loading = true;
            var _this = this;
            getNeedList({
                order: "id desc",
                page: _this.current_page,
                per_page: _this.per_page,
                kw: _this.kw || "",
            }).then((resp) => {
                _this.items = resp.data.result.map((n, i) => {
                    n.address = n.city_name + ' ' + n.position
                    n.date = filters.utcFormater(n.created_at)
                    n.yusuan = n.budget_min + '~' + n.budget_max + '万'
                    return n
                });
                _this.total = resp.data.page.total_items;
                _this.loading = false;
            });
        },

        downloadCsv: function () {
            var _this = this;
            this.downloading = true;
            exportNeedData().then((res) => {
                _this.downloading = false;
                const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                // 创建一个a标签
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob); // 设置文件的URL
                link.download = '客户需求.xlsx'; // 设置文件的下载名称
                // 模拟用户点击链接进行下载
                link.click();
                // 释放URL对象
                URL.revokeObjectURL(link.href);
            });
        },
    },
};
</script>

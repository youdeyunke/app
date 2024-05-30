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
    <div :class="$options.name">
        <el-tabs v-if="tabs.length > 0" v-model="cat_id" type="card" @tab-click="handleClick">
            <el-tab-pane v-for="item in tabs" :key="item.id" :label="item.name" :name="item.id" />
        </el-tabs>
        <div class="scroll-area">
            <div class="file-area">
                <media-item v-for="(item, index) in localFileList" :key="`${item.id}${index}`" v-bind="item"
                    @select="handleSelect" />
            </div>
        </div>
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script>
import { find } from "lodash";
import MediaItem from "./MediaItem";
import { getRecommendFiles } from "@/api/media";

/* eslint-disable vue/name-property-casing */
export default {
    name: "public-media",
    components: {
        MediaItem
    },
    props: {
        selectedList: Array
    },
    data () {
        return {
            tabs: [],
            fileList: [],
            currentPage: 1,
            total: 0,
            cat_id: ""
        };
    },
    computed: {
        pageSize: function () {
            return this.activeItem === 'private' ? 20 : 90000

        },
        localFileList () {
            return this.fileList.map(item => {
                if (find(this.selectedList, iterate => iterate.id === item.id)) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
                item.can_rename = false;
                return item;
            });
        }
    },
    created () {
        this.requestMediaFiles();
    },
    methods: {
        requestMediaFiles () {
            this.fileList = [];
            const param = { page: this.currentPage, per_page: this.pageSize };
            if (this.cat_id) {
                param.cat_id = parseInt(this.cat_id, 10);
            }
            getRecommendFiles(param).then(res => {
                if (res.status === 0) {
                    this.fileList = res.data;
                    this.total = res.total;
                    this.tabs = [{ id: "0", name: "全部" }].concat(
                        res.cats.map(item => {
                            item.id = String(item.id);
                            return item;
                        })
                    );
                }
            });
        },
        handleClick () {
            // 切换数据
            this.requestMediaFiles();
        },
        handleSelect (id) {
            const item = find(this.localFileList, file => file.id === id);
            if (item.isSelected) {
                // 已经选中了，不处理，不提供反选功能
                return;
            }
            this.$emit("select", item);
        },
        handleSizeChange () {
            this.requestMediaFiles();
        },
        handleCurrentChange () {
            this.requestMediaFiles();
        }
    }
};
</script>

<style lang="scss">
.public-media {
    margin: 10px 0 0 20px;

    .el-tabs {
        padding-right: 20px;
    }

    .scroll-area {
        overflow-y: auto;
        max-height: 500px;

        &::-webkit-scrollbar {
            width: 2px;
        }
    }

    .file-area {
        display: flex;
        flex-flow: row wrap;
    }
}
</style>

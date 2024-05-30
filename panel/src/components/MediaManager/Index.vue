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
    <el-dialog :custom-class="`${$options.name}-dialog`" :visible="show" :close-on-click-modal="false" :center="false"
        :destroy-on-close="true" :append-to-body="true" width="880px" @close="onClose">
        <template #title>
            <slot name="title">
                <Header :text="fileTypesText" />
            </slot>
        </template>
        <div :class="`${$options.name}-dialog-content`">
            <div class="nav-left">
                <el-tabs v-model="activeItem" tab-position="left">
                    <el-tab-pane v-for="item in tabs" :key="item.value" :name="item.value" :label="item.text"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="content-main">
                <user-media v-if="activeItem === 'private'" :selected-list="selectedList" :filetype="filetype"
                    @select="handleSelect" @unselect="handleUnselect" />
                <public-media v-else :selected-list="selectedList" @select="handleSelect" />
            </div>
        </div>
        <template #footer>
            <slot name="footer">
                <Footer :limit="limit" :selected="selectedList" @unselect="handleUnselect" @ok="handleOk"
                    @cancel="$emit('update:show', false)" />
            </slot>
        </template>
    </el-dialog>
</template>

<script>
import { isArray, every, find, findIndex, isString } from "lodash";
import Header from "./Header";
import Footer from "./Footer";
import PublicMedia from "./PublicMedia";
import UserMedia from "./UserMedia";

function isValidType (type) {
    return ["image", "video"].indexOf(type) >= -1;
}

const imageTypes = ["jpg", "jpeg", "png", "gif"];
const videoTypes = ["mp4"];
const tabs = [
    {
        text: "我的文件",
        value: "private",
    },
    // {
    //     text: "素材库",
    //     value: "public"
    // }
];

/* eslint-disable vue/name-property-casing */
export default {
    name: "media-manager",
    components: {
        Header,
        Footer,
        PublicMedia,
        UserMedia,
    },
    props: {
        fileTypes: {
            // 只支持图片和视频两种格式
            validator (v) {
                if (isArray(v)) {
                    return every(v, (item) => isValidType(item));
                }
                return isValidType(v);
            },
            default () {
                return ["image", "video"];
            },
        },
        defaultTab: {
            validator (v) {
                return find(tabs, (tab) => tab.value === v) !== null;
            },
            default: "private",
        },
        limit: {
            type: Number,
            default: 1,
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            tabs,
            selectedList: [],
            activeItem: this.defaultTab,
        };
    },
    computed: {
        fileTypesText () {
            const types = [].concat(this.fileTypes);
            return types
                .map((item) => {
                    if (item === "image") {
                        return imageTypes.join("/");
                    }
                    return videoTypes.join("/");
                })
                .join("/");
        },
        filetype () {
            if (isString(this.fileTypes)) {
                return this.fileTypes;
            }
            if (this.fileTypes.length === 2) {
                return "";
            }
            return this.fileTypes[0];
        },
    },
    methods: {
        onShow: function () {
            this.$emit("update:show", true);
        },
        onClose: function () {
            // 当窗口关闭后，清空seelct
            this.$emit("update:show", false);
            this.$emit("close", true);
            this.selectedList = [];
        },
        handleSelect (item) {
            if (this.filetype !== "" && item.filetype !== this.filetype) {
                this.$message({
                    message: `您当前只能选择 ${this.filetype} 类型哦`,
                    type: "warning",
                });
                return;
            }
            // 如果只能选择一个，那么点击第二个时，自动替换前一个
            if (this.limit === 1) {
                this.selectedList = [item];
                return;
            }

            if (this.selectedList.length >= this.limit) {
                // 超过限制
                this.$message({
                    message: `最多只能选择 ${this.limit} 个哦`,
                    type: "warning",
                });
                return;
            }
            const index = findIndex(
                this.selectedList,
                (iterate) => iterate.id === item.id
            );
            if (index === -1) {
                this.selectedList.push(item);
            } else {
                this.selectedList.splice(index, 1, item);
            }
        },
        handleUnselect (item) {
            const index = findIndex(
                this.selectedList,
                (iterate) => iterate.id === item.id
            );
            if (index > -1) {
                this.selectedList.splice(index, 1);
            }
        },
        handleOk () {
            if (this.selectedList.length < 1) {
                this.$message({ message: `请至少选择 1 个哦`, type: "warning" });
                return;
            }
            this.$emit("update:show", false);
            this.$emit("selected", this.selectedList);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.media-manager-dialog {
    font-size: 14px;

    .el-dialog__header {
        border-bottom: 1px solid #e4e7ed;
        padding: 20px;
        user-select: none;
    }

    .el-dialog__footer {
        border-top: 1px solid #e4e7ed;
        user-select: none;
        padding: 10px 20px;
        height: 70px;
    }

    .el-dialog__body {
        padding: 0;
    }

    &-content {
        height: 610px;
        display: flex;

        .nav-left {
            user-select: none;
            width: 100px;
            height: 100%;

            .el-tabs--left {
                height: 100%;
            }
        }

        .content-main {
            flex: 1;
            padding-bottom: 5px;
            height: 610px;
        }
    }
}
</style>

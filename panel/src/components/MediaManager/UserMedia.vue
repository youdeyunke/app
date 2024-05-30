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
    <div :class="$options.name" v-loading="loading">
        <qr-popup :parentId="parent_id" @success="requestMediaFiles" ref="qrPopup"></qr-popup>
        <div class="operation-area">
            <el-breadcrumb>
                <el-breadcrumb-item v-for="(item, index) in tabs" :key="index">
                    <a v-if="index !== tabs.length - 1" @click="handleClick(item.id, index)">{{ item.name }}</a>
                    <template v-else>{{ item.name }}</template>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="btn-area">
                <el-button size="small"  @click="requestMediaFiles" icon="el-icon-refresh">刷新</el-button>
                <el-button size="small"  :disabled="!can_create_dir" @click="handleCreateDir"
                    icon="el-icon-folder-add">新建文件夹</el-button>
                <el-button size="small"  @click="showEwm" icon="el-icon-menu">手机上传</el-button>
                <el-upload v-loading="uploading" action="/api/v6/upload" :show-file-list="false" :headers="headers"
                    element-loading-text="上传中" list-type="text" :multiple="true" :before-upload="beforeUpload"
                    :on-success="uploadSuccess" :on-error="uploadError" :style="{ display: 'inline-block', margin: '0 10px' }">
                    <el-button type="primary" size="small" icon="el-icon-upload2" >上传文件</el-button>
                </el-upload>
            </div>
        </div>
        <div class="scroll-area">
            <div class="file-area">
                <media-item v-for="item in localFileList" :key="item.id" v-bind="item" :moving-item="movingItem"
                    @delete="handleDelete" @select="handleSelect" @edit="handleEditFileName" @startDrag="handleStartDrag"
                    @drop="handleDrop" @return="handleReturn" @expand="handleExpand" />
            </div>
            <div class="pager">
                <el-pagination layout="total, prev, pager, next, jumper" :total="total" :page-size="pageSize"
                    @current-change="(page) => {
                            this.page = page;
                        }
                        " />
            </div>
        </div>
    </div>
</template>

<script>
import { find, findIndex } from "lodash";
import MediaItem from "./MediaItem";
import QrPopup from "./QrPopup.vue";
import {
    getMediaFiles,
    deleteMediaFile,
    updateMediaFile,
    createMediaFile,
} from "@/api/media";
import { upload } from "@/api/upload";

function preventDefault (e) {
    e.preventDefault();
}

/* eslint-disable vue/name-property-casing */
export default {
    name: "user-media",
    components: {
        MediaItem,
        QrPopup,
    },
    props: {
        selectedList: Array,
        filetype: null,
    },
    data () {
        return {
            loading: false,
            uploading: false,
            parent_id: null,
            movingItem: null,
            fileList: [],
            page: 1,
            pageSize: 35,
            can_create_dir: false,
            tabs: [{ id: 0, name: "我的文件" }],
            total: 0,
        };
    },

    watch: {
        page: function (page) {
            this.requestMediaFiles();
        },
    },
    computed: {
        headers: function () {
            return { Authorization: `Bearer ${this.$store.state.user.token}` };
        },
        localFileList () {
            return this.fileList.map((item) => {
                if (find(this.selectedList, (iterate) => iterate.id === item.id)) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
                return item;
            });
        },
        uploadAllowedExtension: function () {
            return this.$store.state.myconfig.upload_allowed_extension
        },
    },
    created () {
        this.requestMediaFiles();
    },
    mounted () {
        this.globalHandleEndDragHandler = this.handleEndDrag.bind(this);
        document.addEventListener("dragover", preventDefault, false);
        document.addEventListener(
            "dragend",
            this.globalHandleEndDragHandler,
            false
        );
    },
    beforeDestroy () {
        document.removeEventListener("dragover", preventDefault, false);
        document.removeEventListener(
            "dragend",
            this.globalHandleEndDragHandler,
            false
        );
    },
    methods: {
        uploadError (res) {
            this.uploading = false;
            
            var obj = JSON.parse(res.message)
            this.$message.error(obj.message)
            // console.log("erroris", res.message, typeof(res.message));
        },

        uploadSuccess (res) {
            this.uploading = false;
            console.log("resis", res);
            createMediaFile({
                url: res.data.url,
                size: res.data.size,
                filename: res.data.original_filename,
                parent_id: this.parent_id,
                filetype: res.data.content_type.split("/")[0],
            }).then((res) => {
                if (res.status === 0) {
                    this.requestMediaFiles();
                }
            });
        },

        showEwm () {
            this.$refs.qrPopup.showewm();
        },

        requestMediaFiles () {
            this.fileList = [];
            const param = { filetype: this.filetype };
            param.parent_id = this.parent_id;
            param.page = this.page;
            param.page_size = this.pageSize || 21;
            if( param.parent_id ){
                param.page_size--
            }
            this.loading = true;
            getMediaFiles(param).then((res) => {
                this.loading = false;
                if (res.status === 0) {
                    // console.log(res.data.page.total);
                    this.total = res.data.page.total_items;
                    res.data.result.sort((item) => (item.is_dir ? -1 : 1));
                    if (res.data.upper) {
                        res.data.upper.isUpper = true;
                        res.data.upper.can_delete = false;
                        res.data.upper.can_move = false;
                        res.data.isSelected = false;
                        res.data.upper.filename = "返回上级";
                        res.data.upper.can_rename = false;
                        console.log("upper is", res.data.upper);
                        res.data.result = [res.data.upper].concat(res.data.result);
                    }
                    this.fileList = res.data.result;
                    this.can_create_dir = res.data.parent.can_create_dir;
                }
            });
        },
        removeFileItem (id) {
            const fileIndex = findIndex(this.fileList, (item) => item.id === id);
            if (fileIndex > -1) {
                this.fileList.splice(fileIndex, 1);
            }
        },
        handleDelete (id) {
            deleteMediaFile(id).then((res) => {
                if (res.status === 0) {
                    this.removeFileItem(id);
                    const item = find(this.selectedList, (iterate) => iterate.id === id);
                    if (item) {
                        this.$emit("unselect", item);
                    }
                }
            });
        },
        handleSelect (id) {
            const item = find(this.localFileList, (file) => file.id === id);
            if (item.isSelected) {
                // 已经选中了，不处理，不提供反选功能
                return;
            }
            this.$emit("select", item);
        },
        handleEditFileName (id, filename) {
            updateMediaFile(id, { filename }).then((res) => {
                if (res.status === 0) {
                    const index = findIndex(this.fileList, (item) => item.id === id);
                    const item = this.fileList[index];
                    item.filename = filename;
                    this.fileList.splice(index, 1, item);
                }
            });
        },
        handleStartDrag (id) {
            this.movingItem = find(this.localFileList, (item) => item.id === id);
        },
        handleDrop (id) {
            if (!this.movingItem) {
                return;
            }
            const curId = this.movingItem.id;
            const target = find(this.localFileList, (item) => item.id === id);
            const source = find(this.localFileList, (item) => item.id === curId);
            if (id === curId) {
                return;
            }
            if (!target.is_dir) {
                return;
            }
            if (source.is_dir && !target.can_create_dir) {
                this.$message({ message: "此目录不可以创建新目录", type: "warning" });
                return;
            }
            updateMediaFile(curId, { parent_id: id }).then((res) => {
                if (res.status === 0) {
                    this.removeFileItem(curId);
                }
            });
        },
        handleEndDrag () {
            this.movingItem = null;
        },
        getFileName (type = "dir") {
            let index = 1;
            const prefix = type === "dir" ? "目录" : "文件";
            let filename = `${prefix}${index++}`;
            while (find(this.localFileList, (item) => item.filename === filename)) {
                filename = `${prefix}${index++}`;
            }
            return filename;
        },
        handleCreateDir () {
            createMediaFile({
                filename: this.getFileName(),
                parent_id: this.parent_id,
                filetype: "dir",
                size: 0,
            }).then((res) => {
                if (res.status === 0) {
                    this.requestMediaFiles();
                }
            });
        },
        uploadToCos (req) {
            const file = req.file;
            this.uploading = true;
            upload(req.file).then(
                (res) => {
                    this.uploading = false;
                    const url = res.data.url;
                    createMediaFile({
                        url,
                        size: file.size,
                        filename: file.name || this.getFileName(),
                        parent_id: this.parent_id,
                        filetype: file.type.split("/")[0],
                    }).then((res) => {
                        if (res.status === 0) {
                            this.requestMediaFiles();
                        }
                    });
                },
                () => {
                    this.uploading = false;
                }
            );
        },
        beforeUpload (file) {
            const type = file.type;
            const allowTypes = [
                "image/jpg",
                "image/jpeg",
                "image/png",
                "image/gif",
                "video/mp4",
            ];
            let errorMsg = "";
            // 允许上传的图片文件：jpg/jpeg/png/gif
            // 允许上传的视频文件：mp4
            // 允许上传的文件类型由后台获取
            const extension = file.name.substring(file.name.lastIndexOf('.') + 1);

            if (!this.uploadAllowedExtension.includes(extension)) {
                errorMsg = "上传文件的格式不正确";
            }

            // if (this.filetype === "image") {
            //     if (allowTypes.slice(0, 4).indexOf(type) === -1) {
            //         errorMsg = "只允许上传 jpg/jpeg/png/gif 格式的图片哦";
            //     }
            // } else if (this.filetype === "video") {
            //     if (type !== allowTypes[4]) {
            //         errorMsg = "只允许上传 mp4 格式的视频哦";
            //     }
            // } else {
            //     if (allowTypes.indexOf(type) === -1) {
            //         errorMsg =
            //             "只允许上传 jpg/jpeg/png/gif 格式的图片以及 mp4 格式的视频哦";
            //     }
            // }
            if (errorMsg) {
                this.$message({ message: errorMsg, type: "warning" });
                return false;
            }
            return true;
        },
        handleExpand (id, name) {
            // 点击目录，进入下一级目录
            this.tabs.push({ id, name });
            this.parent_id = id;
            this.requestMediaFiles();
        },

        handleReturn (id) {
            // TODO
            // 点击目录返回到上级
            console.log("handle return ", id, this.tabs);
            var _this = this;
            this.tabs.forEach((tab, index) => {
                if (tab.id == id) {
                    _this.handleClick(id, index);
                }
            });
        },
        handleClick (id, index) {
            this.parent_id = id;
            this.tabs = this.tabs.slice(0, index + 1);
            this.requestMediaFiles();
        },

    },
};
</script>

<style lang="scss">
.user-media {
    margin: 10px 0 0 20px;

    .scroll-area {
        padding-top: 10px;

        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 2px;
        }
    }

    .operation-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20px;

        .el-breadcrumb__inner a {
            color: #5cb6ff;
        }
    }

    .file-area {
        display: flex;
        flex-flow: row wrap;
    }
}
</style>

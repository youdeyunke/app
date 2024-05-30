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
    <div :class="{
        [$options.name]: true,
        selected: isSelected,
        focus: isFocus,
        dragging: isDrag
    }" draggable="true" @dragstart="dragstartHandler" @dragend="dragendHandler" @dragenter="dragenterHandler"
        @drop="dropHandler">
        <div :class="{ 'item-img': true, 'with-border': !is_dir }" @click="selectHandler" @dblclick="expandHandler"
            @dragenter="dragenterHandler" @dragleave="dragleaveHandler">
            <template v-if="filetype !== 'video'">
                <img v-if="is_dir" src="@/assets/images/folder.png" object-fit="contain" class="dir-bg" />
                <img v-if="isUpper" src="@/assets/images/folder-upper.png" object-fit="contain" class="dir-upper" />

                <img v-else :src="cover_url" object-fit="contain" />
            </template>
            <video v-else width="70" height="70" :src="url" :fit="true" />
        </div>
        <template>
            <el-input size="mini" v-if="isEditing" type="text" v-model="localFileName" ref="editFileName"
                @change="submitEdit" @blur="submitEdit" @click="e => e.stopPropagation()" />
            <div v-else title="双击改名" class="item-name" @dblclick="editHandler" @dragenter="dragenterHandler"
                @dragleave="dragleaveHandler">{{ filename }}</div>
        </template>
        <Delete v-if="can_delete" class="delete-icon" @click="deleteHandler" />
        <i v-if="!is_dir" class="el-icon-success selected-icon" />
        <i v-if="!is_dir" class="el-icon-view imgview" @click.stop="clickToView(url)"></i>
    </div>
</template>

<script>
import Delete from "./Delete";

/* eslint-disable vue/name-property-casing */
export default {
    name: "media-manager-item",
    components: {
        Delete
    },
    props: {
        id: null,
        url: "",
        cover_url: "",
        filename: "",
        filetype: "",
        can_delete: false,
        can_move: false,
        is_dir: false,
        isUpper: false,
        isSelected: false,
        can_rename: false,
        movingItem: null
    },
    data () {
        return {
            isFocus: false,
            isEditing: false,
            isDrag: false,
            localFileName: this.filename
        };
    },
    watch: {
        filename (v) {
            this.localFileName = v;
        }
    },
    methods: {
        expandHandler () {
            // 如果是双击文件
            if (this.is_dir == false) {
                return false;
            }

            if (this.isUpper) {
                // 返回上一级目录
                this.$emit("return", this.id);
                return;
            }
            this.$emit("expand", this.id, this.filename);
        },
        clickToView (url) {
            window.open(url)
        },
        deleteHandler () {
            let msg;
            if (this.is_dir) {
                msg = "删除文件夹将会同时删除文件夹里的文件，确定删除吗？";
            } else {
                msg = "确定要删除该文件吗？";
            }
            this.$confirm(msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$emit("delete", this.id);
            });
        },
        selectHandler () {
            if (this.is_dir) {
                return;
            }
            this.$emit("select", this.id);
        },
        editHandler () {
            console.log("this.canedit", this.can_rename);
            if (!this.can_rename) {
                return;
            }
            this.isEditing = true;
            this.$nextTick(() => this.$refs.editFileName.focus());
        },
        submitEdit () {
            console.log("submit edit");
            if (!this.isEditing) {
                // 防止多次提交
                return;
            }
            if (!this.localFileName) {
                this.$message({ message: "文件名不能为空", type: "warning" });
                //this.$nextTick(() => {
                //  this.localFileName = this.filename;
                //});
                return;
            }
            this.$refs.editFileName.blur();
            this.isEditing = false;
            this.$emit("edit", this.id, this.localFileName);
        },
        dragstartHandler () {
            this.isDrag = true;
            this.$emit("startDrag", this.id);
        },
        dragendHandler () {
            this.isDrag = false;
        },
        dropHandler (e) {
            e.preventDefault();
            this.isFocus = false;
            this.$emit("drop", this.id);
        },
        dragenterHandler () {
            if (this.is_dir && this.movingItem && this.movingItem.id !== this.id) {
                this.isFocus = true;
            }
        },
        dragleaveHandler () {
            this.isFocus = false;
        }
    }
};
</script>

<style lang="scss">
.media-manager-item .imgview {
    position: absolute;
    right: 25px;
    top: 30px;
    font-size: larger;
    color: #fff;
    display: none;
}

.media-manager-item:hover .imgview {

    display: block;
}

.media-manager-item {
    width: 70px;
    height: 88px;
    margin: 6px 20px 10px 10px;
    position: relative;

    &:nth-child(7n) {
        /**  margin-right: 0;  
   此处是在弹窗模式下，第7个元素消除右侧边距
   **/
    }

    .item-img {
        width: 70px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.with-border {
            border: 1px solid #eee;
        }

        img {
            max-width: 100%;
            max-height: 100%;

            &.dir-bg {
                width: 60px;
            }

            &.dir-upper {
                width: 30px;
                position: absolute;
                top: 26px;
                right: 24px;
            }
        }
    }

    input {
        width: 70px;
    }

    .item-name {
        text-align: center;
        font-size: 10px;
        padding-top: 5px;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        overflow-x: hidden;
        overflow-y: hidden;

        // height: 17px;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        // overflow: hidden;
    }

    .delete-icon {
        display: none;
        font-size: 22px;
    }

    .selected-icon {
        position: absolute;
        right: -2px;
        top: 58px;
        color: #5cb6ff;
        display: none;
    }

    &:hover {
        .delete-icon {
            display: block;
        }
    }

    &.dragging {
        opacity: 0.5;
    }

    &.focus {

        .item-img,
        .item-name {
            background: rgba($color: #000000, $alpha: 0.1);
        }
    }

    &.selected {
        .item-img.with-border {
            border-color: #5cb6ff;
        }

        .item-name {
            color: #5cb6ff;
        }

        .selected-icon {
            display: block;
        }

        input {
            color: #5cb6ff;
        }
    }
}
</style>

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
    <el-dialog :visible.sync="show" width="600px" :destroy-on-close="true">
        <el-form size="small" label-position="right" label-width="120px" v-loading="loading">
            <el-form-item required label="分类名称" label-position="left">
                <el-input style="width: 440px" v-model="album.name" required />
            </el-form-item>

            <el-form-item label="转发分享文案">
                <el-input style="width: 440px" v-model="album.title" required />
            </el-form-item>

            <el-form-item label="主题配图">
                <image-picker width="440" height="150" v-model="album.cover"></image-picker>
                <div style="font-size: 10px; color: #999">
                    <i class="el-icon-info"></i>
                    最佳图片尺寸 宽度365px，高度150px 或同比例
                </div>
            </el-form-item>

            <el-form-item label="介绍说明">
                <el-input type="textarea"  maxlength="100" :rows="8" v-model="album.content" show-word-limit />
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" type="default" @click="cancleHandle" icon="el-icon-close">取消</el-button>
            <el-button size="mini" :disabled="!album.name" type="primary" @click="submitHandle" icon="el-icon-check">{{
                album.id ? "保存修改" : "创建分类"
            }}</el-button>
        </div>
    </el-dialog>
</template>

<style scoped>
.show-more {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
}

.icon-uploader {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    width: 100%;
    min-height: 100px;
    border: 2px dashed #f4f4f4;
}

.icon-uploader .el-upload {
    width: 100%;
    height: 100%;
}
</style>

<script>
import ImagePicker from "@/components/ImagePicker";
import PostsSelector from "@/components/PostsSelector";
import { updateAlbum, createAlbum } from "@/api/post";
export default {
    name: "AlbumForm",
    components: { ImagePicker, PostsSelector },
    props: {},
    data () {
        return {
            album: {},
            show: false,
            loading: false,
        };
    },
    watch: {},
    methods: {
        openDialog: function (item) {
            this.album = item;
            this.show = true
        },

        cancleHandle: function () {
            this.show = false
            this.album = {}
        },
        submitHandle: function () {
            var isok = this.validate(this.album);
            if (!isok) {
                return;
            }
            var isNew = !this.album.id;
            if (isNew) {
                return this.doCreate();
            }
            return this.doUpdate();
        },

        doCreate: function () {
            this.loading = true;
            createAlbum(this.album).then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    this.$message.success("创建成功");
                    
                    this.show = false
                    this.$emit("change", {});
                }
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },

        doUpdate: function () {
            var _this = this;
            this.loading = true;
            updateAlbum(this.album).then((resp) => {
                this.loading = false
                if (resp.status == 0) {
                    _this.$message.success("保存成功");
                    _this.$emit("change", {});
                    this.show = false
                    _this.loading = false;
                }
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },
        removeCover: function () {
            this.album.cover = "";
        },

        validate: function (data) {
            if (!data.name || data.name.length <= 2) {
                this.$message.error("分类名称不能少于2个字");
                return false;
            }

            return true;
        },
    },
};
</script>

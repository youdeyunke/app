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
        <el-form size="small" label-position="right" label-width="60px" v-loading="loading">
            <el-form-item required label="类型" label-position="left">
                <el-radio-group v-model="album.cat">
                    <el-radio label="default">默认</el-radio>
                    <el-radio label="function">编程</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="KEY">
                <el-input v-model="album.key" />
            </el-form-item>

            <el-form-item required label="代码">
                <el-input type="textarea" :rows="20" v-model="album.code" required />
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" type="default" @click="cancleHandle" icon="el-icon-close">取消</el-button>
            <el-button size="mini" type="primary" @click="submitHandle" icon="el-icon-check">保存修改</el-button>
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
    props: {
    },
    data () {
        return {
            album: {},
            show: false,
            loading: false,
            showMore: false,
        };
    },
    watch: {},
    methods: {
        cancleHandle: function () {
            this.show = false
            this.album = {}
        },

        openDialog: function (item) {
            this.album = {
                id: item.id,
                cat: item.cat,
                key: item.key,
                code: item.code,
            }
            this.show = true
        },

        submitHandle: function () {
            var _this = this;
            this.loading = true;
            updateAlbum(this.album).then((resp) => {
                this.loading = false
                if (resp.status == 0) {
                    _this.$message.success("保存成功");
                    _this.$emit("change", {});
                    _this.loading = false;
                    _this.show = false
                }
            });
        },
    },
};
</script>

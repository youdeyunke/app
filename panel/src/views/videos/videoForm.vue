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
    <el-dialog :visible.sync="show" width="500px" :destroy-on-close="true">
        <el-form size="small" label-position="right" label-width="110px" v-loading="loading">

            <el-form-item label="视频标题" label-position="left">
                <el-input style="width: 300px" v-model="currentItem.title" />
            </el-form-item>

            <el-form-item  label="作者名称" label-position="left">
                <el-input style="width: 300px" v-model="currentItem.author_name" />
            </el-form-item>

            <el-form-item label="作者头像">
                <image-picker v-model="currentItem.author_avatar" width="150" height="150" />
                <div style="font-size: 10px; color: #999">
                    <i class="el-icon-info"></i>
                    最佳图片尺寸 宽度100px，高度100px 或同比例
                </div>
            </el-form-item>

            <el-form-item  label="视频类型" label-position="left">
                <el-radio-group v-model="currentItem.is_wxvideo">
                    <el-radio :label="true">微信号视频</el-radio>
                    <el-radio :label="false">普通视频</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="视频封面图">
                <image-picker v-model="currentItem.cover" width="300" height="250" />
                <div style="font-size: 10px; color: #999">
                    <i class="el-icon-info"></i>
                    最佳图片尺寸 宽度330px，高度275px 或同比例
                </div>
            </el-form-item>

            <el-form-item  label="视频号id" v-if="currentItem.is_wxvideo" label-position="left">
                <el-input style="width: 300px" v-model="currentItem.wxauthor_id"  />
            </el-form-item>

            <el-form-item  label="视频id" v-if="currentItem.is_wxvideo" label-position="left">
                <el-input style="width: 300px" v-model="currentItem.wxvideo_id"  />
            </el-form-item>

            <el-form-item label="视频" v-if="!currentItem.is_wxvideo">
                <image-picker file-type="video" v-model="currentItem.url" width="300" height="150" />
            </el-form-item>

            <el-form-item label="点击量">
                <el-input style="width: 300px" v-model="currentItem.view_nums" type="number" />
            </el-form-item>

            <el-form-item  label="发布状态" label-position="left">
                <el-switch active-text="发布" inactive-text="隐藏" v-model="currentItem.is_public"></el-switch>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="default" icon="el-icon-close" @click="cancleHandle">取消</el-button>
            <el-button size="mini" type="primary" icon="el-icon-check" @click="submitHandle">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import ImagePicker from "@/components/ImagePicker";
import DateTimePicker from "@/components/DateTimePicker";
import {
    createVideo,
    updateVideo,
} from "@/api/video";
export default {
    name: "videoForm",
    components: { ImagePicker, DateTimePicker },

    EnumerationSelectorprops: {},
    data () {
        return {
            currentItem: {},
            show: false,
            loading: false,
        };
    },
    computed: {
        canSubmit: function () {
            var h = this.currentItem;
            if (h.desc && h.name && h.expired_at) {
                return true;
            }
            return false;
        },
    },
    watch: {},
    methods: {
        openDialog: function (item) {
            this.currentItem = item;
            this.show = true;
        },

        cancleHandle: function () {
            this.show = false;
            this.currentItem = {};
        },
        submitHandle: function () {
            var isok = this.validate(this.currentItem);
            if (!isok) {
                return;
            }
            var isNew = !this.currentItem.id;
            if (isNew) {
                return this.doCreate();
            }
            return this.doUpdate();
        },

        doCreate: function () {
            this.loading = true;
            createVideo(this.currentItem).then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    this.$message.success("创建成功");
                    this.loading = false;
                    this.show = false;
                    this.$emit("change", {});
                }
            });
        },

        doUpdate: function () {
            var _this = this;
            this.loading = true;
            updateVideo(this.currentItem).then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    _this.$message.success("保存成功");
                    _this.$emit("change", {});
                    this.show = false;
                    _this.loading = false;
                }
            });
        },

        validate: function (data) {
            if (!data.title) {
                this.$message.error("请填写视频标题");
                return false;
            }
            if (!data.author_name) {
                this.$message.error("请填写作者名称");
                return false;
            }
            if (!data.author_avatar) {
                this.$message.error("请上传作者头像");
                return false;
            }
            if (!data.cover) {
                this.$message.error("请上传视频封面图");
                return false;
            }
            if (!data.is_wxvideo && !data.url) {
                this.$message.error("请上传视频");
                return false;
            }
            if (data.is_wxvideo && !data.wxauthor_id) {
                this.$message.error("请填写视频号id");
                return false;
            }
            if (data.is_wxvideo && !data.wxvideo_id) {
                this.$message.error("请填写视频id");
                return false;
            }
            // TODO
            return true;
        },
    },
};
</script>

<style scoped>
.tips ul {
    padding: 0;
    margin: 0;
}

.tips {
    font-size: 12px;
    color: #999;
}

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

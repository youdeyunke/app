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
    <div class="vr-form" v-cloak v-if="item">
        <el-form label-position="right" size="small" label-width="120px">
            <el-form-item label="图片" required>
                <image-picker v-model="item.image" width="300" height="200"></image-picker>
                <div style="font-size: 10px; color: #999">
                    <i class="el-icon-info"></i>
                    最佳图片尺寸 宽度750px，高度530px 或同比例
                </div>
            </el-form-item>

            <el-form-item label="类型" required>
                <enumeration-selector :allow-create="true" v-model="item.cat" cat="post_banner_cat"></enumeration-selector>
            </el-form-item>

            <el-form-item label="顺序(由小到大)">
                <el-input style="width:300px" v-model="item.number" type="number"></el-input>
            </el-form-item>

            <el-form-item label="视频" v-if="item.cat == 'video'">
                <image-picker file-type="video" v-model="item.url" width="300" height="200"></image-picker>
            </el-form-item>

            <el-form-item label="VR链接" v-if="item.cat == 'vr'">
                <el-input v-model="item.url" style="width: 300px;" placeholder="以https://开头的vr页面地址"></el-input>
            </el-form-item>

            <!-- el-form-item label="备注" >
        <el-input></el-input>
      </el-form-item -->

            <el-form-item size="large">
                <el-button size="mini" type="default" icon="el-icon-close" @click="$emit('cancle')">取消</el-button>
                <el-button size="mini" type="primary" icon="el-icon-check" @click="submitHandle">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped></style>

<script>
import { createPostBanner, updatePostBanner } from "@/api/post-banner";
import ImagePicker from "@/components/ImagePicker";
export default {
    components: { ImagePicker },
    data () {
        return {
            loading: false,
        };
    },
    props: {
        item: { type: Object },
    },

    mounted: function () { },

    computed: {
        isNew: function () {
            return !this.item.id;
        },
    },

    methods: {
        doCreate: function () {
            this.loading = true;
            createPostBanner(this.item).then((resp) => {
                this.loading = false;
                this.$emit("change", {});
            });
        },
        doUpdate: function () {
            this.loading = true;
            updatePostBanner(this.item).then((resp) => {
                this.loading = false;
                this.$emit("change", {});
            });
        },

        validate: function () {
            // validate
            var item = this.item;
            if (!item.image || item.image.length <= 7) {
                this.$message.error("请上传图片");
                return false;
            }

            if (!item.cat) {
                this.$message.error("请选择图片分类");
                return false;
            }
            if(item.cat == 'vr' && !item.url) {
                this.$message.error("请输入vr链接");
                return false;
            }
            if(item.cat == 'video' && !item.url) {
                this.$message.error("请上传视频");
                return false;
            }
            return true;
        },

        submitHandle: function () {
            var isok = this.validate();
            if (!isok) {
                return;
            }

            console.log("submit item", this.item, "isok", isok);
            if (!this.isNew) {
                this.doUpdate();
                return;
            }
            this.doCreate();
        },
    },
};
</script>

<style scoped></style>

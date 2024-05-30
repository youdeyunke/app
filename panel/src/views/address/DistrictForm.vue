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
    <div>
        <el-form label-width="120px" label-position="left" :model="district" v-loading="loading" v-if="district">
            <el-form-item label="名称">
                <el-input v-model="district.name"></el-input>
            </el-form-item>

            <el-form-item label="对外显示？">
                <el-switch v-model="district.is_public"></el-switch>
            </el-form-item>

        </el-form>

        <div slot="footer" style="display: flex;justify-content: right;">
            <el-button size="mini" @click="$emit('change')" icon="el-icon-close">取消</el-button>
            <el-button size="mini" type="primary" @click="onSubmit" icon="el-icon-check">确定</el-button>
        </div>
    </div>
</template>

<script>
import { getDistrict, updateDistrict } from "@/api/district";

export default {
    data () {
        return {
            loading: true,
            district: null
        };
    },

    props: {
        itemId: { type: Number, value: 0 }
    },

    watch: {
        itemId: {
            immediate: true,
            deep: true,
            handler (val, oval) {
                this.loadDistrict();
            }
        }
    },

    methods: {
        onSubmit: function (e) {
            this.loading = true;
            updateDistrict(this.district).then(resp => {
                this.loading = false;
                if (resp.status == 0) {
                    this.$message.success("保存成功");
                    this.$emit("change", {});
                }
            });
        },

        beforeImageUpload (file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            var res = isJPG && isLt2M;
            this.loading = res;
            return res;
        },

        handleImageSuccess (url, file) {
            this.loading = false;
            this.district["group_qr_image"] = url;
            this.$message({
                type: "success",
                message: "上传成功"
            });
        },

        loadDistrict: function () {
            this.loading = true;
            getDistrict(this.itemId).then(resp => {
                this.loading = false;
                this.district = resp.data;
            });
        }
    }
};
</script>

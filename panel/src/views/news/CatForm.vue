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
    <div class="cat-form" v-cloak>
        <el-form v-loading="loading" label-position="top">
            <el-form-item label="分类名称" required>
                <el-input v-model="cat.name" placeholder="请输入分类名称"></el-input>
            </el-form-item>

            <el-form-item label="显示状态">
                <el-radio-group v-model="cat.is_public">
                    <el-radio :label="true">对外显示</el-radio>
                    <el-radio :label="false">不显示</el-radio>
                </el-radio-group>
            </el-form-item>
            <div style="display: flex;justify-content: right;">
                <el-button type="default" size="mini" @click="cancleHandle" icon="el-icon-close">取消</el-button>
                <el-button type="primary" size="mini" @click="submitHandle" icon="el-icon-check">确定</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { updateNewsCat } from "@/api/news";
import ImagePicker from "@/components/ImagePicker.vue";
export default {
    components: { ImagePicker },
    data () {
        return {
            loading: false,
        };
    },
    props: {
        cat: { type: Object },
    },

    mounted: function () { },

    computed: {},

    methods: {
        cancleHandle: function () {
            this.$emit("change", this.cat);
        },
        submitHandle: function () {
            // validate 
            if (this.cat.name.length <= 1) {
                this.$message.error("分类名称不能少于2个字");
                return false
            }
            updateNewsCat(this.cat).then((resp) => {
                if (resp.status != 0) {
                    return;
                }
                this.$message.success("已保存！");
                this.$emit("change", this.cat);
            });
        },
    },
};
</script>

<style scoped></style>
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
    <div class="" v-cloak>
        <el-form size="small" label-width="70px" label-position="right">
            <el-form-item label="评测名称">
                <el-input v-model="item.name" style="width: 400px" />
            </el-form-item>
            <el-form-item label="评测分数">
                <div style="height: 40px;display: flex;align-items: center;">
                    <el-rate v-model="item.score" allow-half></el-rate>
                </div>
            </el-form-item>
            <el-form-item label="图标">
                <image-picker v-model="item.icon"></image-picker>
                <div style="font-size: 10px; color: #999">
                    <i class="el-icon-info"></i>
                    最佳图片尺寸 宽度50px，高度50px 或同比例
                </div>
            </el-form-item>
            <el-form-item label="摘要">
                <el-input v-model="item.remark" type="textarea" :rows="6" style="width: 400px" />
            </el-form-item>
            <el-form-item label="详细说明">
                <html-editor :width="800" :height="400" v-model="item.content" />
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-close" size="mini" type="default" @click="cancleHandle">取消</el-button>
                <el-button icon="el-icon-check" @click="submitHandle" type="primary" size="mini">确定</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
  
<script>
import { updatePostReviews, createPostReviews } from "@/api/post_review";
import ImagePicker from "@/components/ImagePicker";
import HtmlEditor from "@/components/HtmlEditor";
import PostSelector from "@/components/PostSelector";
export default {
    components: { ImagePicker, PostSelector, HtmlEditor },
    data () {
        return {
            loading: false,
        };
    },

    props: {
        item: { type: Object, default: {} },
        post_id: { type: Number, default: null }
    },

    watch: {},

    mounted: function () { },

    computed: {},

    methods: {
        cancleHandle: function () {
            var showForm = false;
            this.$emit('quxiao', showForm)
        },

        submitCallback: function (resp) {
            if (!resp) {
                return;
            }
            if (resp.status == 0) {
                var showForm = false;
                this.$emit('quxiao', showForm)
                this.$emit("change", {});
            }
        },

        changeHandle: function (e) {
            // console.log("change handle", e);
            this.item.name = e.name
        },

        validate: function (item) {
            // if (!item.name) {
            //   this.$message.error("亮点不能为空");
            //   return false;
            // }

            if (!item.name) {
                this.$message.error("名称不能为空");
                return false;
            }
            if (!item.score) {
                this.$message.error("积分不能为空");
                return false;
            }

            if (!item.remark) {
                this.$message.error("摘要不能为空");
                return false;
            }
            if (!item.content) {
                this.$message.error("详细说明不能为空");
                return false;
            }
            return true;
        },

        submitHandle: function () {
            // TODO validate
            var item = this.item;
            item.post_id = this.post_id
            var isok = this.validate(item);
            if (!isok) {
                return false;
            }
            if (item.id) {
                updatePostReviews(item).then((res) => {
                    this.submitCallback(res);
                });
                return;
            }
            createPostReviews(item).then((res) => {
                this.submitCallback(res);
                return;
            });
        },
    },
};
</script>
  
<style scoped>
.inline {
    /* display: flex;
    justify-content: space-between; */
    margin-top: 20px;
}
</style>
  
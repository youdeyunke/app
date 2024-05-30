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
        <el-form label-position="right" size="small" label-width="70px">
            <div class="inline">
                <el-form-item label="亮点">
                    <!-- <enumeration-selector style="width:120px" @change="changeHandle" cat="post_points" v-model="item.cat"></enumeration-selector> -->
                    <el-input v-model="item.name" style="width: 345px" />
                </el-form-item>
                <el-form-item label="亮点图标">
                    <image-picker v-model="item.icon"></image-picker>
                    <div style="font-size: 10px; color: #999">
                        <i class="el-icon-info"></i>
                        最佳图片尺寸 宽度90px，高度90px 或同比例
                    </div>
                </el-form-item>
                <!-- <el-form-item label="楼盘选择">
                    <post-selector v-model="item.post_id" />
                </el-form-item> -->
                <el-form-item label="介绍">
                    <el-input v-model="item.desc" type="textarea" :rows="6" style="width: 345px;" />
                </el-form-item>
                <el-form-item label="亮点图片">
                    <image-picker v-model="item.image" width="345" height="425"></image-picker>
                    <div style="font-size: 10px; color: #999">
                        <i class="el-icon-info"></i>
                        最佳图片尺寸 宽度690px，高度850px 或同比例
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-close" size="mini" type="default" @click="cancleHandle">取消</el-button>
                    <el-button icon="el-icon-check" @click="submitHandle" type="primary" size="mini">确定</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import { updatePostPoints, createPostPoints } from "@/api/post_points";
import ImagePicker from "@/components/ImagePicker";
import PostSelector from "@/components/PostSelector";
export default {
    components: { ImagePicker, PostSelector },
    data () {
        return {
            loading: false,
        };
    },

    props: {
        item: { type: Object, default: {} },
    },

    watch: {},

    mounted: function () { },

    computed: {},

    methods: {
        cancleHandle: function () {
            var showForm = false;
            this.$emit("quxiao", showForm);
        },

        submitCallback: function (resp) {
            if (!resp) {
                return;
            }
            if (resp.status == 0) {
                var showForm = false;
                this.$emit("quxiao", showForm);
                this.$emit("change", {});
            }
        },

        changeHandle: function (e) {
            // console.log("change handle", e);
            this.item.name = e.name;
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
            if (!item.image) {
                this.$message.error("图片不能为空");
                return false;
            }

            if (!item.desc) {
                this.$message.error("介绍不能为空");
                return false;
            }
            return true;
        },

        submitHandle: function () {
            // TODO validate
            var item = this.item;
            var isok = this.validate(item);
            if (!isok) {
                return false;
            }
            if (item.id) {
                updatePostPoints(item).then((res) => {
                    this.submitCallback(res);
                });
                return;
            }
            createPostPoints(item).then((res) => {
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

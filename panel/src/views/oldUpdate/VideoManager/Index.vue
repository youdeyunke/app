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
    <div class="content-manager">
        <el-form label-position="right" size="small" label-width="120px">

            <el-form-item label="房源视频">
                <image-picker width="300" height="200" file-type="video" v-model="house.video"></image-picker>
            </el-form-item>

        </el-form>
        <div style="display: flex; flex-direction: row-reverse">
            <el-button type="primary" size="mini" @click="submitHandle" icon="el-icon-check" :loading="loading">保存</el-button>
        </div>
    </div>
</template>
  
<style lang="scss" scoped>
.tools {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}
</style>
  
<script>
import { updateHouseDetail } from "@/api/house";
import ImagePicker from "@/components/ImagePicker";

export default {
    components: {
        ImagePicker
    },
    props: {
        house: { type: Object, default: {} },
    },

    data () {
        return {
            loading: false,
        };
    },

    created: function () { },
    computed: {},

    methods: {

        submitHandle: function () {

            var data = {
                id: this.house.id,
                video: this.house.video
            }

            if (!data.video) {
                this.$message.error("请选择房源视频");
                return
            }

            updateHouseDetail(data).then((resp) => {
                this.loading = false;
                if (resp.status === 0) {
                    this.$message({ type: "success", message: "保存成功" });
                }
            });
        },

    },
};
</script>
  
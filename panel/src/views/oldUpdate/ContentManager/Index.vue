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
        <el-form label-position="right" size="small" label-width="120px" style="min-height: 200px;">

            <el-form-item label="详细介绍">
                <el-input style="width: 500px" type="textarea" :rows="10" :maxlength="200" show-word-limit
                    v-model="house.content" placeholder="请输入房源详细介绍"></el-input>
            </el-form-item>

        </el-form>
        <div style="display: flex; flex-direction: row-reverse">
            <el-button type="primary" size="small" @click="submitHandle" icon="el-icon-check">保存</el-button>
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

export default {
    components: {
    },
    props: {
        house: { type: Object, default: {} },
    },

    data () {
        return {
            loading: false,
        };
    },

    watch: {
    },

    created: function () { },
    computed: {},

    methods: {

        submitHandle: function () {

            var data = {
                id: this.house.id,
                content: this.house.content
            }

            if (!data.content) {
                this.$message.error("请填写房源详细介绍");
                return
            }

            updateHouseDetail(data).then((resp) => {
                this.loading = false;
                if (resp.status === 0) {
                    this.$emit("change", resp.data);
                    this.$message({ type: "success", message: "保存成功" });
                }
            });
        },

    },
};
</script>
  
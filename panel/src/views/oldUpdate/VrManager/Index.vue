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
    <div class="vr-manager">
        <el-form label-position="right" size="small" label-width="120px" style="min-height: 200px;">

            <el-form-item label="VR网址" required>
                <el-input style="width: 300px" type="url" v-model="house.vr" placeholder="请输入全景页面网址链接"></el-input>
            </el-form-item>

        </el-form>
        <div style="display: flex; flex-direction: row-reverse">
            <el-button type="primary" size="mini" @click="submitHandle" icon="el-icon-check" >保存</el-button>
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
import HelpIcon from "@/components/HelpIcon";

export default {
    components: {
        HelpIcon,
    },
    props: {
        house: { type: Object, default: {} },
    },

    data () {
        return {
            loading: false,
            url: ''
        };
    },

    created: function () { },
    computed: {},

    methods: {

        submitHandle: function () {

            var data = {
                id: this.house.id,
                vr: this.house.vr
            }

            if (!data.vr) {
                this.$message.error("请填写VR网址");
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

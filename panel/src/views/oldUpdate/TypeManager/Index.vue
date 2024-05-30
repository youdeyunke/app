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

            <el-form-item label="户型名称">
                <el-input style="width: 220px" v-model="house.type_name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="朝向">
                <enumeration-selector custom-style="width:220px" v-model="house.position" size="mini" :editable="false"
                    cat="house_position" />
            </el-form-item>

            <el-form-item label="户型图">
                <image-picker width="150" height="100" v-model="house.type_image"></image-picker>
            </el-form-item>

            <el-form-item size="large">
                <el-button type="primary" @click="submitHandle" icon="el-icon-check" size="mini" :loading="loading">提交保存</el-button>
            </el-form-item>
        </el-form>
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
import { updateHouse } from "@/api/house";
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
                type_image: this.house.type_image,
                position: this.house.position,
                type_name: this.house.type_name
            }

            if (!data.type_image) {
                this.$message.error("请选择户型图");
                return
            }
            if (!data.type_name) {
                this.$message.error("请输入户型名称");
                return
            }
            if (!data.position) {
                this.$message.error("请选择朝向");
                return
            }

            updateHouse(data).then((resp) => {
                this.loading = false;
                if (resp.status === 0) {
                    this.$message({ type: "success", message: "保存成功" });
                }
            });
        },

    },
};
</script>
  
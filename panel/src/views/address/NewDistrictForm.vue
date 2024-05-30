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
        <el-form :model="district" v-loading="loading">
            <el-form-item label="名称">
                <el-input v-model="district.name"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" style="display: flex;justify-content: right;">
            <el-button size="mini" @click="$emit('change')" icon="el-icon-close">取消</el-button>
            <el-button size="mini" type="primary" @click="onSubmit" icon="el-icon-check">确定</el-button>
        </div>
    </div>

</template>

<script>
import { createDistrict } from "@/api/district";

export default {
    data () {
        return {
            loading: false,
            district: {
                id: null,
                city_id: null,
                name: ""
            }
        };
    },

    props: {
        itemId: { type: Number, value: 0 }
    },

    watch: {
        itemId: {
            immediate: true,
            deep: true,
            handler (val, oval) { }
        }
    },

    methods: {
        onSubmit: function (e) {
            this.loading = true;
            this.district.city_id = this.itemId;
            createDistrict(this.district).then(resp => {
                this.loading = false;
                if (resp.status == 0) {
                    this.$message.success("保存成功");
                    this.$emit("change", {});
                }
            });
        }
    }
};
</script>

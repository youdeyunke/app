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
    <div class="city-form" v-cloak>
        <el-form v-loading="loading" label-width="120px" label-position="left">
            <el-form-item label="城市" required>
                <el-input v-model="city.name" placeholder="请输入城市名称"></el-input>
            </el-form-item>

            <el-form-item label="行政区划代码" required>
                <el-input v-model="city.adcode" placeholder="请输入代码"></el-input>
            </el-form-item>

            <el-form-item label="对外显示">
                <el-switch v-model="city.is_public"></el-switch>
            </el-form-item>
            
        </el-form>
        <div slot="footer" style="display: flex;justify-content: right;">
            <el-button size="mini" @click="$emit('change')" icon="el-icon-close">取消</el-button>
            <el-button size="mini" @click="submitHandle" type="primary" icon="el-icon-check">确定</el-button>
        </div>
    </div>
</template>

<script>
import { getCity, updateCity, createCity } from "@/api/city";
export default {
    components: {
    },
    data () {
        return {
            loading: false,
            city: { name: "", id: null }
        };
    },
    props: {
        itemId: { type: Number }
    },

    watch: {
        itemId: function (val) {
            console.log("watch item id", val);
            if (!val) {
                return false;
            }
            this.loadData();
        }
    },

    mounted: function () {
        this.loadData();
    },

    computed: {},

    methods: {
        submitHandle: function () {
            if (this.itemId) {
                return this.updateHandle();
            }
            return this.createHandle();
        },

        updateHandle: function () {
            updateCity(this.city).then(res => {
                this.loadData();
                this.$emit("change", this.city);
            });
        },

        createHandle: function () {
            createCity(this.city).then(res => {
                this.loadData();
                this.$emit("change", this.city);
            });
        },

        loadData: function () {
            if (!this.itemId) {
                return false;
            }
            this.loading = true;
            getCity(this.itemId).then(resp => {
                this.loading = false;
                if (resp.status != 0) {
                    return false;
                }
                this.city = resp.data;
            });
        }
    }
};
</script>

<style scoped></style>
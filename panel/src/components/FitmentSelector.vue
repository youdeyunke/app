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
    <div class="fitment" v-cloak>
        <el-select v-loading="loading" :size="size" :style="customStyle" v-model="fitmentId" placeholder="请选择">
            <el-option v-for="item,i in options" :label="item.name" :key="i" :value="item.id"></el-option>
        </el-select>
        <i v-show="!loading" class="el-icon-refresh" @click="loadData"></i>
    </div>
</template>

<script>
import { getFitmentList } from "@/api/common";
export default {
    data () {
        return {
            loading: false,
            options: [],
        };
    },
    props: {
        value: { type: Number, default: null },
        size: { type: String, default: "mini" },
        customStyle: { type: String, default: null },
    },

    mounted: function () {
        this.loadData();
    },

    computed: {
        fitmentId: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("input", val);
            },
        },
    },

    methods: {
        loadData: function () {
            this.loading = true;
            getFitmentList().then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    this.options = resp.data;
                }
            });
        },
    },
};
</script>

<style scoped></style>

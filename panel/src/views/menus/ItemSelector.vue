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
    <div class="" v-cloak v-if="items" v-loading="loading">
        <el-select v-model="itemId" filterable>
            <el-option v-for="(item, i) in items" :label="item.title" :value="item.id">{{
                item.title
            }}</el-option>
        </el-select>
    </div>
</template>

<script>
import Vue from "vue";
import { getPermissionItems } from "@/api/permission";
export default {
    data () {
        return {
            items: [],
            loading: false,
        };
    },
    props: {
        value: { type: Number, default: null },
        label: { type: String, default: "请选择上级目录" },
        cat: { type: String, default: null },
    },

    computed: {
        itemId: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("input", val);
            },
        },
    },

    mounted: function () {
        getPermissionItems().then((resp) => {
            this.items = resp.data.filter((item, i) => {
                if (!this.cat) {
                    return true;
                } else {
                    return this.cat.includes(item.cat);
                }
            });
            this.loading = false;
            if (this.items.length == 0) {
                this.$message.error("请先添加模块，再增加菜单项");
            }
        });
    },

    methods: {},
};
</script>

<style scoped></style>

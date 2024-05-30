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
    <div v-cloak>
        <el-select v-model="postIds" v-loading="loading" :disabled="disabled" :clearable="true" filterable multiple
            :style="customStyle" :size="size" :popper-append-to-body="false" :placeholder="placeholder" class="option">
            <el-option v-for="(item, index) in posts" :key="index" :label="item.title" :value="item.id">{{ item.title
            }}</el-option>
        </el-select>
        <i style="margin-left: 8px" v-show="!loading" class="el-icon-refresh-right" @click="loadData"></i>
    </div>
</template>
<script>
import { getPostSimpleList } from "@/api/post";
export default {
    name: "post-multiple-selector",
    data () {
        return {
            posts: [],
            spostIds: [],
            loading: false,
        };
    },
    props: {
        value: { type: String, default: "" },
        placeholder: { type: String, default: "请选择项目" },
        size: { type: String, default: "small" },
        customStyle: { type: String, default: null },
        firstOption: { type: Object, default: null },
        disabled: { type: Boolean, default: false },
    },

    mounted: function () {
        this.loadData();
    },

    computed: {
        postIds: {
            get () {
                return this.value ? this.value.split(",").map(Number) : [];
            },
            set (val) {
                this.$emit("input", val.toString(","));
            },
        },
    },

    methods: {
        loadData: function () {
            getPostSimpleList().then((resp) => {
                this.posts = resp.data;
            });
        },
    },
};
</script>
  
<style scoped></style>
  
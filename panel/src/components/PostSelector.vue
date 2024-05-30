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
    <div :style="customStyle" v-cloak>
        <el-select v-model="postId" v-loading="loading" :disabled="disabled" :clearable="true" filterable :size="size"
            :popper-append-to-body="true" :placeholder="placeholder" class="option">
            <el-option v-for="(item, index) in options" :key="index" :label="item.title" :value="item.id">{{ item.title
            }}</el-option>
        </el-select>
        <i style="margin-left: 8px" v-show="!loading" class="el-icon-refresh-right" @click="loadData"></i>
    </div>
</template>

<script>
import { getPostSimpleList } from "@/api/post";
export default {
    name: "post-selector",
    data () {
        return {
            posts: [],
            loading: false,
        };
    },
    props: {
        value: { type: Number, default: null },
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
        postId: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("input", val);
            },
        },
        options: function () {
            if (!this.firstOption) {
                return this.posts;
            }
            return [this.firstOption].concat(this.posts);
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

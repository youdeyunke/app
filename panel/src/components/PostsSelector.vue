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
    <div v-loading="loading" class="posts" :style="customStyle">
        <transfer filterable :titles="['待选项目', '已选项目']" @change="changeHandle" :props="{ key: 'id', label: 'title' }"
            v-model="postIds" :data="allPosts"></transfer>
    </div>
</template>

<script>
import { getPostSimpleList } from "@/api/post";

import Transfer from "@/components/Transfer";
export default {
    components: {
        Transfer,
    },

    props: {
        value: { type: Array, default: null },
        customStyle: { type: String, default: null },
    },

    computed: {
        postIds: {
            get () {
                return this.value;
            },
            set (ids) {
                this.$emit("input", ids);
            },
        },
    },
    mounted: function () {
        this.loadData();
    },
    data () {
        return {
            loading: false,
            allPosts: [],
        };
    },

    methods: {
        changeHandle: function () {
            // pass
        },
        loadData: function () {
            this.loading = true;
            getPostSimpleList().then((resp) => {
                if (resp.status == 0) {
                    this.allPosts = resp.data;
                }
                this.loading = false;
            });
        },
    },
};
</script>
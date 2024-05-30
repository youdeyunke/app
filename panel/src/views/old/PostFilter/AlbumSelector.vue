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
        <el-select :style="customStyle" v-loading="loading" :size="size" v-model="albumId" placeholder="请选择">
            <el-option v-for="item in items" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-link v-show="!loading" @click="loadData">
            <i class="el-icon-refresh-right"></i>
        </el-link>
    </div>
</template>

<script>
import { getAlbumList } from "@/api/house";
export default {
    data () {
        return {
            items: [],
            loading: false,
        };
    },
    props: {
        customStyle: { type: String, default: null },
        size: { type: String, default: "samll" },
        value: { type: Number, default: null },
    },

    mounted: function () {
        this.loadData();
    },

    computed: {
        albumId: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("input", val);
                this.$emit("change", val);
            },
        },
    },

    methods: {
        loadData: function () {
            this.loading = true;
            getAlbumList().then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    this.items = resp.data;
                }
            });
        },
    },
};
</script>

<style scoped></style>
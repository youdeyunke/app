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
    <div v-loading="loading" :style="customStyle" class="city-picker" v-cloak>
        <el-select :size="size" :style="customStyle" v-model="cityId" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
    </div>
</template>

<script>
import { getCityList } from "@/api/city";
export default {
    data () {
        return {
            loading: false,
            items: [],
        };
    },
    props: {
        firstOption: {
            type: Object,
            default: null,
        },
        value: { type: Number, default: null },
        size: { type: String, default: "small" },
        customStyle: { type: String, default: null },
    },

    mounted: function () {
        this.loadData();
    },

    computed: {
        options: function () {
            if (!this.firstOption) {
                return this.items;
            }

            return [this.firstOption].concat(this.items);
        },
        cityId: {
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
        loadData () {
            this.loading = true;
            getCityList().then((resp) => {
                this.loading = false;
                if (resp.status === 0) {
                    this.items = resp.data;
                }
            });
        },
    },
};
</script>

<style scoped></style>
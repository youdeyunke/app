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
    <div class="" v-cloak v-if="item" v-loading="loading">
        <el-form-item label="所属模块" required>
            <item-selector v-model="item.father_id" cat="dir" />
        </el-form-item>

        <el-form-item label="菜单标题" required>
            <el-input v-model="item.title" />
        </el-form-item>

        <el-form-item label="菜单图标" required>
            <el-input v-model="item.icon" />
        </el-form-item>

        <el-form-item label="组件地址" required>
            <el-input v-model="item.component_path" />
        </el-form-item>

        <el-form-item label="路由名称" required>
            <el-input v-model="item.component_name" placeholder="与组件的name字段一致" />
        </el-form-item>

        <el-form-item label="路由地址" required>
            <el-input v-model="item.path" placeholder="一级菜单必须以/开头" />
        </el-form-item>

        <el-form-item label="权限标识" required>
            <el-input v-model="item.key" />
        </el-form-item>

        <el-form-item label="是否隐藏">
            <el-switch v-model="item.hidden" />
        </el-form-item>
    </div>
</template>

<script>
import Vue from "vue";
import { getPermissionItems } from "@/api/permission";
import ItemSelector from "./ItemSelector";

export default {
    components: { ItemSelector },
    data () {
        return {
            dirs: [],
            loading: false,
        };
    },
    props: {
        item: { type: Object, default: null },
    },

    mounted: function () {
        getPermissionItems().then((resp) => {
            this.dirs = resp.data.filter((item, i) => {
                if (item.cat === "dir") {
                    return true;
                }
            });
            this.loading = false;
            if (this.dirs.length == 0) {
                this.$message.error("请先添加模块，再增加菜单项");
                Vue.set(item, "cat", "dir");
            }
        });
    },

    computed: {},

    methods: {},
};
</script>

<style scoped></style>

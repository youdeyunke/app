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
    <div class="items" v-cloak>
        <el-dialog width="400px" :visible.sync="show" :destroy-on-close='true' @closed="close" append-to-body>
            <div v-if="showForm == false">
                <el-table :data="items" v-loading="loading">
                    <el-table-column label="名称" prop="name"></el-table-column>
                    <el-table-column label="顺序" prop="number"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope" :width="160">
                            <el-link @click="editHandle(scope.row)">编辑</el-link>
                            <el-link type="danger" @click="deleteHandle(scope.row)">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <item-form @change="changeHandle" v-else :item="currentItem" :cat="cat"></item-form>
        </el-dialog>
    </div>
</template>

<script>
import { getEnumerationList, deleteEnumeration } from "@/api/enumeration";
import ItemForm from "./ItemForm";
import PublicStatus from "@/components/PublicStatus";

export default {
    components: { ItemForm, PublicStatus },
    data () {
        return {
            show: false,
            items: [],
            currentItem: null,
            showForm: false,
            loading: false,
        };
    },
    props: {
        cat: { type: String, required: true },
    },

    computed: {},

    methods: {
        open () {
            this.show = true;
            this.loadData();
        },

        close () {
            this.show = false
            this.$emit('change', {})
        },

        changeHandle: function (cat) {
            this.showForm = false;
            this.loadData();
        },

        deleteHandle: function (cat) {
            this.$confirm("确定要删除分类 " + cat.name + "吗？").then(() => {
                deleteEnumeration(cat.id).then((resp) => {
                    if (resp.status != 0) {
                        return;
                    }
                    this.loadData();
                });
            });
        },

        editHandle: function (cat) {
            this.currentItem = cat;
            this.showForm = true;
        },
        createHandle: function () {
            this.currentItem = {
                cat: this.cat,
                title: '',
                parent_id: null,
                active: true,
                number: 0,
                is_default: false,
            };
            this.showForm = true;
        },

        loadData: function () {
            var q = { cat: this.cat }
            getEnumerationList(q).then((resp) => {
                if (resp.status != 0) {
                    return;
                }
                this.items = resp.data.map((cat, i) => {
                    return cat;
                });
            });
        },
    },
};
</script>

<style scoped></style>
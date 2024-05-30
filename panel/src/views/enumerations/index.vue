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
        <item-form @change="loadData" ref="itemform"></item-form>

        <div class="myheader">
            <div class="part-left">
                <div class="block">
                    <el-input v-model="kw" style="border-radius: 100%; width: 150px" size="small" placeholder="搜索cat或名称">
                    </el-input>
                    <el-button v-if="kw" type="text" size="small" @click="clearKw">清空</el-button>
                </div>
            </div>
            <div class="part-right">
                <div class="block">
                    <el-button size="small" icon="el-icon-refresh" @click="loadData">刷新</el-button>
                </div>

                <template>
                    <div class="block">
                        <el-button size="small" type="primary"  icon="el-icon-plus"
                            @click="createHandle">创建</el-button>
                    </div>
                </template>
            </div>
        </div>
        <el-table v-loading="loading" :data="cItems" size="mini" fit highlight-current-row>
            <el-table-column prop="id" width="60px" label="#" />

            <el-table-column label="CAT" prop="cat" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="value" label="取值" />
            <el-table-column prop="number" label="排序" />

            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-link type="primary"
                        @click="editHandle(scope.row)">设置</el-link>
                    <el-link type="text" size="small" style="color:red" @click="deleteHandle(scope.row.id)">删除</el-link>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<style scoped lang="scss">
.myheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;

    .part-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .block {
            margin-left: 10px;
        }
    }

    .part-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .block {
            margin-right: 10px;
        }
    }
}
</style>

<script>
import { getEnumerationList, deleteEnumeration } from "@/api/enumeration";
import ItemForm from "./ItemForm";
export default {
    components: { ItemForm, },
    name: "enumerations",
    props: {
    },
    data () {
        return {
            loading: false,
            currentItem: { name: "", id: 0, cat: '', },
            items: [],
            kw: '',
            resItems: []
        };
    },
    watch: {
        kw: function (newValue) {
            console.log('kw值被改变了', newValue)
            this.resItems = []
            if (newValue == '') {
                this.resItems = []
                return
            } else {
                this.items.forEach((item) => {
                    if (item.cat.indexOf(newValue) != -1) {
                        this.resItems.push(item)
                    }
                    if (item.name.indexOf(newValue) != -1) {
                        this.resItems.push(item)
                    }
                })
            }
        }
    },
    computed: {
        cItems: function () {
            if (this.resItems.length == 0) {
                if (this.kw != '') {
                    return this.resItems
                }
                return this.items
            } else {
                return this.resItems
            }
        }
    },
    created: function () {
        this.loadData();
    },
    methods: {
        importHandle: function (e) {
            this.$message.success("导入成功！");
            this.loadData();
        },
        exportHandle: function () {
            this.loading = true;
            exportUiConfigs().then((res) => {
                this.loading = false;
                window.open(res.data, "_target");
            });
        },

        createHandle: function () {
            var item = {
                url: "",
                name: "",
                desc: "",
                key: "",
                active: true,
                number: 10,
                width: 100,
                height: 100,
            };
            this.$refs.itemform.openDialog(item);
        },

        editHandle: function (item) {
            this.$refs.itemform.openDialog(item);
        },

        itemChanged: function () {
            this.loadData();
        },


        loadData: function () {
            getEnumerationList().then((resp) => {
                this.items = resp.data
                this.loading = false;
            });
        },

        deleteHandle: function (id) {

            this.$confirm("确定要删除这个CAT吗？").then(() => {
                deleteEnumeration(id).then((res) => {
                    if (res.status === 0) {
                        this.$message({ type: "success", message: "删除成功！" });
                        this.loadData();
                    }
                })
            });
        },

        clearKw: function () {
            this.kw = ''
        },
    },
};
</script>

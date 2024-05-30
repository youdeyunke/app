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
    <div class="" v-cloak v-if="role">
        <el-dialog :visible="show" :destroy-on-close="true" :close-on-click-modal="false" v-loading="loading"
            @close="$emit('update:show', false)" title="分配角色权限" width="500px" :with-header="false" v-if="show">

            <el-tree ref="mytree" node-key="id" accordion :check-strictly="true" :default-checked-keys="defaultIds"
                show-checkbox :data="treeData" :default-expand-all="false">
            </el-tree>

            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="$emit('update:show', false)" icon="el-icon-close">取消</el-button>
                <el-button size="mini" type="primary" @click="submitHandle" icon="el-icon-check">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getPermissionTree, getPermissionItems, updateRole } from "@/api/permission";
export default {
    data () {
        return {
            treeData: [],
            loading: false,
        };
    },
    props: {
        show: { type: Boolean, default: false },
        role: { type: Object, default: null },
    },

    mounted: function () {
        this.loadData();
    },

    computed: {
        defaultIds: function () {
            // 初始选中的ids
            if (!this.role) {
                return [];
            }
            return this.role.permission_items.map((p) => {
                return p.id;
            });
        },
    },

    methods: {
        submitHandle: function () {
            var ids = this.$refs.mytree.getCheckedKeys();
            if (ids.length == 0) {
                this.$message.error("请至少勾选一个权限");
                return;
            }
            var data = this.role;
            data.permission_item_ids = ids;
            updateRole(data).then((resp) => {
                this.$emit("change");
                this.$emit("update:show", false);
            });
        },

        loadData: function () {
            this.loading = true;
            getPermissionTree().then((resp) => {
                this.treeData = resp.data;
                this.loading = false;
            });
        },
    },
};
</script>

<style scoped></style>

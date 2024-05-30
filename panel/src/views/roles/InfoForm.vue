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
    <div class="" v-cloak v-if="item">
        <el-dialog :visible.sync="show" :destroy-on-close="true" :close-on-click-modal="false" v-loading="loading"
            title="编辑角色" width="400px" @close="$emit('update:show', false)" :with-header="false" v-if="show">
            <el-form size="mini" label-position="left">
                <el-form-item label="角色名称" required>
                    <el-input v-model="item.name" style="width: 200px" />
                </el-form-item>

                <el-form-item label="是否激活" required>
                    <el-switch v-model="item.enable" />
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="$emit('update:show', false)" icon="el-icon-close">取消</el-button>
                <el-button size="mini" icon="el-icon-check" type="primary" @click="() => {
                        $emit('submit');
                    }
                    ">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
        };
    },
    props: {
        show: { type: Boolean, default: false },
        item: { type: Object, default: null },
    },

    mounted: function () { },

    computed: {},

    methods: {},
};
</script>

<style scoped></style>

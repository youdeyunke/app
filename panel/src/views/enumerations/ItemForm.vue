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
    <el-dialog :visible.sync="show" :fullscreen="false" v-loading="loading" :destroy-on-close="true" width="500px"
        title="枚举值设置">

        <el-form label-position="left" size="small" label-width="100px">
            <el-form-item label="CAT">
                <el-input style="width:220px" v-model="item.cat"></el-input>
            </el-form-item>

            <el-form-item label="名称">
                <el-input style="width:220px" v-model="item.name"></el-input>
            </el-form-item>

            <el-form-item label="取值">
                <el-input style="width:220px" v-model="item.value"></el-input>
            </el-form-item>

            <el-form-item label="是否启用">
                <el-radio v-model="item.active" :label="true">是</el-radio>
                <el-radio v-model="item.active" :label="false">否</el-radio>
            </el-form-item>

            <el-form-item label="显示顺序">
                <el-input style="width:220px" v-model="item.number"></el-input>
            </el-form-item>

        </el-form>

        <div slot="footer">
            <el-button size="mini" @click="cancleHandle" icon="el-icon-close">取消</el-button>
            <el-button size="mini" type="primary" @click="submitHandle" icon="el-icon-check">确定</el-button>
        </div>

    </el-dialog>
</template>

<script>
import { updateEnumeration, createEnumeration, deleteEnumeration } from '@/api/enumeration'
export default {
    data () {
        return {
            show: false,
            item: {},
            loading: false,
        };
    },
    props: {
    },
    components: {},

    mounted: function () {
    },

    computed: {
    },

    methods: {
        validate: function () {
            var d = this.item
            if (!d.cat || !d.name || !d.value) {
                this.$message.error("信息填写不完整")
                return false
            }
            return true
        },

        openDialog: function (item) {
            this.item = item
            this.show = true
        },
        cancleHandle: function () {
            this.show = false
            this.item = {}
        },

        submitHandle: function () {
            var isok = this.validate()
            if (!isok) {
                return
            }

            this.loading = true
            if (this.item.id) {
                updateEnumeration(this.item).then((res) => {
                    this.loading = false
                    this.show = false
                    this.$emit("change", {})
                })
            }
            // create  
            else {
                createEnumeration(this.item).then((res) => {
                    this.loading = false
                    this.show = false
                    this.$emit("change", {})
                })
            }
        },

    }
};
</script>

<style scoped></style>
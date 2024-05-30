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
    <div v-cloak>
        <template v-if="multiple == false">
            <template v-if="radio == false">
                <el-select v-model="itemValue" v-loading="loading" @change="changeHandle" :disabled="disabled"
                    :filterable="true" :allow-create="allowCreate == true || allowCreate == 'true'" :clearable="true"
                    default-first-option :style="customStyle" :size="size" :popper-append-to-body="popperAppendToBody"
                    :placeholder="placeholder" class="option">
                    <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.value">{{
                        item.name }}</el-option>
                </el-select>
            </template>

            <template v-else>
                <el-radio-group v-model="itemValue" :size="size" :disabled="disabled">
                    <el-radio :disabled="item.active === false" v-for="(item, index) in options" :key="index"
                        :label="item.value">{{ item.name }}</el-radio>
                </el-radio-group>
            </template>
        </template>
        <template v-if="multiple == true">
            <el-checkbox-group v-model="itemValue">
                <el-checkbox v-for="t in options" v-bind:key="t.id" :label="t.value">{{
                    t.name
                }}</el-checkbox>
            </el-checkbox-group>
        </template>

        <template v-if="editable">
            <i style="margin-left: 8px" v-show="!loading" class="el-icon-refresh-right" @click="loadData"></i>

            <el-link @click="settingHandle">设置</el-link>
        </template>

        <enumeration-manager @change="loadData" :cat="cat" ref="manager"></enumeration-manager>
    </div>
</template>

<script>
// 请求公司数据的api
import { getEnumerationList } from "@/api/enumeration";
import EnumerationManager from "@/components/EnumerationManager/Index";
export default {
    //组件名
    name: "enumeration-selector",
    //  接收父组件值
    props: {
        value: { type: [String, Array], default: null },
        allowCreate: { type: [Boolean, String], default: false },
        editable: { type: Boolean, default: false },
        multiple: { type: Boolean, default: false },
        size: { type: String, default: "small" },
        placeholder: { type: String, default: "请选择" },
        cat: { type: String, default: null, required: true },
        customStyle: { type: String, default: null },
        firstOption: { type: Object, default: null },
        radio: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        popperAppendToBody: { type: Boolean, default: false },
    },

    components: {
        EnumerationManager,
    },

    data () {
        return {
            loading: false,
            items: [],
        };
    },
    created () {
        this.loadData();
    },

    computed: {
        itemValue: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("input", val);
            },
        },
        options: function () {
            if (!this.firstOption) {
                return this.items;
            }
            return [this.firstOption].concat(this.items);
        },
    },

    methods: {
        changeHandle: function (val) {
            //根据val找到选项的完整对象，并非返回
            var res = this.options.filter((item) => {
                return item.value == val
            })

            var item = null
            if (res.length == 1) {
                item = {
                    name: res[0].name,
                    value: res[0].value,
                }
            }
            this.$emit('change', item)

        },
        settingHandle: function () {
            // 打开管理界面
            this.$refs.manager.open();
        },

        loadData: function () {
            this.loading = true;
            getEnumerationList({ cat: this.cat }).then((resp) => {
                if (resp.status == 0) {
                    this.items = resp.data;
                }
                this.loading = false;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.option {
    height: 32px !important;
}
</style>
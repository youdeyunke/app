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
    <div class="search-box" v-cloak>
        <el-input style="margin-right: 8px" size="small" v-model="kw" placeholder="搜索楼盘标题">
            <el-button @click="searchHandle" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="text" @click="() => (showDialog = true)">高级搜索</el-button>
        <el-button v-if="hasFilter" type="text" @click="clearHandle">取消</el-button>

        <el-dialog :visible.sync="showDialog" title="高级筛选" width="600px">
            <el-form label-position="right" label-width="100px" size="small">
                <el-form-item label="状态">
                    <enumeration-selector custom-style="width:220px" v-model="publish_status" size="mini" :editable="false"
                        :firstOption="{ name: '不限', value: null }" cat="house_publish_status" />
                </el-form-item>

                <el-form-item label="业务类型">
                    <enumeration-selector custom-style="width:220px" v-model="business" size="mini" :editable="false"
                        :firstOption="{ name: '不限', value: null }" cat="house_business" />
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancleHandle" size="small" icon="el-icon-close">取消</el-button>
                <el-button @click="submitHandle" type="primary" size="small" icon="el-icon-check">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    data () {
        return {
            kw: "",
            mode: "simple", // advance
            defaultFirstOption: { name: "不限", id: null },
            showDialog: false,
            publish_status: '',
            business: '',
        };
    },
    props: {},

    components: {

    },

    mounted: function () { },

    computed: {
        hasFilter: function () {
            // 是否输入了搜索条件
            return Object.keys(this.filter).length >= 1;
        },
        filter: function () {
            var v = {};
            if (this.kw) {
                v.kw = this.kw;
            }
            // user id
            if (this.business) {
                v.business = this.business
            }
            if (this.publish_status) {
                v.publish_status = this.publish_status
            }
            return v;
        },
    },

    methods: {
        clearHandle: function () {
            var _this = this;
            Object.keys(this.filter).forEach((key, i) => {
                this.$set(_this, key, null);
            });
            this.$emit("change", {});
        },

        cancleHandle: function () {
            this.showDialog = false;
        },
        submitHandle: function (e) {
            // 高级搜索模式
            var filter = this.filter;
            this.$emit("change", this.filter);
            this.showDialog = false;
        },

        searchHandle: function (e) {
            this.$emit("change", this.filter);
        },
    },
};
</script>

<style scoped>
.search-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>

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
                <el-form-item label="关键词">
                    <el-input style="width: 200px" v-model="kw" placeholder="在项目名称中搜索关键词"></el-input>
                </el-form-item>

                <el-form-item label="城市">
                    <city-selector custom-style="width:200px;" :first-option="defaultFirstOption"
                        v-model="city_id"></city-selector>
                </el-form-item>

                <el-form-item label="行政区">
                    <district-selector custom-style="width:200px;" :first-option="defaultFirstOption" :city-id="city_id"
                        v-model="district_id"></district-selector>
                </el-form-item>

                <el-form-item label="售价范围">
                    <el-input type="number" style="width: 45%" v-model="total_price_min" placeholder="万元"></el-input>
                    <span style="margin: 0 4px">至</span>
                    <el-input type="number" style="width: 45%" v-model="total_price_max" placeholder="万元"></el-input>
                </el-form-item>

                <el-form-item label="面积范围">
                    <el-input type="number" style="width: 45%" v-model="area_min" placeholder="平"></el-input>
                    <span style="margin: 0 4px">至</span>
                    <el-input type="number" style="width: 45%" v-model="area_max" placeholder="平"></el-input>
                </el-form-item>

                <el-form-item label="分类">
                    <album-selector custom-style="width:200px;" size="small" v-model="album_id"></album-selector>
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
import UserSelector from "@/components/UserSelector";
import AlbumSelector from "./AlbumSelector";
import CitySelector from "@/components/CitySelector";
import DistrictSelector from "@/components/DistrictSelector";
export default {
    data () {
        return {
            kw: "",
            mode: "simple", // advance
            defaultFirstOption: { name: "不限", id: null },
            showDialog: false,
            area_min: null,
            area_max: null,
            city_id: null,
            district_id: null,
            total_price_min: null,
            total_price_max: null,
            album_id: null,
            user_id: null,
            loading: false,
            saleStatusItems: [],
            saleStatusIds: [],
            fitmentItems: [],
            fitmentIds: [],
            catItems: [],
            catIds: [],
            tagItems: [],
            tagIds: [],
        };
    },
    props: {},

    components: {
        AlbumSelector,
        CitySelector,
        DistrictSelector,
        UserSelector,
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
            if (this.user_id) {
                v.user_id = this.user_id;
            }
            if (this.area_min && this.area_max) {
                v.area = this.area_min + "," + this.area_max;
            }
            if (this.total_price_min && this.total_price_max) {
                v.total_price = this.total_price_min + "," + this.total_price_max;
            }
            if (this.album_id) {
                v.album_id = this.album_id;
            }
            if (this.city_id) {
                v.city_id = this.city_id;
            }
            if (this.district_id) {
                v.district_id = this.district_id;
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

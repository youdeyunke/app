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
    <div class="district-picker" v-cloak>
        <el-cascader :disabled="loading" ref="city" v-model="ids" :options="cityItems" :size="size" :style="customStyle"
            placeholder="请选择区域" @change="cityDistrictChange">
            <template slot-scope="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
        </el-cascader>
        <i class="el-icon-refresh" @click="loadCityItems"></i>
    </div>
</template>

<script>
import {getPublicCityTree} from "@/api/city_tree";
import { getDistrict } from "@/api/district";
export default {
    data () {
        return {
            district: null,
            cityItems: [],
            loading: true,
        };
    },
    props: {
        value: { type: Number, default: null },
        size: { type: String, default: "default" },
        customStyle: { type: String, default: null },
    },

    mounted: function () {
        this.loadCityItems();
    },

    watch: {
        value: {
            immediate: true,
            deep: true,
            handler (val) {
                if (!val) {
                    return false;
                }
                this.loadDistrict();
            },
        },
    },

    computed: {
        ids: {
            get () {
                if (!this.district) {
                    return [0, 0];
                }
                return [this.district.city_id, this.district.id];
            },
            set () {
                // pass
            },
        },
    },

    methods: {
        loadDistrict: function () {
            var id = this.value;
            if (!id) {
                return false;
            }
            getDistrict(id).then((resp) => {
                this.loading = false;

                this.district = resp.data;
            });
        },
        cityDistrictChange: function (e) {
            if (!e) {
                return false;
            }
            var cityId = e[0];
            var districtId = e[1];
            this.$emit("input", districtId);
            this.$emit("change", districtId);
        },

        loadCityItems: function () {
            this.loading = true;
            var _this = this;
          getPublicCityTree().then((resp) => {
                _this.loading = false;
                _this.cityItems = resp.data.map((city, i) => {
                    return {
                        label: city.text,
                        value: city.id,
                        children: city.children.map((dis, j) => {
                            return {
                                label: dis.text,
                                value: dis.id,
                            };
                        }),
                    };
                });
            });
        },
    },
};
</script>

<style scoped></style>

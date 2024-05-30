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
        <div class="myheader">
            <div class="part-left">
                <el-input placeholder="输入关键字搜索城市、行政区、消息" size="small" v-model="filterText"></el-input>
            </div>
            <div class="part-right">
                <el-button type="primary" @click="createCityHandle" size="small" icon="el-icon-plus">添加城市</el-button>
            </div>
        </div>
        <el-tree :data="treeData" node-key="id" ref="tree" :accordion="true" :filter-node-method="filterNode"
            :expand-on-click-node="true">
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <div class="tree-item-name">
                    {{ data.label }}
                    <public-status :status="data.is_public"></public-status>
                </div>

                <span>
                    <i v-if="data.level == 'sub_district'" class="el-icon-s-home"></i>
                </span>
                <span>
                    <el-link type="primary" icon="el-icon-edit" v-if="data.level == 'city'"
                        @click="() => createDistrictHandle(data)">添加行政区</el-link>
                    <el-link type="primary" v-if="!data.default && data.is_public"
                        @click="() => setDefault(data)">设为默认</el-link>
                    <el-link type="primary" icon="el-icon-edit" @click="() => editHandle(data)">编辑</el-link>

                    <el-link v-if="data.level == 'city'" :type="data.is_public == true ? 'danger' : 'primary'"
                        icon="el-icon-trash" @click="() => publicHandle(data)">{{ data.is_public == true ? '隐藏' :
                            '显示' }}</el-link>
                </span>
            </div>
        </el-tree>


        <el-dialog :modal-append-to-body="true" :visible.sync="showDialog" title="编辑信息" width="300px"
            :destroy-on-close="true">
            <district-form v-if="currentItemLevel == 'district'" :item-id="currentItemId" @change="loadData" />

            <new-district-form v-if="currentItemLevel == 'district.new'" :item-id="currentItemId" @change="loadData" />

            <city-form v-if="currentItemLevel == 'city'" :item-id="currentItemId" @change="loadData" />
        </el-dialog>
    </div>
</template>

<script>
import { getCityTree } from "@/api/city_tree";
import { updateCity, setDefaultCity } from "@/api/city";
import DistrictForm from "./DistrictForm";
import NewDistrictForm from "./NewDistrictForm";
import CityForm from "./CityForm";
import PublicStatus from "@/components/PublicStatus";
import UdCard from '@/components/UdCard';

export default {
    components: { DistrictForm, CityForm, NewDistrictForm, PublicStatus, UdCard },
    data () {
        return {
            filterText: "",
            treeData: [],
            currentItemLevel: "",
            currentItemId: "",
            loading: true,
            showDialog: false
        };
    },
    props: {},

    mounted: function () {
        this.loadData();
    },
    watch: {
        filterText (val) {
            this.$refs.tree.filter(val);
        }
    },

    methods: {
        filterNode (value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        createDistrictHandle: function (data) {
            this.currentItemId = data.id;
            this.currentItemLevel = "district.new";
            this.showDialog = true;
        },

        createCityHandle: function () {
            this.currentItemId = null;
            this.currentItemLevel = "city";
            this.showDialog = true;
        },

        editHandle (data) {
            this.currentItemId = data.id;
            this.currentItemLevel = data.level;
            this.showDialog = true;
        },

        publicHandle (data) {
            console.log("data is", data);
            var c = {
                id: data.id,
                is_public: !data.is_public
            }
            updateCity(c).then(res => {
                this.loadData();
            });
        },

        setDefault (data) {
            console.log('233', data)
            setDefaultCity(data.id).then(res => {
                if (res.code != 0) {
                    return
                }
                this.$message.success("设置成功")
                this.loadData();
            })

        },

        loadData: function () {
            getCityTree().then(resp => {
                this.treeData = resp.data;
                this.loading = false;
                this.showDialog = false;
            });
        }
    }
};
</script>

<style scoped lang="scss">
.custom-tree-node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    width: 100%;
}

.custom-tree-node .tree-item-name {
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.myheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;

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

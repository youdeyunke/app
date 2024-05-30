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
        <el-autocomplete min="2" max="20" :size="size" popper-class="myselect" :style="customStyle"
            :fetch-suggestions="remoteSearch" :placeholder="placeholder" @select="selectHandle" v-model="name"
            placeholder="请输入">
            <template slot-scope="scope">
                <div class="myoption">
                    <div class="name">{{ scope.item.title }}</div>
                    <div class="address">{{ scope.item.city }}{{ scope.item.district }}{{ scope.item.address }}</div>
                </div>
            </template>
        </el-autocomplete>
    </div>
</template>

<script>
import { searchPoi } from "@/api/poi";

export default {
    data () {
        return {
            searching: false
        };
    },
    props: {
        customStyle: { type: String, value: null },
        placeholder: { type: String, value: '输入关键词搜索' },
        size: { type: String, value: "small" },
        value: { type: String, value: "" },
        city: { type: String },
        district: { type: String }
    },

    mounted: function () { },

    computed: {
        name: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("input", val);
            }
        }
    },

    methods: {
        submitHandle: function () {
            // 输入名称后，失去焦点
            if (!this.name) {
                return false;
            }
            var data = { name: this.name };
            this.$emit("change", data);
        },
        selectHandle: function (poi) {
            this.$emit("change", poi);
            // 选中之后，将下来框清空
        },
        remoteSearch: function (kw, cb) {
            if (kw == "" || !kw) {
                return cb([]);
            }

            // 防止重复搜索
            if (this.searching) {
                return false;
            }

            this.pois = [];
            this.searching = true;
            var fullKw = (this.city || '') + (this.district || '') + kw;
            console.log("search poi with full kw", fullKw);
            searchPoi(fullKw).then(resp => {
                this.searching = false;
                if (resp.status == 0) {
                    return cb(resp.data);
                }
            });
        }
    }
};
</script>

<style scoped>
.myselect .myoption {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid #f4f4f4;
}

.myselect .myoption .name {
    color: #333;
    font-weight: bolder;
    width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    font-size: 12px;
}

.myselect .myoption .address {
    font-size: 12px;
    color: #666;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
</style>
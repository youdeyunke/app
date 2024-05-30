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
    <div class="range-input" :style="customStyle" v-cloak>
        <input v-model="leftValue" placeholder="" type="number" />
        <span class="blank">至</span>
        <input v-model="rightValue" placeholder="" type="number" />
        <span class="unit" v-if="unit">{{ unit }}</span>
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
        customStyle: { type: String, default: "width:400px;" },
        value: {
            type: Array,
            default: [],
        },
        unit: { type: String, default: "" },
    },

    mounted: function () { },

    computed: {
        leftValue: {
            get () {
                return this.value[0];
            },
            set (val) {
                var res = [val, this.value[1]];
                this.$emit("input", res);
            },
        },
        rightValue: {
            get () {
                return this.value[1];
            },
            set (val) {
                var res = [this.value[0], val];
                this.$emit("input", res);
            },
        },
    },

    methods: {},
};
</script>

<style scoped>
.range-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    line-height: 30px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0;
    float: left;
}

.range-input input {
    border: none;
    font-size: 12px;
    height: 100%;
    padding: 0 6px;
    flex: 1;
    width: 40%;
}

.range-input .blank {
    width: 30px;
    text-align: center;
    color: #909399;
    font-size: 12px;
}

.range-input .unit {
    background: #f5f7fa;
    padding: 0 10px;
    font-size: 12px;
    border-left: 1px solid #dcdfe6;
    text-align: center;
}
</style>
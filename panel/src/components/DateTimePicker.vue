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
    <el-date-picker style="width:200px;" v-model="date" :editable="editable" :disabled="disabled" :size="size"
        type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择到期时间日期" />
</template>

<script>
export default {
    // 组件名
    props: {
        value: { type: String, default: "" },
        size: { type: String, default: "default" },
        disabled: { type: Boolean, default: false },
        editable: { type: Boolean, default: false },
    },
    name: "time-picker",
    data () {
        return {};
    },

    computed: {
        date: {
            get () {
                return this.value;
            },
            set (val) {
                if (val === null) {
                    this.$emit("input", null);
                    return;
                }
                var dt = this.formtDateValue(val);
                this.$emit("input", dt);
            },
        },
    },

    methods: {
        // 时间过滤器
        formtDateValue: function (e) {
            if (typeof e === "object") {
                var v = e.toLocaleDateString();
                var y = e.getFullYear();
                var m = e.getMonth() + 1;
                var d = e.getDate();
                var h = e.getHours();
                var mm = e.getMinutes();
                var date = y + "-" + m + "-" + d + "   " + h + ":" + mm;
                return date;
            }
        },
    },
};
</script>


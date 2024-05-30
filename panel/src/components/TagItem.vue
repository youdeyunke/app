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
    <span :class="'tag ' + size" :style="{ borderColor: borderColor, color: color }" v-cloak>{{ item.name }}</span>
</template>



<script>
export default {
    data () {
        return {
            loading: false,
        };
    },
    props: {
        item: { type: Object, default: {} },
        size: { type: String, default: 'mini' },
    },

    mounted: function () { },

    computed: {
        color: function () {
            return this.item.color || "#1989FA";
        },

        borderColor: function () {
            return this.color;
        },
    },

    methods: {},
};
</script>

<style scoped>
.tag {
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    padding: 2px 4px;
    margin-top: 4px;
    display: inline-flex;
    margin-right: 4px;
}

.tag.mini {
    font-size: 12px;
    border-radius: 3px;
    scale: 0.7;
    height: 19px;
    line-height: 19px;
    padding: 0 4px
}
</style>
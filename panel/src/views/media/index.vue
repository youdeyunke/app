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
    <div class="app-container" v-cloak>
        <ud-card>
            <user-media></user-media>
        </ud-card>
    </div>
</template>

<script>
import UserMedia from "@/components/MediaManager/UserMedia";
import UdCard from "@/components/UdCard";
export default {
    components: { UserMedia, UdCard },
    data () {
        return {
            loading: false
        };
    },
    props: {},

    mounted: function () { },

    computed: {},

    methods: {}
};
</script>

<style scoped></style>
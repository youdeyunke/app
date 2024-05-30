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
    <div v-cloak class>
        <h1>mm组件</h1>
        <button @click="showDialog = true">点我打开窗口</button>
        <h2>您选择的图片为</h2>
        <img v-for="(item, index) in selectedList" :key="index" :src="item" width="100" />

        <media-manager :limit="4" :file-types="fileTypes" default-tab="public" :show.sync="showDialog"
            @selected="handleSelected" />
    </div>
</template>

<script>
import MediaManager from '@/components/MediaManager/Index'

export default {
    components: { MediaManager },
    data () {
        return {
            showDialog: false,
            fileTypes: ['video'], // 取值有3中情况： ['image'] 表示只能选中图片， ['video']表示只能选中video， ['image', 'video'] 表示能选中image 和video

            selectedList: []
        }
    },
    props: {},

    mounted: function () { },

    computed: {},

    methods: {
        handleSelected (list) {
            this.selectedList = list
        }
    }
}
</script>

<style scoped></style>

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
    <div class="media-manager-dialog-footer">
        <span>已选择({{ selected.length }}/{{ limit }})</span>
        <div class="selected-image-list">
            <div v-for="(item, index) in selected" :key="index" class="selected-image-item">
                <img v-if="item.filetype === 'image'" :src="item.url" object-fit="contain" />
                <video v-else width="100%" height="100%" :src="item.url" muted loop autoplay controls />
                <Delete @click="handleDelete(item)" />
            </div>
        </div>
        <el-button size="small" @click="$emit('cancel')" icon="el-icon-close">取消</el-button>
        <el-button type="primary" size="small" @click="$emit('ok')" icon="el-icon-check">确定</el-button>
    </div>
</template>
<script>
import Delete from "./Delete";

export default {
    components: {
        Delete,
    },
    props: {
        selected: Array,
        limit: Number,
    },
    methods: {
        handleDelete (item) {
            this.$emit("unselect", item);
        },
    },
};
</script>
<style lang="scss">
.media-manager-dialog-footer {
    display: flex;
    align-items: center;
    height: 48px;

    .selected-image-list {
        flex: 1;
        margin: 0 10px;
        overflow-x: auto;
        display: flex;
        flex-flow: row nowrap;
        padding-top: 6px;
    }

    .selected-image-item {
        width: 50px;
        height: 50px;
        margin-left: 10px;
        border: 1px solid #dcdfe6;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-grow: 0;
        flex-shrink: 0;

        &:first-child {
            margin-left: 0;
        }

        img {
            max-width: 100%;
            max-height: 42px;
            vertical-align: top;
        }
    }
}</style>

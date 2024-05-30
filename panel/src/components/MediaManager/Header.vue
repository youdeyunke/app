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
    <div class="media-manager-dialog-header">
        <span>多媒体文件管理</span>
        <i class="el-icon-warning-outline" />
        <span class="title-desc">只能添加：{{ text }} 格式文件</span>
    </div>
</template>
<script>
export default {
    props: {
        text: String
    }
};
</script>
<style lang="scss">
.media-manager-dialog-header {
    display: flex;
    align-items: center;

    i {
        margin: 0 5px 0 15px;
    }

    .title-desc {
        font-size: 12px;
    }
}
</style>
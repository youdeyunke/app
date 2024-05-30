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
    <div class="meta-content-manager" v-cloak v-loading="loading">
        <el-alert style="margin-bottom: 20px" type="info" :closable="false">楼盘参数格式说明：以冒号分割，按回车换行，例如"车位数：200个"</el-alert>
        <meta-editor :rows="15"  v-model="metaData.value"></meta-editor>
        <div class="btns">
            <el-button @click="submitHandle" icon="el-icon-check" type="primary" size="small">保存</el-button>
        </div>
    </div>
</template>

<script>
import MetaEditor from "@/components/MetaEditor";
import { getMetaContent, updateMetaContent } from "@/api/meta_content";

export default {
    components: {
        MetaEditor,
    },
    data () {
        return {
            metaData: { id: null, value: "" },
            loading: true,
        };
    },
    props: {
        metaContentId: {
            type: Number,
        },
    },
    watch: {
        metaContentId: {
            immediate: true,
            deep: true,
            handler (val) {
                if (!val) {
                    return false;
                }
                this.loadData();
            },
        },
    },

    mounted: function () { },

    computed: {},

    methods: {
        submitHandle: function () {
            if (this.metaData.value.length == 0) {
                this.$message.warning("参数不能为空");
                return false;
            }
            this.loading = true;
            updateMetaContent(this.metaData).then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    this.loadData();
                    this.$message.success("已保存");
                }
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });;
        },
        loadData: function () {
            this.loading = true;
            getMetaContent(this.metaContentId).then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    this.metaData = resp.data;
                }
            });
        },
    },
};
</script>

<style scoped>
.btns {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
}
</style>

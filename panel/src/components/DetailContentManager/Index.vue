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
    <div class="content-manager" v-cloak v-loading="loading">
        <div class="container">
            <div class="content-section">
                <h4>图文内容编辑</h4>
                <el-alert class="info-alert" :closable="false" type="info">可以插入图文内容</el-alert>
                <html-editor :height="600" v-model="detailData.value"></html-editor>
                <div class="btns">
                    <el-button @click="submitHandle" icon="el-icon-check" type="primary" size="small">保存</el-button>
                </div>
            </div>
            <div class="line"></div>
            <div class="image-section">
                <h4>显示效果预览</h4>
                <img class="main-image" src="https://tcdn.udeve.net/udyk/65f794fd8ecae7a61b978140.png" alt="Image">
                <div class="text-container">
                    <div class="text-content" v-html="detailData.value"></div>
                </div>
            </div>
        </div>

        <!-- <el-alert style="margin-bottom: 20px" :closable="false" type="info">可以插入图文内容</el-alert>
        <html-editor :height="600"  v-model="detailData.value"></html-editor> -->


    </div>
</template>

<script>
import { getDetailContent, updateDetailContent } from "@/api/detail_content";
import HtmlEditor from "@/components/HtmlEditor";

export default {
    components: {
        HtmlEditor,
    },
    data () {
        return {
            detailData: { id: null, value: "" },
            loading: false,
        };
    },
    props: {
        detailContentId: {
            type: Number,
        },
    },
    watch: {
        detailContentId: {
            immediate: true,
            deep: true,
            handler (val, oval) {
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
            this.loading = true;
            updateDetailContent(this.detailData).then((resp) => {
                this.loading = false;
                if(resp.code != 0){
                    return
                }
                this.loadData();
                this.$message.success("已保存");
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });;
        },
        loadData: function () {
            this.loading = true;
            getDetailContent(this.detailContentId).then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    this.detailData = resp.data;
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
.line{
    width: 2px;height: 600px;background-color: #f4f4f4;
}
.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.content-section {
    /* flex: 1; */
    width: 500px;
}

.info-alert {
    margin-bottom: 20px;
}

.image-section {
    position: relative;
    /* margin: 0 auto; */
    /* margin-left: 300px; */
    width: 500px;
    height: 760px;
    /* flex: 1; */
}

.main-image {
    max-height: 650px;
    width: auto;
}

.text-container {
    position: absolute;
    top: 162px;
    left: 90px;
    width: 215px;
    height: 420px;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 1);
}

.text-content {
    word-wrap: break-word;
    max-width: 100%;
    padding: 10px;
}
.text-content ::v-deep img{
     max-width:100%;
 }


</style>

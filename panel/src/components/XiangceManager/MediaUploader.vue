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
    <div id="uploader">
        <div @click="clickHandle" class="btn" :loading="loading">上传图片/视频</div>
        <media-manager :limit="20" :file-types="['image', 'video']" :show.sync="showMM"
            @selected="selectedHandle"></media-manager>
    </div>
</template>

<style scoped>
.btn {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script>
import { getAppConfig } from "@/api/myconfig";
import { createMediaItem } from "@/api/xiangce";
import MediaManager from "@/components/MediaManager/Index";

export default {
    components: {
        MediaManager,
    },
    props: {
        cat: { type: Object, default: null },
    },
    data () {
        return {
            cdnDomain: "tcdn.udeve.net",
            cdnProtoco: "http",
            loading: true,
            uploading: false,
            showMM: false,
        };
    },

    watch: {},

    computed: {
        allowFileSizeStr: function () {
            var v = this.allowFileSize / 1024 / 1024;
            return v + "Mb";
        },
        allowFileTypeStr: function () {
            return this.allowFileTypes.join("/");
        },
    },

    mounted: function () { },

    created: function () {
        getAppConfig().then((resp) => {
            this.cdnDomain = resp.data["cdn_domain"];
            this.cdnProtoco = resp.data["cdn_https"] == true ? "https" : "http";
        });
    },

    methods: {
        clickHandle: function () {
            this.showMM = true;
        },

        selectedHandle: function (items) {
            // 保存到数据库
            this.uploading = true;
            console.log("items", items);
            var _this = this;
            items.forEach((file, index) => {
                var mediaItem = {
                    media_cat_id: _this.cat.id,
                    url: file.url,
                    size: file.size,
                    filetype: file.filetype,
                };
                _this.doSubmit(mediaItem);
            });
        },

        doSubmit: function (item) {
            // 将文件保存到相册中
            this.uploading = true;
            createMediaItem(item).then((resp) => {
                this.$emit("change", { id: this.cat.id });
                this.uploading = false;
            });
        },
    },
};
</script>
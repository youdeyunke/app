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
    <div style="height: 100vh;display: flex;align-items: center;justify-content: center;">
        <div class="mobileUploader">
            <el-upload v-loading="uploading" action="/api/v6/upload" :show-file-list="true" element-loading-text="上传中"
                :headers="headers" list-type="picture" :multiple="true" class="upload-demo" :before-upload="beforeUpload"
                :on-success="uploadSuccess" :on-error="uploadError" :style="{ display: 'inline-block' }">
                <el-button type="primary" size="medium" plain round>上传文件</el-button>
            </el-upload>
            <div style="font-size: 10px; color: #999;margin-top: 20px;text-align: center;">
                <i class="el-icon-info"></i>
                点击上传图片按钮，选择文件上传
            </div>
        </div>
    </div>
</template>

<script>
import {
    createMediaFile
} from "@/api/media";
import { setToken, getToken } from '@/utils/auth'
export default {
    name: 'mobileUploader',
    data () {
        return {
            uploading: false,
            parent_id: '',
            token: ''
        };
    },
    components: {},

    computed: {
        headers: function () {
          if(getToken()==undefined){
            window.location.reload()
          }
          return { Authorization: `Bearer ${getToken()}` };
        },
    },

    mounted () {
        if (!this.$route.query.token) {
            this.$router.push('/login');
        } else {
            setToken(this.$route.query.token)
        }
        this.parent_id = this.$route.query.parentId
    },

    methods: {
        beforeUpload (file) {
            const type = file.type;
            const allowTypes = [
                "image/jpg",
                "image/jpeg",
                "image/png",
                "image/gif",
                "video/mp4"
            ];
            let errorMsg = "";
            // 允许上传的图片文件：jpg/jpeg/png/gif
            // 允许上传的视频文件：mp4
            if (this.filetype === "image") {
                if (allowTypes.slice(0, 4).indexOf(type) === -1) {
                    errorMsg = "只允许上传 jpg/jpeg/png/gif 格式的图片哦";
                }
            } else if (this.filetype === "video") {
                if (type !== allowTypes[4]) {
                    errorMsg = "只允许上传 mp4 格式的视频哦";
                }
            } else {
                if (allowTypes.indexOf(type) === -1) {
                    errorMsg =
                        "只允许上传 jpg/jpeg/png/gif 格式的图片以及 mp4 格式的视频哦";
                }
            }
            if (errorMsg) {
                this.$message({ message: errorMsg, type: "warning" });
                return false;
            }
            return true;
        },
        uploadError (res) {
            this.uploading = false;
            console.log("erroris", res);
            this.$message({
                message: 'erroris' + res,
                type: 'error'
            });
        },
        uploadSuccess (res) {
            this.uploading = false;
            console.log("resis", res);
            createMediaFile({
                url: res.data.url,
                size: res.data.size,
                filename: res.data.original_filename,
                parent_id: this.parent_id,
                filetype: res.data.content_type.split("/")[0],
            }).then((res) => {
                if (res.status === 0) {
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                }
            });
        },
    }
}
</script>

<style scoped>
.upload-demo {
    max-width: 200px;
}

.mobileUploader {
    width: 200px;
    margin: 0 auto;
}

.el-button {
    width: 200px;
}
</style>

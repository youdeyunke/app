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
    <el-dialog :visible.sync="show" width="500px" :destroy-on-close="true">
        <el-form size="small" label-position="right" label-width="110px" v-loading="loading">

            <el-form-item v-if="currentItem.contact" label="联系方式" label-position="left">
                <div>{{ currentItem.contact }}</div>
            </el-form-item>

            <el-form-item label="类型" label-position="left">
                <div>{{ currentItem.feedback_type }}</div>
            </el-form-item>

            <el-form-item label="内容">
                <div>{{ currentItem.content }}</div>
            </el-form-item>

            <el-form-item v-if="imgList.length" label="图片" label-position="left">
                <div>
                    <el-image v-for="(item,index) in imgList" :key="index" :src="item" :preview-src-list="currentItem.images" style="width: 100px; height: 100px;margin-right: 10px;"></el-image>
                </div>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="default" icon="el-icon-close" @click="cancleHandle">取消</el-button>
            <el-button size="mini" type="primary" icon="el-icon-check" @click="cancleHandle">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import ImagePicker from "@/components/ImagePicker";
import DateTimePicker from "@/components/DateTimePicker";
import {
    getVideoList,
    createVideo,
    updateVideo,
    deleteVideo
} from "@/api/video";
export default {
    name: "videoForm",
    components: { ImagePicker, DateTimePicker },

    EnumerationSelectorprops: {},
    data () {
        return {
            currentItem: {},
            show: false,
            loading: false,
        };
    },
    computed: {
        imgList: function(){
            var h = this.currentItem;
            if(!h.images){
                return []
            }
            return h.images.split(',')
        },
    },
    watch: {},
    methods: {
        openDialog: function (item) {
            this.currentItem = item;
            this.show = true;
        },

        cancleHandle: function () {
            this.show = false;
            this.currentItem = {};
        },

    },
};
</script>

<style scoped>
.tips ul {
    padding: 0;
    margin: 0;
}

.tips {
    font-size: 12px;
    color: #999;
}

.show-more {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
}

.icon-uploader {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    width: 100%;
    min-height: 100px;
    border: 2px dashed #f4f4f4;
}

.icon-uploader .el-upload {
    width: 100%;
    height: 100%;
}
</style>

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
    <div>
        <div :style="{ width: widthVal, height: heightVal, padding: paddingVal }" class="container" @click="mmHandle">
            <i v-if="!url" class="el-icon-plus" :style="{ fontSize: plusIconSize }"></i>
            <template v-else>
                <el-image v-if="fileType == 'image'" title="点击更换素材" style="width: 100%; height: 100%"
                    :src="url + '?imageView2/2/w/' + width" :fit="fit" />
                <video v-if="fileType == 'video'" :title="fileType" style="width: 100%; height: 100%" :src="url"
                    :fit="true"></video>
            </template>
            <i v-if="showDeleteBtn" class="el-icon-error del" @click.stop="deleteUrl"></i>
        </div>
        <media-manager :limit="1" :file-types="fileTypes" :show.sync="showMM" @selected="imageSelected"></media-manager>
    </div>
</template>
<script>
import MediaManager from "@/components/MediaManager/Index";
export default {
    name: "image-picker",
    props: {
        value: { type: String, default: "" },
        width: { type: String, default: '100' },
        height: { type: String, default: '100' },
        padding: { type: String, default: '0' },
        fit: { type: String, default: "contain" },
        fileType: { type: String, default: "image" },
        canChange: { type: Boolean, default: true },
        canDelete: { type: Boolean, default: true },
    },
    components: { MediaManager },
    data () {
        return {
            showMM: false,
        };
    },

    computed: {
        fileTypes: function () {
            return [this.fileType];
        },
        url: {
            get () {
                return this.value;
            },
            set (val) {
                console.log("picker set url", val);
                this.$emit("input", val);
                this.$emit("change", val);
            },
        },

        plusIconSize: function () {
            // 加号按钮的尺寸不能定死，当width比较小的时候，需要缩小按钮尺寸
            return this.width >= 100 ? 40 : this.width * 0.1;
        },
        paddingVal () {
            return this.padding ? this.padding + "px" : "none";
        },
        widthVal () {
            return this.width + "px";
        },
        heightVal () {
            return this.height + "px";
        },
        showDeleteBtn () {
            return this.canDelete == true && this.url;
        },
    },

    methods: {
        mmHandle: function (e) {
            if (this.canChange != true) {
                return false;
            }
            this.showMM = true;
        },

        imageSelected: function (imgs) {
            this.url = imgs[0].url;
            this.showMM = false;
        },
        deleteUrl () {
            this.url = null;
            this.$emit("input", null);
            this.$emit("delete", null);
        },
    },
};
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    border: 1px dashed #cecece;
    border-radius: 4px;
}

.container:hover {
    border-color: #1989fa;
}

.container .del {
    display: none;
}

.container:hover .del {
    display: block;
    font-size: 22px;
    color: #f00;
    cursor: pointer;
    position: absolute;
    top: -12px;
    right: -14px;
}

.el-icon-plus {
    color: #cecece;
}
</style>

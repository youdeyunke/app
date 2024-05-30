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
    <div id="editor">
        <vue-editor :style="{ height: heightValue, width: widthValue }" v-model="html" v-loading="loading"
            :editorOptions="editorOptions" ref="editor" />
        <media-manager :limit="10" :file-types="['image']" :show.sync="showMM" @selected="imageSelected" />
    </div>
</template>

<style>
#editor .ql-container {
    height: calc(100% - 60px) !important;
}
</style>

<script>
import { VueEditor } from "vue2-editor";
import { getAppConfig } from "@/api/myconfig";
import MediaManager from "@/components/MediaManager/Index";
export default {
    components: { VueEditor, MediaManager },
    props: {
        width: { type: Number, default: 0 },
        height: { type: Number, default: 600 },
        value: { type: String, default: "" },
    },

    data () {
        return {
            editorOptions: {
                modules: {
                    toolbar: {
                        container: [
                            ["image", "blockquote"],
                            ["bold", "italic", "underline"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ color: [] }, { background: [] }],
                            ["clean"],
                        ],
                        handlers: {
                            image: this.myImageHandle,
                        },
                    },
                },
            },
            showMM: false,
            toolbar: [],
            loading: false,
            allowImageSize: 1024 * 1024 * 10,
            cdnDomain: "",
            cdnProtoco: "https",
            allowImageTypes: ["jpg", "jpeg", "png", "gif"],
        };
    },

    created: function () {
        getAppConfig().then((resp) => {
            this.cdnDomain = resp.data["cdn_domain"];
            this.cdnProtoco = resp.data["cdn_https"] == true ? "https" : "http";
        });
    },

    computed: {
        heightValue: function () {
            return this.height + "px";
        },

        widthValue: function () {
            if (this.width == 0) {
                return "100%";
            }
            return this.width + "px";
        },
        html: {
            get () {
                return this.value;
            },

            set (val) {
                this.$emit("input", val);
            },
        },
    },
    methods: {
        myImageHandle: function (e) {
            console.log("e", e);
            this.showMM = true;
        },

        imageSelected: function (imgs) {
            let editor = this.$refs.editor.quill;
            var sel = editor.getSelection(true);
            var index = sel.index;
            imgs.forEach((img, i) => {
                editor.insertEmbed(index + i, "image", img.url);
            });
        },
    },
};
</script>


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
        <ud-card>
            <p>提示：房源海报背景图片的最佳长宽比为3：2</p>
            <div class="items">
                <draggable class="items" element="ul" v-model="items" filter=".create" @end="draggend">
                    <li class="item" v-for="(tpl, index) in items" :key="index">
                        <img :src="tpl.bg + '?imageView2/2/w/100'" />
                        <div class="name" :style="'color:' + tpl.font_color">
                            {{ tpl.name }}
                            <span v-if="tpl.is_default">(默认)</span>
                            <div>这里是文字颜色示例</div>
                        </div>
                        <div class="actions">
                            <el-link type="primary" @click="editHandle(tpl)">
                                <i class="el-icon-edit" />修改
                            </el-link>
                            <el-link type="danger" v-if="tpl.can_delete" @click="deleteHandle(tpl)">
                                <i class="el-icon-delete-solid" />删除
                            </el-link>
                        </div>
                    </li>
                    <li @click="createHandle" class="item create">添加背景图</li>
                </draggable>
            </div>

            <el-dialog v-loading="loading" :destroy-on-close="true" :modal-append-to-body="true" :with-header="false"
                width="400px" :visible.sync="showForm" title="编辑房源海报背景图">
                <el-form label-position="left" label-width="100px">
                    <el-form-item label="背景图" v-loading="uploading">
                        <image-picker v-model="currentItem.bg" :width="120" :height="150" :canDelete="false" />
                    </el-form-item>

                    <el-form-item label="文字颜色">
                        <el-color-picker v-model="currentItem.font_color" :predefine="predefineColors"></el-color-picker>
                    </el-form-item>

                    <el-form-item label="名称">
                        <el-input v-model="currentItem.name" />
                    </el-form-item>

                    <el-form-item label="设为默认">
                        <el-switch v-model="currentItem.is_default" active-color="#13ce66"
                            inactive-color="#cecece"></el-switch>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="cancleHandle" icon="el-icon-close">取消</el-button>
                    <el-button size="mini" @click="submitHandle" :disabled="loading || uploading" type="primary" icon="el-icon-check">确定</el-button>
                </div>
            </el-dialog>
        </ud-card>
    </div>
</template>

<style scoped>
.items .item img,
img.poster-bg {
    width: 200px;
    height: 300px;
    overflow: hidden;
}

.my-form-actions {
    display: flex;
    justify-content: center;
    align-items: center;
}

.items {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
}

.items .item {
    width: 200px;
    margin: 10px 20px;
    border: 1px solid #f4f4f4;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.items .item .actions {
    margin: 6px auto;
    height: 20px;
}

.items .item .name {
    position: absolute;
    width: 200px;
    text-align: center;
    left: 0px;
    top: 150px;
}

.items .item.create {
    height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>

<script>
import {
    getPosterTemplates,
    createPosterTemplate,
    updatePosterTemplate,
    deletePosterTemplate,
    updateOrder,
} from "@/api/poster";
import { getAppConfig } from "@/api/myconfig";
import draggable from "vuedraggable";
import ImagePicker from "@/components/ImagePicker";
export default {
    components: {
        draggable,
        ImagePicker,
    },
    name: "poster-template",
    data: function () {
        return {
            showMM: false,
            loading: true,
            uploading: false,
            allowImageTypes: ["jpg", "jpeg", "png"],
            predefineColors: [
                "#ffffff",
                "#000000",
                "#cecece",
                "#333333",
                "#1ABCA1",
                "#ff0000",
                "#1989fa",
            ],
            allowImageSize: 1024 * 1024 * 5, // 2mb
            allowImageTypeStr: "5Mb",
            currentItem: {},
            items: [],
            showForm: false,
        };
    },

    created: function () {
        getAppConfig().then((resp) => {
            this.cdnDomain = resp.data["cdn_domain"];
            this.cdnProtoco = resp.data["cdn_https"] == true ? "https" : "http";
            this.loadData();
        });
    },

    methods: {
        draggend: function () {
            let itemIds = this.items.map((item) => {
                return item.id;
            });
            updateOrder(itemIds);
        },
        mmCloseHandle: function (e) { },
        imageSelected: function (imgs) {
            var item = this.currentItem;
            item.bg = imgs[0].url;
            this.currentItem = item;
            this.showMM = false;
        },
        cancleHandle: function () {
            this.currentItem = {};
            this.showForm = false;
            this.loadData();
        },
        deleteHandle: function (item) {
            if (item.is_default) {
                this.$message.error("不能删除默认背景图");
                return false;
            }
            if (this.items.length == 1) {
                this.$message.error("无法删除，最少需要设置一张背景图");
                return false;
            }
            this.$confirm("删除", "确定要删除这个海报模板吗？").then((res) => {
                deletePosterTemplate(item.id).then((resp) => {
                    this.loadData();
                });
            });
        },
        createHandle: function () {
            this.currentItem = {
                name: "自定义",
                is_default: false,
                can_delete: true,
                font_color: "#ffffff",
            };
            this.showForm = true;
        },

        submitHandle: function () {
            var data = this.currentItem;
            var isNew = this.currentItem.id ? false : true;
            // validate
            if (!data.bg) {
                this.$message.error("请上传图片");
                return false;
            }
            if (!data.name) {
                this.$message.error("请填写名称");
                return false;
            }
            if (!data.font_color) {
                this.$message.error("请设置字体颜色");
                return false;
            }
            this.loading = true;
            if (isNew) {
                createPosterTemplate(data).then((resp) => {
                    this.loading = false;
                    if (resp.status == 0) {
                        this.showForm = false;
                        this.$message.success("创建成功");
                        this.loadData();
                    }
                });
                return false;
            }
            updatePosterTemplate(data).then((resp) => {
                this.loading = false;
                this.$message.success("已保存");
                if (resp.status == 0) {
                    this.showForm = false;
                    this.loadData();
                }
            });
        },

        loadData: function () {
            this.loading = true;
            getPosterTemplates().then((resp) => {
                this.items = resp.data;
                this.loading = false;
                this.showForm = false;
            });
        },

        editHandle: function (item) {
            this.currentItem = item;
            this.showForm = true;
        },
    },
};
</script>

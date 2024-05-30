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
    <div v-loading="loading">
        <div :style=" width ? 'margin: 0 auto; width:' + width + 'px' : 'margin: 0 auto' ">
            <div class="myheader" v-if="currentCat">
                <template v-if="mode === 'show'">
                    <el-button size="small" :disabled="currentCat.is_system" @click="deleteAlbumHandle" icon="el-icon-delete"
                        type="danger">删除</el-button>
                    <el-button size="small" type="default" plain @click="loadMediaCats" icon="el-icon-refresh">刷新</el-button>
                    <el-button size="small" type="default" plain @click="orderHandleToggle" icon="el-icon-rank">排序</el-button>
                    <el-button size="small" type="default" plain @click="albumEditHandle(currentCat)" icon="el-icon-edit">编辑</el-button>
                    <el-button size="small" icon="el-icon-plus" type="primary" @click="createAlbumHandle">新建相册</el-button>
                </template>
                <el-button size="small" v-else type="primary" @click="orderHandleToggle" icon="el-icon-finished">完成</el-button>
            </div>

            <!-- 进入相册切换模式 -->
            <div v-if="mode == 'show'">
                <el-tabs v-model="tabName">
                    <el-tab-pane v-for="(cat, index) in cats" :key="index" :label="cat.name" :name="cat.tabName">
                        <div class="tab-pane-item">
                            <media-items :ref="'mediaitems_' + cat.id" :cat-id="cat.id" />
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div v-else>
                <div style="margin-bottom: 10px; font-size: 12px; color: #cecece">
                    鼠标拖动进行排序
                </div>
                <draggable @end="dragHandle" class="media-cat-list" v-model="cats" draggable=".media-cat">
                    <div class="media-cat" v-for="(cat, index) in cats" :key="index">
                        {{ cat.name }} ({{ cat.items_count }}图)
                    </div>
                </draggable>
            </div>
        </div>

        <el-dialog width="300px" :visible.sync="showForm" :destroy-on-close="true" :append-to-body="true" :modal="true"
            :with-header="false" title="编辑相册信息">
            <el-form>
                <el-form-item label="名称">
                    <el-input v-model="currentAlbum.name" placeholder="请输入相册名称"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancleHandle" size="small" icon="el-icon-close">取消</el-button>
                <el-button size="small" type="primary" @click="submitAlbum" icon="el-icon-check">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style scoped>
.media-container {
    width: 800px;
    margin: auto;
}

.myheader {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}

.media-cat-list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
}

.media-cat-list .media-cat {
    width: 120px;
    height: 120px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: move;
    border: 2px solid #f4f4f4;
    border-radius: 4px;
    margin-right: 15px;
    margin-bottom: 15px;
}
</style>

<script>
import {
    getMediaCatList,
    createMediaCat,
    updateMediaCat,
    updateMediaCatsOrder,
    deleteMediaCat,
} from "@/api/xiangce";
import MediaItems from "./MediaItems";
import draggable from "vuedraggable";

export default {
    components: { draggable, MediaItems },
    props: {
        targetId: { type: Number, value: null },
        targetType: { type: String, default: "post" },
        width: { type: Number, default: null },
    },
    data () {
        return {
            pageTitle: "相册管理",
            mode: "show", // show/order
            cats: [],
            tabName: "no",
            currentAlbum: {},
            loading: true,
            showForm: false,
            showDialog: false,
        };
    },

    watch: {
        targetId: {
            immediate: true,
            deep: true,
            handler (val, oval) {
                if (!val) {
                    return false;
                }
                this.loadMediaCats();
            },
        },
    },

    computed: {
        currentCat: function () {
            // 当前选中的cat
            if (this.cats.length == 0) {
                return null;
            }
            var tabName = this.tabName;
            var res = this.cats.filter((cat, i) => {
                if (cat.tabName == tabName) {
                    return true;
                }
                return false;
            });
            return res[0];
        },
    },

    methods: {
        orderHandleToggle: function () {
            // 切换拖动排序模式
            this.mode = this.mode == "order" ? "show" : "order";
        },

        dragHandle: function () {
            // 拖动相册排序
            var ids = this.cats.map((m, i) => {
                return m.id;
            });
            updateMediaCatsOrder(ids).then((res) => { });
        },

        createAlbumHandle: function () {
            this.currentAlbum = {
                name: "",
                target_id: this.targetId,
                target_type: this.targetType,
            };
            this.showForm = true;
        },

        albumEditHandle: function (item) {
            this.currentAlbum = item;
            this.showForm = true;
        },

        submitAlbum: function () {
            // 创建或者编辑相册西
            var data = this.currentAlbum;
            if (!data.name) {
                this.$message.error("请输入相册名称");
                return false;
            }
            this.loading = true;

            if (data.id) {
                updateMediaCat(data).then((resp) => {
                    if (resp.status != 0) {
                        this.loading = false;
                        return false;
                    }
                    this.showForm = false;
                    this.$message.success("已经保存");
                    this.loadMediaCats();
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
                });
                return false;
            }
            createMediaCat(data).then((resp) => {
                if (resp.status != 0) {
                    this.loading = false;
                    return false;
                }
                this.showForm = false;
                this.$message.success("已创建");
                this.loadMediaCats();
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },

        deleteAlbumHandle: function () {
            // 最后一个相册

            var cid = parseInt(this.tabName);
            this.$confirm(
                "确定要删除这个相册吗？删除相册后，该相册中的全部图片/视频将被情况",
                "确定删除"
            ).then(() => {
                deleteMediaCat(cid).then((resp) => {
                    if (resp.status != 0) {
                        return false;
                    }
                    this.$message.success("已删除");
                    this.loadMediaCats();
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
                });
            });
        },

        loadMediaCats: function () {
            this.loading = true;
            var target = { target_type: this.targetType, target_id: this.targetId };
            getMediaCatList(target).then((resp) => {
                this.loading = false;
                this.cats = resp.data.map((cat, index) => {
                    cat.tabName = String(cat.id);
                    return cat;
                });

                // init default tab name
                if (this.tabName == "no" && this.cats.length > 0) {
                    this.tabName = this.cats[0].tabName;
                }
                // TODO 返回对象信息
                this.pageTitle = " 相册管理 (" + this.cats.length + ")";
            });
        },
        openDialog: function () {
            this.showDialog = true;
        },
        onClose: function () {
            console.log("on close ");
            this.showDialog = false;
        },
        cancleHandle(){
            this.showForm = false
        },
    },
};
</script>

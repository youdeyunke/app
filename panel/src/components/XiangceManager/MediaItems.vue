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
    <div class="main" v-loading="loading">
        <media-picker @delete="deleteHandle" @change="changeHandle" @append="appendHandle" @drag="dragHandle"
            v-model="items" :limit="100" :file-types="['image', 'video']"></media-picker>
    </div>
</template>

<style scoped></style>

<script>
import { updatePost } from "@/api/post";
import MediaPicker from "@/components/MediaPicker";
import {
    getMediaCatDetail,
    updateMediaItemsOrder,
    updateMediaItem,
    createMediaItem,
    deleteMediaItem,
} from "@/api/xiangce";
export default {
    components: {
        MediaPicker,
    },
    props: {
        catId: { type: Number, value: null },
    },
    data () {
        return {
            cat: {},
            loading: true,
            items: [],
        };
    },

    watch: {
        catId: {
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

    methods: {
        dragHandle: function (items) {
            // 移动完成
            // TODO
            this.items = items;
            var ids = items.map((m, i) => {
                return m.id;
            });
            updateMediaItemsOrder(ids).then((res) => { });
        },

        deleteHandle: function (index) {
            console.log("delete handle", index);
            // TODO
            var mid = this.items[index].id;
            var items = this.items;
            this.$confirm("确定要删除文件吗？", "确定删除").then(() => {
                deleteMediaItem(mid).then((resp) => {
                    if (resp.status != 0) {
                        return false;
                    }
                    this.$message.success("已删除");
                    items.splice(index, 1);
                    this.items = items;
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
                });
            });
        },

        appendHandle: function (items) {
            if (items.length == 0) {
                this.$message.success("添加成功");
                this.loading = false;
                this.loadData();
                return;
            }
            this.loading = true;
            console.log("append handle", items);
            // 添加照片
            var item = items.pop();
            var data = {
                media_cat_id: this.catId,
                filetype: item.filetype,
                url: item.url,
            };
            createMediaItem(data).then((resp) => {
                if (resp.status != 0) {
                    this.$message.error("添加图片出错");
                }
                // 同步执行
                this.appendHandle(items);
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },

        changeHandle: function (e) {
            // 修改了某个文件的链接
            console.log("change handle", e);
            var obj = this.items[e.index];
            var url = e.item.url;
            var item = {
                id: obj.id,
                url: url,
                filetype: e.item.filetype,
            };
            this.loading = true;
            updateMediaItem(item).then((resp) => {
                this.loadData()
                this.loading = false;
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },

        loadData: function () {
            // 相册文件列表
            this.loading = true;
            getMediaCatDetail(this.catId).then((resp) => {
                this.cat = resp.data.data;
                this.items = resp.data.media_items.map((item, i) => {
                    item.filetype = item.filetype;
                    return item;
                });
                this.loading = false;
            });
        },
    },
};
</script>

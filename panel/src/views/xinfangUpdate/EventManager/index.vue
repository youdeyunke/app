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
    <div v-cloak v-loading>
        <!-- <ud-card> -->
            <media-manager :show.sync="showMM" @selected="imagesSelectedHandle" :limit="9" />

            <div class="myheader">
                <div class="part-left">
                </div>
                <div class="part-right">
                    <div class="block">
                        <el-button :disabled="loading" icon="el-icon-refresh" size="small" type="default" plain
                            @click="loadEvents">刷新</el-button>
                    </div>

                    <div class="block">
                        <el-button size="small" type="primary" icon="el-icon-plus"
                            @click="createHandle">发布动态</el-button>
                    </div>
                </div>
            </div>
            <el-table v-loading="loading" :data="events" size="small" fit highlight-current-row>
                <el-table-column prop="id" width="120px" label="#" />
                <el-table-column width="120px" label="状态">
                    <template slot-scope="scope">
                        <span v-for="(item,i) in statusOptions" :key="i" v-if="item.value == scope.row.status">
                            <el-tag type="info" size="mini" effect="plain">
                                <span :style="{ color: item.color }">{{ item.name }}
                                </span>

                            </el-tag>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="post.title" label="楼盘" />
                <el-table-column prop="author" label="作者" />
                <el-table-column prop="pub_time" label="发布时间" width="200px" />

                <el-table-column label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="editHandle(scope.row)">管理</el-link>
                        <el-link type="danger" @click="deleteHandle(scope.row.id)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pager">
                <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
                    @size-change="updatePageSize" />
            </div>

            <el-dialog title="编辑动态" :visible.sync="showForm" :destroy-on-close="true" width="600px">
                <el-form label-width="120px" label-position="right">

                    <el-form-item label="分类">
                        <el-radio-group v-model="event.cat_id">
                            <el-radio :label="cat.id" :key="i" v-for="(cat, i) in cats">{{ cat.name }}</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="标题">
                        <el-input :minlength="4" :maxlength="50" v-model="event.title" placeholder="请输入动态标题"></el-input>
                    </el-form-item>

                    <el-form-item label="内容">
                        <el-input type="textarea" :minlength="10" :maxlength="500" :rows="5" show-word-limit
                            v-model="event.content" placeholder="请输入动态内容"></el-input>
                    </el-form-item>

                    <el-form-item label="配图">
                        <draggable class="event-image-list" filter=".new-image" v-model="imageUrls">
                            <div v-for="(url, index) in imageUrls" :key="index" class="event-image-item">
                                <el-image :src="url" />
                                <el-link @click="removeImageHandle(index)">删除</el-link>
                            </div>
                            <div class="event-image-item new-image" @click="showMM = true">
                                添加图片
                            </div>
                        </draggable>
                    </el-form-item>

                    <div class="inline">

                        <el-form-item label="发布人">
                            <el-input :maxlength="20" v-model="event.author" placeholder="请输入发布人"
                                style="width:220px;"></el-input>
                        </el-form-item>

                        <el-form-item label="发布时间">
                            <el-input :maxlength="20" v-model="event.pub_time" placeholder="请输入发布时间，如：2020-6-1"
                                style="width:220px;"></el-input>
                        </el-form-item>

                        <el-form-item label="状态">
                            <el-select style="width:220px;" v-model="event.status" placeholder="选择状态" filterable>
                                <el-option :key="s.value" :value="s.value" :label="s.name" v-for="(s, i) in statusOptions">
                                    <span :style="{ color: s.color }">{{ s.name }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </div>

                    <el-form-item label v-if="event.status == 2">
                        <el-checkbox label="发送短信通知给订阅者" v-model="event.push_enable"></el-checkbox>
                    </el-form-item>

                </el-form>
                <div slot="footer" v-loading="loading">
                    
                    <el-button size="mini" @click="cancleHandle" icon="el-icon-close">取消</el-button>
                    <el-button size="mini" type="primary" @click="submitHandle" icon="el-icon-check">确定</el-button>
                </div>
            </el-dialog>
        <!-- </ud-card> -->
    </div>
</template>

<script>
import { getEventList, updateEvent, deleteEvent, createEvent } from "@/api/event";
import { getPostSimpleList } from "@/api/post";
import MediaManager from "@/components/MediaManager/Index";
import draggable from "vuedraggable";
import PostSelector from "@/components/PostSelector";

export default {
    name: "events",
    components: { MediaManager, draggable, PostSelector },
    data () {
        return {
            postFirstOption: { title: "全部项目", id: null },
            showForm: false,
            showMM: false,
            // postId: null,
            page: 1,
            events: [],
            posts: [],
            statusOptions: [
                { name: '等待审核', value: 0, color: 'orange' },
                { name: '审核通过', value: 1, color: 'blue', },
                { name: '审核无效', value: -1, color: '#666666' },
                { name: '发布上线', value: 2, color: 'green' },
            ],
            cats: [],
            event: {},
            total: 0,
            per_page: 30,
            loading: true,
        };
    },
    watch: {
        postId: function (v1, v2) {
            this.loadEvents();
        },
        page: function (newVal, oldVal) {
            this.loadEvents();
        },
        per_page: function (newVal, oldVal) {
            this.loadEvents();
        },
    },

    props: {
        postId: {
            type: Number,
            default: null,
        },
    },

    mounted: function () {
        this.loadEvents();
    },

    computed: {
        imageUrls: {
            get () {
                var urls = this.event && this.event.images ? this.event.images.split(",") : [];
                return urls.map((url, index) => {
                    return url;
                });
            },
            set (newVal, oldVal) {
                var images = "";
                if (newVal.length >= 1) {
                    images = newVal.join(",");
                }
                this.$set(this.event, "images", images);
            },
        },
    },

    methods: {
        imagesSelectedHandle: function (imgs) {
            console.log("selected", imgs);
            var urls = imgs.map((img, i) => {
                return img.url;
            });
            this.imageUrls = this.imageUrls.concat(urls);
            this.showMM = false;
        },

        updateCurrentPage: function (page) {
            this.page = page;
        },

        updatePageSize: function (size) {
            this.per_page = size || 10;
        },

        removeImageHandle: function (index) {
            var urls = this.imageUrls.splice(index, 1);
            this.imageUrls = urls;
        },

        cancleHandle: function () {
            this.showForm = false;
            this.loadEvents();
        },

        submitHandle: function () {
            // post
            var event = this.event;
            event.post_id = this.postId;
            this.loading = true;
            if (event.id) {
                updateEvent(event).then((res) => {
                    this.loading = false
                    if (res.status != 0) {
                        return false;
                    }
                    this.showForm = false;
                    this.loadEvents();
                    this.$message.success("保存修改成功");
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
                });
                return false;
            }
            createEvent(event).then((res) => {
                this.loading = false
                if (res.status != 0) {
                    return false;
                }
                this.showForm = false;
                this.loadEvents();
                this.$message.success("发布成功");
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },
        createHandle: function () {
            // 点击新建按钮
            var event = {
                push_enable: false,
                cat_id: this.cats[0].id,
                content: "",
                post_id: this.postId,
            };
            this.event = event;
            this.showForm = true;
        },
        editHandle: function (event) {
            this.event = event;
            this.showForm = true;
        },
        deleteHandle: function (eid) {
            this.$confirm("确定要删除这条动态码", "删除提醒").then((res) => {
                this.loading = true
                deleteEvent(eid).then((res2) => {
                    this.loadEvents()
                    if (res2.status != 0) {
                        return false;
                    }
                    this.$message.success("已删除");
                }).catch((err) => {
                    this.loading = false
                    console.log(err);
                });
            });
        },

        loadEvents: function () {
            this.loading = true;
            var data = {
                post_id: this.postId,
                page: this.page,
                per_page: this.per_page,
            };

            if (!this.postId) {
                delete data.postId;
            }
            getEventList(data).then((res) => {
                this.loading = false;
                if (res.status != 0) {
                    return false;
                }
                this.events = [];
                var events = res.data.result.map((event, i) => {
                    event.updated_at = event.updated_at.split(".")[0].replace("T", " ");
                    event.push = event.push_enable == true ? "已推送" : "不推送";
                    return event;
                });
                this.events = events;
                this.cats = res.data.cats;
                this.total = res.data.page.total_items;
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },
    },
};
</script>

<style scoped lang="scss">
.myheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;

    .part-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .block {
            margin-left: 10px;
        }
    }

    .part-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .block {
            margin-right: 10px;
        }
    }
}

.event-image-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.event-image-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    height: 125px;
    font-size: 12px;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 10px;
}

.event-image-item.new-image {
    justify-content: center;
    align-items: center;
    cursor: hand;
}
</style>

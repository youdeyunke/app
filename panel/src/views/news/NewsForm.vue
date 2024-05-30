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
    <div class="news-form" v-loading="loading" v-cloak>
        <el-dialog width="400px" :visible.sync="showCatsForm" append-to-body>
            <cats-manager></cats-manager>
        </el-dialog>
        <el-dialog title="文章管理" :visible.sync="show" :close-on-click-modal="false" :close-on-press-escape="false" width="680px"
            append-to-body>
            <el-form label-width="100px" label-position="left">
                <el-form-item label="标题">
                    <el-input v-model="currentItem.title"></el-input>
                </el-form-item>

                <el-form-item label="摘要">
                    <el-input v-model="currentItem.summary"></el-input>
                </el-form-item>

                <el-form-item label="封面图">
                    <image-picker v-model="currentItem.cover" width="300" height="150" />
                    <div style="font-size: 10px; color: #999">
                        <i class="el-icon-info"></i>
                        最佳图片尺寸 宽度300px，高度150px 或同比例
                    </div>
                </el-form-item>

                <div class="inline">
                    <el-form-item label="分类">
                        <el-select filterable default-first-option placeholder="选择分类" v-model="currentItem.news_cat_id">
                            <el-option v-for="item in cats" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-button type="text" @click="showCatsForm = true">添加分类</el-button>
                    </el-form-item>

                    <div class="blank"></div>
                    <el-form-item label="点击量">
                        <el-input style="width: 240px" v-model="currentItem.view_nums" type="number" />
                    </el-form-item>

                    <el-form-item label="作者">
                        <div style="display: flex;align-items: center;">
                            <el-input style="width: 240px" v-model="currentItem.author" />
                            <image-picker style="margin-left: 20px;" v-model="currentItem.avatar" width="50" height="50" />
                        </div>

                    </el-form-item>
                </div>


                <el-form-item label="文章类型">
                    <el-radio-group v-model="currentItem.content_type">
                        <el-radio v-for="(ct, index) in contentTypeItems" :label="ct.value" :key="index">
                            <i :class="ct.value | contentTypeIconFilter" />
                            {{ ct.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="视频" v-if="currentItem.content_type == 'video'">
                    <image-picker file-type="video" v-model="currentItem.url" width="300" height="150" />
                </el-form-item>

                <el-form-item v-if="currentItem.content_type == 'url'" label="外部网站URL">
                    <el-input v-model="currentItem.url"></el-input>
                    <!-- div style="color:#999;">
                <i class="el-icon-info"></i>
                请先添加外部网站域名为业务域名
                <el-link
                icon="el-icon-link"
                type="primary"
                size="mini"
                href="https://kf.qq.com/faq/170705n6nYFJ170705BVzMfQ.html"
                target="blank"
                >帮助文档</el-link>
            </div -->
                </el-form-item>

                <el-form-item label v-if="currentItem.content_type == 'html'">
                    <html-editor v-model="currentItem.content" />
                </el-form-item>

                <div class="inline">
                    <el-form-item label="公开显示">
                        <el-switch style="width: 200px" active-text="显示" inactive-text="隐藏"
                            v-model="currentItem.is_public"></el-switch>
                    </el-form-item>
                    <div class="blank"></div>
                    <el-form-item label="精选推荐">
                        <el-switch style="width: 200px" active-text="开启" inactive-text="关闭"
                            v-model="currentItem.is_top"></el-switch>
                    </el-form-item>
                    <div class="blank"></div>
                    <el-form-item label="日期">
                        <el-date-picker v-model="currentItem.date" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptions"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div v-show="currentItem.has_posts">
                    <el-divider content-position="center">关联楼盘设置</el-divider>
                    <posts-selector v-model="postIds"></posts-selector>
                    <div style="margin-top: 10px; font-size: 10px; color: #999">
                        <i class="el-icon-info"></i>
                        选择关联楼盘后，该文章会在被关联的楼盘页面中显示，同时，该文章页面中也会显示被关联的楼盘信息
                    </div>
                </div>

            </el-form>
            <div slot="footer">
                    <el-button size="small" v-loading="loading" icon="el-icon-close"
                        @click="show = false">取消</el-button>
                    <el-button size="small" v-loading="loading" type="primary" @click="submitHandle" icon="el-icon-check">{{
                        submitBtnText
                    }}</el-button>
                </div>
        </el-dialog>
    </div>
</template>

<script>
import { updateNews, deleteNews, getNewsCatList } from "@/api/news";
import HtmlEditor from "@/components/HtmlEditor";
import PostsSelector from "@/components/PostsSelector";
import ImagePicker from "@/components/ImagePicker";
import CatsManager from "./CatsManager";
export default {
    data () {
        return {
            currentItem: {},
            postIds: [],
            cats: [],
            loading: false,
            contentTypeItems: [
                { value: "html", name: "文本内容" },
                { value: "video", name: "短视频" },
                { value: "url", name: "跳转外部链接" },
            ],
            show: false,
            showCatsForm: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() >= Date.now(); // 禁用当前时间之前的日期
                }
            },
        };
    },
    watch: {
        showCatsForm: function (val) {
            if (val == false) {
                this.loadCats();
            }
        },
    },
    props: {},
    filters: {
        contentTypeIconFilter: function (typeName) {
            var dict = {
                html: "tickets",
                video: "video-play",
                url: "link",
            };
            var v = dict[typeName] || "tickets";
            return "el-icon-" + v;
        },
    },

    components: { HtmlEditor, PostsSelector, ImagePicker, CatsManager },

    mounted: function () {
        this.loadCats()
    },

    computed: {
        submitBtnText () {
            return this.currentItem.id ? "保存修改" : "创建文章";
        },
    },

    methods: {
        loadCats: function () {
            getNewsCatList().then((resp) => {
                this.cats = resp.data;
            });
        },

        deleteHandle: function () {
            var itemId = this.currentItem.id;
            var _this = this;
            this.$confirm("确定要删除文章吗?", {
                confirmButtonText: "确定删除",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                deleteNews(itemId).then((resp) => {
                    _this.currentItem = {};
                    _this.$emit("change");
                });
            });
        },

        validate: function (data) {
            if (!data.cover) {
                this.$message.error("请上传封面图");
                return false;
            }
            if (!data.title || data.title.length <= 3) {
                this.$message.error("标题不能少于3个字");
                return false;
            }

            if (!data.summary || data.title.length == 0) {
                this.$message.error("请填写内容摘要");
                return false;
            }

            if (!data.news_cat_id) {
                this.$message.error("请选择分类");
                return false;
            }

            if (!data.author) {
                this.$message.error("作者不能为空");
                return false;
            }

            return true;
        },

        submitHandle: function () {
            var data = this.currentItem;
            var isok = this.validate(data);
            if (!isok) {
                return false;
            }

            this.loading = true;
            updateNews(data).then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    this.show = false;
                    this.$message.success("保存成功");
                    this.$emit("change");
                }
            });
        },

        setForm: function (data) {
            this.loadCats();
            this.currentItem = data;
            this.show = true;
        },

        newForm: function () {
            this.loadCats();
            this.currentItem = {
                title: "",
                summary: "",
                cover: "",
                news_cat_id: null,
                url: "",
                view_nums: 0,
                author: "",
                content_type: "",
                is_top: false,
                is_public: true,
                date: "",
                has_posts: false,
            };
            this.show = true;
        },
    },
};
</script>

<style scoped></style>

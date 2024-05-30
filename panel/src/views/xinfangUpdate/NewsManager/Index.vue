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
    <div class="news-manager" v-cloak>
        <div class="tools header" v-if="mode === 'view'">
            <el-button type="primary" size="small" @click="() => (mode = 'edit')" icon="el-icon-edit">添加/修改楼盘资讯</el-button>
        </div>
        <template v-if="mode === 'view'">
            <el-table size="small" :data="items">
                <el-table-column label="文章标题" prop="news.title" />
                <el-table-column label="作者" prop="news.author" width="200px" />
                <el-table-column label="浏览量" prop="news.view_nums" width="100px" />
                <el-table-column prop="cat" label="文章类型" width="100px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.news.content_type == 'url'">公众号文章</span>
                        <span v-if="scope.row.news.content_type == 'html'">文本内容</span>
                        <span v-if="scope.row.news.content_type == 'video'">视频</span>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <template v-else>
            <transfer :props="{ key: 'id', label: 'title' }" filterable v-model="newsIds" :data="allNews"
                :titles="['待选文章', '已选文章']" />
        </template>

        <div class="tools footer" v-if="mode === 'edit'">
            <el-button :loading="loading" :disabled="loading" size="small" type="default" icon="el-icon-close"
                @click="cancleHandle">取消</el-button>
            <el-button :loading="loading" :disabled="loading" size="small" type="primary" icon="el-icon-check"
                @click="submitHandle">确定</el-button>
        </div>
    </div>
</template>

<script>
import { getPostNewsList, updatePostNews } from "@/api/post_news";
import { getNewsList } from "@/api/news";
import Transfer from "@/components/Transfer";
export default {
    components: { Transfer },
    data () {
        return {
            items: [],
            allNews: [],
            newsIds: [],
            mode: "view", // edit
            loading: false,
        };
    },
    props: {
        postId: { type: Number, default: null },
    },

    watch: {
        postId: {
            immediate: true,
            handler (val, oval) {
                console.log("watch post id", val);
                if (!val) {
                    this.newsIds = [];
                    this.loading = true;
                    this.items = [];
                    return;
                }
                this.loadData();
            },
        },
    },
    mounted: function () {
        this.loadAllNews();
    },

    computed: {},

    methods: {
        submitHandle: function (e) {
            this.loading = true;
            updatePostNews(this.postId, this.newsIds).then((resp) => {
                this.loading = false;
                if (resp.status != 0) {
                    return;
                }
                this.$message.success("保存成功");
                this.mode = "view";
                this.loadData();
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },

        cancleHandle: function () {
            this.mode = "view";
            this.loadData();
        },

        loadAllNews: function () {
            var _this = this;
            var q = { per_page: 999 };
            getNewsList(q).then((resp) => {
                this.allNews = resp.data.result;
            });
        },

        loadData: function () {
            var _this = this;
            var q = { post_id: this.postId };
            getPostNewsList(q).then((resp) => {
                _this.items = resp.data;
                _this.newsIds = resp.data.map((item, i) => {
                    return item.news.id;
                });
            });
        },
    },
};
</script>

<style scoped>
.tools {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.header {
    margin-bottom: 10px;
}

.footer {
    margin-top: 10px;
}
</style>

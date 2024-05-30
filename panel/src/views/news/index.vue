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
  <div class="app-container" v-loading="loading">
    <ud-card class="items-panel">
      <el-dialog width="400px" :visible.sync="showCatsForm">
        <cats-manager></cats-manager>
      </el-dialog>
      <news-form ref="newsform" @change="newsChangeHandle"></news-form>

      <div class="myheader">


        <div class="part-left">
          <div class="block">
            <el-input v-model="kw" style="border-radius: 100%; width: 250px" size="small" placeholder="搜索文章标题">
              <el-button slot="append" icon="el-icon-search" @click="doSearch"/>
            </el-input>
            <el-button v-if="kw" type="text" size="small" @click="clearKw">清空</el-button>
          </div>
        </div>

        <div class="part-right" style="margin-bottom:10px;">
          <div class="block">
          <el-button :disabled="loading" size="small" type="default" v-if="btns.news_cats" plain icon="el-icon-menu"
                     @click="showCatsFormHandle">管理分类
          </el-button>
          </div>
          <div class="block">
            <el-button :disabled="loading" icon="el-icon-refresh" size="small" type="default" plain
                       @click="loadData">刷新数据
            </el-button>
          </div>

          <div class="block">
            <el-button v-if="btns.create_news" size="small" type="primary" icon="el-icon-plus"
                       @click="newFormHandle">新建文章
            </el-button>
          </div>


        </div>

      </div>
      <el-table :data="items" highlight-current-row >
        <el-table-column prop="id" label="#" width="80"/>
        <el-table-column prop="name" label="状态" width="80">
          <template slot-scope="scope">
            <el-tag effect="plain" size="mini" type="primary" v-if="scope.row.is_public">已发布</el-tag>
            <el-tag effect="plain" size="mini" type="info" v-else>草稿</el-tag>
            <el-tag size="mini" v-if="scope.row.is_top" type="warning" effect="plain">精选</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"/>
        <el-table-column prop="news_cat" label="分类"/>
        <el-table-column prop="author" label="作者"/>
        <el-table-column label="发布时间" prop="date"/>
        <el-table-column label="点击量" prop="view_nums"/>
        <el-table-column label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="editHandle(scope.row)">编辑</el-link>
                        <el-link type="danger"
                            @click="deleteHandle(scope.row.id)">删除</el-link>
                    </template>
                </el-table-column>
      </el-table>
      <div class="pager">
                <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
                    @size-change="updatePageSize" />
            </div>
    </ud-card>

  </div>
</template>

<style lang="scss" scoped>
.inline {
  display: flex;
  justify-content: flex-start;
}

.inline .blank {
  width: 20px;
}

.app-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .items-panel {
    width: 100%;
    // height: 1000px;
    // overflow-y: scroll;
  }

  .form-panel {
    min-height: 1000px;
    width: calc(100% - 520px);
  }

  .myheader {
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

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
      margin-bottom: 10px;
      align-items: center;

      .block {
        margin-right: 10px;
      }
    }

    .el-input {
      with: 250px;
      border-radius: 100%;
    }
  }
}
</style>

<script>
import {
  getNewsList,
  updateNews,
  getNewsCatList,
  updateNewsCat,
  deleteNewsCat,
  deleteNews,
} from "@/api/news";
import {getPostSimpleList} from "@/api/post";
import CatsManager from "./CatsManager";
import NewsForm from './NewsForm';
import UdCard from "@/components/UdCard";

export default {
  components: {CatsManager, UdCard, NewsForm,},
  props: {
    btns: {type: Object, default: null},
  },
  data() {
    return {
      cats: [],
      kw: "",
      showMM: false,
      showCatsForm: false,
      total: 0,
      per_page: 20,
      current_page: 1,
      page: 1,
      items: [],
      loading: false,
      currentItem: {},

    };
  },
  watch: {
    current_page: function (newVal, oldVal) {
      console.log("update current page", newVal);
      this.loadData();
    },
    per_page: function (newVal, oldVal) {
      this.loadData();
    },
  },

  computed: {
    postIds: {
      get() {
        if (this.currentItem.post_ids) {
          return this.currentItem.post_ids.split(",");
        }
        return [];
      },
      set(ids) {
        var v = ids.join(",");
        this.$set(this.currentItem, "post_ids", v);
      },
    },
  },

  mounted: function () {
    this.loadData();
  },


  methods: {
    newsChangeHandle(){
      this.loadData();
    },

    showCatsFormHandle: function () {
      this.showCatsForm = true;
    },
    mmCloseHandle: function (e) {
    },
    imageSelected: function (imgs) {
      var item = this.currentItem;
      item.cover = imgs[0].url;
      this.currentItem = item;
      this.showMM = false;
    },
    loadPost: function () {
      var query = {group_v2: "new"};
      getPostSimpleList(query).then((resp) => {
        this.posts = resp.data;
      });
    },

    updateCurrentPage: function (page) {
      this.current_page = page;
      console.log("current page change ", page);
    },

    updatePageSize: function (size) {
      this.per_page = size || 10;
    },

    closeHandle: function () {
      this.currentItem = {};
    },

    newFormHandle: function () {
      this.$refs.newsform.newForm()
    },
    editHandle: function (item) {
      this.$refs.newsform.setForm(item)
      console.log('set form item', item.title)
    },
    doSearch: function () {
      // 搜索
      this.loading = true;
      this.page = 1;
      this.loadData();
    },

    clearKw: function () {
      this.kw = "";
      this.page = 1;
      this.loadData();
    },

    removeCover: function () {
      this.currentItem.cover = "";
    },


    deleteHandle: function (itemId) {
      var _this = this;
      this.$confirm("确定要删除文章吗?", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteNews(itemId).then((resp) => {
          if (resp.status !== 0) {
            return;
          }
          _this.$message.success("已删除");
          _this.currentItem = {};
          _this.loadData();
        });
      });
    },

    loadData: function () {
      this.loading = true;
      var query = {
        per_page: this.per_page,
        page: this.current_page,
        kw: this.kw,
      };
      getNewsList(query).then((resp) => {
        this.loadPost();
        this.items = resp.data.result.map((t, i) => {
          t.content = "";
          if (t.detail_content && t.detail_content.value) {
            t.content = t.detail_content.value;
          }

          t.created_at = t.created_at.split(".")[0].replace("T", " ");
          return t;
        });
        this.total = resp.data.page.total_items;
        this.loading = false;
      });
    },
  },
};
</script>

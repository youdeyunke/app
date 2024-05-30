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
    <ud-card>
      <div class="myheader">
        <div class="part-left">
          <div class="block">
            <el-input v-model="kw" style="border-radius: 100%; width: 150px" size="small" placeholder="搜索活动标题">
              <el-button slot="append" icon="el-icon-search" @click="doSearch" />
            </el-input>
            <el-button v-if="kw" type="text" size="small" @click="clearKw">清空</el-button>
          </div>
        </div>
        <div class="part-right">
          <div class="block">
            <el-button :disabled="loading" icon="el-icon-refresh" size="small" type="default"
              @click="loadData">刷新</el-button>
          </div>

          <div class="block">
            <el-button size="small" v-if="btns.create_tour" type="primary" icon="el-icon-plus"
              @click="newFormHandle">新建活动</el-button>
          </div>
        </div>
      </div>
      <el-table :data="items" highlight-current-row @row-click="itemSelect" size="small">
        <el-table-column prop="id" label="#" />
        <el-table-column prop="title" label="活动标题" />
        <el-table-column prop="name" label="发布状态">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.is_public">已发布</el-tag>
            <el-tag type="info" v-else>未发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="starts_at" label="开始时间" />
        <el-table-column prop="ends_at" label="截止时间" />

        <el-table-column prop="status_name" label="活动状态" />
        <el-table-column label="操作" :width="220">
          <template slot-scope="scope">
            <el-link v-if="btns.update_tour" type="primary" @click="editHandle(scope.row)">编辑</el-link>
            <el-link v-if="btns.delete_tour" type="danger" @click="deleteHandle(scope.row.id)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
          :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
          @size-change="updatePageSize" />
      </div>
    </ud-card>

    <el-dialog width="600px" :visible.sync="showForm" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="false" v-loading="loading" title="活动管理">
      <el-form label-width="150px" label-position="left" size="small">
        <el-form-item label="活动封面图">
          <image-picker padding="5" v-model="currentItem.cover" width="300" height="150" />
          <div style="font-size: 10px; color: #999">
            <i class="el-icon-info"></i>
            最佳图片尺寸 宽度300px，高度150px 或同比例
          </div>
        </el-form-item>

        <el-form-item label="活动标题">
          <el-input style="width: 300px;" v-model="currentItem.title"></el-input>
        </el-form-item>

        <el-form-item label="活动主办方">
          <el-input v-model="currentItem.master" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="开始时间">
          <el-date-picker style="width:300px;" v-model="currentItem.starts_at" size="small" type="datetime"
            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间日期" />
        </el-form-item>

        <el-form-item label="截止时间">
          <el-date-picker style="width:300px;" v-model="currentItem.ends_at" size="small" type="datetime"
            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间日期" />
        </el-form-item>
        <el-form-item label="关联楼盘">
          <post-multiple-selector v-model="currentItem.post_ids" customStyle="width: 300px"></post-multiple-selector>
          <div style="font-size: 10px; color: #999">
            <i class="el-icon-info"></i>
            选择关联楼盘后，将会在楼盘介绍页面中显示此活动链接
          </div>
        </el-form-item>

        <el-form-item label="跳转小程序id设置">
          <el-input style="width: 300px;" v-model="currentItem.weapp_id" placeholder="请填写小程序ID"></el-input>
        </el-form-item>
        <el-form-item label="跳转小程序页面设置">
          <el-input style="width: 300px;" v-model="currentItem.weapp_path" placeholder="请填写跳转小程序页面路径"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group border v-model="currentItem.is_public">
            {{ currentItem.is_public }}
            <el-radio :label="true">发布</el-radio>
            <el-radio :label="false">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="置顶">
          <el-switch v-model="currentItem.is_top"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button v-loading="loading" size="mini" type="default" @click="closeHandle"
          icon="el-icon-close">取消</el-button>
        <el-button v-loading="loading" size="mini" type="primary" @click="submitHandle"
          icon="el-icon-check">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.inline {
  display: flex;
  justify-content: space-between;
}

.icon-uploader .el-upload,
.icon-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 355px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-uploader img {
  width: 355px;
  height: 150px;
}

.icon-uploader .el-upload:hover {
  border-color: #409eff;
}

.app-container {
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

    .el-input {
      width: 250px;
      border-radius: 100%;
    }
  }
}
</style>

<script>
import {
  getToursList,
  updateTour,
  deleteTour,
} from "@/api/tour";
import TimePicker from "@/components/DateTimePicker";
import CitySelector from "@/components/CitySelector"
import { getPostSimpleList } from "@/api/post";
import HtmlEditor from "@/components/HtmlEditor";
import ImagePicker from "@/components/ImagePicker";
import PostMultipleSelector from "@/components/PostMultipleSelector.vue";
import UdCard from "@/components/UdCard";


export default {
  name: "tours",
  components: { TimePicker, HtmlEditor, UdCard, ImagePicker, CitySelector, PostMultipleSelector },
  data() {
    return {
      showMM: false,
      coupons: [],
      kw: "",
      showForm: false,
      total: 0,
      per_page: 20,
      current_page: 1,
      items: [],
      posts: [],
      loading: false,
      currentItem: { id: null, is_public: true, cover: "", content: "", cat: "weapp" },
      showDialog: false,
    };
  },
  props: {
    btns: { type: Object, default: null },
  },

  computed: {
    submitBtnText() {
      return this.currentItem.id ? "保存修改" : "创建活动";
    },
  },

  mounted: function () {
    this.loadData();
    this.loadPost();
  },

  watch: {
    current_page: function (newVal, oldVal) {
      this.loadData();
    },
    per_page: function (newVal, oldVal) {
      this.loadData();
    },
  },

  methods: {

    updateCurrentPage: function (page) {
      this.current_page = page;
    },

    loadPost: function () {
      var query = { group_v2: "new" };
      getPostSimpleList(query).then((resp) => {
        this.posts = resp.data;
      });
    },

    updatePageSize: function (size) {
      this.per_page = size || 10;
    },

    closeHandle: function () {
      this.currentItem = {};
      this.showForm = false;
    },

    newFormHandle: function () {
      this.currentItem = {
        is_top: false,
        is_public: true,
        title: "",
        cover: "",
        master: "",
        cat: "weapp",
      };
      this.showForm = true;
      this.loading = false;
    },
    editHandle: function (item) {
      this.showForm = true;
      this.currentItem = item;
    },
    doSearch: function () {
      // 搜索
      this.loading = true;
      this.page = 1;
      this.items = [];
      this.loadData();
    },

    clearKw: function () {
      this.kw = "";
      this.items = [];
      this.page = 1;
      this.loadData();
    },

    itemSelect: function (item) {
      this.currentItem = item;
    },

    deleteHandle: function (itemId) {
      var _this = this;
      this.$confirm("确定要删除这个活动吗?", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteTour(itemId).then((resp) => {
          _this.currentItem = {};
          _this.loadData();
        });
      });
    },

    validate: function (data) {
      if (!data.title || data.title.length <= 3) {
        this.$message.error("标题不能少于3个字");
        return false;
      }

      if (!data.cover) {
        this.$message.error("请上传封面图");
        return false;
      }

      if (!data.master) {
        this.$message.error("请填写活动主办方");
        return false;
      }

      if (!data.starts_at) {
        this.$message.error("请填写开始时间");
        return false;
      }

      if (!data.ends_at) {
        this.$message.error("请填写截止时间");
        return false;
      }

      if (!data.weapp_id) {
        this.$message.error("请选择跳转小程序appid");
        return false;
      }

      if (!data.weapp_path) {
        this.$message.error("请填写跳转小程序路径");
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
      updateTour(data).then((resp) => {
        this.loading = false;
        if (resp.status == 0) {
          this.loadData();
          this.$message.success("保存成功");
          this.showForm = false;
        }
      });
    },

    loadData: function () {
      this.loading = true;
      var query = {
        page: this.current_page,
        per_page: this.per_page,
        kw: this.kw,
      };
      getToursList(query).then((resp) => {
        console.log(resp);
        this.items = resp.data.result
        this.total = resp.data.page.total_items;
        this.loading = false;
      });
    },
  },
};
</script>

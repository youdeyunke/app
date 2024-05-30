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
  <div class="app-container">
    <new-form ref="newform" @create="createSuccessHandle" />
    <qr-preview ref="qr" @refresh="loadData" />

    <ud-card>
      <div class="myheader">
        <div class="part-left">
          <post-filter @change="filterChangeHandle"></post-filter>
        </div>

        <div class="part-right">
          <template v-if="selectionPosts.length > 0">
            <div class="block" v-if="btns.delete_post">
              <el-button
                :disabled="selectionPosts.length == 0"
                size="small"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="patchActionHandle('delete')"
                >{{ btns.delete_post.label || "删除" }}所选</el-button
              >
            </div>
            <div class="block" v-if="btns.unpublic_post">
              <el-button
                :disabled="selectionPosts.length == 0"
                size="small"
                type="default"
                plain
                icon="el-icon-sort-down"
                @click="patchActionHandle('unpublic')"
                >{{ btns.unpublic_post.label || "下架" }}所选</el-button
              >
            </div>
            <div class="block" v-if="btns.public_post">
              <el-button
                :disabled="selectionPosts.length == 0"
                size="small"
                type="default"
                plain
                icon="el-icon-sort-up"
                @click="patchActionHandle('public')"
                >{{ btns.public_post.label || "上架" }}所选</el-button
              >
            </div>
          </template>

          <div class="block">
            <el-button
              :disabled="loading"
              icon="el-icon-refresh"
              size="small"
              type="default"
              plain

              @click="loadData"
              >刷新</el-button
            >
          </div>


          <div class="block">
            <el-button
              v-if="btns.create_post"
              size="small"
              type="primary"

              icon="el-icon-plus"
              @click="newFormOpenHandle"
              >{{ btns.create_post.label }}</el-button
            >
          </div>
        </div>
      </div>

      <el-divider></el-divider>
      <el-table
        @selection-change="handleSelectionChange"
        @sort-change="sortChangeHandle"
        v-loading="loading"
        style="width: 100%"
        :data="posts"
        :row-class-name="tableRowClassName"
        size="small"
        element-loading-text="正在加载房源列表"
        fit
        highlight-current-row
      >
        <el-table-column  label="" width="50" type="expand" >
          <template slot-scope="scope">
            <post-base-info :post="scope.row" />
          </template>
        </el-table-column>

        <el-table-column prop="编号" label="选择" width="50" type="selection" />
        <el-table-column sortable="custom" prop="id" label="ID" width="80" />

        <el-table-column label="项目名称">
          <template slot-scope="scope">
            <div>
              <el-tag v-if="!scope.row.is_public" size="mini" type="warn" plain
                >未上架</el-tag
              >
              <el-tag v-if="scope.row.is_top" type="danger" size="mini" plain
                >置顶</el-tag
              >
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="面积">
          <template slot-scope="scope">
            {{ scope.row.area_info.text }} {{ scope.row.area_info.px }}
          </template>
        </el-table-column>

        <el-table-column label="均价" sortable="custom" prop="average_price">
          <template slot-scope="scope">
            {{ scope.row.average_price_info.text }} {{ scope.row.average_price_info.px }}
          </template>
        </el-table-column>

        <el-table-column label="总价" >
          <template slot-scope="scope">
            {{ scope.row.total_price_info.text }} {{ scope.row.total_price_info.px }}
          </template>
        </el-table-column>

        <el-table-column
          sortable="custom"
          label="状态"
          width="80"
          prop="sale_status_item_id"
        >
        <template slot-scope="scope">
          {{ scope.row.sale_status_item.name}}
        </template>
        </el-table-column>

        <el-table-column sortable="custom" prop="like_nums" label="收藏" width="80" />

        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-link icon="el-icon-edit" v-if="btns.update_post" type="primary" size="mini" @click="formOpenHandle(scope.row)" >编辑</el-link >

            <el-dropdown>
              <el-link type="primary" class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-link>
              <el-dropdown-menu slot="dropdown">

                <el-dropdown-item>
                  <el-link type="primary" size="mini" @click="bookingOpenHandle(scope.row)" >预约看房</el-link >
                </el-dropdown-item>

                <el-dropdown-item>
                  <el-link type="primary" size="mini" @click="qrHandle(scope.row)" >二维码</el-link >
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-link
                    :disabled="publicLoading"
                    v-if="btns.public_post || btns.unpublic_post"
                    :type="scope.row.is_public ? 'warning' : 'primary'"
                    size="mini"
                    @click="publicHandle(scope.row)"
                    >{{ scope.row.is_public == true ? "下架" : "上架" }}</el-link
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-link
                    type="primary"
                    v-if="btns.isTop_post"
                    :type="scope.row.is_top ? 'warning' : 'primary'"
                    @click="hotHandle(scope.row, !scope.row.is_top)"
                    >{{ scope.row.is_top == true ? "取消置顶" : "置顶" }}</el-link >
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-link
                    v-if="btns.delete_post"
                    type="danger"

                    @click="deleteHandle(scope.row.id)"
                    >{{ btns.delete_post.label || "删除" }}</el-link
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </template>
        </el-table-column>
      </el-table>

      <div class="pager">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="per_page"
          @current-change="updateCurrentPage"
          @size-change="updatePageSize"
        />
      </div>
    </ud-card>
  </div>
</template>

<style lang="scss" scoped>
.top-row {
  background: #ff0000;
}

.app-container {
  .myheader {
    display: flex;
    justify-content: space-between;
    align-items: center;

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
}
</style>

<script>
import { getPostList, updatePost, deletePost, publicPost, markHotPost } from "@/api/post";
import { mapGetters } from "vuex";
import NewForm from "./NewForm";
import UserSelector from "@/components/UserSelector";
import UdCard from "@/components/UdCard";
import TagItem from "@/components/TagItem";
import PostFilter from "./PostFilter/Index";
import PostBaseInfo from './PostBaseInfo'
import QrPreview from './QrPriview'


export default {
  name: "xinfang",
  components: {
    TagItem,
    NewForm,
    UserSelector,
    PostFilter,
    UdCard,
    PostBaseInfo,
    QrPreview,

  },
  computed: {
    ...mapGetters(["user"]),

  },

  props: {
    btns: { type: Object, default: null },
  },

  data: function () {
    return {
      currentRemarkPopId: null,
      formDataId: null,
      posts: [],
      selectionPosts: [],
      loading: true,
      downloadLoading: false,
      publicLoading: false,
      per_page: 20,
      total: 0,
      order: 'id desc',
      current_page: 1,
      filter: {},
    };
  },

  watch: {
    order: function(v){
      this.loadData()
    },
    current_page: function (newVal, oldVal) {
      this.loadData();
    },
    per_page: function (newVal, oldVal) {
      this.loadData();
    },
  },

  created() {
    this.loadData();
  },

  methods: {
    sortChangeHandle: function(e){
      var v = e.prop
      v = v.replace('_pretty', '')
      if(e.order == "descending"){
        v = v + ' desc'
      }else{
        v = v + ' asc'
      }
      this.order = v
    },

    uploadSuccess(){
      this.loadData();
    },

    qrHandle: function (post) {
      console.log('qr 1111')
      this.$refs.qr.openDialog(post);
    },

    filterChangeHandle: function (filter) {
      // 重新搜索
      console.log("filter is", filter);
      this.filter = filter;
      this.page = 1;
      this.loadData();
    },

    patchActionHandle: function (action) {
      var _this = this;
      if (action == "delete") {
        this.$confirm("确定要删除当前所选房源吗？").then(() => {
          _this.loading = true;
          _this.selectionPosts.forEach((p, i) => {
            deletePost(p.id).then((resp) => {
              if (i == _this.selectionPosts.length - 1) {
                _this.loadData();
                _this.$message.success("已删除");
              }
            });
          });
        });
        return;
      }

      this.selectionPosts.forEach((p, i) => {
        switch (action) {
          case "public":
            publicPost(p.id, true).then((resp) => {
              // pass
            });
            break;
          case "unpublic":
            publicPost(p.id, false).then((resp) => {
              // pass
            });
            break;
        }
        if (i == _this.selectionPosts.length - 1) {
          _this.loadData();
        }
      });
    },

    handleSelectionChange: function (items) {
      this.selectionPosts = items;
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.is_top === true) {
        return "top-row";
      }
      return "";
    },

    remarkBtnClick: function (item, val) {
      // 将其他的气泡隐藏
      this.currentRemarkPopId = val == true ? item.id : null;
    },

    remarkHandle: function (item) {
      var data = { id: item.id };
      data["remark"] = item.remark;
      this.loading = true;

      updatePost(data).then((resp) => {
        this.loading = false;
        this.$message.success("备注信息已保存");
        this.remarkBtnClick(item);
      });
    },

    postChange: function (data) {
      this.loadData();
    },

    hotHandle: function (post, val) {
      this.loading = true;
      markHotPost(post.id, val).then((resp) => {
        this.loading = false;
        if (resp.status == 0) {
          this.loadData();
        }
      });
    },

    publicHandle: function (post) {
      this.publicLoading = true;
      var v = !post.is_public;
      publicPost(post.id, v).then((resp) => {
        if (resp.status == 0) {
          post.is_public = v;
        }
        this.publicLoading = false;
      });
    },

    deleteHandle: function (pid) {
      this.$confirm("房源将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this._deleteHandle(pid);
      });
    },

    _deleteHandle(pid) {
      deletePost(pid).then((resp) => {
        if (resp.status == 0) {
          this.loadData();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },

    newFormOpenHandle: function (post) {
      this.$refs.newform.openDialog();
    },

    createSuccessHandle: function (post) {
      this.$refs.newform.closeDialog();
      this.formDataId = post.id;
      this.$message.success("创建项目成，请完善更多项目信息");
      this.loadData();
    },

    formCloseHandle: function () {
      console.log("form close");
      this.formDataId = null;
    },

    formOpenHandle: function (post) {
      this.$router.push({ path: post.url });
    },

    bookingOpenHandle(post){
      this.$router.push({path: post.bookings_url})
    },

    updateCurrentPage: function (page) {
      this.current_page = page;
    },

    updatePageSize: function (size) {
      this.per_page = size || 10;
    },

    downloadHandle: function () {
      console.log("start download ");
      this.downloadLoading = true;
      var _this = this;
      // TODO
      getPostList({
        download: true,
      }).then((resp) => {
        _this.downloadLoading = false;
        console.log("resp.data.data", resp.data.result, _this.loading);
      });
    },

    loadData: function () {
      this.loading = true;
      var _this = this;
      var query = {
        page: _this.current_page,
        per_page: _this.per_page,
        order: _this.order,
      };
      var filter = this.filter;
      Object.keys(filter).forEach((key, i) => {
        query[key] = filter[key];
      });
      console.log("post query is", query);

      getPostList(query).then((resp) => {
        _this.posts = resp.data.result

        _this.total = resp.data.page.total_items;
        _this.loading = false;
        console.log("resp.data.data", resp.data.result, _this.loading);
      });
    },
  },
};
</script>

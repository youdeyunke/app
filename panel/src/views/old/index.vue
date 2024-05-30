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
          <template v-if="selectionItems.length > 0">
            <div class="block" v-if="btns.delete_house">
              <el-button
                :disabled="selectionItems.length == 0"
                size="small"
                type="danger"
                plain

                @click="patchActionHandle('delete')"
                >{{ btns.delete_house.label || "删除" }}所选</el-button
              >
            </div>
            <div class="block" v-if="btns.unpublic_house">
              <el-button
                :disabled="selectionItems.length == 0"
                size="small"
                type="default"
                plain

                @click="patchActionHandle('unpublic')"
                >{{ btns.unpublic_house.label || "下架" }}所选</el-button
              >
            </div>
            <div class="block" v-if="btns.public_house">
              <el-button
                :disabled="selectionItems.length == 0"
                size="small"
                type="default"
                plain

                @click="patchActionHandle('public')"
                >{{ btns.public_house.label || "上架" }}所选</el-button
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
              v-if="btns.create_house"
              size="small"
              type="primary"
              icon="el-icon-plus"
              @click="newFormOpenHandle"
              >发布二手房源</el-button
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
        :data="items"
        :row-class-name="tableRowClassName"
        size="small"
        element-loading-text="正在加载房源列表"
        fit
        highlight-current-row
      >
        <el-table-column prop="编号" label="选择" width="50" type="selection" />
        <el-table-column sortable="custom" prop="id" label="ID" width="80" />

        <el-table-column label="标题">
          <template slot-scope="scope">
            <div>
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="小区" prop="sub_district_name">
        </el-table-column>

        <el-table-column label="地址" prop="address">
        </el-table-column>

        <el-table-column label="状态" prop="publish_status">
        </el-table-column>

        <el-table-column label="业务类型" prop="business">
        </el-table-column>

        <el-table-column label="价格信息" prop="average_price">
          <template slot-scope="scope">
            <span>
            {{ scope.row.price_label }} {{ scope.row.price_value }} {{ scope.row.price_unit}}
            </span>
          </template>
        </el-table-column>


        <el-table-column prop="like_nums" label="收藏" width="80" />
        <el-table-column sortable="custom" prop="view_nums" label="浏览" width="80" />

        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-link
              icon="el-icon-mobile-phone"
              type="primary"
              size="mini"
              @click="qrHandle(scope.row)"
              >预览</el-link
            >
            <el-link
              icon="el-icon-edit"
              type="primary"
              size="mini"
              @click="formOpenHandle(scope.row)"
              >管理</el-link
            >

            <el-link
              v-if="btns.delete_house"
              type="danger"
              @click="deleteHandle(scope.row.id)"
              >{{ btns.delete_house.label || "删除" }}</el-link
            >
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
import {
  getHouseList,
  updateHouse,
  deleteHouse,
  publicHouse,
  markHotHouse,
} from "@/api/house";
import { mapGetters } from "vuex";
import NewForm from "./NewForm";
import UserSelector from "@/components/UserSelector";
import UdCard from "@/components/UdCard";
import TagItem from "@/components/TagItem";
import BaseInfo from "./BaseInfo.vue";
import QrPreview from "./QrPriview.vue";
import PostFilter from "./PostFilter/Index";

export default {
  name: "old",
  components: {
    TagItem,
    NewForm,
    UserSelector,
    UdCard,
    BaseInfo,
    QrPreview,
    PostFilter,
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
      items: [],
      selectionItems: [],
      loading: true,
      downloadLoading: false,
      publicLoading: false,
      per_page: 20,
      total: 0,
      order: "id desc",
      current_page: 1,
      filter: {},
    };
  },

  watch: {
    order: function (v) {
      this.loadData();
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

    sortChangeHandle: function (e) {
      var v = e.prop;
      v = v.replace("_pretty", "");
      if (e.order == "descending") {
        v = v + " desc";
      } else {
        v = v + " asc";
      }
      this.order = v;
    },

    uploadSuccess(){
      this.loadData();
    },

    qrHandle: function (item) {
      this.$refs.qr.openDialog(item);
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
          _this.selectionItems.forEach((p, i) => {
            deleteHouse(p.id).then((resp) => {
              if (i == _this.selectionItems.length - 1) {
                _this.loadData();
                _this.$message.success("已删除");
              }
            });
          });
        });
        return;
      }

      this.selectionItems.forEach((p, i) => {
        switch (action) {
          case "public":
            publicHouse(p.id, true).then((resp) => {
              // pass
            });
            break;
          case "unpublic":
            publicHouse(p.id, false).then((resp) => {
              // pass
            });
            break;
        }
        if (i == _this.selectionItems.length - 1) {
          _this.loadData();
        }
      });
    },

    handleSelectionChange: function (items) {
      this.selectionItems = items;
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

      updateHouse(data).then((resp) => {
        this.loading = false;
        this.$message.success("备注信息已保存");
        this.remarkBtnClick(item);
      });
    },

    houseChange: function (data) {
      this.loadData();
    },

    hotHandle: function (item, val) {
      this.loading = true;
      markHotHouse(item.id, val).then((resp) => {
        this.loading = false;
        if (resp.status == 0) {
          this.loadData();
        }
      });
    },

    publicHandle: function (item) {
      this.publicLoading = true;
      var v = !item.is_public;
      publicHouse(item.id, v).then((resp) => {
        if (resp.status == 0) {
          item.is_public = v;
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
      deleteHouse(pid).then((resp) => {
        if (resp.status == 0) {
          this.loadData();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },

    newFormOpenHandle: function (house) {
      this.$refs.newform.openDialog();
    },

    createSuccessHandle: function (house) {
      this.$refs.newform.closeDialog();
      this.formDataId = house.id;
      this.$message.success("创建项目成，请完善更多项目信息");
      this.loadData();
      this.$router.push({ path: house.url });
    },

    formCloseHandle: function () {
      console.log("form close");
      this.formDataId = null;
    },

    formOpenHandle: function (house) {

      console.log(house.url);
      this.$router.push({ path: house.url });
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
      getHouseList({
        download: true,
      }).then((resp) => {
        _this.downloadLoading = false;
        console.log("resp.data.data", resp.data, _this.loading);
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

      getHouseList(query).then((resp) => {
        _this.items = resp.data.result.map((t, i) => {
          return t;
        });

        _this.total = resp.data.page.total_items;
        _this.loading = false;
      });
    },
  },
};
</script>

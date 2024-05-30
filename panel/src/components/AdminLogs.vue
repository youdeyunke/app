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
  <div class="app-container" v-cloak v-loading="loading">
    <div
      class="myheader"
      style="margin-bottom: 20px; display: flex; justify-content: space-between"
    >
      <div class="part-left" style="display: flex; align-items: center">
        <div class="block">
          <el-input
            v-model="kw"
            style="border-radius: 100%; width: 400px"
            size="small"
            placeholder="输入账号名、操作类型、操作内容、ip地址搜索"
          >
            <el-button slot="append" icon="el-icon-search" @click="doSearch" />
          </el-input>
          <el-button v-if="kw" type="text" size="small" @click="clearKw"
            >清空</el-button
          >
        </div>
        <div class="block" style="margin-left: 10px">
          <el-date-picker
            v-model="dateRange"
            value-format="yyyy-MM-dd"
            size="small"
            type="daterange"
            range-separator="至"
            start-placeholder="选择开始日期"
            end-placeholder="选择结束日期"
          />
        </div>
      </div>
      <div class="part-right">
        <el-button size="small" icon="el-icon-refresh" v-loading="loading" @click="loadData">刷新</el-button>
        <el-button
          size="small"
          type="primary"
          v-if="btns.export_logs"
          v-loading="downloading"
          icon="el-icon-download"
          @click="downloadCsv"
          >导出数据</el-button
        >
      </div>
    </div>
    <el-table size="small" :data="data" border>
      <el-table-column prop="id" label="#" width="80px"></el-table-column>
      <el-table-column prop="admin" label="账号" width="200px">
      </el-table-column>
      <el-table-column
        prop="operation_type"
        label="操作类型"
        width="120xp"
      ></el-table-column>
      <el-table-column prop="operation" label="操作内容"></el-table-column>
      <el-table-column prop="ip" label="操作地址"></el-table-column>
      <el-table-column prop="ip_region" label="归属地"></el-table-column>
      <el-table-column prop="created_at" label="操作时间" width="200px">
        <template slot-scope="scoped">
          {{ scoped.row.created_at | utcFormater }}
        </template>
      </el-table-column>
    </el-table>

    <div class="pager">
      <el-pagination
        :hide-on-single-page="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        @current-change="
          (p) => {
            page = p;
          }
        "
        @size-change="
          (v) => {
            pageSize = v;
          }
        "
      />
    </div>
  </div>
</template>

<script>
import { getLogs, exportLogs } from "@/api/logs";
export default {
  data() {
    return {
      data: [],
      total: 0,
      loading: false,
      page: 1,
      pageSize: 20,
      kw: "",
      dateRange: null,
      downloading: false,
    };
  },

  watch: {
    page: function () {
      this.loadData();
    },
    pageSize: function () {
      this.loadData();
    },
    dateRange: function (newValue, oldValue) {
      this.current_page = 1;
      this.loadData();
    },
  },
  props: {
    user: { type: String, default: "current" },
    btns: { type: Object, default: null },
  },

  mounted: function () {
    this.loadData();
  },

  computed: {
    date_range_str: function () {
      if (!this.dateRange) {
        return "";
      }
      var d1 = this.dateRange[0];
      var d2 = this.dateRange[1];
      return d1 + "," + d2;
    },
  },

  methods: {
    doSearch: function () {
      // 搜索
      this.loading = true;
      this.page = 1;
      this.loadData();
    },
    clearKw: function () {
      this.kw = "";
      this.loadData();
    },

    downloadCsv: function () {
      var _this = this;
      this.downloading = true;
      var query = {
        user: this.user,
        page: this.page,
        date_range: this.date_range_str,
        per_page: this.pageSize,
        kw: this.kw,
      }
      exportLogs(query).then((res) => {
        _this.downloading = false;
        const blob = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // 创建一个a标签
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob); // 设置文件的URL
        link.download = "操作日志.xlsx"; // 设置文件的下载名称

        // 模拟用户点击链接进行下载
        link.click();

        // 释放URL对象
        URL.revokeObjectURL(link.href);
      });
    },
    loadData: function () {
      var query = {
        user: this.user,
        page: this.page,
        date_range: this.date_range_str,
        per_page: this.pageSize,
        kw: this.kw,
      };
      this.loading = true;
      getLogs(query).then((resp) => {
        this.loading = false;
        this.data = resp.data.result;
        this.total = resp.data.page.total_items;
      });
    },
  },
};
</script>

<style scoped></style>

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
    <ud-card>
      <div class="myheader">
        <div class="part-left">

          <div class="block">
            <el-input v-model="kw" style="border-radius: 100%; width: 250px" size="small" placeholder="输入姓名、手机号、昵称搜索">
              <el-button slot="append" icon="el-icon-search" @click="doSearch" />
            </el-input>
          </div>

          <div class="block">
            <el-button v-if="dateRange || searchKw" type="text" size="small" @click="clearFilter">清空过滤条件
            </el-button>
          </div>
        </div>

        <div class="part-right">
          <div class="block">
            <el-button size="small" plain @click="setBookingTime" icon="el-icon-refresh">设置可预约时间段</el-button>
            <el-button size="small" plain @click="loadData" icon="el-icon-refresh">刷新</el-button>
            <el-button v-loading="downloading" v-if="btns.download_booking_logs" size="small" type="primary"
              icon="el-icon-download" @click="downloadCsv">导出数据
            </el-button>
          </div>
        </div>
      </div>

      <el-dialog v-loading="loading" title="可预约时间段设置" width="1000px" :visible.sync="showSetBookingTimeDialog"
        :close-on-click-modal="false" :close-on-press-escape="false">
        <el-alert title="为防止客户在非工作时间段预约看房，给客户带来不好的体验，建议您根据实际情况设置允许预约看房的时间段" type="warning" :closable="false">
        </el-alert>

        <el-table :data="setBookingTimeData" style="width: 100%">
          <el-table-column prop="week" label="星期" align="center" width="100px">
            <template slot-scope="scope">
              {{ weekMap[scope.row.week - 1] }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="开启预约" align="center" width="100px">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="hours" label="可预约时间" align="center" width="500px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.hours" placeholder="选择时间" multiple>
                <el-option v-for="item in options" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center" width="200px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" placeholder="备注" type="textarea" resize="none"></el-input>
            </template>
          </el-table-column>
        </el-table>


        <div slot="footer" class="dialog-footer">
          <el-button size="small" icon="el-icon-close" @click="showSetBookingTimeDialog = false">取消</el-button>
          <el-button size="small" icon="el-icon-check" type="primary" @click="setBookingTimeSub">确定
          </el-button>
        </div>
      </el-dialog>

      <el-table v-loading="listLoading" style="width: 100%" :data="logs" size="small" element-loading-text="正在加载数据" fit
        highlight-current-row>
        <el-table-column prop="id" label="#" :width="80" />

        <el-table-column label="客户手机号" :width="180" prop="mobile">
        </el-table-column>
        <el-table-column label="客户姓名" :width="100" prop="name">
        </el-table-column>

        <el-table-column label="预约时间">
          <template slot-scope="scope">{{ scope.row.date }} {{ scope.row.time }}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-link v-if="btns.delete_booking_log" type="danger" @click="deleteHandle(scope.row)">删除</el-link>
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
.app-container {
  .user-block {
    display: flex;
    align-items: center;

    .name {
      margin-left: 10px;
    }
  }

  .myheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;

    .part-left {
      display: flex;
      justify-content: flex-start;
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
  getBookingLogList,
  deleteBookingLog,
  exportBookingLogs, getBookingConfigs, updateBookingConfigs
} from "@/api/booking_log";
import UdCard from "@/components/UdCard";
import PostSelector from "@/components/PostSelector";

export default {
  components: { UdCard, PostSelector },
  name: "bookings",
  props: {
    btns: { type: Object, default: null },
  },
  data: function () {
    return {
      loading: false,
      showSetBookingTimeDialog: false,
      weekMap: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      setBookingTimeData: [],
      options: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      logs: [],
      dateRange: null,
      searchKw: "",
      downloading: false,
      postId: null,
      postFirstOption: { title: "全部项目", id: null },
      assignTypeItems: [
        { name: "全部", value: 'all' },
        { name: "已指派", value: 'assign' },
        { name: "未指派", value: 'no_assign' },
        // { name: "已取消", value: 2 },
      ],
      // assign_type: 'all',
      scopeValue: "public_items",
      kw: "",
      visitors: [],
      listLoading: true,
      per_page: 20,
      total: 0,
      current_page: 1,
      bookingId: null,
      brokerId: null,
    };
  },

  computed: {
    date_range_str: function () {
      if (!this.dateRange) {
        return "";
      }
      var d1 = new Date(this.dateRange[0]);
      var d2 = new Date(this.dateRange[1]);
      return d1.toLocaleDateString() + "," + d2.toLocaleDateString();
    },
  },

  watch: {
    dateRange: function (newValue, oldValue) {
      this.scopeValue = "all";
      this.current_page = 1;
      this.loadData();
    },

    postId: function (pid) {
      this.current_page = 1;
      this.items = [];
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
    var id = this.$route.params.id;
    this.postId = parseInt(id);
    this.loadData();
  },

  methods: {
    formatTime(value) {
      console.log(value)
      return value.join(',');
    },
    setBookingTime() {
      this.showSetBookingTimeDialog = true
      this.getBookingLogConfigsHandle(this.postId);
    },
    setBookingTimeSub() {
      this.loading = true;

      var data = {
        post_id: this.postId,
        booking_configs: this.setBookingTimeData
      };
      console.log(data)

      updateBookingConfigs(data).then((resp) => {
        if (resp.code != 0) {
          return;
        }

        this.$message.success("设置成功");
        this.getBookingLogConfigsHandle(this.postId);
      }).finally(() => {
        this.loading = false;
        this.showSetBookingTimeDialog = false;
      })
    },
    getBookingLogConfigsHandle(post_id) {
      this.loading = true;
      getBookingConfigs(post_id).then(resp => {
        this.loading = false;
        if (resp.code != 0) {
          return
        }

        this.setBookingTimeData = resp.data;

      }).finally(() => {
        this.loading = false;
      });
    },
    deleteHandle: function (item) {
      console.log("delete item", item);
      this.$confirm("确定要删除这条预约记录吗？", "确定删除").then(() => {
        deleteBookingLog(item.id).then((resp) => {
          if (resp.status !== 0) {
            return;
          }
          this.loadData();
          this.$message.success("已删除");
        });
      });
    },

    doSearch: function () {
      // 搜索
      this.loading = true;
      this.page = 1;
      this.searchKw = this.kw;
      this.loadData();
    },

    clearFilter: function () {
      this.dateRange = null;
      this.page = 1;
      this.searchKw = "";
      this.kw = "";
      this.scopeValue = this.scopeItems[0]["value"];
      this.loadData();
    },

    updateCurrentPage: function (page) {
      this.current_page = page;
    },

    updatePageSize: function (size) {
      this.per_page = size || 10;
    },

    loadData: function () {
      this.listLoading = true;
      var _this = this;
      getBookingLogList({
        order: "id desc",
        date_range: this.date_range_str,
        post_id: _this.postId || "",
        scope: _this.scopeValue,
        page: _this.current_page,
        per_page: _this.per_page,
        kw: _this.searchKw || "",
      }).then((resp) => {
        _this.logs = resp.data.result;
        _this.total = resp.data.page.total_items;
        _this.listLoading = false;
      });
    },

    downloadCsv: function () {
      var _this = this;
      this.downloading = true;
      var query = {
        post_id: this.postId
      }
      exportBookingLogs(query).then((res) => {
        _this.downloading = false;


        const blob = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // 创建一个a标签
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob); // 设置文件的URL
        link.download = "预约看房.xlsx"; // 设置文件的下载名称

        // 模拟用户点击链接进行下载
        link.click();

        // 释放URL对象
        URL.revokeObjectURL(link.href);
      });
    },
  },
};
</script>

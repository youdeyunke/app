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

    <ud-card title="我的账号">
      <el-form class="myform" label-width="120px">
        <el-form-item label="头像"><el-avatar :src="user.profile.avatar" /></el-form-item>
        <el-form-item label="用户名">{{ user.profile.email }}</el-form-item>
        <el-form-item label="API秘钥">
          <div class="secret-key">
            <span>{{ showSecret ? user.profile.api_key : maskedApiKey }}</span>
            <i class="el-icon-document-copy" v-if="user.profile.api_key" @click="copyKey" style="cursor: pointer;"></i>
            <i class="el-icon-view" @click="transformKey" style="cursor: pointer;"></i>
            <i class="el-icon-refresh" @click="resetKey" style="cursor: pointer;"></i>
          </div>
        </el-form-item>
        <el-form-item label="手机号">{{ user.profile.mobile }}</el-form-item>
        <el-form-item label="姓名">{{ user.profile.name }}</el-form-item>
        <el-form-item label="角色">
          <el-tag size="mini" :key="i" plain v-for="(r, i) in user.profile.roles">{{ r.name }}</el-tag>
        </el-form-item>
      </el-form>
    </ud-card>


  </div>
</template>

<script>
import UdCard from "@/components/UdCard";
import AdminLogs from "@/components/AdminLogs";
import { updateApiKey } from "@/api/myconfig";
import { mapGetters } from "vuex";
export default {
  components: { UdCard, AdminLogs },
  computed: {
    ...mapGetters(["user"]),
    maskedApiKey() {
      const key = this.user.profile.api_key || "";
      if (!key) {
        return "";
      }
      const length = key.length;
      const start = key.slice(0, 3);
      const end = key.slice(length - 3);
      const hidden = "*".repeat(length - 6);
      return start + hidden + end;
    },
  },
  data() {
    return {
      homeData: [],
      loading: true,
      showSecret: false,
    };
  },
  created() {
  },

  methods: {
    toggleSecret() {
      var bool = this.showSecret;
      this.showSecret = !bool;
    },
    transformKey() {
      this.showSecret = !this.showSecret;
    },
    copyKey() {
      const textToCopy = this.user.profile.api_key;

      // 创建一个临时的textarea元素
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);

      // 选中textarea中的文本
      textarea.select();

      // 执行复制命令
      document.execCommand("copy");

      // 移除临时的textarea元素
      document.body.removeChild(textarea);
      this.$message.success("已复制到剪贴板");
    },
    resetKey() {
      this.$confirm("重置后原密钥将失效，确定重置吗？", "重置密钥", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateApiKey().then((resp) => {
            if (resp.status !== 0) {
              return;
            }
            this.$store.dispatch("user/getInfo");
          });
        })
        .catch(() => {
        });

    },

  },
};
</script>

<style scoped>
.myform {
  margin-left: 20px;
}

.myform label {
  color: #99a9bf;
}

.counter-list {
  display: flex;
  flex-direction: flex-start;
}

.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 100px;
  padding: 15px;
  border-radius: 4px;
  margin-right: 20px;
}

.counter::after {
  content: "/";
}

.counter .value {
  font-weight: bold;
  font-size: 32px;
}

.secret-key {
  position: relative;
}

.el-icon-view,
.el-icon-refresh {
  /* position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  cursor: pointer; */
  margin-left: 10px;
}

.datas {
  display: flex;
  flex-wrap: wrap;
}

.data-item {
  background: linear-gradient(to right, #69a9fd, #466dfb);
  width: 200px;
  height: 80px;
  border-radius: 10px;
  color: #fff;
  padding: 15px;
  margin: 0 30px 30px 0;
}

.data-value {
  font-size: 36px;
  font-weight: bold;
}
</style>

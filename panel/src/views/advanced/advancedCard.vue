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
  <el-row type="flex" justify="center" :gutter="20">
    <el-col :xs="0" :sm="0" :md="3" :lg="4" :xl="5"></el-col>
    <el-col :xs="24" :sm="24" :md="18" :lg="16" :xl="14">
      <el-card class="advanced-card" shadow="never">
        <div class="header">
          <div class="func-title">{{ title }}</div>
          <el-button
            class="up-btn"
            @click="gotoPurchaseUrl"
            >免费试用专业版</el-button
          >
        </div>
        <div class="func-desc">
          {{ desc }}
        </div>

        <div v-if="image" class="func-image-wrapper">
          <img 
            class="func-image" 
            :src="getImageSrc()"
            @click="handleImageClick"
          >
        </div>

        <el-divider></el-divider>
        <div class="bottom">
          <div>
            <div class="attention-title">关注产品动态</div>
            <div class="attention-desc">关注友得云客公众号，获取最新产品信息</div>
          </div>
          <el-image
            class="attention-img"
            :src="require('@/assets/images/wx_gzh.png')"
          ></el-image>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="0" :sm="0" :md="3" :lg="4" :xl="5"></el-col>
  </el-row>
</template>

<script>
export default {
  name: "advancedCard",
  methods: {
    gotoPurchaseUrl() {
      window.open("https://youdeyunke.yuque.com/fbxh1v/install/trial");
    },
    getImageSrc() {
      if (this.image.startsWith("http") || this.image.startsWith("/")) {
        return this.image;
      }
      return require("@/" + this.image);
    },
    handleImageClick() {
      // 创建一个新窗口查看原图
      window.open(this.getImageSrc(), '_blank');
    }
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.advanced-card {
  margin-top: 60px;
}

.advanced-card :deep(.el-card__body) {
  padding: 40px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.func-title {
  font-size: 20px;
  color: #666;
  font-weight: 500;
}

.func-desc {
  font-size: 14px;
  color: #999999;
  margin-bottom: 30px;
}

.func-image-wrapper {
  width: 100%;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
}

.func-image {
  max-width: 100%;
  max-height: 450px;
  height: auto;
  cursor: pointer;
  vertical-align: middle;
}

.button-wrapper {margin-bottom:20px;
}

.up-btn {
  background-color: #333333;
  color: #e4be9e;
  border: 1px solid rgba(228, 190, 158, 0);
}

.up-btn:hover,
.up-btn:focus {
  color: #e4be9e;
  background-color: rgba(51, 51, 51, 0.8);
  border: 1px solid rgba(228, 190, 158, 0);
}

.bottom {
  display: flex;
  justify-content: space-between;
}

.attention-title {
  font-size: 20px;
  color: #666;
  font-weight: 500;
  margin-bottom: 25px;
  margin-top: 18px;
}

.attention-desc {
  font-size: 14px;
  color: #999999;
}

.attention-img {
  width: 290px;
  height: 105px;
}
</style>

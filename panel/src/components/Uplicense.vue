<template>
  <div>
    <el-button
      class="upBtn"
      icon="el-icon-upload2"
      size="small"
      style="margin-right: 10px;margin-top: 5px;"
      @click="gotoPurchaseUrl"
      >购买专业版</el-button
    >
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    };
  },

  mounted: function () {},

  mounted() {

  },
  methods: {
    gotoPurchaseUrl() {
      var url = "https://item.taobao.com/item.htm?ft=t&id=912787633808";
      window.open(url);
    },
  },
};
</script>

<style scoped>
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.upgrade-link {
  line-height: 40px;
  font-size: 12px;
  color: #e4be9e;
  margin-right: 10px;
  cursor: pointer;
}
.upBtn {
  background-color: #333333;
  color: #E4BE9E;
  border: 1px solid rgba(228, 190, 158, 0);
  margin-left:10px;
}
.upBtn:hover,
.upBtn:focus {
  color: #E4BE9E;
  background-color: rgba(51, 51, 51, 0.8);
  border: 1px solid rgba(228, 190, 158, 0);
}
</style>
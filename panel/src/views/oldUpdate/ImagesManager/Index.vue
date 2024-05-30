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
  <div class="content-manager">
    <images-picker
      @delete="deleteHandle"
      @change="changeHandle"
      @append="appendHandle"
      @drag="dragHandle"
      v-model="imgItems"
      :limit="100"
      style="min-height: 200px;"
      :file-types="['image']"
    ></images-picker>
    <div style="display: flex; flex-direction: row-reverse; margin-top: 20px">
      <el-button type="primary" size="mini" @click="submitHandle" icon="el-icon-check" :loading="loading">保存</el-button>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.tools {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
  
<script>
import { updateHouseDetail } from "@/api/house";
import ImagesPicker from "./Images.vue";

export default {
  components: {
    ImagesPicker,
  },
  props: {
    house: { type: Object, default: {} },
  },

  computed: {
    imgItems: {
      get() {
        if (this.house.images) {
          var arr = this.house.images.split("|");
        } else {
          var arr = [];
        }
        const objects = arr.map((str, index) => {
          return {
            id: index + 1,
            filetype: "image",
            url: str,
          };
        });
        console.log(arr, objects, "1313");
        return objects;
      },
      set(val) {
        const urls = val.map((obj) => obj.url);
        const concatenated = urls.join("|");
        this.house.images = concatenated;
      },
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  watch: {},

  created: function () {},

  methods: {
    submitHandle: function () {
      var data = {
        id: this.house.id,
        images: this.house.images,
      };

      console.log(data);

      if (!data.images) {
        this.$message.error("请选择楼盘相册");
        return;
      }

      updateHouseDetail(data).then((resp) => {
        this.loading = false;
        if (resp.status === 0) {
          this.$emit("change", resp.data);
          this.$message({ type: "success", message: "保存成功" });
        }
      });
    },

    deleteHandle: function (index) {
      console.log("delete handle", index);
      // TODO
      var imgItems = this.imgItems;
      imgItems.splice(index, 1);
      this.imgItems = imgItems;
    },

    appendHandle: function (items) {
      if (items.length == 0) {
        this.$message.success("添加成功");
        this.loading = false;
        this.loadData();
        return;
      }
      console.log("append handle", items);
      // 添加照片
      var arr = this.imgItems.concat(items);
      console.log(arr, "1212");
      this.imgItems = arr;
    },

    changeHandle: function (e) {
      // 修改了某个文件的链接
      console.log("change handle", e);
      var url = e.item.url;
      this.imgItems[e.index].url = url;
    },

    dragHandle: function (items) {
      // 移动完成
      // TODO
      this.imgItems = items;
    },
  },
};
</script>
  
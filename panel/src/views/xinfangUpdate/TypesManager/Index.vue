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
  <div id="types" v-loading="loading">
    <div class="tools">
      <div class="view-select">
        <template>
          <el-radio v-show="!showForm" size="small" v-model="viewMode" label="table">
            <i class="el-icon-s-unfold"></i>
            列表
          </el-radio>
          <el-radio v-show="!showForm" size="small" v-model="viewMode" label="block">
            <i class="el-icon-s-grid"></i>
            排序
          </el-radio>
        </template>
      </div>

      <div class="right">
        <el-button
          v-show="!showForm"
          size="small"
          @click="loadTypes"
          icon="el-icon-refresh"
          >刷新</el-button
        >

        <el-button
          :disabled="showForm"
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="createNewHandle"
          >添加一个户型</el-button
        >
      </div>
    </div>
    <el-divider></el-divider>

    <view class="empty" v-if="types.length === 0">还没有添加任何户型信息</view>
    <table-view
      v-show="viewMode == 'table' && showForm == false"
      @edit="editHandle"
      @delete="deleteHandle"
      :types="types"
    ></table-view>
    <block-view
      v-show="viewMode != 'table' && showForm == false"
      @drag="dragHandle"
      @edit="editHandle"
      @delete="deleteHandle"
      v-model="types"
    ></block-view>

    <div class="type-form" v-show="showForm">
      <div class="box">
        <el-form size="small" label-width="120px" label-position="right">
          <el-form-item label="名称">
            <el-input
              style="width: 220px"
              v-model="typeData.name"
              minlength="1"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="室">
            <el-input
              style="width: 220px"
              v-model="typeData.s"
              minlength="1"
              type="number"
            >
              <template slot="append">室</template>
            </el-input>
          </el-form-item>

          <el-form-item label="厅">
            <el-input
              style="width: 220px"
              v-model="typeData.t"
              minlength="1"
              type="number"
            >
              <template slot="append">厅</template>
            </el-input>
          </el-form-item>

          <el-form-item label="卫">
            <el-input
              style="width: 220px"
              v-model="typeData.w"
              minlength="1"
              type="number"
            >
              <template slot="append">卫</template>
            </el-input>
          </el-form-item>

          <el-form-item label="售价">
            <el-radio-group v-model="typeData.unknow_price">
              <el-radio :label="false">确定</el-radio>
              <el-radio :label="true">待定</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="销售状态">
            <el-radio-group v-model="typeData.sale_status_item_id">
              <el-radio
                :key="index"
                :label="s.id"
                :value="s.id"
                v-for="(s , index) in SaleStatusItems"
                >{{ s.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="朝向">
            <el-select
              style="width: 220px"
              filterable
              allow-create
              v-model="typeData.position"
              :popper-append-to-body="false"
              placeholder="请选择朝向"
            >
              <el-option
                v-for="(item, index) in positions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="建面">
            <el-input
              style="width: 220px"
              v-model="typeData.area"
              type="number"
              min="0.00"
              step="0.01"
            >
              <template slot="append">平</template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="typeData.unknow_price == false" label="总价">
            <el-input
              style="width: 220px"
              v-model="typeData.total_price"
              minlength="1"
              placeholder="万元"
            >
              <template slot="append">万/套</template>
            </el-input>
          </el-form-item>

          <el-form-item v-if="typeData.unknow_price == false" label="均价">
            <el-input
              style="width: 220px"
              v-model="typeData.average_price"
              type="number"
              min="0"
              step="1"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>

          <el-form-item label="户型图">
            <media-picker
              v-model="imgObjs"
              :fileTypes="['image']"
              @drag="imageDragHandle"
              @change="imageChangeHandle"
              @append="imageAppendHandle"
              @delete="imageDeleteHandle"
            ></media-picker>
            <div style="font-size: 10px; color: #999">
              <i class="el-icon-info"></i>
              最佳图片尺寸 宽度240px，高度180px 或同比例
            </div>
          </el-form-item>
          <el-form-item label="标签">
            <el-tag
              :key="tag"
              v-for="tag in typeTags"
              closable
              :disable-transitions="false"
              style="margin-right:4px"
              @close="removeTag(tag)"
            >
              {{ tag }}
            </el-tag>

            <el-input
              class="input-new-tag"
              v-if="showTagInput"
              v-model="currentTag"
              style="width:90px"
              ref="taginput"
              size="small"
              @keyup.enter.native="appendTag"
              @blur="appendTag"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              icon="el-icon-plus"
              @click="() => (showTagInput = true)"
              >添加</el-button
            >
          </el-form-item>

          <el-form-item label="主标签">
            <el-select
              style="width: 220px"
              filterable
              allow-create
              v-model="typeData.main_tag"
              :popper-append-to-body="false"
              placeholder="请选择主标签"
            >
              <el-option
                v-for="(item, index) in maintags"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            <div style="font-size: 10px; color: #999">
              <i class="el-icon-info"></i>
              主标签将突出显示在户型信息的左上角
            </div>
          </el-form-item>

          <el-form-item label="VR">
            <el-input
              style="width: 400px;"
              v-model="typeData.vr"
              placeholder="请输入户型VR链接"
            />
          </el-form-item>

          <el-form-item label="户型介绍">
            <el-input
              v-model="typeData.desc"
              type="textarea"
              maxlength="300"
              style="width: 400px;"
              :rows="10"
              show-word-limit
            />
          </el-form-item>
          <el-form-item size="large">
            <el-button size="small" type="default" @click="cancleHandle" icon="el-icon-close"
              >取消</el-button
            >
            <el-button size="small" type="primary" @click="submitHandle" icon="el-icon-check"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
}
.images {
  display: flex;
  justify-content: felx-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

.images .image-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #cecece;
  position: relative;
}

.images .image-item .actions {
  display: none;
}

.images .image-item:hover .actions {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidde;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
}

.images .image-item img {
  width: 100%;
  height: 100%;
}

.tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>

<script>
import Vue from "vue";
import {
  updateTypesOrder,
  deleteType,
  updateType,
  createType,
  getTypeList,
} from "@/api/post";
import { getAppConfig } from "@/api/myconfig";
import { getSaleStatusList } from "@/api/sale_status_item";
import TableView from "./TableView";
import BlockView from "./BlockView";
import MediaPicker from "@/components/MediaPicker";

export default {
  props: {
    postId: {
      type: Number,
      default: null,
    },
  },

  components: {
    MediaPicker,
    TableView,
    BlockView,
  },

  data() {
    return {
      viewMode: "table",
      showTagInput: false,
      tabValue: "merit",
      cdnDomain: "qiniucdn.udeve.cn",
      cdnProtoco: "http",
      showForm: false,
      SaleStatusItems: [],
      types: [],
      currentTag: "",
      allowImageTypes: ["jpg", "jpeg", "png", "gif"],
      allowImageSize: 1024 * 1024 * 5, // 2mb
      allowImageTypeStr: "5Mb",
      loading: false,
      positions: ["东", "南", "西", "北", "其它"],
      maintags: ["主推户型","主力户型","热销户型","优惠户型","特价户型"],
      typeData: {},
    };
  },

  watch: {
    postId: {
      immediate: true,
      handler(val, oval) {
        if (val) {
          this.loadTypes();
        }
      },
    },

    "typeData.total_price": function () {
      // 总价变化，自动计算均价
      this.genAveragePrice();
    },
    "typeData.area": function () {
      // 总价变化，自动计算均价
      this.genAveragePrice();
    },
  },

  created: function () {
    getAppConfig().then((resp) => {
      this.cdnDomain = resp.data["cdn_domain"];
      this.cdnProtoco = resp.data["cdn_https"] == true ? "https" : "http";
    });
    getSaleStatusList({ module_key: "post" }).then((resp) => {
      this.SaleStatusItems = resp.data;
    });
  },
  computed: {
    typeTags: {
      get() {
        if (this.typeData && this.typeData.tags) {
          return this.typeData.tags.split(",");
        }
        return [];
      },
      set(val) {
        console.log("tags val is", val);
        if(!val) {
          return;
        }
        var tags = val.join(",");
        this.typeData.tags = tags;
      },
    },

    imgObjs: {
      get() {
        if (!this.typeData.images) {
          return [];
        }
        var urls = this.typeData.images.split(",");
        return urls.map((url, i) => {
          return {
            name: "image",
            url: url,
            size: null,
            filetype: "image",
          };
        });
      },
      set(val) {
        var urls = val.map((v, i) => {
          return v.url;
        });
        var str = urls.join(",");
        this.typeData.images = str;
      },
    },
  },

  methods: {
    removeTag: function (tag) {
      var i = this.typeTags.indexOf(tag);
      this.typeTags.splice(i, 1);
      // 更新数据，否则界面不响应
      Vue.set(this, "typeTags", this.typeTags);
    },

    appendTag: function () {
      var tags = this.typeTags
      var tag = this.currentTag;
      if (tag) {
        tags.push(tag);
      }
      this.typeTags = tags
      this.currentTag = "";
      this.showTagInput = false;
    },

    genAveragePrice: function () {
      // 总价变化，自动计算均价
      if (this.typeData.unknow_price) {
        return;
      }
      if (this.typeData.total_price <= 0) {
        return;
      }
      if (this.typeData.area <= 0) {
        return;
      }
      // 计算均价
      var p = (this.typeData.total_price * 10000) / this.typeData.area;
      p = Math.ceil(p); // 向上取整
      Vue.set(this.typeData, "average_price", p);
    },

    dragHandle: function () {
      // 改变了户型的排列顺序
      var ids = this.types.map((t, i) => {
        return t.id;
      });
      updateTypesOrder(ids).then((resp) => {
        this.loadTypes();
      });
    },

    imageAppendHandle: function (imgs) {
      // 添加多张户型图
      // 修改imgObjs值
      var oldImgs = this.imgObjs;
      imgs = oldImgs.concat(imgs);
      this.imgObjs = imgs;
    },

    imageDeleteHandle: function (index) {
      // 删除一张户型图
      var imgs = this.imgObjs;
      imgs.splice(index, 1);
      this.imgObjs = imgs;
    },

    imageDragHandle: function (imgs) {
      // 修改了顺序
      this.imgObjs = imgs;
    },

    imageChangeHandle: function (e) {
      // 改变了其中的某一张图
      var imgs = this.imgObjs;
      imgs[e.index] = e.item;
      this.imgObjs = imgs;
    },

    removeHandle: function (i) {
      var list = this.imgObjs;
      list.splice(i, 1);
      this.imgObjs = list;
    },

    showFormHandle: function (e) {
      this.loading = false;
      this.showForm = true;
    },

    createNewHandle: function (e) {
      this.typeData = {
        s: 2,
        t: 1,
        w: 1,
        positon: "",
        images: "",
        desc: "",
        tags: "",
        average_price: 0,
        total_price: 0,
        area: 0.0,
        unknow_price: false,
        sale_status_item_id: 1,
      };
      this.showFormHandle();
    },

    editHandle: function (data) {
      this.typeData = data;
      this.showForm = true;
    },

    deleteHandle: function (item) {
      var tid = item.id;
      this.$confirm("确定要删除这个户型吗？", "删除提示", {
        confirmButtonText: "删除该户型",
        cancleButtonText: "不删除",
        type: "warning",
      }).then(() => {
        this.loading = true;
        deleteType(tid).then((resp1) => {
          getTypeList(this.postId).then((resp) => {
            this.types = resp.data;
            this.loading = false;
          });
        }).catch((err) => {
                this.loading = false
                console.log(err);
            });;
      });
    },

    fileChangeHandle: function (e) {},

    validate: function (data) {
      if (!data.s || !data.t || !data.w) {
        return [false, "室厅卫填写错误"];
      }
      if (data.area <= 0) {
        return [false, "面积信息填写错误"];
      }
      if (!data.position) {
        return [false, "朝向填写错误"];
      }
      if (!data.sale_status_item_id) {
        return [false, "请选择销售状态"];
      }

      if (data.unknow_price == false) {
        if (data.total_price <= 0 || data.average_price <= 0) {
          return [false, "价格信息填写错误"];
        }
      }

      return [true, "ok"];
    },

    cancleHandle: function () {
      this.loading = false;
      this.loadTypes();
      this.showForm = false;
    },

    submitHandle: function () {
      var data = this.typeData;
      data["post_id"] = this.postId;
      // validate
      var vres = this.validate(data);
      var isok = vres[0];
      var msg = vres[1];
      if (!isok) {
        this.$message.error(msg);
        return;
      }

      this.loading = true;
      if (!data.id) {
        createType(data).then((resp) => {
          this.submitCallback(resp);
        }).catch((err) => {
                this.loading = false
                console.log(err);
            });;
      } else {
        updateType(data).then((resp) => {
          this.submitCallback(resp);
        }).catch((err) => {
                this.loading = false
                console.log(err);
            });;
      }
    },

    submitCallback: function (resp) {
      this.loading = false;
      if (resp.status != 0) {
        return false;
      }
      this.loadTypes();
      this.$message.success("保存成功");
      this.showForm = false;
    },

    loadTypes: function () {
      this.loading = true;
      getTypeList(this.postId).then((resp) => {
        this.types = resp.data;
        this.loading = false;
      });
    },
  },
};
</script>

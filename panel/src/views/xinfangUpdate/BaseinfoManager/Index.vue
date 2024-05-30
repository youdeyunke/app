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
  <div v-loading="loading" class="baseinfo" v-cloak>

    <div style="display: flex">
      <el-form
        :model="post"
        label-position="right"
        :rules="rules"
        label-width="120px"
        size="mini"
        v-loading="loading"
      >
        <el-form-item label="项目名称">
          <el-input
            style="width: 220px"
            v-model="post.title"
            size="small"
            placeholder
          ></el-input>

          <br />

          <div
            style="font-size: 12px; color: #999"
            v-if="post.title && post.title.length >= 2"
          >
            <i class="el-icon-search"></i>&nbsp;快速查询：
            <el-link
              target="_blank"
              style="font-size: 12px"
              :href="'https://xa.fang.anjuke.com/loupan/s?kw=' + post.title"
              >安居客</el-link
            >&nbsp;
            <el-link
              target="_blank"
              style="font-size: 12px"
              size="mini"
              :href="
                'https://xian.fang.com/quanwangso/search.html?q=' +
                post.title +
                '&xf_source='
              "
              >房天下</el-link
            >
          </div>
        </el-form-item>

        <el-form-item label="项目亮点">
          <el-input
            style="width: 220px"
            v-model="post.point_title"
            size="small"
            placeholder="例如，登记时间：2021.12.1日登记截止"
          ></el-input>
        </el-form-item>

        <el-form-item label="城市/区域">
          <city-district-selector
            size="small"
            custom-style="width: 220px"
            v-model="post.district_id"
          ></city-district-selector>
        </el-form-item>
        <div class="blank"></div>

        <div class="blank"></div>
        <el-form-item label="项目地址">
          <el-input
            style="width: 400px"
            size="small"
            v-model="post.street"
            placeholder
          ></el-input>
        </el-form-item>

        <el-form-item label="销售状态">
          <el-radio-group v-model="post.sale_status_item_id">
            <el-radio :label="s.id" v-for="s in SaleStatusItems">{{
              s.name
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="blank"></div>
        <el-form-item label="上架状态">
          <el-radio-group v-model="post.is_public">
            <el-radio :label="true">上架</el-radio>
            <el-radio :label="false">下架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="装修情况">
          <fitment-selector
            size="mini"
            v-model="post.fitment_id"
          ></fitment-selector>
        </el-form-item>

        <el-form-item label="卖点标签">
          <el-select
            v-model="post.tag_ids"
            multiple
            :multiple-limit="5"
            type="text"
            style="width: 400px"
            :disabled="tagsLoading"
            filterable
            :allow-create="false"
            default-first-option
            placeholder="请选择标签"
          >
            <el-option
              v-for="(tag, index) in tagsItems"
              :key="tag.id"
              :label="tag.name"
              :value="tag.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="面积区间">
          <range-input
            v-show="!post.unknow_area"
            custom-style="width:220px;"
            v-model="areaRange"
            unit="平米"
          ></range-input>
          <el-checkbox style="margin-left: 10px" v-model="post.unknow_area"
            >待定</el-checkbox
          >
        </el-form-item>

        <el-form-item label="总价区间">
          <range-input
            v-show="!post.unknow_total_price"
            custom-style="width:220px;"
            v-model="totalPriceRange"
            unit="万/套"
          ></range-input>
          <el-checkbox
            style="margin-left: 10px"
            v-model="post.unknow_total_price"
            >待定</el-checkbox
          >
        </el-form-item>

        <el-form-item label="参考均价">
          <range-input
            v-show="!post.unknow_price"
            custom-style="width:220px;"
            v-model="averagePriceRange"
            unit="元/㎡"
          ></range-input>

          <el-checkbox style="margin-left: 10px" v-model="post.unknow_price"
            >待定</el-checkbox
          >
        </el-form-item>
      </el-form>

      <el-form
        :model="post"
        label-position="right"
        :rules="rules"
        label-width="120px"
        size="mini"
        v-loading="loading"
      >
        <el-form-item label="咨询电话">
          <el-input
            v-model="post.phone"
            autocomplete="off"
            style="width: 130px"
            placeholder="电话号码"
          ></el-input>
          <span style="font-size: 12px; color: #999">-</span>
          <el-input
            v-model="post.sub_phone"
            style="width: 100px"
            placeholder="可留空"
            autocomplete="off"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="物业类型">
          <el-select
            :disabled="catsLoading"
            multiple
            :multiple-limit="5"
            v-model="post.cat_ids"
            style="width: 220px"
            placeholder="请选择"
          >
            <el-option
              v-for="cat in catsItems"
              :key="cat.id"
              :label="cat.name"
              :value="cat.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="封面配图">
          <image-picker
            width="150"
            height="100"
            v-model="post.cover"
          ></image-picker>
          <div style="font-size: 10px; color: #999">
            <i class="el-icon-info"></i>
            最佳图片尺寸 宽度270px，高度200px 或同比例
          </div>
        </el-form-item>
        <el-form-item label="显示浏览量">
          <el-input
            style="width: 120px"
            type="number"
            v-model="post.view_nums"
            placeholder="请输入数字"
          ></el-input>
        </el-form-item>

        <el-form-item label="地图导航">
          <el-tag size="mini" v-if="post.latitude && post.longitude"
            >已设置（经度: {{ post.latitude }}，纬度:
            {{ post.longitude }}）</el-tag
          >
          <el-tag size="mini" v-else>未设置</el-tag>
          <MapMarkerDialogButton @change="markerChange" :lat="lat" :lng="lng"></MapMarkerDialogButton>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            style="width: 400px"
            type="textarea"
            :rows="8"
            :maxlength="200"
            show-word-limit
            v-model="post.remark"
            placeholder="备注信息"
          ></el-input>
          <div style="font-size: 12px; color: #999">
            <i class="el-icon-info"></i>
            备注信息不会对客户展示，仅在管理后台显示
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div style="display: flex; flex-direction: row-reverse">
      <el-button type="primary" icon="el-icon-check" size="small" @click="submitHandle">{{
            btnText
          }}</el-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import {
  updatePost,
  createPost,
  getPostDetail,
  getCatList,
} from "@/api/post";
import { getSaleStatusList } from "@/api/sale_status_item";
import { getTagList } from "@/api/tag";
import MetaEditor from "@/components/MetaEditor";
import ImagePicker from "@/components/ImagePicker";
import UserSelector from "@/components/UserSelector";
import RangeInput from "@/components/RangeInput";
import FitmentSelector from "@/components/FitmentSelector";
import CityDistrictSelector from "@/components/CityDistrictSelector";
import MapMarkerDialogButton from "@/components/MapMarkerDialogButton";

export default {
  components: {
    UserSelector,
    ImagePicker,
    MetaEditor,
    RangeInput,
    CityDistrictSelector,
    FitmentSelector,
    MapMarkerDialogButton,
  },
  data() {
    return {
      rules: {},
      post: {},
      // mapTabs: [],
      tagsItems: [],
      catsItems: [],
      SaleStatusItems: [],
      loading: false,
      tagsLoading: true,
      catsLoading: true,
      FitmentSelector,
      saleStatusLoading: true,
    };
  },
  props: {
    postId: { type: Number },
  },

  watch: {
    postId: {
      immediate: true,
      deep: true,
      handler(val, oval) {
        if (!val) {
          return false;
        }
        this.loadPost();
      },
    },
  },

  mounted: function () {
    var _this = this;
    _this.tagsLoading = true;
    getTagList({ module_key: "post", per_page: 999999 }).then((resp) => {
      _this.tagsItems = resp.data.result;
      _this.tagsLoading = false;
    });

    getSaleStatusList({ module_key: "post" }).then((resp) => {
      _this.SaleStatusItems = resp.data;
    });
    getCatList().then((resp) => {
      _this.catsLoading = false;
      _this.catsItems = resp.data;
    });
  },

  computed: {
    ...mapGetters(["user"]),

    areaRange: {
      get() {
        return [this.post.area_min, this.post.area_max];
      },
      set(res) {
        if (res.length == 0) {
          return;
        }
        Vue.set(this.post, "area_min", res[0]);
        Vue.set(this.post, "area_max", res[1]);
      },
    },

    averagePriceRange: {
      get() {
        return [this.post.average_price, this.post.average_price_max];
      },
      set(res) {
        if (res.length == 0) {
          return;
        }
        Vue.set(this.post, "average_price", res[0]);
        Vue.set(this.post, "average_price_max", res[1]);
      },
    },
    totalPriceRange: {
      get() {
        return [this.post.total_price_min, this.post.total_price_max];
      },
      set(res) {
        if (res.length == 0) {
          return;
        }
        Vue.set(this.post, "total_price_min", res[0]);
        Vue.set(this.post, "total_price_max", res[1]);
      },
    },

    btnText: function () {
      return this.postId ? "保存" : "保存，并进入下一步";
    },
    lng: {
      get() {
        if (!this.post) {
          return 0;
        }
        return parseFloat(this.post.longitude);
      },
      set(val) {
        this.post.longitude = val;
      },
    },
    lat: {
      get() {
        if (!this.post) {
          return 0;
        }
        return parseFloat(this.post.latitude);
      },
      set(val) {
        this.post.latitude = val;
      },
    },
  },

  methods: {
    userSelectorChangeHandle: function (user) {
      // 信息维护人变化
      // 如果联系电话为空，那么自动填入维护人电话
      if (!this.post.phone && user) {
        this.post.phone = user.mobile;
        this.post.sub_phone = null;
      }
    },

    validate: function () {
      var p = this.post;
      if (!p.title || p.title.length < 1) {
        return [false, "请填写项目名称"];
      }

      if (!p.sale_status_item_id) {
        return [false, "请选择销售状态"];
      }

      if (!p.fitment_id) {
        return [false, "请选择装修情况"];
      }

      if (!p.district_id) {
        return [false, "请选择项目所在区域"];
      }

      if (!p.tag_ids || p.tag_ids.length == 0) {
        return [false, "请至少选择一个卖点标签"];
      }

      if (!p.cat_ids || p.cat_ids.length == 0) {
        return [false, "请选择物业类型"];
      }

      if (!p.cover || p.cover.length == 0) {
        return [false, "请上传封面配图"];
      }

      if (!p.unknow_area) {
        if (!p.area_min || !p.area_max) {
          return [false, "请填写建筑面积范围"];
        }
      }

      if (!p.unknow_price) {
        if (!p.average_price) {
          return [false, "请填写参考均价"];
        }
      }

      if (!p.unknow_total_price) {
        if (!p.total_price_min || !p.total_price_max) {
          return [false, "总价范围"];
        }
      }

      if (!p.cover) {
        return [false, "请上传项目封面图片"];
      }

      return [true, "ok"];
    },

    doCreate: function (data) {
      createPost(data).then((resp) => {
        this.loading = false;
        if (resp.status == 0) {
          this.$emit("create", resp.data);
        }
      });
    },

    submitHandle: function () {
      var _res = this.validate();
      var isOk = _res[0],
        err = _res[1];
      if (!isOk) {
        this.$message.error(err);
        return false;
      }
      var data = JSON.parse(JSON.stringify(this.post));
      // data.map_tabs = this.mapTabs.join(',')

      if (!this.postId) {
        return this.doCreate(data);
      }

      this.loading = true;
      // 删除images相关的字段，防止保存的时候被覆盖
      updatePost(data).then((resp) => {
        this.loading = false;
        if (resp.status === 0) {
          // this.post = resp.data
          this.$emit("change", resp.data);
          this.$message({ type: "success", message: "保存成功" });
          this.loadPost();
        }
      }).catch((err) => {
          this.loading = false
          console.log(err);
      });
    },

    markerChange: function (marker) {
      if (!marker) {
        return false;
      }

      var post = this.post;
      post.latitude = marker.lat;
      post.longitude = marker.lng;
      this.post = post;
    },

    setMapHandle: function () {
      this.$refs.setMapDialog.openDialogHandle();
    },

    loadPost: function () {
      this.loading = true;
      getPostDetail(this.postId).then((resp) => {
        this.loading = false;
        var post = resp.data;
        post.latitude = post.latitude ? parseFloat(post.latitude) : null;
        post.longitude = post.longitude ? parseFloat(post.longitude) : null;
        this.post = post;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

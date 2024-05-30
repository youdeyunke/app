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
        :model="house"
        label-position="right"
        :rules="rules"
        label-width="120px"
        size="mini"
        v-loading="loading"
      >
        <el-form-item label="城市/区域">
          <city-district-selector
            size="small"
            custom-style="width: 320px"
            @change="districtChange"
            v-model="house.district_id"
          ></city-district-selector>
        </el-form-item>

        <el-form-item label="小区">
          <poi-search
            placeholder="搜索小区"
            size="mini"
            custom-style="width:320px"
            :district="districtName"
            :city="cityName"
            v-model="house.sub_district_name"
            @change="poiChange"
          ></poi-search>
        </el-form-item>

        <el-form-item label="标题">
          <el-input
            v-model="house.title"
            style="width: 320px"
            placeholder=""
            maxlength="100"
            minlength="5"
            show-world-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="房源地址">
          <el-input
            style="width: 320px"
            size="small"
            v-model="house.address"
            placeholder
          ></el-input>
        </el-form-item>

        <el-form-item label="地图导航">
          <el-tag size="mini" v-if="house.latitude && house.longitude"
            >已设置（经度: {{ house.latitude }}，纬度:
            {{ house.longitude }}）</el-tag
          >
          <el-tag size="mini" v-else>未设置</el-tag>
          <MapMarkerDialogButton @change="markerChange" :lat="lat" :lng="lng"></MapMarkerDialogButton>
        </el-form-item>

        <el-form-item label="朝向">
          <enumeration-selector
            custom-style="width:320px"
            v-model="house.position"
            size="mini"
            :editable="false"
            cat="house_position"
          />
        </el-form-item>

        <el-form-item label="业务类型">
          <enumeration-selector
            custom-style="width:320px"
            :disabled="house.id ? true : false"
            v-model="house.business"
            size="mini"
            :radio="true"
            :editable="false"
            cat="house_business"
          />
        </el-form-item>

        <el-form-item label="挂售方式">
          <el-radio-group v-model="house.seller">
            <el-radio label="经纪人">经纪人挂售</el-radio>
            <el-radio label="业主">业主挂售</el-radio>
          </el-radio-group>
          <div
            style="font-size: 12px; color: #999"
            v-if="house.sale_from == 'owner'"
          >
            <i class="el-icon-info"></i>
            对外显示业主联系方式，客户可以直接联系到业主
          </div>
        </el-form-item>

        <el-form-item label="联系方式">
          <el-input
            style="width: 100px"
            v-model="house.contact_name"
            placeholder="姓名"
          ></el-input>
          <el-input
            style="width: 220px"
            v-model="house.contact_mobile"
            placeholder="电话"
          ></el-input>
        </el-form-item>

        <el-form-item size="small" v-if="!house.id">
          <el-button type="primary" size="small" @click="submitHandle" icon="el-icon-check">{{
            btnText
          }}</el-button>
        </el-form-item>

        <template v-if="house.id">
          <el-form-item label="房源编号">
            <el-input
              style="width: 320px"
              v-model="house.internal_id"
              placeholder=""
              maxlength="50"
              show-world-limit
            ></el-input>
            <div style="font-size: 12px; color: #999">
              <i class="el-icon-info"></i>
              自定义房源编号,便于房源检索和管理,可不填
            </div>
          </el-form-item>

          <el-form-item label="封面图">
            <image-picker
              width="320"
              height="210"
              v-model="house.cover"
            ></image-picker>
            <div style="font-size: 10px; color: #999">
                <i class="el-icon-info"></i>
                最佳图片尺寸 宽度230px，高度180px 或同比例
            </div>
          </el-form-item>
        </template>
      </el-form>

      <el-form
        :model="house"
        label-position="right"
        :rules="rules"
        label-width="120px"
        size="mini"
        v-if="house.id"
        v-loading="loading"
      >
        <el-form-item label="户型名称">
          <el-input
            style="width: 320px"
            v-model="house.type_name"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="朝向">
          <enumeration-selector
            custom-style="width:320px"
            v-model="house.position"
            size="mini"
            :editable="false"
            cat="house_position"
          />
        </el-form-item>

        <el-form-item label="户型图">
          <image-picker
            width="150"
            height="100"
            v-model="house.type_image"
          ></image-picker>
          <div style="font-size: 10px; color: #999">
              <i class="el-icon-info"></i>
              最佳图片尺寸 宽度200px，高度200px 或同比例
          </div>
        </el-form-item>
        <el-form-item label="装修情况">
          <enumeration-selector
            custom-style="width:320px"
            v-model="house.fitment"
            size="mini"
            :editable="false"
            cat="house_fitment"
          />
        </el-form-item>

        <el-form-item label="物业类型">
          <enumeration-selector
            custom-style="width:320px"
            v-model="house.category"
            size="mini"
            :editable="false"
            cat="house_category"
          />
        </el-form-item>

        <el-form-item label="卖点标签">
          <el-tag
            :key="tag"
            v-for="tag in houseTags"
            closable
            :disable-transitions="false"
            style="margin-right: 10px"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            style="width: 120px"
            v-if="inputTagVisible"
            v-model="inputTagValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            icon="el-icon-plus"
            @click="showInput"
            >添加</el-button
          >
        </el-form-item>

        <el-form-item label="面积">
          <el-input style="width: 320px" v-model="house.area_value" /> 平米
        </el-form-item>

        <el-form-item :label="house.price_label">
          <el-input style="width: 320px" v-model="house.price_value" />
          {{ house.price_unit }}
        </el-form-item>

        <el-form-item label="房源状态">
          <enumeration-selector
            custom-style="width:320px"
            v-model="house.publish_status"
            size="mini"
            :radio="true"
            :editable="false"
            cat="house_publish_status"
          />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="house.id" style="display: flex; flex-direction: row-reverse">
      <el-button type="primary" size="small" @click="submitHandle" icon="el-icon-check">{{
        btnText
      }}</el-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { updateHouse, createHouse, getHouseDetail } from "@/api/house";
import { getSaleStatusList } from "@/api/sale_status_item";
import { getTagList } from "@/api/tag";
import { getCatList } from "@/api/common";
import MetaEditor from "@/components/MetaEditor";
import PoiSearch from "@/components/PoiSearch";
import ImagePicker from "@/components/ImagePicker";
import UserSelector from "@/components/UserSelector";
import RangeInput from "@/components/RangeInput";
import FitmentSelector from "@/components/FitmentSelector";
import CityDistrictSelector from "@/components/CityDistrictSelector";
import MapMarkerDialogButton from "@/components/MapMarkerDialogButton";
import { getDistrict } from "@/api/district";

export default {
  components: {
    UserSelector,
    ImagePicker,
    MetaEditor,
    RangeInput,
    CityDistrictSelector,
    FitmentSelector,
    PoiSearch,
    MapMarkerDialogButton,
  },
  data() {
    return {
      rules: {},
      tagsItems: [],
      catsItems: [],
      SaleStatusItems: [],
      loading: false,
      tagsLoading: true,
      catsLoading: true,
      saleStatusLoading: true,
      districtName: "",
      cityName: "",
      houseTags: [],
      inputTagVisible: false,
      inputTagValue: "",
    };
  },
  props: {
    value: { type: Object },
  },

  watch: {
    "value.district_id": function (val) {
      if (!val) {
        this.districtName = "";
        return
      }
      getDistrict(val).then((res) => {
        this.districtName = res.data.name;
        this.cityName = res.data.city.name;
      });
    },
    "value.tags": function (val) {
      if (!val) {
        this.houseTags = [];
      } else {
        this.houseTags = this.house.tags.split(",");
      }
    },
    houseTags: function (val) {
      this.house.tags = val.join(",");
    },
  },

  mounted: function () {
    var _this = this;
    _this.tagsLoading = true;

    getTagList({ module_key: "house", per_page: 999999 }).then((resp) => {
      _this.tagsItems = resp.data.result;
      _this.tagsLoading = false;
    });

    getSaleStatusList({ module_key: "house" }).then((resp) => {
      _this.SaleStatusItems = resp.data;
    });

    getCatList({ module_key: "house" }).then((resp) => {
      _this.catsLoading = false;
      _this.catsItems = resp.data;
    });
  },

  computed: {
    ...mapGetters(["user"]),

    house: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },

    houseId: function () {
      if (this.value && this.value.id) {
        return this.value.id;
      } else {
        return null;
      }
    },

    btnText: function () {
      return this.houseId ? "保存" : "保存，并进入下一步";
    },
    houseImages: {
      get() {
        if (this.house && this.house.images) {
          return this.house.images.split("|");
        } else {
          return [];
        }
      },
      set(val) {
        this.house.images = val.join("|");
      },
    },
    lng: {
      get() {
        if (!this.house) {
          return 0;
        }
        return parseFloat(this.house.longitude);
      },
      set(val) {
        this.house.longitude = val;
      },
    },
    lat: {
      get() {
        if (!this.house) {
          return 0;
        }
        return parseFloat(this.house.latitude);
      },
      set(val) {
        this.house.latitude = val;
      },
    },
  },

  methods: {
    poiChange: function (poi) {
      console.log(poi);
      Vue.set(this.house, "sub_district_name", poi.title);
      // 创建小区，生成小区id
      var sub = {
        city_id: this.house.city_id,
        district_id: this.house.district_id,
        name: poi.title,
        street: poi.address,
        category: poi.category,
        latitude: poi.location.lat,
        longitude: poi.location.lng,
      };
      this.house.latitude = poi.location.lat;
      this.house.longitude = poi.location.lng;
      this.house.address = poi.address;

    },

    setMapHandle: function () {
      this.$refs.setMapDialog.openDialogHandle();
    },

    markerChange: function (marker) {
      if (!marker) {
        return false;
      }

      var house = this.house;
      house.latitude = marker.lat;
      house.longitude = marker.lng;
      this.house = house;
    },

    districtChange: function (did) {
      getDistrict(did).then((resp) => {
        Vue.set(this.house, "city_id", resp.data.city_id);
      });
    },

    validate: function () {
      var p = this.house;

      if (!p.district_id) {
        return [false, "请选择项目所在区域"];
      }

      if (!p.sub_district_name) {
        return [false, "请填写小区"];
      }

      if (!p.seller) {
        return [false, "请填写挂售方式"];
      }

      if (!p.title || p.title.length < 1) {
        return [false, "请填写房源标题"];
      }

      if (!p.contact_mobile || !p.contact_name) {
        return [false, "请填写联系方式"];
      }


      if (!this.house.id) {
        return [true, "ok"];
      }

      if (!p.price_value) {
        return [false, "请填写价格信息"];
      }

      if (!p.area_value) {
        return [false, "请填写面积信息"];
      }

      if (!p.type_name) {
        return [false, "请填写户型名称"];
      }
      if (!p.type_image) {
        return [false, "请上传户型图"];
      }
      if (!p.cover) {
        return [false, "请上传封面图"];
      }
      if (!p.fitment) {
        return [false, "请选择装修情况"];
      }
      if (!p.category) {
        return [false, "请选择物业类型"];
      }
      if (!p.position) {
        return [false, "请选择户型朝向"];
      }
      if (!p.tags) {
        return [false, "请添加卖点标签"];
      }
      if (!p.publish_status) {
        return [false, "请选择房源状态"];
      }

      return [true, "ok"];
    },

    doCreate: function (data) {
      createHouse(data).then((resp) => {
        this.loading = false;
        if (resp.status == 0) {
          this.$emit("create", resp.data);
        }
      });
    },

    submitHandle: function () {
      this.loading = true;
      var _res = this.validate();
      this.loading = false;
      var isOk = _res[0],
        err = _res[1];
      if (!isOk) {
        this.$message.error(err);
        return false;
      }
      var data = JSON.parse(JSON.stringify(this.house));
      if (!this.houseId) {
        return this.doCreate(data);
      }

      this.loading = true;
      // 删除images相关的字段，防止保存的时候被覆盖

      updateHouse(data).then((resp) => {
        this.loading = false;
        if (resp.status === 0) {
          // this.house = resp.data
          this.$emit("change", resp.data);
          this.$message({ type: "success", message: "保存成功" });
          this.loadData();
        }
      });
    },

    handleClose(tag) {
      this.houseTags.splice(this.houseTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputTagVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputTagValue = this.inputTagValue;
      if (inputTagValue) {
        this.houseTags.push(inputTagValue);
      }
      this.inputTagVisible = false;
      this.inputTagValue = "";
    },

    loadData: function () {
      this.loading = true;
      getHouseDetail(this.houseId).then((resp) => {
        this.loading = false;
        var house = resp.data;
        this.house = house;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

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
  <div class="post-form">
    <el-dialog
      v-loading="loading"
      :fullscreen="false"
      :destroy-on-close="true"
      title="新建"
      :visible.sync="show"
      width="550px"
      @closed="onClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="newhouse"
        label-position="right"
        label-width="120px"
        size="mini"
        v-loading="loading"
      >
        <el-form-item label="城市/区域">
          <city-district-selector
            size="small"
            custom-style="width: 320px"
            @change="districtChange"
            v-model="newhouse.district_id"
          ></city-district-selector>
        </el-form-item>

        <el-form-item label="小区">
          <poi-search
            placeholder="搜索小区"
            size="mini"
            custom-style="width:320px"
            v-model="newhouse.sub_district_name"
            @change="poiChange"
          ></poi-search>
        </el-form-item>

        <el-form-item label="标题">
          <el-input
            v-model="newhouse.title"
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
            v-model="newhouse.address"
            placeholder
          ></el-input>
        </el-form-item>

        <el-form-item label="地图导航">
          <el-tag size="mini" v-if="newhouse.latitude && newhouse.longitude"
            >已设置（经度: {{ newhouse.latitude }}，纬度:
            {{ newhouse.longitude }}）</el-tag
          >
          <el-tag size="mini" v-else>未设置</el-tag>
          <MapMarkerDialogButton
            @change="markerChange"
          ></MapMarkerDialogButton>
        </el-form-item>

        <el-form-item label="朝向">
          <enumeration-selector
            custom-style="width:320px"
            v-model="newhouse.position"
            size="mini"
            :editable="false"
            cat="house_position"
          />
        </el-form-item>

        <el-form-item label="业务类型">
          <enumeration-selector
            custom-style="width:320px"
            :disabled="newhouse.id ? true : false"
            v-model="newhouse.business"
            size="mini"
            :radio="true"
            :editable="false"
            cat="house_business"
          />
        </el-form-item>

        <el-form-item label="挂售方式">
          <el-radio-group v-model="newhouse.seller">
            <el-radio label="经纪人">经纪人挂售</el-radio>
            <el-radio label="业主">业主挂售</el-radio>
          </el-radio-group>
          <div
            style="font-size: 12px; color: #999"
            v-if="newhouse.sale_from == 'owner'"
          >
            <i class="el-icon-info"></i>
            对外显示业主联系方式，客户可以直接联系到业主
          </div>
        </el-form-item>

        <el-form-item label="联系方式">
          <el-input
            style="width: 100px"
            v-model="newhouse.contact_name"
            placeholder="姓名"
          ></el-input>
          <el-input
            style="width: 220px"
            v-model="newhouse.contact_mobile"
            placeholder="电话"
          ></el-input>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" size="large" @click="submitHandle" icon="el-icon-check"
            >保存，并进入下一步</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { mapGetters } from "vuex";
import {
  createHouse,
} from "@/api/house";
import { getAppConfig } from "@/api/myconfig";
import { getDistrict } from "@/api/district";
import PoiSearch from "@/components/PoiSearch";
import CityDistrictSelector from "@/components/CityDistrictSelector";
import MapMarkerDialogButton from "@/components/MapMarkerDialogButton";
import UserSelector from "@/components/UserSelector";

export default {
  name: "NewForm",
  components: {
    UserSelector,
    PoiSearch,
    CityDistrictSelector,
    MapMarkerDialogButton,
  },
  props: {
    pid: { type: Number, default: null },
  },

  computed: {
    ...mapGetters(["user"]),

    canSubmit: function () {
      var p = this.post;
      if (!p.group) {
        return false;
      }
      if (!p.title) {
        return false;
      }
      if (!p.district_id) {
        return false;
      }
      return true;
    },
  },

  data() {
    return {
      loading: false,
      show: false,
      newhouse: {
        district_id: null,
        sub_district_name: null,
        latitude: null,
        longitude: null,
        title: "",
        address: "",
        position: "",
        contact_name: "",
        contact_mobile: "",
        seller: "经纪人",
        business: "出售",
      },
    };
  },

  created: function () {
    var _this = this;
    getAppConfig().then((resp) => {
      _this.myconfigs = resp.data;
    });
  },

  methods: {
    createHandle: function (pid) {
      this.show = false;
      this.newhouse = {
        district_id: null,
        sub_district_name: null,
        seller: "经纪人",
        business: "出售",
      };
      this.$emit("create", pid);
    },

    openDialog: function () {
      this.show = true;
    },
    closeDialog: function () {
      this.show = false;
    },

    onClose: function () {
      this.show = false;
      this.post = {};
      this.$emit("close", null);
    },

    onSubmit: function () {},

    districtChange: function (did) {
      getDistrict(did).then((resp) => {
        this.newhouse.city_id = resp.data.city_id;
      });
    },

    poiChange: function (poi) {
      console.log(poi);
      Vue.set(this.newhouse, "sub_district_name", poi.title);
      // 创建小区，生成小区id
      this.newhouse.latitude = poi.location.lat;
      this.newhouse.longitude = poi.location.lng;
      this.newhouse.address = poi.address;
    },
    markerChange: function (marker) {
      if (!marker) {
        return false;
      }

      var house = this.newhouse;
      house.latitude = marker.lat;
      house.longitude = marker.lng;
      this.newhouse = house;
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
      var data = JSON.parse(JSON.stringify(this.newhouse));

      createHouse(data).then((resp) => {
        this.loading = false;
        if (resp.status == 0) {
          this.createHandle(resp.data);
        }
      });
    },

    validate: function () {
      var p = this.newhouse;

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

      return [true, "ok"];
    },
  },
};
</script>

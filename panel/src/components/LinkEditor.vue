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
  <div v-cloak>
    <div class="res" v-if="!showForm">
      <el-input
        prefix-icon="el-icon-link"
        suffix-icon="el-icon-setting"
        readonly
        :size="size"
        v-model="displayName"
        :append-to-body="true"
        :style="{ width: widthVal }"
        @focus="showForm = true"
      ></el-input>
    </div>

    <el-form
      class="myform"
      size="mini"
      label-position="right"
      label-width="80px"
      v-if="showForm"
    >
      <el-form-item label="跳转类型">
        <el-select v-model="link.cat" placeholder="请选择">
          <el-option
            v-for="(cat, i) in cats"
            :key="i"
            :label="cat.name"
            :value="cat.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <div v-if="link.cat == 'web'">
        <el-form-item label="网址">
          <el-input v-model="link.url" placeholder="请输入外部网址" />
          <el-alert
            size="mini"
            style="margin-top: 10px"
            type="warning"
            :closable="false"
            >注意：从小程序中跳转打开外部网页，需先设置添加业务域名。</el-alert
          >
        </el-form-item>
      </div>

      <div v-if="link.cat == 'weapp'">
        <el-form-item label="小程序APPID">
          <el-input
            v-model="link.appid"
            placeholder="需要打开的小程序的APPID"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item label="页面路径">
          <el-input
            v-model="link.apppath"
            placeholder="需要打开的小程序的页面路径"
            style="width: 200px"
          />
        </el-form-item>
      </div>

      <div v-if="link.cat == 'function'">
        <el-form-item label="选择功能">
          <el-select v-model="link.function" placeholder>
            <el-option
              v-for="(f, i) in functionItems"
              :key="f.value"
              :label="f.name"
              :value="f.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话" v-if="link.function == 'call'">
          <el-input
            style="width: 200px"
            v-model="link.phone"
            placeholder="请输入需要拨打的电话号码"
          />
        </el-form-item>

        <el-form-item
          label="视屏号ID"
          v-if="
            link.function == 'openChannelsLive' ||
            link.function == 'openChannelsUserProfile'
          "
        >
          <el-input
            style="width: 200px"
            required
            v-model="link.sph"
            placeholder="以“sph”开头的id，可在视频号助手获取"
          />
        </el-form-item>

        <div v-if="link.function == 'location'">
          <el-form-item label="位置名称">
            <el-input v-model="link.locationName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="导航定位">
            <map-marker
              width="500"
              height="600"
              :lat="link.locationLat"
              :lng="link.locationLng"
              @change="markerChange"
            />
          </el-form-item>
        </div>

        <el-form-item label="提示标题" v-if="link.function == 'modal'">
          <el-input
            required
            style="width: 200px"
            v-model="link.modalTitle"
            :maxlength="6"
            :minlength="2"
            show-word-limit
            placeholder="请输入弹出的提示标题"
          />
        </el-form-item>

        <el-form-item label="提示内容" v-if="link.function == 'modal'">
          <el-input
            required
            style="width: 200px"
            type="textarea"
            v-model="link.modalContent"
            :maxlength="50"
            :minlength="2"
            :rows="3"
            show-word-limit
            placeholder="请输入弹出的提示内容"
          />
        </el-form-item>
      </div>

      <div v-if="link.cat == 'page'">
        <el-form-item label="选择页面">
          <el-select
            v-model="link.path"
            filterable
            placeholder="搜索关键词"
            @change="pathChange"
          >
            <el-option
              v-for="(path, index) in paths"
              :key="path.value"
              :label="path.name"
              :value="path.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="高级模式">
          <el-checkbox v-model="link.customPath"></el-checkbox>
        </el-form-item>

        <div v-if="link.customPath">
          <el-form-item label="路径">
            <el-input v-model="link.path" :style="{ width: widthVal }" />
          </el-form-item>

          <el-form-item label="打开方式">
            <el-select
              default-first-option
              allow-create
              filterable
              v-model="link.opentype"
              :style="{ width: widthVal }"
            >
              <el-option
                v-for="item in opentypeList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="footer">
        <el-button size="mini" @click="cancleHandle" icon="el-icon-close">取消</el-button>
        <el-button
          size="mini"
          @click="submitHandle"
          type="primary"
          icon="el-icon-check"
          :disabled="!isValidated"
          >确定</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { getPathList } from "@/api/weapp";
import MapMarker from "@/components/MapMarker";
export default {
  components: {
    MapMarker,
  },
  props: {
    width: { type: Number, default: 200 },
    value: {
      type: Object,
    },
    size: { type: String, default: "medium" }
  },
  data() {
    return {
      showMore: false,
      link: {},
      cats: [
        { name: "小程序页面", value: "page" },
        { name: "跳转小程序", value: "weapp" },
        { name: "功能", value: "function" },
        { name: "外部网页", value: "web" },
        { name: "未设置", value: "no" },
      ],
      opentypeList: ["navigateTo", "redirectTo", "switchTab"],
      functionItems: [
        { name: "弹出提示", value: "modal" },
        { name: "拨打电话", value: "call" },
        { name: "地图导航", value: "location" },
        { name: "退出登录", value: "logout" },
        { name: "权限设置", value: "authsetting" },
        { name: "跳转视屏号直播", value: "openChannelsLive" },
        { name: "跳转视屏号主页", value: "openChannelsUserProfile" },
        { name: "转发分享小程序", value: "share" },
      ],
      showForm: false,
      paths: [],
      loading: false,
    };
  },

  computed: {
    widthVal: function () {
      return this.width + "px";
    },
    isValidated: function (params) {
      // 验证字段是否填写万从
      var isok = false;
      switch (this.link.cat) {
        case "page":
          return !!this.link.path;
          break;
        case "function":
          return !!this.link.function;
          break;
        case "web":
          return !!this.link.url;
          break;
        case "no":
          isok = true;
          break;
      }
      return isok;
    },
    displayName: function () {
      // 对外现实的名称
      var cat = this.cats.find((c, i) => {
        return c.value == this.link.cat;
      });
      var text = cat.name;
      switch (this.link.cat) {
        case "page":
          // TODO 加上跳转页面的名字
          break;
        case "function":
          break;
        case "web":
          break;
        case "no":
          break;
      }
      return text;
    },
  },

  watch: {
    value: {
      immediate: true,
      depp: true,
      handler: function (v) {
        console.log("watch link value change", v);
        var defaultLink = {
          cat: "no",
          opentype: "",
          path: "",
          appid: "",
          apppath: "",
          function: "",
          url: "",
        };
        if (v && v.cat) {
          this.link = this.value;
        } else {
          this.link = defaultLink;
          this.$emit("input", this.link);
        }
      },
    },
  },

  mounted: function () {
    this.loadData();
  },

  methods: {
    markerChange: function (marker) {
      if (!marker) {
        return false;
      }
      this.link.locationLat = marker.lat;
      this.link.locationLng = marker.lng;
    },

    cancleHandle: function () {
      this.showForm = false;
    },
    submitHandle: function () {
      this.$emit("input", this.link);
      this.showForm = false;
    },

    pathChange: function (value) {
      // 找到index
      var index = this.paths.findIndex((p, i) => {
        return p.value === value;
      });
      var path = this.paths[index];
      this.link.opentype = path.opentype;
    },

    loadData: function () {
      this.loading = true;
      getPathList().then((resp) => {
        this.paths = resp.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.myform {
  padding: 10px 5px;
  background: #f2f2f2;
  border-radius: 8px;
}

.footer {
  display: flex;
  justify-content: center;
}
</style>

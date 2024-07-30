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
  <div class="map-marker" v-cloak v-loading="loading">
    <div v-if="appkey" class="search-box">
      <el-input size="mini" v-model="address" placeholder="输入地址，例如：上海市浦东新区耀华路">
        <el-button @click="searchMap" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div v-if="appkey" id="qqmap" :style="{ width: widthValue, height: heightValue }"></div>
    <div v-if="appkey" class="footer">lat {{ lat }}, lng:{{ lng }}</div>
    <div v-if="!appkey"
      :style="{ width: widthValue, height: heightValue, 'line-height': heightValue, 'text-align': 'center' }">
      未配置地图应用的key，无法调用地图定位组件。 请先进入：系统设置-地图 页面进行相关配置。</div>
  </div>
</template>

<style scoped>
.map-marker {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid;
  border-radius: 4px;
  border: 1px solid #e2e6f0;
}

/* .map-marker #qqmap {} */

.map-marker .search-box {
  background: #f6f7fa;
  border-bottom: 1px solid #e2e6f0;

  z-index: 10;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  height: 62px;
}

.footer {
  background: #f6f7fa;
  height: 32px;
  padding: 0 10px;
  line-height: 32px;
  box-sizing: border-box;
}
</style>
<script>
export default {
  data() {
    return {
      map: null,
      marker: null,
      loading: false,
      address: "",
      appkey: ""
    };
  },
  props: {
    width: { type: String, default: 500 },
    height: { type: String, default: 500 },
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
  },

  mounted: function () {
    this.loadAppkey()
  },

  watch: {
    lat: function (lat) {
      if (lat) {
        this.setMarker(this.lat, this.lng);
      }
    },
    lng: function (lng) {
      if (lng) {
        this.setMarker(this.lat, this.lng);
      }
    },
  },

  computed: {
    widthValue: function () {
      var w = this.width - 2;
      return w + "px";
    },
    heightValue: function () {
      var h = this.height - 2;
      return h + "px";
    },
  },

  methods: {
    initQQMap: function () {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://map.qq.com/api/gljs?v=1.exp&libraries=service&key=" +
        this.appkey +
        "&callback=onMapCallback";
      document.body.appendChild(script);
      window.onMapCallback = this.createMap;
    },
    createMap: function () {
      console.log("map lib loaded");
      var _this = this;

      var center = new TMap.LatLng(39.984120, 116.307484)
      this.map = new TMap.Map(document.getElementById('qqmap'), {
        center: center,//设置地图中心点坐标
        zoom: 16,   //设置地图缩放级别
      });

      this.map.on("click", function (evt) {
        var lat = evt.latLng.getLat().toFixed(6);
        var lng = evt.latLng.getLng().toFixed(6);
        _this.setMarker(lat, lng);
      })

      setTimeout(() => {
        _this.initMarker();
      }, 500);
    },
    initMarker: function () {
      var _this = this;
      // 打开页面后，显示默认的标记点
      if (!this.lat || !this.lng) {
        console.log(" 没有初始坐标,尝试根据街道地址进行搜索", this.address);
        this.searchMap();
        return false;
      }

      // 有坐标数据，标记初始位置
      this.setMarker(this.lat, this.lng);
    },

    setMarker: function (latitude, longitude) {
      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);
      // 根据坐标，设置中心点，并标记
      // 触发change事件
      var _this = this;
      // 将视角移动到中介，因为有可能初始坐标并不在默认地图视角内，导致无法显示标记
      var center = new TMap.LatLng(latitude, longitude);

      this.map.setCenter(center);

      this.marker && this.marker.setMap(null);
      this.marker = null

      this.marker = new TMap.MultiMarker({
        id: 'marker-layer',
        map: _this.map,
        styles: {
          "marker": new TMap.MarkerStyle({
            "width": 25,
            "height": 35,
            "anchor": { x: 16, y: 32 },
            "src": 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png'
          })
        },
        geometries: [{
          "id": 'demo',
          "styleId": 'marker',
          "position": center,
          "properties": {
            "title": "marker"
          }
        }]
      });


      // 只有当坐标值发生变化后才触发事件
      if (this.lat && this.lng) {
        var oldPosition = new TMap.LatLng(this.lat, this.lng);
        if (oldPosition.lat === center.lat && oldPosition.lng === center.lng) {
          return;
        }
      }
      this.$emit("change", { lat: center.lat, lng: center.lng });
    },

    searchMap: function () {
      // 根据街道地址，搜索地图
      // example https://github.com/jinghaonode/vue_qqmap/blob/master/selectPoint.vue
      var _this = this;
      var address = this.address;
      if (!address) {
        console.log("address 不存在，不搜索地图");
        return false;
      }

      console.log("根据地址搜索地图", address);
      this.marker && this.marker.setMap(null);
      this.marker = null;
      var geocoder = new TMap.service.Geocoder()
      geocoder.getLocation({ address: address }).then((result) => {
        var position = result.result.location;
        console.log("解析地址", address, position, result);
        // 解析后，设置地图标记点
        _this.setMarker(position.lat, position.lng);
      })


    },

    loadAppkey: function () {
      this.loading = true;
      this.$store.dispatch("myconfig/loadMyconfig").then((config) => {
        this.loading = false;
        this.appkey = config.qq_map_key;
        if (!this.appkey) {
          console.log("没有找到腾讯地图的appkey，请先设置");
          return;
        }
        this.initQQMap();
      });
    },

  },
};
</script>

<style scoped></style>

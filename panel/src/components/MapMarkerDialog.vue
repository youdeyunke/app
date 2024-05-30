<template>
  <div>
    <el-dialog
      title="地点选择"
      :visible.sync="show"
      width="840px"
      :modal="false"
      :close-on-click-modal="false"
    >
      <map-marker
        width="800"
        height="600"
        :lat="lat"
        :lng="lng"
        @change="markerChange"
      />
      <div slot="footer" class="">
        <el-button type="default" size="mini" @click="cancleHandle">取消</el-button>
        <el-button type="primary" size="mini" @click="submitHandle"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MapMarker from "@/components/MapMarker";
import { getMyconfigs } from "@/api/weapp";

export default {
  components: {
    MapMarker,
  },
  props: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
  },
  data() {
    return {
      show: false,
      marker: null,
    };
  },
  mounted() {},
  methods: {
    loadConfig: function () {
      this.loading = true;
      this.$store.dispatch("myconfig/loadMyconfig").then((resp) => {
        this.loading = false;
        if (!resp.qq_map_key) {
          this.$message.error(
            "未设置腾讯地图key，请前往'系统管理'->'系统设置'->'地图'处，设置腾讯地图key"
          );
          this.show = false;
        }
      });
    },
    markerChange: function (marker) {
      if (!marker) {
        return false;
      }
      this.marker = marker;
    },
    openDialogHandle() {
      this.show = true;
      this.loadConfig();
    },
    cancleHandle() {
      this.show = false;
    },
    submitHandle() {
      this.show = false;
      var marker = this.marker;
      this.$emit("change", marker);
    },
  },
};
</script>

<style scoped>
.actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>

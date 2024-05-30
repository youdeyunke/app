<template>
    <div style="display:inline-block">
      <el-dialog
        title="地点选择"
        :visible.sync="show"
        width="840px"
        :modal="true"
        :close-on-click-modal="false"
        append-to-body
      >

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="地图标记" name="ch">
                <map-marker
                    width="800"
                    height="600"
                    :lat="lat"
                    :lng="lng"
                    @change="markerChange"
                    />
            </el-tab-pane>
            <el-tab-pane label="自定义" name="abroad">
                <el-form label-width="80px"  size="small">
                    <el-form-item label="经纬度">
                        <el-input v-model="jwd" placeholder="请输入经纬度，例如：123.23,34.23"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>


        <div slot="footer" class="">
          <el-button type="default" size="mini" @click="cancleHandle">取消</el-button>
          <el-button type="primary" size="mini" @click="submitHandle"
            >确定</el-button
          >
        </div>
      </el-dialog>
      <el-button type="text" size="mini" icon="el-icon-place" @click="openDialogHandle"
            >设置</el-button
          >
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
        activeName: 'ch',
        jwd: '',
      };
    },

    watch: {
    jwd(val) {
            // 将逗号转为英文逗号
            const jwdStr = val.replace(/，/g, ',');
            // 解析经纬度
            const [lat,lng] = jwdStr.split(',');
            var marker = { lng: parseFloat(lng), lat: parseFloat(lat) };
            // 更新经纬度属性
            this.marker = marker;
        }
    },

    mounted() {},
    methods: {
      loadConfig: function () {
        this.loading = true;
        this.$store.dispatch("myconfig/loadMyconfig").then((resp) => {
          this.loading = false;
          // if (!resp.qq_map_key) {
          //   this.$message.error(
          //     "未设置腾讯地图key，请前往'系统管理'->'系统设置'->'地图'处，设置腾讯地图key"
          //   );
          //   this.show = false;
          // }
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
      handleClick(tab, event) {
        // console.log(tab, event);
        this.activeName = tab.name;
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
  
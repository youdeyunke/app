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
  <div v-cloak class="app-container">
    <ud-card>
      <el-form v-loading="loading" label-position="right" label-width="180px">
        <el-tabs v-model="defaultactive">
          <el-tab-pane label="联系方式" v-if="btns.update_contact_info" name="info">
            <el-form-item label="公司名称" required>
              <el-input v-model="config.company_name" style="width: 300px" />
            </el-form-item>

            <el-form-item label="客服电话" required>
              <el-input required v-model="config.service_mobile" style="width: 300px" />
            </el-form-item>

            <el-form-item label="客服微信号">
              <el-input v-model="config.service_wechat" style="width: 300px" />
            </el-form-item>

            <el-form-item label="客服微信二维码">
              <image-picker v-model="config.service_wechat_qr" width="100" height="100" :canDelete="false" />
              <div style="font-size: 10px; color: #999">
                <i class="el-icon-info"></i>
                最佳图片尺寸 宽度100px，高度100px 或同比例
              </div>
            </el-form-item>

            <el-form-item label="关于我们">
              <el-input v-model="config.about_us" style="width: 300px" type="textarea" :rows="12"
                :show-word-limit="true" maxlength="300" />
            </el-form-item>

            <el-form-item label="免责声明">
              <el-input v-model="config.statement" style="width: 300px" type="textarea" :rows="12"
                :show-word-limit="true" maxlength="300" />
              <div style="font-size: 10px; color: #999">
                <i class="el-icon-info"></i>
                免责声明用于显示在楼盘详情页面底部
              </div>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :disabled="loading" :loading="loading" size="small" icon="el-icon-check"
                @click="submitCompanyConfig">保存设置</el-button>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="地图" v-if="btns.update_myconfig_map" name="map">
            <el-form-item label="腾讯地图KEY">
              <el-input v-model="config.qq_map_key" style="width: 300px" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :disabled="loading" :loading="loading" size="small" icon="el-icon-check"
                @click="submitMapConfig">保存设置</el-button>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="页面路查询径" v-if="btns.update_myconfig_pageurl" name="path">
            <el-form-item label="选择要跳转的页面">
              <el-select filterable v-model="currentPath" placeholder="请选择页面">
                <el-option v-for="(path, index) in paths" :key="index" :label="path.name" :value="path.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="页面跳转路径">
              <el-input id="currentPath" v-model="currentPath" style="width: 500px">
                <el-button :disabled="!currentPath" slot="append" icon="el-icon-document-copy"
                  v-clipboard:success="() => $message.success('已复制')" v-clipboard:error="() => $message.error('复制失败')"
                  v-clipboard:copy="currentPath">复制</el-button>
              </el-input>
            </el-form-item>

            <el-form-item label>
              <el-link target="_blank"
                href="https://jingyan.baidu.com/article/86112f13bd1ded27379787ae.html">公众号打开小程序设置教程</el-link>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="文件管理" v-if="btns.update_myconfig_file" name="media">
            <user-media></user-media>
          </el-tab-pane>

          <el-tab-pane label="楼盘标签" v-if="btns.update_myconfig_posttag" name="tag">
            <tags></tags>
          </el-tab-pane>

          <el-tab-pane label="城市设置" v-if="btns.update_myconfig_cities" name="address">
            <CityAddress></CityAddress>
          </el-tab-pane>

          <el-tab-pane label="枚举值管理" v-if="btns.update_myconfig_enum" name="Enumerations">
            <Enumerations></Enumerations>
          </el-tab-pane>

          <el-tab-pane label="服务器参数" v-if="btns.update_myconfig_server" name="base">

            <el-form-item label="后台安全水印">
              <el-switch v-model="config.watermark" @change="(v) => submitHandle(['watermark'])" />
              <div style="font-size: 10px; color: #999">
                <i class="el-icon-info"></i>
                在管理后台所有页面显示带有成员姓名和ID的安全水印,防止管理后台信息泄露
              </div>
            </el-form-item>

            <el-form-item label="LPR基准利率">
              <el-input style="width: 300px" v-model="config.lpr_rate" placeholder="如：4.65"></el-input>
              <div style="font-size: 10px; color: #999">
                <i class="el-icon-info"></i>
                请输入央行最新公布的LPR基准利率，无需输入百分号，保留两位小数，如：4.65
              </div>
            </el-form-item>

            <el-form-item label="允许上传文件类型">
              <el-select v-model="uploadAllowedExtensionOptions"
                @change="addItemToOptions(uploadAllowedExtensionOptions)" filterable allow-create multiple collapse-tags
                default-first-option style="width: 300px" placeholder="请选择">
                <el-option v-for="item in fixedOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="小程序版本号">
              <el-input style="width: 300px" v-model="config.xcx_version" placeholder=""></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small" :disabled="loading" :loading="loading" @click="superConfig"
                icon="el-icon-check">保存设置</el-button>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="小程序参数" name="email">
            <el-form-item label="小程序名称">
              <el-input placeholder="请填写小程序名称" v-model="config.xcx_name" style="width: 300px" />
            </el-form-item>
            <el-form-item label="AppID(小程序ID)">
              <el-input v-model="config.xcx_app_id" style="width: 300px" min="18" max="18" />
              <div class="help-text">
                进入"微信公众平台 - 开发 - 开发设置"查看
              </div>
              <span slot="label">
                AppID(小程序ID)
                <el-popover placement="right-start" width="700" trigger="hover">
                  <div>进入"微信公众平台 - 开发 - 开发设置"查看</div>
                  <el-image src="https://qiniucdn.udeve.cn/assets/images/xcx_appid.jpg" />
                  <el-button slot="reference" icon="el-icon-question" type="text" />
                </el-popover>
              </span>
            </el-form-item>
            <el-form-item label="AppSecret(小程序密钥)">
              <el-input v-model="config.xcx_secret" style="width: 300px" type="password" min="32" max="32"
                show-password />

              <div class="help-text">
                进入"微信公众平台 - 开发 - 开发设置"查看
              </div>
              <span slot="label">
                AppSecret(小程序密钥)
                <el-popover placement="right-start" width="700" trigger="hover">
                  <div>进入"微信公众平台 - 开发 - 开发设置"查看</div>
                  <el-image src="https://qiniucdn.udeve.cn/assets/images/xcx_secret.jpg" />

                  <el-button slot="reference" icon="el-icon-question" type="text" />
                </el-popover>
              </span>
            </el-form-item>
            <el-form-item label="消息模板id">
              <el-input v-model="config.msg_tpl_id" style="width: 300px" min="18" max="18" />
              <div class="help-text">
                <a href="https://doc.youdeyunke.com/xiaochengxudingyuexiaoxituisong.html" target="_blank">
                  如何设置消息推送模板，点击查看文档
                </a>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" :disabled="loading" :loading="loading" @click="submitWeappConfig"
                icon="el-icon-check">保存设置</el-button>
            </el-form-item>
          </el-tab-pane>

        </el-tabs>
      </el-form>
    </ud-card>
  </div>
</template>

<style lang="scss" scoped>
.help-text {
  color: #666666;
  font-size: 12px;
}
</style>

<script>
import { mapGetters } from "vuex";
import { getPathList } from "@/api/weapp";
import ImagePicker from "@/components/ImagePicker";
import { updateWeappInfo, updateMapInfo, updateServerInfo, updateWeappConfig } from "@/api/myconfig";
import UdCard from "@/components/UdCard";
import HelpIcon from "@/components/HelpIcon";
import { getModuleConfigs } from "@/api/module_config";
import UserMedia from "@/components/MediaManager/UserMedia";
import Tags from "../tags/index.vue";
import CityAddress from "../address/index.vue";
import Enumerations from "../enumerations/index.vue";

export default {
  components: {
    UdCard,
    HelpIcon,
    ImagePicker,
    UserMedia,
    Tags,
    CityAddress,
    Enumerations,
  },

  props: {
    btns: { type: Object, default: null },
  },

  data() {
    return {
      showPassword: "showPassword",
      showMM: false,
      MMFileTypes: ["image"],
      systemMigrateInfo: {
        apihost: "",
        fun: "auto_run",
      },
      moduleConfigs: [],
      MMLimit: 1,
      MMSelectedHandle: null,
      defaultactive: "info",
      test_email: "haojiacheng@udeve.cn",
      yunId: null,
      yunCc: {
        bucket_name: "",
        ak: "",
        sk: "",
        domain: "",
      },
      loading: false,
      paths: [],
      currentPath: "",
      config: { mch_cert: { url: "" } },
      fixedOptions: ['jpg', 'png', 'gif', 'jpeg'],
      email_config: {}
    };
  },
  created() { },
  watch: {
  },
  computed: {
    ...mapGetters(["user"]),

    uploadAllowedExtensionOptions: {
      get() {
        if (!this.config.upload_allowed_extension) {
          return []
        }
        const initialExtensions = this.config.upload_allowed_extension.split(',').filter(extension => extension !== '')
        // 过滤掉空字符串
        return initialExtensions
      },
      set(newValue) {
        // 当newValue发生变化时，更新config.upload_allowed_extension属性
        this.config.upload_allowed_extension = newValue.join(',')
      },
    },

  },

  mounted: function () {
    this.loadConfig();
    if (this.btns.update_myconfig_pageurl) {
      this.loadPaths();
    }
    this.loadModuleConfigs();
    if (this.btns.update_myconfig_ossconfig) {
      this.loadOssList();
    }
  },

  methods: {

    addItemToOptions(val) {
      console.log(val)

      val.forEach((item) => {
        if (!this.fixedOptions.includes(item)) {
          this.fixedOptions.push(item)
        }
      })
    },
    submitCompanyConfig: function () {

      if (!this.config.company_name) {
        this.$message.error("请填写公司名称");
        return;
      }

      if (!this.config.service_mobile) {
        this.$message.error("请填写客服电话");
        return;
      }
      updateWeappInfo(this.config).then((resp) => {
        if (resp.code != 0) {
          return
        }
        this.loadConfig();
        this.$message.success("保存成功")
      })

    },

    loadModuleConfigs: function () {
      getModuleConfigs().then((resp) => {
        this.moduleConfigs = resp.data;
      });
    },

    loadPaths: function () {
      getPathList().then((resp) => {
        this.paths = resp.data;
      });
    },

    submitMapConfig: function () {
      updateMapInfo(this.config).then((resp) => {
        if (resp.code != 0) {
          return
        }
        this.loadConfig();
        this.$message.success("保存成功")
      })
    },

    superConfig: function () {
      var config = this.config;
      this.config = config;
      updateServerInfo(this.config).then((resp) => {
        if (resp.code != 0) {
          return
        }
        this.loadConfig()
        this.$message.success("保存成功")
      })
    },

    submitWeappConfig: function () {
      if (!this.config.xcx_app_id) {
        this.$message.error("请填写appid");
        return;
      }
      if (!this.config.xcx_secret) {
        this.$message.error("请填写appsecret");
        return;
      }
      if (!this.config.xcx_name) {
        this.$message.error("请填写商户号");
        return;
      }
      updateWeappConfig(this.config).then((resp) => {
        if (resp.code != 0) {
          return
        }
        this.loadConfig()
        this.$message.success("保存成功")
      })
    },

    submitHandle: function (keys) {
      this.loading = true;

      var data = {};
      Object.keys(this.config).forEach((k, i) => {
        if (keys.includes(k)) {
          data[k] = this.config[k];
        }
      });

      updateServerInfo(this.config).then((resp) => {
        if (resp.code != 0) {
          return
        }
        this.loadConfig()
        this.$message.success("设置保存成功")
      })
    },

    loadConfig: function () {
      this.loading = true;
      this.$store.dispatch("myconfig/loadMyconfig").then((config) => {
        this.loading = false;
        this.config = config;
        this.fixedOptions = config.upload_allowed_extension.split(",");
      });
    },
  },
};
</script>

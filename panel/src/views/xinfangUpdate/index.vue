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
    <div class="app-container">
      <el-card>
        <div slot="title" class="form-title-slot">
          <div class="title-name">
            <b>楼盘信息管理维护</b>
          </div>
        </div>
        <div class="form-tabs">
          <el-tabs tab-position="left" v-model="activeName">
            <el-tab-pane label="基本信息" v-if="btns.update_post_baseinfo">
              <div >
                <baseinfo-manager :post-id="pid"></baseinfo-manager>
              </div>
            </el-tab-pane>
  
            <el-tab-pane label="轮播图" v-if="btns.update_post_banner">
              <div >
                <banner-manager :post-id="pid"></banner-manager>
              </div>
            </el-tab-pane>
  
            <el-tab-pane label="楼盘亮点" v-if="btns.update_post_point">
              <div >
                <point-manager :post-id="pid"></point-manager>
              </div>
            </el-tab-pane>
  
            <el-tab-pane label="楼盘评测"  v-if="btns.update_post_review">
              <div >
                <PostReviewManager
                  :post-id="pid"
                  :reviewEnable="post.review_enable"
                ></PostReviewManager>
              </div>
            </el-tab-pane>
  
            <el-tab-pane label="楼盘参数"  v-if="btns.update_post_metacontent">
              <div >
                <meta-content-manager
                  :meta-content-id="post.meta_content_id"
                ></meta-content-manager>
              </div>
            </el-tab-pane>
  
            <el-tab-pane label="详细介绍" v-if="btns.update_post_detailcontent">
              <div >
                <detail-content-manager
                  :detail-content-id="post.detail_content_id"
                ></detail-content-manager>
              </div>
            </el-tab-pane>
  
            <el-tab-pane label="户型设置" v-if="btns.update_post_type">
              <div >
                <types-manager :post-id="pid"></types-manager>
              </div>
            </el-tab-pane>

            <el-tab-pane label="楼盘相册"  v-if="btns.update_post_xiangce">
              <div >
                <xiangce-manager
                  target-type="post"
                  :target-id="pid"
                ></xiangce-manager>
              </div>
            </el-tab-pane>
  
            <el-tab-pane label="楼盘问答"  v-if="btns.update_post_qa">
              <div >
                <qa-manager :post-id="pid"></qa-manager>
              </div>
            </el-tab-pane>

            <el-tab-pane label="楼盘动态" v-if="btns.update_post_event">
              <div >
                <event-manager :post-id="pid"></event-manager>
              </div>
            </el-tab-pane>
  
            <el-tab-pane label="置业顾问" v-if="btns.update_post_broker">
              <div >
                <PostBrokerManager :post-id="pid"></PostBrokerManager>
              </div>
            </el-tab-pane>
  
            <el-tab-pane label="相关资讯" v-if="btns.update_post_news">
              <div >
                <news-manager :post-id="pid"></news-manager>
              </div>
            </el-tab-pane>
            
          </el-tabs>
        </div>
      </el-card>
    </div>
  </template>
  
  <style lang="scss" scope>
  
  .form-tabs {
    user-select: none;
  }
  </style>
  
  <script>
  import { mapGetters } from "vuex";
  import { getMyconfig } from "@/api/myconfig";
  import BaseinfoManager from "./BaseinfoManager/Index";
  import TypesManager from "./TypesManager/Index";
  import XiangceManager from "@/components/XiangceManager/Index";
  import MetaContentManager from "@/components/MetaContentManager/Index";
  import DetailContentManager from "@/components/DetailContentManager/Index";
  import MapManager from "./MapManager/Index";
  import NewsManager from "./NewsManager/Index";
  import BannerManager from "./BannerManager/Index";
  import PointManager from "./PointsManager/Index.vue";
  import PostReviewManager from "./PostReviewManager/Index.vue";
  import PostBrokerManager from "./PostBrokerManager/Index.vue";
  import QaManager from "./QaManager/Index.vue";
  import EventManager from "./EventManager/index.vue";
  
  import { getPostDetail } from "@/api/post";
  
  export default {
    components: {
      MapManager,
      BaseinfoManager,
      XiangceManager,
      TypesManager,
      DetailContentManager,
      MetaContentManager,
      NewsManager,
      BannerManager,
      PointManager,
      PostReviewManager,
      QaManager,
      EventManager,
      PostBrokerManager,
    },
    props: {
      // pid: { type: Number, default: null },
      btns: { type: Object, default: {} },
    },
    created() {
      var id = this.$route.params.id;
      this.pid = parseInt(id);
    },
  
    computed: {
      ...mapGetters(["user"]),
  
      addressTitles: function () {
        return ["所在区域", "项目名称", "项目地址"];
      },
  
      brokers_label: function () {
        return "置业顾问";
      },
  
      pageTitle: function () {
        var t = "楼盘信息管理 ";
        return t;
      },
  
      groupName: function () {
        return "新房";
      },
  
      create_or_update_at_pretty: function () {
        var t = this.post.create_or_update_at;
        if (!t) {
          return "";
        }
        var ts = t.split("T");
        return ts[0] + " " + ts[1].split(".")[0];
      },
    },
  
    watch: {
      pid: {
        immediate: true,
        deep: true,
        handler(val) {
          // pass
          if (!val) {
            return;
          }
          this.loadData();
        },
      },
    },
  
    data() {
      return {
        loading: true,
        show: false,
        post: {},
        loading: false,
        pid: null,
        activeName: '',
      };
    },
  
    methods: {
      loadData: function () {
        this.loading = true;
        getPostDetail(this.pid).then((resp) => {
          this.loading = false;
          if (resp.status != 0) {
            return;
          }
          this.post = resp.data;
        });
      },
      publicHandle: function () {
        var _this = this;
        this.loading = true;
        var data = { is_public: this.post.public, id: this.post.id };
        updatePost(data).then((resp) => {
          _this.loading = false;
          if (resp.status == 0) {
            var msg = data.is_public ? "已上架" : "已下架";
            _this.$message.success(msg);
            _this.$emit("change", this.post);
          }
        });
      },
  
      setZpt(){
        this.activeName = 'zptSet';
      },

      openDialog: function () {
        this.show = true;
      },
  
      onClose: function () {
        this.show = false;
        console.log("on close click, emit start");
        this.$emit("close", null);
      },
    },
  };
  </script>
  
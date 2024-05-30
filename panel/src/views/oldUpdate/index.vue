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
                    <b>房源管理维护</b>
                </div>
            </div>
            <div class="form-tabs">
                <el-tabs tab-position="left">

                    <el-tab-pane label="基本信息">
                        <div >
                            <baseinfo-manager v-model="house" ></baseinfo-manager>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="详细介绍">
                        <div >
                            <content-manager :house="house"></content-manager>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="房源相册">
                        <div >
                            <images-manager :house="house"></images-manager>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="房源视频">
                        <div >
                            <video-manager :house="house"></video-manager>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="VR看房">
                        <div >
                            <vr-manager :house="house"></vr-manager>
                        </div>
                    </el-tab-pane>

                </el-tabs>
            </div>
        </el-card>
    </div>
</template>

<style lang="scss" scope>
.form-tab-slot {
    width: 800px;
    margin: 10px auto 20px auto;
}

.form-tabs {
    user-select: none;
}
</style>

<script>
import { mapGetters } from "vuex";
import BaseinfoManager from "./BaseinfoManager/Index";
import XiangceManager from "@/components/XiangceManager/Index";
import MetaContentManager from "@/components/MetaContentManager/Index";
import VrManager from "./VrManager/Index.vue";
import ContentManager from "./ContentManager/Index.vue";
import VideoManager from "./VideoManager/Index.vue";
import TypeManager from "./TypeManager/Index.vue"
import ImagesManager from "./ImagesManager/Index.vue"
import { getHouseDetail } from "@/api/house";

export default {
    components: {
        VrManager,
        BaseinfoManager,
        XiangceManager,
        MetaContentManager,
        ContentManager,
        VideoManager,
        TypeManager,
        ImagesManager,
    },
    props: {
    },
    created() {
        var id = this.$route.params.id;
        this.houseId = parseInt(id);
    },

    computed: {
        ...mapGetters(["user"]),
    },

    watch: {
        houseId: {
            immediate: true,
            deep: true,
            handler (val) {
                // pass
                if (!val) {
                    return;
                }
                this.loadData();
            },
        },
    },

    data () {
        return {
            loading: true,
            show: false,
            house: {},
            loading: false,
            houseId: null,
        };
    },

    methods: {
        loadData: function () {
            this.loading = true;
            getHouseDetail(this.houseId).then((resp) => {
                this.loading = false;
                if (resp.status != 0) {
                    return;
                }
                this.house = resp.data;
            });
        },

    },
};
</script>

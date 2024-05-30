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
        <el-dialog v-loading="loading" :fullscreen="false" :destroy-on-close="true" title="新建项目" :visible.sync="show" :close-on-click-modal="false"
            width="1200px" @closed="onClose">
            <baseinfo-manager @create="(pid) => $emit('create', pid)" />
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped></style>

<script>
import { mapGetters } from "vuex";

import { getAppConfig } from "@/api/myconfig";
import UserSelector from "@/components/UserSelector";
import BaseinfoManager from "./BaseinfoManager/Index";

export default {
    name: "NewForm",
    components: { UserSelector, BaseinfoManager },
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

    data () {
        return {
            loading: false,
            show: false,
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
            this.$emit("change", pid);
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

        onSubmit: function () { },
    },
};
</script>

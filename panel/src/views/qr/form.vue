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
    <el-dialog :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" :destroy-on-close="true"
        :title="qr.id ? '编辑二维码信息' : '新建二维码'" :visible.sync="show" width="500px">
        <el-form v-loading="loading" label-width="120px" label-position="right" size="small" :model="qr">
            <el-form-item label="说明" required>
                <el-input clearable v-model="qr.title" placeholder="备注说明"></el-input>
            </el-form-item>

            <el-form-item label="路径" required>
                <el-input clearable v-model="qr.path" placeholder="请输入小程序页面路径"></el-input>
            </el-form-item>

            <el-form-item label="归属到项目">
                <post-selector :first-option="{ id: null, title: '不限' }" v-model="qrData.postId"></post-selector>
            </el-form-item>


        </el-form>
        <div slot="footer">
            <el-button size="mini" @click="close" icon="el-icon-close">取 消</el-button>
            <el-button size="mini" type="primary" @click="submitHandle" icon="el-icon-check">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { updateQr, createQr } from "@/api/qr";
import HelpIcon from "@/components/HelpIcon";
export default {
    components: { HelpIcon },
    name: "position-form",
    data () {
        return {
            qrData: {},
            qr: {},
            show: false,
            loading: false,
        };
    },
    props: {},
    watch: {},

    created () { },

    methods: {
        close: function () {
            this.show = false;
            this.qr = {}
            this.qrData = {}
        },
        open: function (qr) {
            this.show = true;
            if (qr.data) {
                this.qrData = JSON.parse(qr.data);
            }
            this.qr = qr;
        },

        submitHandle () {
            // 验证表单
            var formData = this.qr;
            if (!formData.title) {
                this.$message.error("请输入渠道名称");
                return false;
            }

            if (!formData.path) {
                this.$message.error("请输入二维码落地页路径");
                return false;
            }

            this.qrData.sourceNmae = formData.title
            formData.data = JSON.stringify(this.qrData);
            this.loading = true;
            if (this.qr.id !== null) {
                updateQr(formData).then((resp) => {
                    this.loading = false;
                    if (resp.status === 0) {
                        this.$emit("change", resp.data);
                        this.$message({
                            type: "success",
                            message: "修改成功",
                        });
                    }
                });
                return;
            }
            createQr(formData).then((resp) => {
                this.loading = false;
                if (resp.status != 0) {
                    return;
                }
                this.$emit("change", resp.data);
                this.$message({ type: "success", message: "创建二维码成功！" });
            });
        },
    },
};
</script>
<style lang="scss" scoped></style>
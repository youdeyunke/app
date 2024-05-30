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
    <div class="item-form" v-cloak>
        <el-form v-loading="loading" label-position="left" label-width="100px">
            <el-form-item label="名称" required>
                <el-input style="width:220px" v-model="item.name" placeholder="请输入名称"></el-input>
            </el-form-item>

            <el-form-item label="顺序" required>
                <el-input style="width:220px;" v-model="item.number" placeholder="由小到大"></el-input>
            </el-form-item>

            <el-form-item label=" ">
                <el-button type="default" @click="cancleHandle">取消</el-button>
                <el-button type="primary" @click="submitHandle">保存</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
import { updateEnumeration, createEnumeration } from "@/api/enumeration";
import ImagePicker from "@/components/ImagePicker.vue";
export default {
    components: { ImagePicker },
    data () {
        return {
            loading: false,
        };
    },
    props: {
        item: { type: Object },
    },

    mounted: function () { },

    computed: {},

    methods: {
        cancleHandle: function () {
            this.$emit("change", this.item);
        },
        submitHandle: function () {
            // validate
            var item = this.item;
            if (item.name.length <= 1) {
                this.$message.error("名称不能少于2个字");
                return false;
            }

            if (item.id) {
                updateEnumeration(item).then((resp) => {
                    if (resp.status != 0) {
                        return;
                    }
                    this.$message.success("已保存！");
                    this.$emit("change", this.item);
                });
                return;
            }

            createEnumeration(item).then((resp) => {
                if (resp.status != 0) {
                    return;
                }
                this.$message.success("已保存！");
                this.$emit("change", this.item);
            });
            return;
        },
    },
};
</script>

<style scoped></style>
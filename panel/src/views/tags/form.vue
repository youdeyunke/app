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
    <div>
        <el-form style="margin-top:15px;" v-loading="loading" label-width="150px" label-position="left" size="small"
            :model="tag">
            <el-form-item label="标签名称" style="width:350px">
                <el-input maxlength="6" minlength="2" clearable size="medium" v-model="tag.name"
                    placeholder="请输入2~6个字符的标签名"></el-input>
            </el-form-item>
            <el-form-item label="颜色">
                <el-color-picker v-model="tag.color"></el-color-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="$emit('cancle')" icon="el-icon-close">取 消</el-button>
            <el-button size="mini" type="primary" @click="submitHandle" icon="el-icon-check">确 定</el-button>
        </div>
    </div>
</template>
<script>
import { updateTag, createTag } from "@/api/tag";
import HelpIcon from "@/components/HelpIcon";
export default {
    components: { HelpIcon },
    name: "tag-form",
    data () {
        return {
            // 当前要修改的数据内容
            // 当前修改的id
            // 加载logo
            loading: false,
            // 预定义颜色
            predefineColors: [
                "#ffffff",
                "#000000",
                "#cecece",
                "#333333",
                "#1ABCA1",
                "#ff0000",
                "#1989fa",
            ],
            // 标签分类
        };
    },
    props: {
        tag: { type: Object, default: null },
    },
    watch: {
    },
    created () { },
    methods: {
        submitHandle () {
            // 验证表单
            var tag = this.tag;
            if (!tag.name) {
                this.$message.error("请输入标签名称");
                return false;
            }
            if (tag.name.length > 6 || tag.name.length < 2) {
                this.$message.error("请输入2~6个字符的标签名");
                return false;
            }

            if (this.tag.id !== null) {
                this.tag = {};
                console.log("fordata", tag);
                updateTag(tag).then((resp) => {
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

            createTag(this.tag).then((resp) => {
                if (resp.status != 0) {
                    return
                }
                this.$emit("change", resp.data);
                this.$message({ type: "success", message: "创建标签成功！" });
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.dialog-footer {
    width: 200px;
    height: 28px;
    margin-left: 279px;
}

.el-tooltip {
    position: absolute;
    right: -22px;
    top: 10px;
}
</style>
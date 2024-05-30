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
    <el-tabs tab-position="left">
        <el-form size="mini" v-loading="loading" label-position="right" label-width="100px">
            <el-form-item label="账号" required>
                <el-input style="width: 280px" v-model="profile.mobile" :disabled="!!profile.id" type="number"
                    placeholder="11位手机号"></el-input>
            </el-form-item>
            <el-form-item label="姓名" required>
                <el-input style="width: 280px" v-model="profile.name" placeholder :minlength="2" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="性别" required>
                <el-radio-group v-model="profile.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="级别">
                <el-select v-model="profile.level">
                    <el-option v-for="(level, index) in levelItems" :label="level.name" :key="index" :value="level.value">
                        <div style="display: flex; justify-content: flex-start; align-items: center">
                            <span>{{ level.name }}</span>
                            <el-image style="width: 16px; height: 16px; margin-left: 8px" v-if="level.value"
                                :src="require('@/assets/images/broker.level.' + level.value + '.png')"></el-image>
                        </div>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="头像照片" required>
                <image-picker width="200" v-model="profile.avatar"></image-picker>
                <div style="font-size: 10px; color: #999">
                    <i class="el-icon-info"></i>
                    最佳图片尺寸 宽度200px，高度200px 或同比例
                </div>
            </el-form-item>

            <el-form-item label="微信二维码">
                <image-picker width="200" v-model="profile.wechat_qr"></image-picker>
                <div style="font-size: 10px; color: #999">
                    <i class="el-icon-info"></i>
                    最佳图片尺寸 宽度200px，高度200px 或同比例
                </div>
            </el-form-item>

            <el-form-item label="微信号">
                <el-input style="width: 280px" v-model="profile.wechat" placeholder></el-input>
            </el-form-item>

            <el-form-item label="个性签名">
                <el-input style="width: 280px" v-model="profile.desc" maxlength="100" placeholder></el-input>
            </el-form-item>

            <el-form-item label="主页数据">
                <el-input style="width: 120px" v-model="profile.like_nums" maxlength="100" placeholder>
                    <template slot="append">点赞</template>
                </el-input>
                <el-input style="width: 120px" v-model="profile.view_nums" maxlength="100" placeholder>
                    <template slot="append">浏览</template>
                </el-input>
            </el-form-item>
            <el-form-item label="资料审核状态">
                <el-radio-group v-model="profile.status">
                    <el-radio v-bind:key="s.value" v-for="s in statusItems" :label="s.value">
                        <span :style="{ color: s.value == -1 ? 'red' : '' }">{{ s.label }}</span>
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item class="拒绝原因" v-show="profile.status === -1">
                <el-input v-model="profile.reject_reason" maxlength="50" placeholder="请输入原因"></el-input>
                <div>
                    <el-tag style="cursor: pointer; margin: 0 4px" v-for="(re, index) in rejectReasonItems" type="default"
                        size="mini" :key="index" @click="() => (profile.reject_reason = re)">{{ re }}</el-tag>
                </div>
            </el-form-item>
            <el-form-item size="large" v-if="currentStatus != 2">
                <el-button size="mini" @click="() => this.$emit('cancel')" type="default" icon="el-icon-close">取消</el-button>
                <el-button size="mini" v-if="profile.id" @click="submitHandle" type="primary" icon="el-icon-check">确定</el-button>
            </el-form-item>

            <el-form-item size="large" v-if="currentStatus === 2">
                <el-button size="mini" @click="() => this.$emit('cancel')" type="default" icon="el-icon-close">取消</el-button>
                <el-button size="mini" v-if="profile.id" @click="submitHandle" type="primary" icon="el-icon-check">确定</el-button>
                <el-button size="mini" v-else @click="createHandle" type="primary" icon="el-icon-check">确定</el-button>
            </el-form-item>
        </el-form>

    </el-tabs>
</template>

<script>
import { getBrokerProfile, updateBrokerProfile, createBrokerProfile } from "@/api/user";
import ImagePicker from "@/components/ImagePicker";
import PostSelector from "@/components/PostSelector";

export default {
    components: {
        ImagePicker,
        PostSelector,
    },
    data () {
        return {
            loading: false,
            rejectReasonItems: ["头像不符合规范", "不是真实姓名", "其它原因"],
            levelItems: [
                { name: "金牌", value: 1 },
                { name: "银牌", value: 2 },
                { name: "铜牌", value: 3 },
                { name: "无", value: 0 },
            ],
            statusItems: [
                { label: "关闭账号", value: 0 },
                { label: "等待审核", value: 1 },
                { label: "拒绝", value: -1 },
                { label: "通过", value: 2 },
            ],
            currentStatus: 2,

        };
    },
    props: {
        brokerId: {
            type: Number,
            default: null,
        },
        profile: {
            type: Object,
            default: null
        },
    },

    mounted: function () { },
    watch: {
        brokerId: {
            immediate: true,
            deep: true,
            handler (val) {
                if (!val) {
                    return;
                }
                this.loadData();
            },
        },
    },

    computed: {},

    methods: {
        updatePostIds: function () {
            var data = { id: this.profile.id, post_ids: this.profile.post_ids };
            this.loading = true;
            updateBrokerProfile(data).then((resp) => {
                this.loading = false;
                this.loadData();
                if (resp.status == 0) {
                    this.$message.success("已保存");
                }
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },

        loadData: function () {
            this.loading = true;
            getBrokerProfile(this.brokerId).then((resp) => {
                this.loading = false;
                if (resp.status == 0) {
                    this.profile = resp.data;
                    this.currentStatus = resp.data.status;
                }
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },

        submitCallback: function (resp) {
            this.loading = false;
            if (resp.status == 0) {
                this.$message.success("保存成功");
                this.$emit("change");
                if (!this.userId) {
                    this.$emit("create");
                }
            }
        },

        validate: function () {
            var data = this.profile;
            if (!data.mobile || data.mobile.length < 11) {
                this.$message.error("手机号长度错误");
                return false;
            }
            if (!data.name || data.name.length >= 15) {
                this.$message.error("姓名填写错误");
                return false;
            }

            if (!data.avatar) {
                this.$message.error("请上传头像");
                return false
            }

            if (data.status === -1) {
                if (!data.reject_reason || data.reject_reason.length == 0) {
                    this.$message.error("拒绝原因不能为空");
                    return false;
                }
            }
            // grop_value 
            data.group_value = 'broker'
            data.group_name = '置业顾问'
            return true;
        },

        createHandle: function () {
            var data = this.profile;
            var isok = this.validate(data);
            if (!isok) {
                return false;
            }
            this.loading = true;
            createBrokerProfile(data).then((resp) => {
                this.submitCallback(resp);
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },
        submitHandle: function () {
            var data = this.profile;
            var isok = this.validate(data);
            if (!isok) {
                return false;
            }
            this.loading = true;
            updateBrokerProfile(data).then((resp) => {
                this.submitCallback(resp);
            }).catch((err) => {
                this.loading = false
                console.log(err);
            });
        },
    },
};
</script>

<style scoped></style>

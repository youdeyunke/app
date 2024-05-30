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
        <el-dialog :destroy-on-close="true" title="添加备注" :visible.sync="ShowRemarkDialog" width="340px" :modal="true">
            <el-form :model="remarkForm" ref="rForm" label-position="top" :rules="rules">
                <el-form-item label-width="120px" prop="remark">
                    <el-input type="textarea" :show-word-limit="true" :maxlength="100" style="width: 300px;" v-model="remarkForm.remark" placeholder="请输入备注" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="ShowRemarkDialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="updateRemark()">确 定</el-button>
            </div>
        </el-dialog>

        <ud-card>
            <div class="myheader">
                <div class="part-left">
                    <div class="block">
                        <el-radio-group v-model="scopeValue" :disabled="listLoading" size="small" placeholder="请选择">
                            <el-radio-button label="all">全部</el-radio-button>
                            <el-radio-button label="online">在线</el-radio-button>
                            <el-radio-button label="blacklist">黑名单</el-radio-button>
                        </el-radio-group>
                    </div>

                    <div class="block">
                        <el-input v-model="kw" style="border-radius: 100%; width: 250px" size="small"
                            placeholder="输入姓名、手机号、昵称搜索">
                            <el-button slot="append" icon="el-icon-search" @click="doSearch" />
                        </el-input>
                        <el-button v-if="kw" type="text" size="small" @click="clearKw">清空</el-button>
                    </div>
                </div>

                <div class="part-right">
                    <div class="block">
                        <el-button size="small" icon="el-icon-refresh" @click="loadData">刷新</el-button>
                        <el-button v-if="btns.export_user_profile" v-loading="downloading" :disabled="downloading" size="small" type="primary" icon="el-icon-download"
                            @click="downloadCsv">导出数据</el-button>
                    </div>
                </div>
            </div>

            <el-table v-loading="listLoading" style="width: 100%" :data="items" size="small" element-loading-text="正在加载用户列表"
                fit highlight-current-row>
                <el-table-column prop="id" label="#" :width="80" />
                <el-table-column prop="mobile" label="账号（手机号）" width="120px" />
                <el-table-column label="注册时间">
                    <template slot-scope="scope">
                        {{ scope.row.created_at | utcFormater }}
                    </template>
                </el-table-column>
                <el-table-column prop="ip" label="IP"/>
                <el-table-column prop="ip_region" label="IP归属地"/>
                <el-table-column prop="remark" label="备注"/>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="remarkDialogHandle(scope.row)">添加备注</el-button>
                        <el-link :type="scope.row.ban ? 'warning' : 'danger'" size="small"
                            @click="banHandle(scope.row.id)">{{ scope.row.ban ? '取消拉黑' : '拉黑' }}</el-link>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pager">
                <el-pagination :hide-on-single-page="false" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :page-sizes="[10, 20, 50, 100]" :page-size="per_page" @current-change="updateCurrentPage"
                    @size-change="updatePageSize" />
            </div>
        </ud-card>
    </div>
</template>

<style lang="scss" scoped>
.app-container {
    .myheader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0px;

        .part-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .block {
                margin-right: 10px;
            }
        }

        .el-input {
            width: 250px;
            border-radius: 100%;
        }
    }
}
</style>

<script>
import {
    getUserProfileList,
    downloadUserList,
    banUser,
    updateWeappUserRemark,
} from "@/api/user";
import UdCard from "@/components/UdCard";
import { mapGetters } from 'vuex'
export default {
    name: 'customers',
    props: {
        btns: { type: Object, default: null },
    },
    components: { UdCard, },
    computed: {
        ...mapGetters(["user"]),
    },
    data: function () {
        return {
            currentUserId: null,
            dialogFormVisible: false,
            currentProfile: null,
            scopeItems: [],
            scopeValue: "all",
            items: [],
            kw: "",
            listLoading: true,
            downloading: false,
            per_page: 20,
            total: 0,
            current_page: 1,
            ShowRemarkDialog: false,
            remarkForm:{
                remark: "",
            },
            rules: {
                remark: [
                    { required: true, message: '请输入备注', trigger: 'blur' },
                    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
                ],
            }
        };
    },

    watch: {
        scopeValue: function (newValue, oldValue) {
            this.current_page = 1;
            this.loadData();
        },

        current_page: function (newVal, oldVal) {
            this.loadData();
        },
        per_page: function (newVal, oldVal) {
            this.loadData();
        },
    },

    mounted: function () {
    },

    created () {
        this.loadData();
    },

    methods: {
        updateRemark(){
            var _this = this;
            this.$refs.rForm.validate((valid) => {
                if (valid) {
                    var data = {
                        id: _this.currentUserId,
                        remark: _this.remarkForm.remark
                    }
                    updateWeappUserRemark(data).then(res=>{
                        if(res.code != 0){
                            return
                        }
                        _this.$message({
                            type: 'success',
                            message: '添加成功！'
                        })
                        _this.ShowRemarkDialog = false
                        _this.loadData()
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


        },
        banHandle (id) {
            banUser(id).then((resp) => {
                if (resp.status != 0) {
                    return
                }
                this.loadData()
            })
        },

        doSearch: function () {
            // 搜索
            this.loading = true;
            this.current_page = 1;
            this.loadData();
        },

        downloadCsv: function () {
            this.downloading = true
            var _this = this
            downloadUserList({
                order: "id desc",
                scope: _this.scopeValue,
                page: _this.current_page,
                per_page: _this.per_page,
                kw: _this.kw || "",
            }).then((res) => {
                this.downloading = false
                const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // 创建一个a标签
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob); // 设置文件的URL
                link.download = '客户账号.xlsx'; // 设置文件的下载名称

                // 模拟用户点击链接进行下载
                link.click();

                // 释放URL对象
                URL.revokeObjectURL(link.href);
            })

        },

        clearKw: function () {
            this.kw = "";
            this.loadData();
        },


        remarkDialogHandle: function (profile) {
            this.currentUserId = profile.id;
            this.remark = profile.remark;
            this.ShowRemarkDialog = true;
        },

        updateCurrentPage: function (page) {
            this.current_page = page;
        },

        updatePageSize: function (size) {
            this.per_page = size || 10;
        },

        loadData: function () {
            this.listLoading = true;
            var _this = this;
            getUserProfileList({
                order: "id desc",
                scope: _this.scopeValue,
                page: _this.current_page,
                per_page: _this.per_page,
                kw: _this.kw || "",
            }).then((resp) => {
                _this.items = resp.data.result;
                _this.total = resp.data.page.total_items;
                _this.listLoading = false;
                _this.scopeItems = resp.scopes;
                console.log("resp.data.data", resp.data, _this.listLoading);
            });
        },
    },
};
</script>

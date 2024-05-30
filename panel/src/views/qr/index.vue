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
    <div v-cloak>
        <ud-card>
            <!-- 操作 -->
            <div class="header">
                <div class="part-left">
                </div>

                <div class="part-right">
                    <div class="block">
                        <el-button :disabled="loading" icon="el-icon-refresh" size="small" type="default"
                            @click="loadData">刷新数据</el-button>
                    </div>
                    <div class="block">
                        <el-button size="small" type="primary" icon="el-icon-plus"
                            @click="newQrHandle">添加二维码</el-button>
                    </div>
                </div>
            </div>

            <!-- 列表 -->
            <el-table v-loading="loading" element-loading-text="正在加载二维码" style="width: 100%" size="medium " fit
                :data="qrItems" :highlight-current-row="true">
                <el-table-column prop="id" label="#" width="50"></el-table-column>
                <el-table-column prop="title" label="渠道名称"> </el-table-column>
                <el-table-column prop="path" label="路径"></el-table-column>
                <el-table-column label="二维码">
                    <template slot-scope="scope">
                        <img :src="scope.row.url" style="width:100px;" />
                    </template>
                </el-table-column>
                <el-table-column prop="view_nums" label="扫码次数"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button @click="downLoadImg(scope.row)" type="text" size="small">下载</el-button>
                        <el-button @click="editHandle(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteItemHandle(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <qr-form ref="qrform" @change="qrChangeHandle"></qr-form>
        </ud-card>
    </div>
</template>

<script>
import UdCard from "@/components/UdCard";
import qrForm from "./form";
import { getQrList, deleteQr } from "@/api/qr";
export default {
    name: "qrs",
    components: { UdCard, qrForm },
    data () {
        return {
            currentQr: {},
            loading: true,
            qrItems: [],
            showDialog: false,
        };
    },
    mounted () {
        this.loadData();;
    },
    methods: {
        qrChangeHandle: function () {
            this.loading = true
            this.$refs.qrform.close()
            this.loadData()
        },

        // 获取数据
        loadData () {
            this.loading = true;
            var _this = this;
            getQrList().then((resp) => {
                _this.qrItems = resp.data;
                _this.loading = false;
            });
        },

        newQrHandle () {
            var data = {
                id: null,
                title: '',
                data: '',
                path: '',
            }

            this.$refs.qrform.open(data)
        },
        editHandle (item) {
            console.log(this.$refs)
            this.$refs.qrform.open(item)
        },

        downLoadImg (item) {
            if (item.url == null) { this.$message('该二维码图片未生成'); return }
            var url = item.url + "?attname=" + item.title + "-二维码.jpg"
            window.open(url)
        },
        deleteItemHandle (id) {
            this.$confirm("确定要删除这个二维码吗？").then(() => {
                deleteQr(id).then((resp) => {
                    if (resp.status === 0) {
                        this.$message({ type: "success", message: "删除二维码成功！" });
                        this.loadData();
                    }
                });
            });
        },

    },
};
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
    border-bottom: 0.2px solid #ebeef5;

    .part-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .part-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .block {
        margin-right: 10px;
    }
}
</style>

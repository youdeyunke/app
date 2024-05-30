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
    <el-dialog title="微信扫码预览" :destroy-on-close="true" :visible.sync="show" width="400px">
        <div class="outer" v-if="qr">
            <div class="qr">
                <el-image :src="qr" fit="fill" style="width:300px;height:300px;" />
            </div>

            <div class="text">
                请用微信扫码预览
            </div>
        </div>
        <div class="outer" v-else>
            <div style="color: #666;padding: 40px 0;">该房源暂未生成二维码，点击下方按钮重新生成</div>
            <el-button size="mini" :loading="loading" type="primary" @click="generateQRCode" icon="el-icon-refresh">重新生成</el-button>
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped></style>

<script>
import HelpIcon from "@/components/HelpIcon";
import TagItem from "@/components/TagItem";
import { refreshHouseQrcode } from "@/api/house";

export default {
    components: {
        TagItem,
        HelpIcon,
    },
    props: {
    },

    data () {
        return {
            qr: null,
            show: false,
            hid: null,
            loading: false,
            item: null,
        };
    },

    watch: {

    },

    created: function () {

    },
    computed: {},


    methods: {
        generateQRCode: async function () {
            this.loading = true
            refreshHouseQrcode(this.hid).then(res => {
                this.loading = false
                if (res.code != 0) {
                    return
                }
                this.$message.success('生成成功')
                this.qr = res.data
            }).catch((err) => {
                this.loading = false
                console.log(err);
            })
        },

        openDialog: function (item) {
            console.log('qr is, ', item)
            this.show = true
            this.qr = item.qr
            this.hid = item.id
        },

    },
};
</script>
<style scoped>
.outer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
</style>
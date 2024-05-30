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
    <div class="QrPopup">
        <el-dialog title="二维码" :visible.sync="showPopup" width="400px" append-to-body>
            <!-- <div id="qrcode"></div> -->
            <div style="width: 360px;height: 360px;">
                <QRCode :value="text" size="360" class="qrimg"></QRCode>
            </div>
            <div style="font-size: 10px; color: #999;margin-top: 20px;text-align: center;">
                <i class="el-icon-info"></i>
                手机浏览器扫码，选择文件上传
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showPopup = false">取消</el-button>
                <el-button type="primary" @click="scwc">上传完成</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import QRCode from 'qrcode.vue'
import { getToken } from '@/utils/auth'
export default {
    name: 'QrPopup',
    data () {
        return {
            url: '',
            showPopup: false,
            text: "http://",
        };
    },
    props: {
        parentId: null
    },
    components: { QRCode },

    computed: {},

    mounted () {

    },

    methods: {
        scwc () {
            this.$emit('success')
            this.showPopup = false
        },
        showewm () {
            var hostName = window.location.origin
            var token = getToken()
            // console.log(window.location);
            hostName = `${hostName}/#/mobile?token=${token}&parentId=${this.parentId}`
            // console.log(hostName);
            this.text = hostName
            this.showPopup = true

        }
    }
}
</script>

<style scoped>
.qrimg {
    margin: 0 auto;
}
</style>
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
    <div class="body">
        <div class="func-title">{{ title }}</div>
        <div class="func-desc">
            {{ desc }}</div>
        <el-button class="up-btn" icon="el-icon-upload2" size="small" @click="gotoPurchaseUrl">升级到专业授权</el-button>
        <el-divider></el-divider>
        <div class="bottom">
            <div>
                <div class="attention-title">
                    关注产品动态</div>
                <div class="attention-desc">
                    关注友得云客公众号，获取最新产品信息</div>
            </div>
            <el-image class="attention-img" :src="require('@/assets/images/wx_gzh.png')"></el-image>
        </div>
    </div>
</template>

<script>
export default {
    name: "advancedCard",
    methods: {
        gotoPurchaseUrl() {
            window.open('https://www.youdeyunke.com/price.html?statId=9');
        },
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        desc: {
            type: String,
            default: '',
        },
    },
};
</script>

<style scoped lang="scss">
.body {
    width: 660px;
    padding: 40px;
    border-radius: 4px;
    background: #fff;
    margin: 0 auto;
    margin-top: 60px;
}

.func-title {
    font-size: 20px;
    color: #666;
    font-weight: 500;
    margin-bottom: 30px;
}

.func-desc {
    font-size: 14px;
    color: #999999;
    margin-bottom: 30px;
}

.up-btn {
    background-color: #333333;
    color: #E4BE9E;
    border: 1px solid rgba(228, 190, 158, 0);
}

.up-btn:hover,
.up-btn:focus {
    color: #E4BE9E;
    background-color: rgba(51, 51, 51, 0.8);
    border: 1px solid rgba(228, 190, 158, 0);
}

.bottom {
    display: flex;
    justify-content: space-between;
}

.attention-title {
    font-size: 20px;
    color: #666;
    font-weight: 500;
    margin-bottom: 25px;
    margin-top: 18px;
}

.attention-desc {
    font-size: 14px;
    color: #999999;
}

.attention-img {
    width: 290px;
    height: 105px;
}
</style>

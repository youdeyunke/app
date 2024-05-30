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
    <div class="post-info">
        <div class="item">
            <div class="label">封面图</div>
            <div class="value">
                <el-image :src="post.cover" style="width: 80px; height: 80px" fit='fill' />
            </div>
        </div>

        <div class="item">
            <div class="label">地址</div>
            <div class="value">
                {{ post.city.name }}
                {{ post.district.name }}
                {{ post.street }}
            </div>
        </div>

        <div class="item">
            <div class="label">户型</div>
            <div class="value">
                <span v-for="t  in post.types">{{ t.name }} &nbsp; </span>
            </div>
        </div>

        <div class="item">
            <div class="label">物业类型</div>
            <div class="value">
                <span v-for="cat in post.cats">{{ cat.name }} &nbsp; </span>
            </div>
        </div>

        <div class="item">
            <div class="label">预售证</div>
            <div class="value">
                <span v-for="l in post.post_licenses">{{ l.number }} &nbsp; </span>
            </div>
        </div>

        <div class="item">
            <div class="label">装修</div>
            <div class="value">
                {{ post.fitment.name }}
            </div>
        </div>

        <div class="item">
            <div class="label">卖点标签</div>
            <div class="value">
                <tag-item :item="item" v-for="item in post.tags"></tag-item>
            </div>
        </div>


        <div class="item">
            <div class="label">咨询电话</div>
            <div class="value">
                {{ post.phone }}, {{ post.sub_phone }}
            </div>
        </div>


        <div class="item">
            <div class="label">VR</div>
            <div class="value">
                <el-link :href="vr.url" target="_blank" v-for="vr  in post.post_vrs">{{ vr.name }} &nbsp; </el-link>
            </div>
        </div>

        <div class="item">
            <div class="label">最后更新时间</div>
            <div class="value">
                {{ post.updated_at_pretty }}
            </div>
        </div>

        <div class="item">
            <div class="label">小程序码</div>
            <div class="value">
                <el-link icon="el-icon-download" type="primary" target="_blank" :href="post.qr">下载</el-link>
            </div>
        </div>

        <div class="item">
            <div class="label">备注</div>
            <div class="value">
                {{ post.admin_remark || '-' }} <!-- el-link icon="el-icon-edit" type="primary"></el-link -->
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

<script>
import HelpIcon from "@/components/HelpIcon";
import TagItem from "@/components/TagItem";

export default {
    components: {
        TagItem,
        HelpIcon,
    },
    props: {
        post: {
            type: Object,
            default: null,
        },
    },

    data () {
        return {

        };
    },

    watch: {

    },

    created: function () {

    },
    computed: {},

    filters: {
        lastEventDetail: function (es) {
            if (es.length == 0) {
                return ''
            }
            return es[0].content

        }
    },

    methods: {

    },
};
</script>
<style scoped>
.post-info {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
}

.post-info .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 40px;
}

.post-info .label {
    width: 120px;
    text-align: right;
    color: #999;
}

.post-info .value {
    padding-left: 20px;
}
</style>
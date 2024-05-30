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
    <div class="map-manager" v-cloak v-loading="loading">
        <div v-if="post">
            <map-marker width="800" height="600" :lat="lat" :lng="lng" @change="markerChange" />

            <div class="actions">
                <el-button type="default" size="small" @click="cancleHandle">取消</el-button>
                <el-button type="primary" size="small" @click="submitHandle">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { getPostDetail, updatePost } from "@/api/post";
import MapMarker from "@/components/MapMarker";

export default {
    components: {
        MapMarker,
    },
    data () {
        return {
            post: null,
            loading: false,
        };
    },
    props: {
        postId: { type: Number, default: null },
    },

    watch: {
        postId: {
            immediate: true,
            deep: true,
            handler (val, oval) {
                if (!val) {
                    return false;
                }
                this.loadData();
            },
        },
    },

    mounted: function () { },

    computed: {
        lng: {
            get () {
                if (!this.post) {
                    return 0;
                }
                return parseFloat(this.post.longitude);
            },
            set (val) {
                this.post.longitude = val;
            },
        },
        lat: {
            get () {
                if (!this.post) {
                    return 0;
                }
                return parseFloat(this.post.latitude);
            },
            set (val) {
                this.post.latitude = val;
            },
        },
    },

    methods: {
        markerChange: function (marker) {
            if (!marker) {
                return false;
            }

            var post = this.post;
            post.latitude = marker.lat;
            post.longitude = marker.lng;
            this.post = post;
        },

        cancleHandle: function () {
            this.loadData();
        },

        submitHandle: function () {
            var data = {
                id: this.post.id,
                latitude: this.post.latitude,
                longitude: this.post.longitude,
            };
            this.loading = true;
            updatePost(data).then((resp) => {
                if (resp.status != 0) {
                    return;
                }
                this.loadData();
            });
        },

        loadData: function () {
            this.loading = true;
            getPostDetail(this.postId).then((resp) => {
                this.loading = false;
                this.post = resp.data;
            });
        },
    },
};
</script>

<style scoped>
.actions {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>
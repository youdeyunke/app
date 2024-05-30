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
    <div class="block-view" v-cloak>
        <draggable class="type-list" v-model="types" draggable=".type-item" @end="dragEndHandle">
            <div v-for="type, index in types" class="type-item" :data-id="type.id">
                <el-image class="cover" :src="type.images_list[0]" fit="fill" />
                <div class="info">
                    <div class="attr name">
                        <span>{{ type.name }}</span>
                        <el-tag size="mini" plain type="primary">{{ type.sale_status_item.name }}</el-tag>
                    </div>
                    <div class="attr">编号:{{ type.id }}</div>
                    <div class="attr">朝向:{{ type.position }}</div>
                    <div class="attr">建面:{{ type.area }}㎡</div>
                    <div class="attr">售价:{{ type.unknow_price ? '待定' : type.total_price + '万' }}</div>
                </div>
                <div class="actions">
                    <el-link icon="el-icon-edit" type="primary" @click="editHandle(type)" />
                    <el-link icon="el-icon-delete" circle type="danger" @click="deleteHandle(type)" />
                </div>
            </div>
        </draggable>
    </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    components: {
        draggable,
    },
    data () {
        return {
            loading: false,
        };
    },
    props: {
        value: {
            type: Array,
            value: [],
        },
    },

    mounted: function () { },

    computed: {
        types: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("input", val);
            },
        },
    },

    methods: {
        dragEndHandle: function (val) {
            this.$emit("drag", val);
        },
        editHandle: function (row) {
            this.$emit("edit", row);
        },
        deleteHandle: function (row) {
            this.$emit("delete", row);
        },
    },
};
</script>

<style scoped>
#types {
    .add-link {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
}

.type-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
    margin: 0;
}

.type-list .type-item {
    width: 140px;
    font-size: 12px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 5px 10px;
    box-shadow: #cecece 2px 2px 10px;
}

.type-list .type-item:hover {
    cursor: move;
}

.type-list .type-item .red {
    color: #ff0000;
}

.type-list .type-item .info {
    padding: 4px 10px;
}

.type-list .type-item .attr {
    margin-bottom: 5px;
}

.type-list .type-item .name {
    display: flex;
    justify-content: space-between;
}

.type-list .type-item .actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 5px 10px 5px;
}

.type-list .type-item .cover {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
}

.images {
    display: flex;
    justify-content: felx-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
}

.images .image-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #cecece;
    position: relative;
}

.images .image-item .actions {
    display: none;
}

.images .image-item:hover .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidde;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
}

.images .image-item img {
    width: 100%;
    height: 100%;
}

.uploader {
    margin-bottom: 10px;
}

.footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

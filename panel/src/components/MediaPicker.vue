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
    <div class="images-picker">
        <draggable class="images-picker-container" draggable=".image-item" filter=".add" v-model="objs">
            <div :style="{ width: widthVal, height: heightVal, padding: paddingVal, active: activeIndex == index }"
                class="image-item" v-for="obj,index in objs" :key="index">
                <el-image v-if="obj.filetype == 'image'" title="点击更换素材" style="width:100%;height:100%" :src="obj.url"
                    :fit="fit" />
                <video style="width:100%;height:100%;" v-if="obj.filetype == 'video'" :src="obj.url"></video>
                <!-- TODO  处理视频预览的问题 -->
                <div class="btns">
                    <i class="el-icon-view view" @click.stop="clickToView(index)"></i>
                    <i class="el-icon-edit edit" @click.stop="clickToChange(index)"></i>
                    <i class="el-icon-error del" @click.stop="clickToDelete(index)"></i>
                </div>
            </div>

            <div v-if="canAdd" :style="{ width: widthVal, height: heightVal, padding: paddingVal }" class="image-item add"
                @click="clickToAdd">
                <i class="el-icon-plus" :style="{ fontSize: plusIconSize }"></i>
            </div>
        </draggable>
        <media-manager :limit="limitCount" :file-types="allowFileTypes" :show.sync="showMM"
            @selected="imageChangedHandle"></media-manager>
    </div>
</template>
<script>
import MediaManager from "@/components/MediaManager/Index";
import draggable from "vuedraggable";
export default {
    name: "image-picker",
    props: {
        value: { type: Array, default: [] },
        width: { type: Number, default: 100 },
        height: { type: Number, default: 100 },
        padding: { type: Number, default: null },
        limit: { type: Number, default: 5 },
        fit: { type: String, default: "fill" },
        fileTypes: { type: Array, default: () => ["image", "video"] },
    },
    components: { MediaManager, draggable },
    data () {
        return {
            activeIndex: null,
            action: "new", // new or change
            currentIndex: null, // 当前修改哪个图片
            showMM: false,
        };
    },

    computed: {
        allowFileTypes: function () {
            // 如果是点击替换文件，那么原类型跟新类型必须一致
            if (this.action == "change") {
                var index = this.currentIndex;
                var item = this.value[index];
                return [item.filetype];
            }
            return this.fileTypes;
        },
        canAdd: function () {
            // 是否可以添加图片
            return this.limit > this.objs.length;
        },

        limitCount: function () {
            // 如果是修改链接，那么只能选择1个文件
            if (this.action == "change") {
                return 1;
            }
            // 可选文件数量 = 总数量限制 - 当前图片数量
            return this.limit - this.objs.length;
        },
        objs: {
            get () {
                return this.value ? this.value : [];
            },
            set (vals) {
                // TODO 通知改变了顺序
                console.log("set vals", vals);
                this.$emit("drag", vals);
            },
        },

        plusIconSize: function () {
            // 加号按钮的尺寸不能定死，当width比较小的时候，需要缩小按钮尺寸
            return this.width >= 100 ? 40 : this.width * 0.1;
        },
        paddingVal () {
            return this.padding ? this.padding + "px" : "none";
        },
        widthVal () {
            return this.width + "px";
        },
        heightVal () {
            return this.height + "px";
        },
    },

    methods: {
        clickToAdd: function () {
            this.action = "new";
            this.currentIndex = null;
            this.showMM = true;
        },

        clickToView: function (index) {
            this.currentIndex = index;
            var index = this.currentIndex;
            var item = this.value[index];
            var url = item.url
            window.open(url)
        },

        clickToChange: function (index) {
            this.action = "change";
            this.currentIndex = index;
            this.showMM = true;
        },

        imageChangedHandle: function (items) {
            // 修改图片 还是添加图片?
            if (this.action == "change") {
                this.$emit("change", { index: this.currentIndex, item: items[0] });
                this.showMM = false;
                return false;
            }

            // 追加文件
            var objs = [];
            items.forEach((item, index) => {
                objs.push({
                    url: item.url,
                    filetype: item.filetype,
                });
            });
            // 通知父组件追加
            this.$emit("append", objs);
            this.showMM = false;
        },

        clickToDelete (index) {
            //  TODO
            // 组件内部不处理删除数组的操作
            // 因为父组件需要根据index，调用删除文件的api
            // 直接删除obj回导致父组件的objs被修改，从而不能根据index取到obj
            this.$emit("delete", index);
        },
    },
};
</script>
<style lang="scss" scoped>
.images-picker-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
}

.image-item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px dashed #cecece;
    border-radius: 4px;
    margin-right: 8px;
    margin-top: 8px;
}

.image-item:hover {
    border-color: #1989fa;
}

.image-item.add:hover {
    cursor: pointer;
}

.image-item .del {
    display: none;
}

.image-item .btns {
    display: none;
}

.image-item:hover .btns {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    justify-content: space-around;
    ;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
}

.btns .del {
    display: block;
    font-size: 22px;
    color: #f00;
    cursor: pointer;
}

.btns .edit {
    display: block;
    font-size: 22px;
    color: #ffffff;
    cursor: pointer;
}

.btns .view {
    display: block;
    font-size: 22px;
    color: #ffffff;
    cursor: pointer;

}

.el-icon-plus {
    color: #cecece;
}
</style>

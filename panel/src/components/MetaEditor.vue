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
    <div :style="width ? 'width:' + width + 'px' : ''" class="editor border" v-cloak>
        <div class="body" :style="{ height: bodyHeight }">
            <draggable v-model="lines" v-show="mode == 'show'" :style="{ height: textareaHeight }" class="lines">
                <div :class="{ 'line-item': true }" v-for="item,index of lines" :key="index">
                    <div class="line-body" @click="lineClickHandle(index)">
                        <div class="meta-item">
                            <span class="meta-label">{{ item.label }}</span>
                            <span class="meta-value">{{ item.value }}</span>
                        </div>
                    </div>
                    <div class="line-footer" @click="removeLineHandle(index)">x</div>
                </div>
            </draggable>
            <textarea v-show="mode == 'edit'" @blur="confirmHandle" :style="{ height: textareaHeight }" ref="textarea"
                v-model="textContent" />
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    components: { draggable },
    data () {
        return {
            mode: "show",
            loading: false,
            activeIndex: null,
            placeholder:
                "产权年限：\n容积率：\n占地面积：\n总户数：\n绿化率：\n车位数：\n",
        };
    },
    props: {
        width: { type: Number, default: null },
        rows: { type: Number, default: 15 },
        value: { type: String, default: "" },
    },

    mounted: function () { },

    watch: {
        value: function (text) {
            if (!text || text.length == 0) {
                // 如果文本被清空了，那么自动转化为编辑模式
                this.mode = "edit";
                this.$refs.textarea.focus();
            }
        },
    },

    computed: {
        textareaHeight: function () {
            var n = this.lines.length;
            var min = this.rows;
            n = n <= min ? min : n;
            var v = n * 32;
            return v + "px";
        },

        bodyHeight: function () {
            var v = this.rows * 32;
            return v + "px";
        },

        textContent: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("input", val);
            },
        },

        lines: {
            get () {
                // 将text解析为json
                var items = [];
                if (!this.value || this.value.length == 0) {
                    return items;
                }
                var text = this.textContent.replaceAll(":", "："); // 替换为中文冒号
                var rows = text.split("\n"); // 按回车分割
                rows = rows.map((row, i) => {
                    var res = row.split("：");
                    // 没有匹配到：
                    if (res.length == 1) {
                        return { label: res[0], value: "-" };
                    }

                    var label = res.splice(0, 1)[0];
                    var value = res.join(":");
                    return { label: label, value: value };
                });
                return rows.filter((row, i) => {
                    return row ? true : false;
                });
            },
            set (lines) {
                var textItems = lines.map((line, i) => {
                    return line.label + ":" + line.value;
                });
                var text = textItems.join("\n");
                this.$emit("input", text);
            },
        },

        linesCount: function () {
            // 文本有多少行
            if (!this.textContent) {
                return 0;
            }
            return this.lines.length;
        },
    },

    methods: {
        editHandle: function () {
            this.mode = "edit";
            this.$refs.textarea.focus();
        },
        removeLineHandle: function (index) {
            var lines = this.lines;
            lines.splice(index, 1);
            this.lines = lines;
        },
        clearHandle: function () {
            this.mode = "edit";
            this.lines = [];
        },

        confirmHandle: function () {
            if (this.lines.length == 0) {
                this.mode = "edit";
            } else {
                this.mode = "show";
            }
            this.activeIndex = null;
        },
        lineClickHandle: function (index) {
            // 点击后自动聚焦光标
            this.mode = "edit";
            this.activeIndex = index;
            var pos = 0;
            for (var i = 0; i <= index; i++) {
                var line = this.lines[i];
                pos += line.length;
            }
            pos += index;
            this.$refs.textarea.setSelectionRange(pos, pos + 10);
            this.$refs.textarea.focus();
        },
        validate: function () {
            var text = this.textContent;
            console.log("validate", text, "length", this.jsonData.length);
            // 替换冒号为英文
            if (this.jsonData.length == 0 && this.textContent.length > 0) {
                this.$message.error("楼盘参数有误，请检查");
                return false;
            }
            // 验证通过
        },
    },
};
</script>

<style scoped>
.editor {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    line-height: 32px;
    font-size: 12px;
    overflow-y: hidden;
    overflow-x: hidden;
    border-radius: 4px;
    border: 1px solid #e2e6f0;
    position: relative;
}

.editor .header {
    user-select: none;
    height: 32px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
    background: #f6f7fa;
    border-bottom: 1px solid #e2e6f0;
}

.header .btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.header .btns div {
    cursor: pointer;
    margin-right: 8px;
}

.header .btns .confirm {
    color: #1989fa;
}

.editor .body {
    width: 100%;
    overflow-y: scroll;
    top: 32px;
}

textarea {
    min-height: calc(100% - 32px - 2px);
    width: calc(100% - 20px - 2px);
    padding: 0 10px;
    border: none;
    top: 1px;
    left: 0px;
    color: #333;
    line-height: 32px;
    font-size: 12px;
    vertical-align: middle;
    z-index: 10;
    overflow: hidden;

    outline: none;
    resize: none;
    background: transparent;
    border-color: transparent;
    white-space: pre;
    border-spacing: 0;
    border-collapse: collapse;
}

.lines {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    user-select: none;
}

.lines .line-item {
    height: 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background: #fff;
    padding: 0 10px;
}

.lines .line-item:hover {
    cursor: pointer;
    background: #f4f4f4;
}

.line-item .line-footer {
    width: 40px;
    display: none;
}

.line-item:hover .line-footer {
    font-size: 14px;
    color: red;
    display: inline;
    text-align: center;
}

.line-item .line-body {
    width: calc(100% - 40px);
}

.line-item .line-body .meta-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.line-item .line-body .meta-item .meta-label {
    width: 80px;
    color: #999;
    overflow: hidden;
}
</style>
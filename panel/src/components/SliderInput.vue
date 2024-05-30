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
    <div class="slider" v-cloak>
        <input class="main" type="range" :min="min" :max="max" v-model="inputValue"></input>
        <div class="footer" v-if="showInput">
            <input type="number" :min="min" :max="max" v-model="inputValue" />
            <div class="postfix">{{ postfix }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
        };
    },
    props: {
        value: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
        showInput: { type: Boolean, default: true },
        postfix: { type: String, default: 'px' },
    },

    mounted: function () {
    },

    computed: {
        inputValue: {
            get () {
                return this.value
            },
            set (val) {
                // 判断值得大小
                val = val <= this.min ? this.min : val
                val = val >= this.max ? this.max : val
                this.$emit('input', parseInt(val))
            },
        },
    },

    methods: {
    }
};
</script>

<style scoped>
.slider {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.slider input[type="range"] {
    background-color: #1989fa;
    height: 2px;
    margin-top: 10px;
    margin-bottom: 10px;
}


.slider input.main {
    margin-right: 10px;
}

.slider .footer {
    position: relative;
    width: 100px;
}

.slider .footer input {
    padding-right: 40px;
    width: 100%;
    height: 28px;
}

.slider .footer .postfix {
    position: absolute;
    right: 1px;
    top: 1px;
    width: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f4f4f4;
    height: calc(100% - 2px);
    color: #666;
}
</style>
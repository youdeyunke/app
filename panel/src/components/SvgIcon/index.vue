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
    <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
    <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

export default {
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        isExternal () {
            return isExternal(this.iconClass)
        },
        iconName () {
            return `#icon-${this.iconClass}`
        },
        svgClass () {
            if (this.className) {
                return 'svg-icon ' + this.className
            } else {
                return 'svg-icon'
            }
        },
        styleExternalIcon () {
            return {
                mask: `url(${this.iconClass}) no-repeat 50% 50%`,
                '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
            }
        }
    }
}
</script>

<style scoped>
.svg-icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>

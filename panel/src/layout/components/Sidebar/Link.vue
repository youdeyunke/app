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
    <component :is="type" v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
    props: {
        to: {
            type: String,
            required: true
        },
        windowopen: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isExternal () {
            return isExternal(this.to)
        },
        type () {
            if (this.isExternal) {
                return 'a'
            }
            return 'router-link'
        }
    },
    methods: {
        linkProps (to) {
            if (this.isExternal) {
                return {
                    href: to,
                    target: '_blank',
                    rel: 'noopener'
                }
            }
            if (this.windowopen) {
                return {
                    to: to,
                    target: '_blank',
                    rel: 'noopener'
                }
            }
            return {
                to: to
            }
        }
    }
}
</script>

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
<script>
export default {
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    render (h, context) {
        const { icon, title } = context.props
        const vnodes = []

        if (icon) {
            if (icon.includes('el-icon')) {
                vnodes.push(<i class={[icon, 'sub-el-icon']} />)
            } else {
                vnodes.push(<svg-icon icon-class={icon} />)
            }
        }

        if (title) {
            vnodes.push(<span style='font-size:12px;' slot='title'>{(title)}</span>)
        }
        return vnodes
    }
}
</script>

<style scoped>
.sub-el-icon {
    color: currentColor;
    width: 1.2em!important;
    height: 1.2em!important;
    font-size: 14px!important;
    margin-right: 10px!important;
    margin-left: 0!important;
}
</style>

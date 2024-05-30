/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
import Dict from './Dict'
import { mergeOptions } from './DictOptions'

export default function (Vue, options) {
    mergeOptions(options)
    Vue.mixin({
        data () {
            if (this.$options === undefined || this.$options.dicts === undefined || this.$options.dicts === null) {
                return {}
            }
            const dict = new Dict()
            dict.owner = this
            return {
                dict
            }
        },
        created () {
            if (!(this.dict instanceof Dict)) {
                return
            }
            options.onCreated && options.onCreated(this.dict)
            this.dict.init(this.$options.dicts).then(() => {
                options.onReady && options.onReady(this.dict)
                this.$nextTick(() => {
                    this.$emit('dictReady', this.dict)
                    if (this.$options.methods && this.$options.methods.onDictReady instanceof Function) {
                        this.$options.methods.onDictReady.call(this, this.dict)
                    }
                })
            })
        },
    })
}

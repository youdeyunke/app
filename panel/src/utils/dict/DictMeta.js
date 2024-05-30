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
import { mergeRecursive } from "@/utils/ruoyi";
import DictOptions from './DictOptions'

/**
 * @classdesc 字典元数据
 * @property {String} type 类型
 * @property {Function} request 请求
 * @property {String} label 标签字段
 * @property {String} value 值字段
 */
export default class DictMeta {
    constructor(options) {
        this.type = options.type
        this.request = options.request
        this.responseConverter = options.responseConverter
        this.labelField = options.labelField
        this.valueField = options.valueField
        this.lazy = options.lazy === true
    }
}


/**
 * 解析字典元数据
 * @param {Object} options
 * @returns {DictMeta}
 */
DictMeta.parse = function (options) {
    let opts = null
    if (typeof options === 'string') {
        opts = DictOptions.metas[options] || {}
        opts.type = options
    } else if (typeof options === 'object') {
        opts = options
    }
    opts = mergeRecursive(DictOptions.metas['*'], opts)
    return new DictMeta(opts)
}

/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
const defaultOptions = {
    selector: '#poster'
};

function Poster (options = {}, that) {
    options = {
        ...defaultOptions,
        ...options,
    };

    const pages = getCurrentPages();
    let ctx = pages[pages.length - 1];
    if (that) ctx = that
    const poster = ctx.selectComponent(options.selector);
    delete options.selector;

    return poster;
};

Poster.create = (reset = false, that) => {
    const poster = Poster({}, that);
    if (!poster) {
        console.error('请设置组件的id="poster"!!!');
    } else {
        return Poster({}, that).onCreate(reset);
    }
}

export default Poster;

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
import store from '@/store'

let watermark = {}
let outerClassName = 'app-main'
let canvasId = 'ud-Watermark-canvas';

let clearWatermark = () => {
    // 找到watermark element
    console.log('clear watermar')
    var div = document.getElementById(canvasId)
    if (div == null) {
        console.log('clear watermar  11')
        return
    }
    div.style.display = 'none'
    div.replaceWith(div)
    return
}


let setWatermark = () => {
    var outer = document.getElementsByClassName(outerClassName)[0]
    outer.style.position = 'relative'
    var profile = store.state.user.profile
    var str = profile.name + ' ID:' + profile.id


    //创建一个画布
    let can = document.createElement('canvas');
    //设置画布的长宽
    can.width = 200;
    can.height = 120;

    let cans = can.getContext('2d');
    //旋转角度
    cans.rotate(-15 * Math.PI / 180);
    cans.font = '13px 微软雅黑';
    //设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(200, 200, 200, 0.20)';
    //cans.fillStyle = 'rgba(200, 0, 0, 1)';
    //设置文本内容的当前对齐方式
    cans.textAlign = 'left';
    //设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle';
    //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText(str, can.width / 8, can.height / 2);

    let div = document.createElement('div');
    div.id = canvasId;
    div.style.pointerEvents = 'none';
    div.style.top = '30px';
    div.style.left = '0px';
    div.style.position = 'absolute';
    div.style.zIndex = '9';
    div.style.width = outer.clientWidth + 'px';
    div.style.position = 'absotu'
    div.style.height = outer.clientHeight + 'px';
    console.log('dom.height', outer.clientHeight)
    div.style.zindex = 9999
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';

    var oldDiv = document.getElementById(div.id)
    if (oldDiv != null) {
        oldDiv.replaceWith(div)
    } else {
        outer.appendChild(div);
    }
    return div;
}

// 该方法只允许调用一次
watermark.set = () => {
    // 数据可能没有加载完成，多试几次
    var n = 3
    for (var i = 0; i <= n; i++) {
        setTimeout(() => {
            console.log('i', i)
            setWatermark();
        }, 500 * i)
    }
    let resizeTimer = null;
    // 缩放浏览器窗口时候
    window.onresize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // 防抖后要执行的代码
            setWatermark();
        }, 300); // 设置延迟的时间，单位为毫秒（这里设置为300ms）

    };
}

watermark.clear = () => {
    // 清空或者关闭
    clearWatermark()
}

export default watermark;

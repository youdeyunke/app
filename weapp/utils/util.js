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
function prettyTime (str) {
    var d = str.slice(0, 10)
    var t = str.slice(11, 16)
    return d + ' ' + t
}

function shuffle (arr) {
    var i = arr.length,
        t, j
    while (i) {
        j = Math.floor(Math.random() * i--)
        t = arr[i]
        arr[i] = arr[j]
        arr[j] = t
    }
}

function set16ToRgb (str) {
    var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
    if (!reg.test(str)) {
        return;
    }
    let newStr = (str.toLowerCase()).replace(/\#/g, '')
    let len = newStr.length;
    if (len == 3) {
        let t = ''
        for (var i = 0; i < len; i++) {
            t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1))
        }
        newStr = t
    }
    let arr = []; //将字符串分隔，两个两个的分隔
    for (var i = 0; i < 6; i = i + 2) {
        let s = newStr.slice(i, i + 2)
        arr.push(parseInt("0x" + s))
    }
    return 'rgb(' + arr.join(",") + ')';
}

module.exports = {
    prettyTime: prettyTime,
    shuffle: shuffle,
    set16ToRgb: set16ToRgb
}
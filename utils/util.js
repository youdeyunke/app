function prettyTime(str) {
    var d = str.slice(0, 10)
    var t = str.slice(11, 16)
    return d + ' ' + t
}

function shuffle(arr) {
　　var i = arr.length, t, j
　　while (i) { 
    　　j = Math.floor(Math.random() * i--)
    　　t = arr[i]
    　　arr[i] = arr[j]
    　　arr[j] = t
　　}
}

function throttle(fn, delay) {
    // 记录上一次函数触发的时间
    console.log('2000util.throttle')
    if(delay == null || delay == undefined){
        delay = 1500
    }
    var lastTime = 0;
    // return function() {
        // 记录当前函数触发的时间
        var nowTime = Date.now();
        if (nowTime - lastTime > delay) {
            fn.apply(this, arguments);
            // 同步时间
            lastTime = nowTime;
        }
    // }
}

function set16ToRgb(str){
    var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
    if(!reg.test(str)){return;}
    let newStr = (str.toLowerCase()).replace(/\#/g,'')
    let len = newStr.length;
    if(len == 3){
        let t = ''
        for(var i=0;i<len;i++){
            t += newStr.slice(i,i+1).concat(newStr.slice(i,i+1))
        }
        newStr = t
    }
    let arr = []; //将字符串分隔，两个两个的分隔
    for(var i =0;i<6;i=i+2){
        let s = newStr.slice(i,i+2)
        arr.push(parseInt("0x" + s))
    }
    return 'rgb(' + arr.join(",")  + ')';
 }

module.exports = {
  prettyTime: prettyTime,
  shuffle: shuffle,
  throttle: throttle,
  set16ToRgb: set16ToRgb
}

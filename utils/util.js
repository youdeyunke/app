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
    console.log('util.throttle')
    if(delay == null || delay == undefined){
        delay = 1500
    }

    var lastTime = 0;
    return function() {
        // 记录当前函数触发的时间
        var nowTime = Date.now();
        console.log('nowTime - lastTme = ', nowTime - lastTime)
        console.log('delay is', delay)

        if (nowTime - lastTime > delay) {
            fn.apply(this, arguments);
            // 同步时间
            lastTime = nowTime;
        }
    }
}

module.exports = {
  prettyTime: prettyTime,
  shuffle: shuffle,
  throttle: throttle
}

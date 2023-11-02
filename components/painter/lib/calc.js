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
/* eslint-disable */
// 四则运算

!(function () {
    var calculate = function (s) {
        s = s.trim();
        const stack = new Array();
        let preSign = '+';
        let numStr = '';
        const n = s.length;
        for (let i = 0; i < n; ++i) {
            if (s[i] === '.' || (!isNaN(Number(s[i])) && s[i] !== ' ')) {
                numStr += s[i];
            } else if (s[i] === '(') {
                let isClose = 1;
                let j = i;
                while (isClose > 0) {
                    j += 1;
                    if (s[j] === '(') isClose += 1;
                    if (s[j] === ')') isClose -= 1;
                }
                numStr = `${calculate(s.slice(i + 1, j))}`;
                i = j;
            }
            if ((isNaN(Number(s[i])) && s[i] !== '.') || i === n - 1) {
                let num = parseFloat(numStr);
                switch (preSign) {
                    case '+':
                        stack.push(num);
                        break;
                    case '-':
                        stack.push(-num);
                        break;
                    case '*':
                        stack.push(stack.pop() * num);
                        break;
                    case '/':
                        stack.push(stack.pop() / num);
                        break;
                    default:
                        break;
                }
                preSign = s[i];
                numStr = '';
            }
        }
        let ans = 0;
        while (stack.length) {
            ans += stack.pop();
        }
        return ans;
    };
    module.exports = calculate;
})();

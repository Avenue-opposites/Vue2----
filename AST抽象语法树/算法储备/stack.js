const str = "2[2[a]2[c]]";

function smartRepeat(str) {
    const numberStack = [];
    const charStack = [];
    let i = 0;
    let rest = str;
    while (i < str.length) {
        rest = str.substring(i);
        if(/^\d+\[/i.test(rest)) {
            let times = rest.match(/^(\d+)\[/i)[1];
            numberStack.push(times);
            charStack.push("");
            i += times.length + 1; 
        }else if(/^\w+\]/i.test(rest)) {
            let times = rest.match(/^(\w+)\]/i)[1];
            charStack.push(times);
            i += times.length ;
        }else {
            let n = numberStack.pop();
            let s = charStack.pop();
            let len = charStack.length;
            charStack[len - 1] = (charStack[len - 1 ] + s).repeat(n);
            i++;
        }
        console.log(numberStack,charStack); 
    };
    return charStack.pop();
};

let result = smartRepeat(str);
console.log(result);
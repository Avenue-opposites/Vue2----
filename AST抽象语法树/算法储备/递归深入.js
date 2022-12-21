//斐波那契数列
//缓存
const cache = {};
function fib(n) {
    //如果缓存中有就直接使用
    if(cache[n]) {
        return cache[n];
    };
    //计算
    let v = n === 0 || n === 1 ? 1 : fib(n-2) + fib(n-1);
    //保存到缓存
    cache[n] = v;
    return v;
};

// for(let i = 0;i < 10;i++) {
//     console.log(fib(i));
// }

//数组缓存,但是不使用递归
const arr = [1,1];

function fib2(n) {
    while(arr.length <= n) {
        arr.push(arr[arr.length - 2] + arr[arr.length - 1]);
    };
    return arr[arr.length - 1];
};

// console.log(fib2(9),arr);

const highArr = [1,2,[3,4,[5,6,[7,8]]],10];

//将高维数组转换为对象形式
// function convert(value) {
//     const result = [];
//     for(let i = 0;i < value.length;i++) {
//         if(Array.isArray(value[i])) {
//             result.push({children:convert(value[i])});
//         }else {
//             result.push({value:value[i]});
//         }
//     }
//     return {children:result};
// };


function convert(item) {
    if(Array.isArray(item)) {
        return {children:item.map(value => {
            return convert(value);
        })};
    }else {
        return {value:item};
    }
}
console.log(convert(highArr));

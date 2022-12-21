export default function nest(tokens) {
    //创建结果数组
    const nestedTokens = [];
    //创建一个栈
    const stack = [];
    //创建一个收集器,默认指向结果数组
    let collector = nestedTokens;
    let token;
    //遍历tokens
    for (let i = 0; i < tokens.length; i++) {
        //保存当前token
        token = tokens[i];
        //判断当前token的类型
        switch (token[0]) {
            //为#号就在最后添加一个数组,用于存放嵌套的token
            case "#":
                //向收集器中添加token
                collector.push(token);
                //向栈中添加token
                stack.push(token);
                //将收集器指向当前token下标为2的数组
                collector = token[2] = [];
                break;
            //为/号就出栈,并更改收集器指向
            case "/":
                //出栈
                stack.pop();
                //如果栈内有元素就指向栈顶下标为2的元素,否则就指向结果数组
                collector = stack.length > 0 ? stack[stack.length-1][2] : nestedTokens;
                break;
                //默认行为
                default:
                //向收集器中添加token
                collector.push(token);
                break;
        }
    };
    return nestedTokens;
}
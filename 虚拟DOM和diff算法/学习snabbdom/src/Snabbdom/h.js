import vnode from "./vnode.js";
//定义h函数
export default function(sel,b,c) {
    //检查参数个数
    if(arguments.length !== 3) throw new Error("h函数必须传入3个参数!");
    if(!sel) throw new Error("选择器不能为空");
    //检查c是否为字符串或者数字
    if(typeof c === "string" || typeof c === "number") {
        return vnode(sel,b,[],c,undefined);
    }else if(Array.isArray(c)) {
        let children = [];
        for(let i = 0;i < c.length;i++) {
            if(typeof c[i] === "object" && c[i].hasOwnProperty("sel")) {
                children.push(c[i]);
            }else {
                throw new Error("数组参数不对");
            }
        }
        return vnode(sel,b,children,undefined,undefined);
    }else if(typeof c === "object" && c.hasOwnProperty("sel")) {
        return vnode(sel,b,[c],undefined,undefined);
    }else {
        throw new Error("传入的参数类型不对,正在的参数类型为h(string,object,string || array || number || vnode)");
    };
}
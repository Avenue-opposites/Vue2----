import Observer from "./Observer.js";
// import {arrayMethods} from "./Array.js";
//响应式函数
export default function (value) {
    //如果不是引用类型就返回当前的值
    if (typeof value !== "object") return value;
    //创建变量保存观察者对象
    let ob;
    //判断是否有__ob__属性
    if (value.__ob__ != undefined) {
        ob = value.__ob__;
    } else {
        //如果没有__ob__属性就创建一个观察者实例
        ob = new Observer(value);
    };
    return ob;
};
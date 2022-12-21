import observe from "./observe.js";
import utils from "./utils.js";
//以数组的原型对象为原型创建一个对象
export const arrayMethods = Object.create(Array.prototype);
//保存需要重写的方法
const methodsChange = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse"
];
//遍历需要更改的方法
methodsChange.forEach(methodName => {
    //创建变量保存数组原型上的同名方法
    const original = Array.prototype[methodName];
    //为该对象添加方法
    utils.def(arrayMethods,methodName,function() {
        //保存每个函数的返回结果
        let result;
        //判断
        switch (methodName) {
            case "push":
            case "unshift":
                //保存结果,并将该方法的this指向当前函数的调用者,并将参数传入
                result = original.apply(this,arguments);
                //为添加的参数添加观察者属性
                observe([...arguments]);
                break;
            case "pop":
            case "shift":
                result = original.apply(this);
                break;
            case "splice":
                result = original.apply(this,arguments);
                break;
            case "sort":
            case "reverse":
                result = original.apply(this,arguments);
                break;
        };
        // console.log(this.__ob__.Dep);
        return result;
    },false);
});


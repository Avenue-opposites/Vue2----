import Dep from "./Dep.js";
import observe from "./observe.js";
//定义响应式函数
export default function defineReactive(data, key, val) {
    //如果参数为2个就自动获取该值
    if(arguments.length === 2) {
        val = data[key];
    }
    let childOb = observe(val);
    //返回定义的属性,为数据绑定属性和getter和setter
    let dep = new Dep();
    return Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
            dep.depend();
            // console.log(`访问${key}属性`);
            //当前数据是否有观察者
            if(childOb) {
                data.Dep.depend();
                // console.log("收集依赖");
            }
            return val;
        },
        set(newVaule) {
            if (val === newVaule) return;
            // console.log(`修改${key}属性`);
            val = newVaule;
            childOb = observe(newVaule);
            dep.notify();
            if(childOb) {
                data.Dep.notify();
                console.log("更新依赖",data.Dep);
            }
        }
    });
};
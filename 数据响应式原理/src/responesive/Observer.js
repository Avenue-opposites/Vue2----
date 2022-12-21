import defineReactive from "./defineReactive.js";
import utils from "./utils.js";
import observe from "./observe.js";
import Dep from "./Dep.js";
import {arrayMethods} from "./Array.js";
//定义观察者类
export default class Observer {
    constructor(data) {
        //为数据添加__ob__属性
        utils.def(data,"__ob__",this,false);
        // utils.def(this,"Dep",new Dep(),false);
        this.Dep = new Dep();
        //如果数据是数组就将数组的原型修改为重写之后的数组原型
        if(Array.isArray(data)) {
            //将数组的原型设置为重写的数组原型对象
            Object.setPrototypeOf(data,arrayMethods);
            //并且调用数组的观察方法
            this.observeArray(data);
        }else {
            //否则就直接观察
            this.walk(data);
        }
    };
    walk(data) {
        //遍历数据的属性
        for(let key in data) {
            //为实例添加该属性
            defineReactive(this,key,data[key]);
        }
    }
    observeArray(data) {
        //遍历数组
        for(let i = 0;i < data.length;i++) {
            //将数组中的每个元素都创建为响应式
            observe(data[i]);
        }
    }
}
import Dep from "./Dep.js";
import parsePath from "./parsePath.js";
export default class Watcher {
    constructor(target,expression,callback) {
        this.id = Math.random().toString().slice(2);
        this.target = target;
        this.getter = parsePath(expression);
        this.callback = callback;
        this.value = this.get();
    }
    //通知依赖更新
    update() {
        this.run();
    }
    get() {
        let value;
        //进入依赖收集状态,让全局的Dep.target设置为当前到Watcher实例,那么就可以进入依赖收集
        Dep.target = this;
        try {
            value = this.getter(this.target);
        }finally {
            Dep.target = null;
        }
        return value;
    }
    run() {
        this.getAndInovoke(this.callback);
    }
    getAndInovoke(callback) {
        const newValue = this.get();
        const oldValue = this.value;
        if(newValue !== oldValue || typeof newValue === "object" ) {
            this.value = newValue;
            callback.call(this.target,newValue,oldValue);
        }
    }
}
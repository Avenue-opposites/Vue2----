import Compile from "./Compile.js";
import Watcher from "./responesive/Watcher.js";
import observe from "./responesive/observe.js";
import deepWatch from "./deepWatch.js";
//Vue类
export default class Vue {
    constructor(options) {
        this.$options = options || {};
        this._data = options.data() || undefined;
        //绑定响应式
        observe(this._data);
        //初始化数据
        this._initData();
        //初始化计算属性
        this._initComputed();
        //初始化监视属性
        this._initWatch();
        //编译
        this.$el = new Compile(options.el,this).$el;
        //生命周期
    }
    _initData() {
        let that = this;
        //数据代理
        Object.keys(this._data).forEach(key => {
            Object.defineProperty(this,key,{
                get() {
                    return that._data.__ob__[key];
                },
                set(newValue) {
                    that._data.__ob__[key] = newValue;
                }
            })
        })
    }
    _initComputed() {

    }
    _initWatch() {
        const watch = this.$options.watch || {};
        Object.keys(watch).forEach(key => {
            let handler = watch[key].handler || watch[key];
            new Watcher(this,key,handler);
            if(watch[key].deep) {
                deepWatch(this[key],handler);
            }
        });
    }
};

window.Vue = Vue;
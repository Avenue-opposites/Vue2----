
//定义依赖类
export default class Dep {
    constructor() {
        //定义subs存放依赖
        this.subs = [];
    }
    //添加依赖
    depend() {
        if(Dep.target) {
            this.subs.push(Dep.target);
            // console.log("添加依赖");
        }
    }
    notify() {
        //浅拷贝
        const subs = [...this.subs];
        for(let i = 0; i < subs.length;i++) {
            subs[i].update();
        }
    }
}
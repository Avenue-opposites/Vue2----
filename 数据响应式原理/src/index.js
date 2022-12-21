import observe from "./responesive/observe.js";
import Watcher from "./responesive/Watcher.js";

const obj = { name: "阿修罗", age: 20, skill: { a: 1, b: 2, c: 3 }, hobby: ["毁灭", { a: 1 }, [1, 2, 3]] };

// obj.hobby.push(1);
let o = observe(obj);
console.log(obj);
for (let key in o) {
    new Watcher(o, key, (value, oldValue) => {
        console.log(value, oldValue);
    });
}
o.name = "李二";





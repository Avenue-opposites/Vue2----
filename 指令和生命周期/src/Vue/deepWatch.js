import Wather from "./responesive/Watcher.js";
export default function deepWatch(watchObj,handler) {
    Object.keys(watchObj).forEach(key => {
        if(typeof watchObj[key] === "object") {
            deepWatch(watchObj[key],handler);
        }else {
            new Wather(watchObj,key,handler);
        }
    })
}